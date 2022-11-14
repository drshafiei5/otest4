
export function createOrUpdateLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
}

export function removeFromLS(key) {
    localStorage.removeItem(key);
    return true;
}

export function getFromLs(key) {
    return JSON.parse(localStorage.getItem(key));
}