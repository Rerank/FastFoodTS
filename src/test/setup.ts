import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Размонтировать отрендеренные компоненты после каждого теста.
afterEach(cleanup);