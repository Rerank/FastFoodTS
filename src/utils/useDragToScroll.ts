import { useRef, type RefObject, type PointerEvent, type MouseEvent } from 'react';

// Порог в пикселях. Если мышь сдвинулась меньше чем на 5px, считаем это обычным кликом.
// Если больше — значит пользователь намеренно тянет (drag) карусель.
const DRAG_THRESHOLD = 5;

export const useDragToScroll = (ref: RefObject<HTMLElement | null>) => {
    // Используем useRef для хранения состояния, чтобы изменение этих переменных не вызывало лишних перерисовок (re-renders) компонента.
    const isPointerDown = useRef(false);    // Нажата ли кнопка мыши
    const isDragging = useRef(false);       // Начался ли процесс перетаскивания (превышен ли порог)
    const shouldBlockClick = useRef(false); // Нужно ли заблокировать клик по ссылке/кнопке после перетаскивания
    const pointerId = useRef<number | null>(null);        // ID указателя (чтобы мультитач не ломал логику)
    const startX = useRef(0);               // Координата X в момент клика
    const startScrollLeft = useRef(0);      // Позиция прокрутки контейнера в момент клика

    const getElement = () => ref?.current;

    // Функция для сброса всех флагов при отпускании мыши или уходе курсора
    const stopDragging = () => {
        const element = getElement();

        if (element) {
            element.classList.remove('is-dragging'); // Убираем CSS-класс, возвращаем выделение текста
        }

        isPointerDown.current = false;
        isDragging.current = false;
        pointerId.current = null;
    };

    // Срабатывает в момент нажатия кнопки мыши
    const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
        const element = getElement();

        // Игнорируем тач-события (на телефонах работает нативный скролл) 
        // и клики не левой кнопкой мыши (e.button !== 0)
        if (!element || e.pointerType !== 'mouse' || e.button !== 0) return;

        isPointerDown.current = true;
        isDragging.current = false;
        shouldBlockClick.current = false;
        pointerId.current = e.pointerId;
        
        // Запоминаем стартовые координаты и текущий скролл
        startX.current = e.clientX;
        startScrollLeft.current = element.scrollLeft;
    };

    // Срабатывает при движении мыши
    const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
        const element = getElement();

        // Если кнопка не нажата или это другой указатель — игнорируем
        if (!element || !isPointerDown.current || e.pointerId !== pointerId.current) return;

        // Вычисляем, на сколько пикселей сдвинулась мышь
        const deltaX = e.clientX - startX.current;

        // Если мышь сдвинулась меньше порога, ничего не делаем (ждем, может это просто клик)
        if (!isDragging.current && Math.abs(deltaX) < DRAG_THRESHOLD) {
            return;
        }

        // Если порог превышен, официально начинаем процесс Drag-and-Drop
        if (!isDragging.current) {
            isDragging.current = true;
            shouldBlockClick.current = true; // Запрещаем клики по внутренним элементам
            
            // Захватываем указатель. Теперь браузер будет слать события мыши этому элементу, 
            // даже если курсор случайно выйдет за его пределы.
            element.setPointerCapture?.(e.pointerId);
            
            element.classList.add('is-dragging'); // Добавляем класс для отключения pointer-events у детей
            window.getSelection()?.removeAllRanges(); // Сбрасываем случайное выделение текста
        }

        e.preventDefault(); // Предотвращаем дефолтное поведение браузера (например, drag картинок)
        
        // Прокручиваем контейнер: начальная позиция МИНУС сдвиг мыши
        element.scrollLeft = startScrollLeft.current - deltaX;
    };

    // Срабатывает при отпускании кнопки мыши
    const handlePointerUp = (e: PointerEvent<HTMLElement>) => {
        const element = getElement();
        const wasDragging = isDragging.current;

        // Если мы захватывали указатель, нужно его отпустить
        if (
            element &&
            e.pointerId === pointerId.current &&
            element.hasPointerCapture?.(e.pointerId)
        ) {
            element.releasePointerCapture(e.pointerId);
        }

        stopDragging();

        // Если мы перетаскивали карусель, нам нужно заблокировать клик.
        // Используем setTimeout, чтобы флаг shouldBlockClick сбросился 
        // ТОЛЬКО ПОСЛЕ того, как браузер обработает событие click.
        if (wasDragging) {
            window.setTimeout(() => {
                shouldBlockClick.current = false;
            }, 0);
        }
    };

    // Перехватчик кликов. Срабатывает на этапе погружения (Capture Phase),
    // до того, как клик дойдет до самой карточки или кнопки.
    const handleClickCapture = (e: MouseEvent<HTMLElement>) => {
        if (!shouldBlockClick.current) return;

        e.preventDefault();   // Отменяем переход по ссылке
        e.stopPropagation();  // Останавливаем всплытие клика
        shouldBlockClick.current = false;
    };

    return {
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: stopDragging, // На случай, если браузер прервет событие (например, alt+tab)
        onClickCapture: handleClickCapture,
    };
};