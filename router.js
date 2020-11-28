/* eslint-disable import/extensions */

// Components
import {
  HomeComponent
} from "./components/home.component.js";
import {
  ErrorComponent
} from "./components/error.component.js";
import {
  ShortLinkComponent
} from "./components/short-link.component.js";


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

function renderComponent(component) {

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
    renderComponent(component)
  }
};


const test = () => {
  console.log('pathname: ', window.location.pathname);
  console.log('hash: ', window.location.hash);
  router();
};

window.addEventListener("load", test);
window.addEventListener("hashchange", test);