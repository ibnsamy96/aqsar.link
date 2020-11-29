// eslint-disable-next-line import/prefer-default-export
export const databaseApi = "https://ibn-samy-short-links.firebaseio.com/links";

export const getData = async (url = "") => {
    const request = await fetch(url, {
        mode: "cors",
        method: "GET"
    });

    return request.json();
};

export const putData = async (url = "", data = {}) => {
    const request = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        credentials: "same-origin",
    });

    return request.json();
};