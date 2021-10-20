import mock from '../__mocks__/kitchen-sink.html';
import {
    decorateAnchors,
    cleanVariations,
    decorateBlocks,
    loadScript,
    loadStyle,
    debug,
    loadTemplate,
} from '../scripts';

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
    const blocks = decorateBlocks(parent);
    test('variations are cleaned up', () => {
        expect(blocks[0].classList.contains('marquee')).toBeTruthy();
    });
});

describe('load scripts', () => {
    test('variations are cleaned up', () => {
        const scriptEl = loadScript('/awesome-thing.js');
        expect(scriptEl).toBeTruthy();
    });

    test('variations are cleaned up', () => {
        const scriptEl = loadScript('/awesome-module.js', null, 'module');
        expect(scriptEl.type).toBe('module');
    });
});

describe('load styles', () => {
    function styleLoaded() {
        window.styleLoaded = true;
    }

    test('load a style', async () => {
        const styleEl = await loadStyle('/awesome-thing.css', styleLoaded);
        expect(styleEl).toBeTruthy();
    });

    test('load duplicate style', async () => {
        const styleEl = await loadStyle('/awesome-thing.css', styleLoaded);
        expect(styleEl).toBeTruthy();
        expect(window.styleLoaded).toBeTruthy();
    });
});

describe('load templates', () => {
    test('there is no template', async () => {
        const template = loadTemplate({});
        expect(template).toBeFalsy();
    });

    test('there is a template', async () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'template');
        meta.setAttribute('content', 'tutorial');
        document.head.append(meta);
        const config = {
            templates: {
            'tutorial': {
                location: '/templates/tutorial/',
                styles: 'tutorial.css',
                class: 'tutorial'
            }
        },
        };
        loadTemplate(config);
        const { classList } = document.body;
        expect(classList.contains('has-Template')).toBeTruthy();
    });
});

describe('debug', () => {
    test('debug on localhost', async () => {
        const message = debug('return to sender');
        expect(message).toBe('return to sender');
    });
});