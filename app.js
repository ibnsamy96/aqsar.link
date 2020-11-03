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

function generateID(length) {
  // TODO first char must be a letter not number
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
}

const link = document.querySelector("#link");
const result = document.querySelector("#result");

// eslint-disable-next-line no-unused-vars
function createNewShortLink() {
  const randomID = generateID(6);
  const domain = link.value;
  console.log(randomID);

  putData(`${databaseApi}/${randomID}.json`, { domain })
    .then((res) => {
      console.log(res);
    })
    .then(() => {
      result.innerText = `aqsar.xyz/${randomID}`;
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
