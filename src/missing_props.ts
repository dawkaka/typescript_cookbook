type Settings = {
    language: "en" | "de" | "fr";
    theme?: "dracula" | "monokai" | "github";
};


function applySettings(settings: Settings) {
    const theme = settings.theme
}


function getTheme(settings: Settings) {
    if ('theme' in settings) { // only true if the property is set!
        return settings.theme;
    }
    return 'default';
}

let settingsOne: Settings = { language: "en" }
let settingsTwo: Settings = { language: "en", theme: undefined }

getTheme(settingsOne) // => default
getTheme(settingsTwo) // => undefined

// Missing properties and undefined values are not the same! 
// in the above function the different matters
/**
 * we are able to set theme to undefined in settingsTwo becomes typescript add `undefined` type to type of optional types
 * in the above case type of theme in Settings is  "dracula" | "monokai" | "github" | undefined
 * 
 * You can disable this behaviour by setting exactOptionalPropertyTypes to true in tsconfig.json
 */