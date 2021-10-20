import mock from '../__mocks__/kitchen-sink.html';
import { decorateAnchors, cleanVariations } from '../scripts';

document.body.insertAdjacentHTML('afterbegin', mock);

describe('url transformation', () => {
    const parent = document.querySelector('.anchors');
    const anchors = decorateAnchors(parent);
    test('url maps to localhost', () => {
        expect(anchors[0].href).toBe('http://localhost/my-content');
    });
    test('url does not map to localhost', () => {
        expect(anchors[1].href).toBe('https://www.adobe.com/');
    });

    test('svg image will unwrap anchor', () => {
        const svg = parent.querySelector(':scope > img');
        expect(svg).toBeDefined();
    });

    test('svg image will keep anchor', () => {
        const svgAnchor = anchors.pop();
        const svg = parent.querySelector(':scope > a > img');
        expect(svg).toBeDefined();
        expect(svgAnchor.href).toBe('http://localhost/my-awesome-link');
    });
});

describe('block decoration', () => {
    const parent = document.querySelector('.variations');
    const variations = cleanVariations(parent);
    test('variations are cleaned up', () => {
        expect(variations[0].classList.contains('marquee')).toBeTruthy();
    });
});