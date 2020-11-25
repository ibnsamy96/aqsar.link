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

      `;
  },
  injectCode: () => {
    return [{
        'operation': 'editInnerText',
        'querySelector': 'title',
        'newText': 'Aqsar Link | Home'
      },
      {
        'operation': 'editAttribute',
        'querySelector': 'body',
        'attribute': 'id',
        'newValue': 'body'
      }, {
        'operation': 'append',
        'querySelector': 'body',
        'position': 'beforeend',
        'code': `<script type="module" src="./app.js"></script>`
      }
    ]
  }
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
  injectCode: () => {
    return [{
      'operation': 'editInnerText',
      'querySelector': 'title',
      'newText': 'Aqsar Link | Error'
    }]
  }
};

const ShortLinkComponent = {
  // eslint-disable-next-line consistent-return
  get: async (slug) => {
    console.log(
      `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
    );

    try {
      const data = await getData(
        `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
      );
      console.log(data);
      console.log(data[`${slug}`].domain);
      const URL = data[`${slug}`].domain;
      console.log(this);
      ShortLinkComponent.open(URL);
    } catch (e) {
      return ErrorComponent.render();
    }
  },
  open: (URL) => {
    window.open(URL, "_self"); // open link in the same tap
  },
};

// Routes
// TODO add other pages routes in here
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
  //  Get the current path
  const currentPath = window.location.pathname || '/';
  // const currentPath = window.location.hash.slice(1) || "/"; // way of tutorial
  console.log(currentPath);

  //  Find the component based on the current path
  const {
    component = ShortLinkComponent
  } =
  routes.find((route) => {
    return route.path === currentPath;
  }) || {};

  //  Render the component in the "app" placeholder
  if (component === ShortLinkComponent) {
    const slug = currentPath.split("/")[1];
    console.log(slug);
    if (slug !== "" && slug !== " ") {
      component.get(slug);
    }
  } else {
    const appDiv = document.querySelector("#app");
    appDiv.innerHTML = component.render();
    try {
      component.injectCode().forEach(codeInfo => {
        const element = document.querySelector(codeInfo.querySelector)
        if (codeInfo.operation === 'editInnerText') {
          element.innerText = codeInfo.newText

        } else if (codeInfo.operation === 'editAttribute') {
          element.setAttribute(codeInfo.attribute, codeInfo.newValue)


        } else if (codeInfo.operation === 'append') {
          element.insertAdjacentHTML(codeInfo.position, codeInfo.code)

        }
      });

    } catch (error) {
      console.log(error);
    }
  }
};

const test = () => {
  console.log('pathname: ', window.location.pathname);
  console.log('hash: ', window.location.hash);
  router();
};

window.addEventListener("load", test);
window.addEventListener("hashchange", test);