
import { path } from 'ramda';

export function getFromTheme (themePath = '') {
    return function getFromThemeprops (props = {}) {
        return path(themePath.split('.'), props.theme);
    }
}

export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// getFromTheme(path) — is helper for getting nested props in styled components:

// You can also add some logs to this function, for example if returning value is undefined or path is incorrect.