export const saveItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const removeItem = key => {
    localStorage.removeItem(key);
}

export const getItem = key => {
    return JSON.parse(localStorage.getItem(key));
}