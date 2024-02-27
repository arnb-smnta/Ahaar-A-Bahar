import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  /*server: {
    https: {
      key: "",
      cert: "",
    },
  },*/
  /*server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },*/
  plugins: [react()],
});
