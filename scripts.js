const LIVE_DOMAIN = 'https://www.hlx.live';
const { protocol, hostname, port, pathname } = window.location;

const config = {
    blocks: {
        'header': {
            location: '/blocks/header/',
            scripts: 'header.js',
            styles: 'header.css',
        },
        '.marquee': {
            location: '/blocks/marquee/',
            scripts: 'marquee.js',
        },
        'a[href^="https://www.youtube.com"]': {
            lazy: true,
            location: '/blocks/embed/',
            styles: 'youtube.css',
            scripts: 'youtube.js',
        },
        'a[href^="https://gist.github.com"]': {
            lazy: true,
            location: '/blocks/embed/',
            scripts: 'gist.js',
        },
    },
    templates: {
        'tutorial': {
            location: '/templates/tutorial/',
            styles: 'tutorial.css',
        }
    },
};

export function setDomain(element) {
    const anchors = element.getElementsByTagName('a');
    const domain = `${protocol}//${hostname}`;
    const currentDomain = port ? `${domain}:${port}` : domain;
    Array.from(anchors).forEach((anchor) => {
        const { href } = anchor;
        if (href.includes(LIVE_DOMAIN)) {
            anchor.href = href.replace(LIVE_DOMAIN, currentDomain);
        }
    });
};

export function getMetadata(name) {
    const meta = document.head.querySelector(`meta[name="${name}"]`);
    return meta && meta.content;
};

export function loadScript(url, callback, type) {
    const script = document.createElement('script');
    script.onload = callback;
    script.setAttribute('src', url);
    if (type) { script.setAttribute('type', type); }
    document.head.append(script);
    return script;
}

export async function loadStyle(url, onLoad) {
    const duplicate = document.head.querySelector(`link[href^="${url}"]`);
    if (duplicate) {
        if (onLoad) { onLoad(); }
        return;
    }
    const element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('href', url);
    if (onLoad) {
        element.addEventListener('load', onLoad);
    }
    document.querySelector('head').appendChild(element);
}

export function debug(message) {
    const { hostname } = window.location;
    const usp = new URLSearchParams(window.location.search);
    if (usp.has('helix-debug') || hostname === 'localhost') {
      console.log(message);
    }
}

/**
 * Clean up variant classes
 * Ex: marquee--small--contained- -> marquee small contained
 * @param {HTMLElement} parent
 */
export function cleanVariations(parent) {
    const variantBlocks = parent.querySelectorAll('[class$="-"]');
    variantBlocks.forEach((variant) => {
        const { className } = variant;
        const classNameClipped = className.slice(0, -1);
        variant.classList.remove(className);
        const classNames = classNameClipped.split('--');
        variant.classList.add(...classNames);
    });
};

function loadTemplate(config) {
    const template = getMetadata('template');
    if (!template || config.templates) return;
    document.body.classList.add('has-Template');
    const templateConf = config.templates[template];
    if (templateConf?.class) {
        document.body.classList.add(templateConf.class);
    }
    if (templateConf.styles) {
        loadStyle(`${templateConf.location}${templateConf.styles}`, isLoaded);
    } else {
        isLoaded();
    }
}

function decorateBlocks(element) {
    const isDoc = element instanceof Document;
    const parent = isDoc ? document.body : element;
    cleanVariations(parent);

    return Object.keys(config.blocks).reduce((decoratedBlocks, block) => {
        const elements = parent.querySelectorAll(block);
        elements.forEach((el) => {
            el.setAttribute('data-block-select', block);
            decoratedBlocks.push(el);
        });
        return decoratedBlocks;
    }, []);
}

function loadBlocks(blocks) {
    async function initJs(element, block) {
        if (!block.module) {
            block.module = await import(`${block.location}${block.scripts}`);
        }
        // If this block type has scripts and they're already imported
        if (block.module) {
            block.module.default(element);
        }
    };

    /**
     * Load each element
     * @param {HTMLElement} element
     */
    async function loadElement(element) {
        const { blockSelect } = element.dataset;
        const block = config.blocks[blockSelect];
        if (block.scripts) {
            await initJs(element, block);
        }
        if (block.styles) {
            loadStyle(`${block.location}${block.styles}`, () => {
                block.loaded = true;
            });
        } else {
            block.loaded = true;
        }
        element.classList.add('is-Loaded');
    };

    /**
     * Iterate through all entries to determine if they are intersecting.
     * @param {IntersectionObserverEntry} entries
     * @param {IntersectionObserver} observer
     */
    const onIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                loadElement(entry.target);
            }
        });
    };

    const fetchFragment = async (path) => {
        const resp = await fetch(`${path}.plain.html`);
        if (resp.ok) {
            return resp.text();
        }
        return null;
    };

    const loadFragment = async (fragmentEl) => {
        const path = fragmentEl.querySelector('div > div').textContent;
        const html = await fetchFragment(path);
        if (!html) return;
        fragmentEl.insertAdjacentHTML('beforeend', html);
        fragmentEl.querySelector('div').remove();
        fragmentEl.classList.add('is-Visible');
        setDomain(fragmentEl);
    };

    /**
     * Add fragment to the list of blocks
     */
    config.blocks['.fragment'] = {
        loaded: true,
        scripts: {},
        module: {
            default: loadFragment,
        },
    };

    const options = { rootMargin: config.lazyMargin || '1200px 0px' };
    const observer = new IntersectionObserver(onIntersection, options);
    blocks.forEach((block) => {
        const { blockSelect } = block.dataset;
        const blockConf = config.blocks[blockSelect];
        if (blockConf) {
            observer.observe(block);
        } else {
            loadElement(block);
        }
    });
}

function postLCP() {
    
};

function setLCPTrigger() {
    const lcpCandidate = document.querySelector('img');
    if (lcpCandidate) {
        if (lcpCandidate.complete) { postLCP(); } else {
            lcpCandidate.addEventListener('load', () => { postLCP() });
            lcpCandidate.addEventListener('error', () => { postLCP() });
        }
    } else {
        postLCP(blocks);
    }
}
setDomain(document);
loadTemplate(config);
const blocks = decorateBlocks(document);
loadBlocks(blocks);
setLCPTrigger();