import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

{{#if isQianKun}}
const isMicroApp = window.__POWERED_BY_QIANKUN__;
let instance: Element | null = null;

export function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <App />,
    container ? container.querySelector("#app") : document.querySelector("#app")
  );
}

if (!isMicroApp) {
  render({});
}

export async function bootstrap() {
  console.log("react micro-app is bootstraped");
}

export async function mount(props: any) {
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  console.log("container ->", container);

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector("#app") : document.querySelector("#app")
  );

  instance = null;
}

{{else}}
function render(props: any) {
  ReactDOM.render(
    <App />,
    document.querySelector("#app")
  );
}

render();
{{/if}}
