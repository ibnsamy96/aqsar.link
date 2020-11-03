const databaseApi = "https://ibn-samy-short-links.firebaseio.com/links";

console.log("medo");

const putData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "same-origin",
  });

  return request.json();
};

const getData = async (url = "") => {
  const request = await fetch(url, { mode: "cors", method: "GET" });

  return request.json();
};

function validateURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

async function checkSlug(slug) {
  console.log(slug);

  try {
    const data = await getData(
      `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
    );
    // console.log(data);
    const data_1 = data[`${slug}`].domain;
    console.log(data);
    console.log(data_1);
    console.log(false);
    return false;
  } catch (data_2) {
    console.log(data_2);

    return true;
  }
}

// eslint-disable-next-line consistent-return
async function generateSlug(length) {
  console.log(length);
  let slug = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (await checkSlug(slug)) {
    console.log("slug true");
    // true - slug is valid
    return slug;
  }
  console.log("slug false");

  // false - slug isn't valid
  return generateSlug(length + 1);
}

const link = document.querySelector("#link");
const result = document.querySelector("#result");

// eslint-disable-next-line no-unused-vars
function createNewShortLink() {
  let randomSlug;
  const domain = link.value;

  generateSlug(1)
    .then((slug) => {
      randomSlug = slug;
      console.log(randomSlug);
    })
    .then(() => {
      return putData(`${databaseApi}/${randomSlug}.json`, { domain });
    })
    .then((res) => {
      console.log(res);
    })
    .then(() => {
      result.innerText = `aqsar.xyz/${randomSlug}`;
    })
    .catch((err) => console.log(err));
}

function specifyURLSlug() {
  const slug = window.location.pathname.split("/")[1];
  if (slug !== "" && slug !== " ") {
    return window.location.pathname.split("/")[1];
  }
  return false;
}

// eslint-disable-next-line no-unused-vars
function getShortLink(givenSlug) {
  const slug = specifyURLSlug() || givenSlug;
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
    .then((data) => {
      return data;
    })
    .catch((data) => console.log(data));
}

// eslint-disable-next-line no-unused-vars
function copyShortLink() {
  const slug = result.innerText.split("/")[1];

  // copy link to clipboard
  const temporaryInput = document.createElement("input");
  temporaryInput.setAttribute("value", result.innerText);
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  try {
    document.execCommand("copy"); // Security exception may be thrown by some browsers.
  } catch (error) {
    console.warn("Copy to clipboard failed.", error);
  }
  document.body.removeChild(temporaryInput);

  getShortLink(slug);
}

// eslint-disable-next-line no-unused-vars
async function goToLink() {
  const slug = result.innerText.split("/")[1];

  const URL = await getShortLink(slug);

  window.open(URL, "_blank"); // open link in new tab
}
