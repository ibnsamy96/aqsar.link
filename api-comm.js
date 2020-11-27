// eslint-disable-next-line import/prefer-default-export
export const databaseApi = "https://ibn-samy-short-links.firebaseio.com/links";

export const getData = async (url = "") => {
    const request = await fetch(url, {
        mode: "cors",
        method: "GET"
    });

    return request.json();
};