import { mount } from "svelte";
import App from "./app.svelte";

const app = mount(App, {
  target: document.getElementById("svelte-app"),
});

export default app;
