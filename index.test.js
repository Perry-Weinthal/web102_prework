import { JSDOM } from 'jsdom';

describe('firstLetters function', () => {
  let window;
  let document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = dom.window;
    document = window.document;
    global.document = document;
    global.window = window;
  });
});
