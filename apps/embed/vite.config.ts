import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        outDir: "dist",
        lib: {
            entry: resolve(__dirname, "embed.ts"),
            name: "EchoWidget",
            fileName: "widget",
            formats: ["iife"]
        },
        rollupOptions: {
            output: {
                extend: true
            }
        },
        copyPublicDir: false
    },
    publicDir: false,
    server: {
        port: 3002,
        open: "/demo.html"
    }
});