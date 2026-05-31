import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { navigate } from "./navigate";

// ComponentPropsWithoutRef<'a'> уже включает children
interface LinkProps extends ComponentPropsWithoutRef<'a'> {
    to: string;
    delay?: number;
}


const Link = ({ to, children, delay = 0, ...props }: LinkProps) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // клик с Ctrl/Cmd или средней кнопкой — отдаём браузеру (откроет в новой вкладке)
        if (e.ctrlKey || e.metaKey || e.button === 1) {
            return;
        }
        e.preventDefault();

        if (delay > 0) {
            setTimeout(() => navigate(to), delay);
        } else {
            navigate(to);
        }
    };

    return (
        <a href={to} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};

export default Link;