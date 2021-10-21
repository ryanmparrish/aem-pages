import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import {
    config,
    decorateAnchors,
    decorateBlocks,
    loadBlocks,
    loadElement,
    loadScript,
    loadStyle,
    loadTemplate,
    setLCPTrigger,
} from '../scripts.js';

const mock = await readFile({ path: './scripts.mock.html' });
document.body.innerHTML = mock;

describe('Anchors', () => {
    const parent = document.querySelector('.anchors');
    const anchors = decorateAnchors(parent);
    it('url maps to localhost', () => {
        expect(anchors[0].href).to.equal('http://localhost:2000/my-content');
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
        expect(svgAnchor.href).to.equal('http://localhost:2000/my-awesome-link');
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
    const script = await loadScript('/__tests__/block.mock.js', callback, 'module');
    it('script element exists', () => {
        expect(script).to.exist;
    });

    it('script calls back', async () => {
        setTimeout(() => {
            expect(window.scriptCallback).to.be.true;
        }, 10);
    });

    it('block mock can run', async () => {
        setTimeout(() => {
            expect(window.feature.loaded).to.be.true;
        }, 10);
    });
});

describe('Style loading', async () => {
    function callback() { window.styleCallback = true; };
    function callbackTwo() { window.styleCallbackTwo = true; };
    const style = await loadStyle('/__tests__/block.mock.css', callback);
    it('style element exists', () => {
        expect(style).to.exist;
    });

    it('style calls back', async () => {
        setTimeout(() => {
            expect(window.styleCallback).to.be.true;
        }, 10);
    });

    it('only one style', async () => {
        const style = await loadStyle('/__tests__/block.mock.css', callbackTwo);
        expect(style).to.exist;
        expect(window.styleCallbackTwo).to.be.true;
    });
});

describe('Template loading', async () => {
    const config = { templates: {
        'tutorial': {
            location: '/templates/tutorial/',
            styles: 'tutorial.css',
        }
    }};

    const meta = document.createElement('meta');
    meta.setAttribute('name', 'template');
    meta.setAttribute('content', 'product');
    document.head.append(meta);

    it('template doesnt exist', () => {
        const noTemplate = loadTemplate({});
        expect(noTemplate).to.not.exist;
    });

    it('template conf doesnt exist', () => {
        const template = loadTemplate(config);
        expect(template).to.not.exist;
    });

    it('template conf exists', () => {
        meta.setAttribute('content', 'tutorial');
        loadTemplate(config);
        expect(document.body.classList.contains('has-Template')).to.be.true;
    });

    it('template has name', () => {
        meta.setAttribute('content', 'tutorial');
        config.templates.tutorial.class = 'tutorial-template';
        loadTemplate(config);
        expect(document.body.classList.contains('tutorial-template')).to.be.true;
    });
});

describe('Block loading', async () => {
    const marquee = document.querySelector('.marquee');

    it('block has a block select', () => {
        const { blockSelect } = marquee.dataset;
        expect(blockSelect).to.exist;
    });

    it('block is loaded with only js', async () => {
        await loadElement(marquee, config.blocks['.marquee']);
        expect(marquee.classList.contains('is-Loaded')).to.be.true;
    });

    it('block is loaded with css', async () => {
        config.blocks['.marquee'].styles = 'marquee.css';
        await loadElement(marquee, config.blocks['.marquee']);
        expect(marquee.classList.contains('is-Loaded')).to.be.true;
    });
});

describe('Fragment loading', async () => {
    it('fragment is loaded', async () => {
        const blocks = decorateBlocks(document);
        const loadedBlocks = await loadBlocks(blocks, config);
        setTimeout(() => {
            const heading = document.querySelector('.fragment h1');
            expect(heading).to.exist;
        }, 50);
    });
});

describe('Post LCP', async () => {
    it('LCP loads when there is no image', async () => {
        expect(window.postLcp).to.be.true;
        window.postLcp = null;
    });

    it('LCP loads when there is an image', async () => {
        setLCPTrigger('img');
        expect(window.postLcp).to.be.true;
    });
});