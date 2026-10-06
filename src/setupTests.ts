import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

window.scrollTo = jest.fn();

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;