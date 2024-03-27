import { boot } from "quasar/wrappers";
import axios from "axios";

console.log(process.env.VUE_APP_API_BASE_URL);

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api };
