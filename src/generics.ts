type Languages = {
    de: URL;
    en: URL;
    pt: URL;
    es: URL;
    fr: URL;
    ja: URL;
}

function isLanguageAvailable(
    collection: Languages,
    lang: string
): lang is keyof Languages {
    return lang in collection;
}

function loadLanguage(collection: Languages, lang: string) {
    if (isLanguageAvailable(collection, lang)) {
        // lang is keyof Languages
        collection[lang]; // access ok!
    }
}


type AllowedElements = {
    video: HTMLVideoElement;
    audio: HTMLAudioElement;
    canvas: HTMLCanvasElement;
};

function isElementAllowed(
    collection: AllowedElements,
    elem: string
): elem is keyof AllowedElements {
    return elem in collection;
}

function selectElement(collection: AllowedElements, elem: string) {
    if (isElementAllowed(collection, elem)) {
        // elem is keyof AllowedElements
        collection[elem]; // access ok
    }
}

function isAvailable<Obj extends object>(ob: Obj, key: string | number | symbol): key is keyof Obj {
    return key in ob;
}

/**
 * isAvailable is generic and you can replace both isLanguageAvailable and isElementAllowed with it
 * And it works
 */