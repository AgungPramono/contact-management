import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    server: {
        port: 8081,
        strictPort: true,  // kalau port 3000 dipakai, langsung error, gak auto-cari port lain
    },
    preview: {
        port: 8081,  // atau port yang kamu inginkan untuk preview
        strictPort: true,
    }
})
