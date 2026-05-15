export const setCookie = (name, value, minutes = 1) => {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return null;
};

export const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

