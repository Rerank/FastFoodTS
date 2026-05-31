import type { ReactNode } from 'react';
import './MenuHeader.css'

const MenuHeader = ({children}: { children: ReactNode }) => {
    return (
        <header className="app-header">
            {children}
        </header>
    )
}

export default MenuHeader;