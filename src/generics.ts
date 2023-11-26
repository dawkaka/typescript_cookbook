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

type URLList = {
    [key: string]: URL
}

function fetchFile(urls: URLList, key: string) {
    return fetch(urls[key]).then((res) => res.json());
}

const languages: Languages = {
    de: new URL("http://de.com"),
    en: new URL("http://de.com"),
    pt: new URL("http://de.com"),
    es: new URL("http://de.com"),
    fr: new URL("http://de.com"),
    ja: new URL("http://de.com"),

}

const de = fetchFile(languages, "de");
const it = fetchFile(languages, "it");

function genericFetchFile<List extends URLList>(urls: List, key: keyof List) {
    return fetch(urls[key]).then((res) => res.json());
}

const gde = genericFetchFile(languages, "de")
const git = genericFetchFile(languages, "it")

function fetchFiles<List extends URLList>(urls: List, keys: (keyof List)[]) {
    const els = keys.map((el) =>
        fetch(urls[el])
            .then((res) => res.json())
            .then((data) => {
                const entry: [keyof List, any] = [el, data]
                return entry
            })
    );
    return els;
}

let de_and_fr = fetchFiles(languages, ["de", "fr"]);

for (const entry of de_and_fr) {
    entry.then(v => {
        if (v[0] === "en") {
            // English?
            // We know english is not part of the language we fetched ["de", "fr"]
            // We need to be able to tell typescript that
        }

    })
}


function fetchFilesP<List extends URLList, Keys extends keyof List>(urls: List, keys: Keys[]) {
    const els = keys.map(key => {
        return fetch(urls[key]).then(res => res.json()).then(data => {
            const entry: [Keys, any] = [key, data]
            return entry
        })
    })
    return els
}
let de_and_fr_p = fetchFilesP(languages, ["de", "fr"]);

for (const entry of de_and_fr_p) {
    entry.then(v => {
        if (v[0] === "en") {
            // Now we can't check for english
            // Typescript is awesome
        }

    })
}


const de_and_ja = fetchFilesP<Languages, "ja" | "de">(languages, ["de"]);

