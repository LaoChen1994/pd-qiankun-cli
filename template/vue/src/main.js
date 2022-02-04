import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

{{#if isQianKun}}
import "./public-path";

const isMicroApp = window.__POWERED_BY_QIANKUN__;
let app = null;

export function render(props) {
  const { container } = props;
  const router = createRouter({
    routes: [
      {
        path: "/",
        component: HelloWorld,
      },
    ],
    history: createWebHashHistory(),
  });
  app = createApp(App);

  app
    .use(router)
    .mount(
      container
        ? container.querySelector("#app")
        : document.querySelector("#app")
    );
}

if (!isMicroApp) {
  render({});
}

export async function bootstrap() {
  console.log("vue micro-app is bootstraped");
}

export async function mount(props) {
  console.log("vue micro-app is mounted");
  render(props);
}

export async function unmount(props) {
  const { container } = props;

  if (app && container) {
    app.unmount(container.querySelector("#app"));
    app = null;
  }
}

{{else}}
const router = createRouter({
  routes: [
    {
      path: "/",
      component: HelloWorld,
    },
  ],
  history: createWebHashHistory(),
});
app = createApp(App);

app
  .use(router)
  .mount(
    document.querySelector("#app")
  );
{{/if}}