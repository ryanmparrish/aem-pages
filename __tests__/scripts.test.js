import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import {
    decorateAnchors,
    decorateBlocks,
    loadScript,
    loadStyle,
} from '../scripts.js';

const mock = await readFile({ path: './scripts.mock.html' });
document.body.innerHTML = mock;

describe('Anchors', () => {
    const parent = document.querySelector('.anchors');
    const anchors = decorateAnchors(parent);
    it('url maps to localhost', () => {
        expect(anchors[0].href).to.equal('http://localhost:2054/my-content');
    });

    it('url does not map to localhost', () => {
        expect(anchors[1].href).to.equal('https://www.adobe.com/');
    });

    it('svg image will unwrap anchor', () => {
        const svg = parent.querySelector(':scope > img');
        expect(svg).to.exist;
    });

    it('svg image will keep anchor', () => {
        const svgAnchor = anchors.pop();
        const svg = parent.querySelector(':scope > a > img');
        expect(svg).to.exist;
        expect(svgAnchor.href).to.equal('http://localhost:2054/my-awesome-link');
    });
});

describe('Block variations', () => {
    const parent = document.querySelector('.variations');
    const blocks = decorateBlocks(parent);
    it('url maps to localhost', () => {
        expect(blocks[0].classList.contains('marquee')).to.be.true;
    });
});

describe('Script loading', async () => {
    function callback() { window.scriptCallback = true; };
    const script = await loadScript('/__tests__/feature.mock.js', callback);
    it('script element exists', () => {
        expect(script).to.exist;
    });

    it('script calls back', async () => {
        setTimeout(() => {
            expect(window.scriptCallback).to.be.true;
        }, 10);
    });
});

describe('Style loading', async () => {
    function callback() { window.styleCallback = true; };
    function callbackTwo() { window.styleCallbackTwo = true; };
    const style = await loadStyle('/__tests__/styles.mock.css', callback);
    it('style element exists', () => {
        expect(style).to.exist;
    });

    it('style calls back', async () => {
        setTimeout(() => {
            expect(window.styleCallback).to.be.true;
        }, 10);
    });

    it('only one style', async () => {
        const style = await loadStyle('/__tests__/styles.mock.css', callbackTwo);
        expect(style).to.exist;
        expect(window.styleCallbackTwo).to.be.true;
    });
});