// eslint-disable-next-line import/prefer-default-export
export const databaseApi = "https://ibn-samy-short-links.firebaseio.com/links";

export const getData = async (url = "") => {
  const request = await fetch(url, {
    mode: "cors",
    method: "GET"
  });

  return request.json();
};

// Components
const HomeComponent = {
  render: () => {
    return `
    <section>
    <form action="javascript:;" onsubmit="createNewShortLink()">
      <label for="link">Url to shorten:</label>
      <input type="text" name="link" id="link" required />
      <small id="urlValidity"></small>
      <!-- <label for="slug">Optional. Custom micro url:</label>
      <input type="text" name="slug" id="slug" /> -->
      <input type="submit" value="Create" />
    </form>
  </section>

  <!-- <input type="text" name="link" id="link" />
  <button onclick="createNewShortLink()">Create</button> -->
  <p id="result"></p>
  <button class='displayNone' onclick="copyShortLink()">Copy</button>
  <button class='displayNone' onclick="createQR()">Create QR</button>
  <img src="" id="qrImg" class='displayNone' />
  <script type="module" src="./app.js"></script>

      `;
  },
};

const ShortLinkComponent = {
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
      .catch(() => ShortLinkComponent.open("#/404"));
  },
  open: (URL) => {
    window.open(URL, "_self"); // open link in the same tap
  },
};

const ErrorComponent = {
  render: () => {
    return `
        <section>
          <h1>Error</h1>
          <p>This is just a test</p>
        </section>
      `;
  },
};

// Routes
const routes = [{
    path: "/",
    component: HomeComponent
  },
  {
    path: "/404",
    component: ErrorComponent
  },
];

const router = () => {
  // TODO: Get the current path
  //   const currentPath = window.location.pathname;
  const currentPath = window.location.hash.slice(1) || "/"; // way of tutorial
  console.log(currentPath);

  // TODO: Find the component based on the current path
  const {
    component = ShortLinkComponent
  } =
  routes.find((route) => {
    return route.path === currentPath;
  }) || {};

  // TODO: Render the component in the "app" placeholder
  if (component === ShortLinkComponent) {
    const slug = currentPath.split("/")[1];
    console.log(slug);
    if (slug !== "" && slug !== " ") {
      component.get(slug);
    }
  } else {
    const appDiv = document.querySelector("#app");
    appDiv.innerHTML = component.render();
  }
};

const test = () => {
  console.log('pathname: ', window.location.pathname);
  console.log('hash: ', window.location.hash);
  router();
};

window.addEventListener("load", test);
window.addEventListener("hashchange", test);