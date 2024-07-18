import { jest } from '@jest/globals';
import '@testing-library/jest-dom'
import 'jest-canvas-mock';
import 'styles/globals.css';
// SCSS is also supported
import 'demo/globals.scss';
// Any CSS from node_modules is fine
import '@your-design-system/css/dist/index.min.css';
jest.setTimeout(30000);
