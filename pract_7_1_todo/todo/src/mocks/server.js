import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// if (typeof TextEncoder === 'undefined') {
//     const { TextEncoder, TextDecoder } = require('util')
//     global.TextEncoder = TextEncoder
//     global.TextDecoder = TextDecoder
// }

export const server = setupServer(...handlers);