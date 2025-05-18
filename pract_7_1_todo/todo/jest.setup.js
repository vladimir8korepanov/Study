// Полифил для TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Полифил для Fetch API
import { fetch, Response, Request, Headers } from 'whatwg-fetch';
global.fetch = fetch;
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

global.BroadcastChannel = class BroadcastChannel {
    constructor() {}
    postMessage() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
};