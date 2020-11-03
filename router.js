// Components
const HomeComponent = {
  render: () => {
    return `
        <section>
          <h1>Home</h1>
          <p>This is just a test</p>
        </section>
      `;
  },
};

const Page1Component = {
  render: () => {
    return `
        <section>
          <h1>Page 1</h1>
          <p>This is just a test</p>
        </section>
      `;
  },
};

const Page2Component = {
  render: () => {
    return `
        <section>
          <h1>Page 2</h1>
          <p>This is just a test</p>
        </section>
      `;
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
const routes = [
  { path: "/", component: HomeComponent },
  { path: "/page1", component: Page1Component },
  { path: "/page2", component: Page2Component },
];

const router = () => {
  // TODO: Get the current path
  const currentPath = window.location.pathname;
  //   const currentPath = window.location.hash.slice(1).toLowerCase() || "/"; // way of tutorial
  //   const slug = currentPath.split("/")[1];

  // TODO: Find the component based on the current path
  const { component = ErrorComponent } =
    routes.find((route) => {
      return route.path === currentPath;
    }) || {};

  // TODO: Render the component in the "app" placeholder
  const appDiv = document.querySelector("#app");
  appDiv.innerHTML = component.render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
