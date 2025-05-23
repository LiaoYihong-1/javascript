// querySelectorAll.test.js
const {querySelectorAll} = require('../src/querySelectorAll');

describe('querySelectorAll', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('should find element by ID selector', () => {
        document.body.innerHTML = '<div id="test"></div>';
        let elements = querySelectorAll('#test');
        expect(elements.length).toBe(1);
        expect(elements[0].id).toBe('test');
    });

    test('should find elements by class selector', () => {
        document.body.innerHTML = `
      <div class="test"></div>
      <div class="test"></div>
      <div class="other"></div>
    `;
        let elements = querySelectorAll('.test');
        expect(elements.length).toBe(2);
        elements.forEach(el => {
            expect(el.classList.contains('test')).toBe(true);
        });
    });

    test('should find elements by tag name', () => {
        document.body.innerHTML = `
      <div></div>
      <span></span>
      <div></div>
    `;
        let elements = querySelectorAll('div');
        expect(elements.length).toBe(2);
        elements.forEach(el => {
            expect(el.tagName.toLowerCase()).toBe('div');
        });
    });

    test('should return empty array when no elements match', () => {
        document.body.innerHTML = '<div class="existing"></div>';
        let elements = querySelectorAll('.non-existent');
        expect(elements).toEqual([]);
    });
});