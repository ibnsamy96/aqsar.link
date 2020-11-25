import {
    databaseApi,
    getData
} from "./router.js";

// eslint-disable-next-line import/prefer-default-export
export const ShortLinkComponent = {
    get: (slug) => {
        console.log(
            `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
        );

        return getData(
                `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
            )
            .then((data) => {
                console.log(data);
                console.log(data[`${slug}`].domain);
                return data[`${slug}`].domain;
            })
            .then((URL) => {
                console.log(this);
                ShortLinkComponent.open(URL);
            })
            .catch(() => this.render());
    },
    open: (URL) => {
        window.open(URL, "_self"); // open link in the same tap
    },
};