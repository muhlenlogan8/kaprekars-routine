import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import trailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), trailwindcss()],
	server: {
		host: "0.0.0.0",
	},
});
