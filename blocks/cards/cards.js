import '../../vend/dexter/app.min.js';

let config = {
    collection: {
        mode: "", // Can be empty, "light", "dark", "darkest";
        layout: {
            type: '5up', // Can be "2up", "3up", "4up", "5up";
            gutter: '2x', // Can be "2x", "3x", "4x";
            container: '1200MaxWidth', // Can be "83Percent", "1200MaxWidth", "32Margin";
        },
        button: {
            style: "call-to-action", // Can be "primary", "call-to-action";
        },
        resultsPerPage: '10',
        // endpoint: "./card-tests/card-collection/json-response-tests/smoke-tests/smoke.json",
        endpoint: "https://14257-chimera-dev.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection",
        totalCardsToShow: '100',
        cardStyle: "3:4", // available options: "1:2", "3:4", "full-card", "half-height", "custom-card", "double-wide";
        showTotalResults: 'true',
        i18n: {
            prettyDateIntervalFormat: '{LLL} {dd} | {timeRange} {timeZone}',
            totalResultsText: '{total} Results',
            title: 'Speakers',
            onErrorTitle: 'Sorry there was a system error.',
            onErrorDescription: 'Please try reloading the page or try coming back to the page another time.',
        },
        setCardBorders: "true", // Can be true or false;
    },
    filterPanel: {
        enabled: 'true',
        type: 'top',
        showEmptyFilters: false,
        filters: [
            {
                "group": "Topic",
                "id": "adobe-com-enterprise:topic",
                "items": [
                    {
                        "label": "Business Continuity",
                        "id": "adobe-com-enterprise:topic/business-continuity"
                    },
                    {
                        "label": "Creativity and Design",
                        "id": "adobe-com-enterprise:topic/creativity-design"
                    },
                    {
                        "label": "Customer Intelligence",
                        "id": "adobe-com-enterprise:topic/customer-intelligence"
                    },
                    {
                        "label": "Data Management Platform",
                        "id": "adobe-com-enterprise:topic/data-management-platform"
                    },
                    {
                        "label": "Digital Foundation",
                        "id": "adobe-com-enterprise:topic/digital-foundation"
                    },
                    {
                        "label": "Digital Trends",
                        "id": "adobe-com-enterprise:topic/digital-trends"
                    },
                    {
                        "label": "Document Management",
                        "id": "adobe-com-enterprise:topic/document-management"
                    },
                    {
                        "label": "Marketing Automation",
                        "id": "adobe-com-enterprise:topic/marketing-automation"
                    },
                    {
                        "label": "Personalization",
                        "id": "adobe-com-enterprise:topic/personalization"
                    },
                    {
                        "label": "Stock",
                        "id": "adobe-com-enterprise:topic/Stock"
                    }
                ]
            },
            {
                "group": "Availability",
                "id": "adobe-com-enterprise:availability",
                "items": [
                    {
                        "label": "On-Demand",
                        "id": "adobe-com-enterprise:availability/on-demand"
                    },
                    {
                        "label": "Upcoming",
                        "id": "adobe-com-enterprise:availability/upcoming"
                    }
                ]
            },
            {
                "group": "Duration",
                "id": "adobe-com-enterprise:duration",
                "items": [
                    {
                        "label": "Long",
                        "id": "adobe-com-enterprise:duration/long"
                    },
                    {
                        "label": "Short",
                        "id": "adobe-com-enterprise:duration/short"
                    }
                ]
            },
            {
                "group": "Rating",
                "id": "adobe-com-enterprise:rating",
                "items": [
                    {
                        "label": "5",
                        "id": "adobe-com-enterprise:rating/5"
                    },
                    {
                        "label": "4",
                        "id": "adobe-com-enterprise:rating/4"
                    }
                ]
            }
        ],
        filterLogic: 'or',
        topPanel: {
            mobile: {
                blurFilters: true,
            }
        },
        i18n: {
            leftPanel: {
                header: 'My Favorites',
                // searchBoxTitle: 'Search',
                clearAllFiltersText: 'Clear All',
                mobile: {
                    filtersBtnLabel: 'Filters:',
                    panel: {
                        header: 'Filters',
                        totalResultsText: '{total} Results',
                        applyBtnText: 'Apply',
                        clearFilterText: 'Clear',
                        doneBtnText: 'Done',
                    },
                    group: {
                        totalResultsText: '{total} Results',
                        applyBtnText: 'Apply',
                        clearFilterText: 'Clear Left',
                        doneBtnText: 'Done',
                    }
                }
            },
            topPanel: {
                groupLabel: 'Filters',
                clearAllFiltersText: 'Clear All Top',
                moreFiltersBtnText: 'More Filters: +',
                mobile: {
                    group: {
                        totalResultsText: '{total} esults',
                        applyBtnText: 'Apply',
                        clearFilterText: 'Clear Top',
                        doneBtnText: 'Done',
                    }
                }
            }
        }
    },
    sort: {
        enabled: 'true',
        defaultSort: 'featured',
        options: '[{"label":"Random", "sort":"random"},{"label":"Featured","sort":"featured"},{"label":"Title: (A-Z)","sort":"titleAsc"},{"label":"Title: (Z-A)","sort":"titleDesc"},{"label":"Date: (Oldest to newest)","sort":"dateAsc"},{"label":"Date: (Newest to oldest)","sort":"dateDesc"}]',
    },
    pagination: {
        enabled: 'true',
        type: 'loadMore',
        loadMoreButton: {
            style: "primary", // Can be "primary", "over-background";
            useThemeThree: "true", // Can be "true" or "false";
        },
        i18n: {
            loadMore: {
                btnText: 'Load More',
                resultsQuantityText: 'Showing {start} of {end} cards',
            },
            paginator: {
                resultsQuantityText: '{start}-{end} of {total} results',
                prevLabel: 'Prev',
                nextLabel: 'Next',
            }
        }
    },
    bookmarks: {
        leftFilterPanel: {
            bookmarkOnlyCollection: 'false',
            showBookmarksFilter: 'true',
            selectBookmarksIcon: '',
            unselectBookmarksIcon: '',
        },
        i18n: {
            leftFilterPanel: {
                filterTitle: 'My Favorites',
            }
        }
    },
    search: {
        enabled: 'true',
        searchFields: '["contentArea.title","contentArea.description","search.meta.author","overlays.banner.description", "foo.bar"]',
        i18n: {
            noResultsTitle: 'No Results Found',
            noResultsDescription: 'We could not find any results. {break} Try checking your spelling or broadening your search.',
            leftFilterPanel: {
                searchTitle: 'Search',
                searchPlaceholderText: 'Search here...',
            },
            topFilterPanel: {
                searchPlaceholderText: 'i18n.topFilterPanel.searchPlaceholderText',
            },
            filterInfo: {
                searchPlaceholderText: 'i18n.filterInfo.searchPlaceholderText',
            }
        }
    },
    language: 'ja-JP',
    analytics: {
        trackImpressions: 'true',
        collectionIdentifier: 'Some Identifier',
    },
    customCard: (data) => {
        /* example custom card */
        if (data) {
            return `<div key="${data.id}">${data.contentArea.title} </div>`;
        } else {
            return `<div> There no data to display </div>`;
        }
    }
};

const init = (element) => {
    const bg = element.querySelector(':scope > div:first-of-type > div');
    bg.classList.add('background');
    const bgImg = bg.querySelector(':scope img');
    if (!bgImg) {
        bg.style.display = 'none';
        const bgColor = bg.textContent;
        element.style.background = bgColor;
    }
    const content = element.querySelector(':scope > div:last-of-type');
    content.classList.add('container');
    const endpoint = content.textContent;
    if(endpoint) {
        config.collection.endpoint = endpoint;
        console.log({endpoint});
    }

    const consonantCardCollection = new ConsonantCardCollection(config, element);

};

export default init;

