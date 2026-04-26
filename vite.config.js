import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});

// 5 AKTIFKAN DIBAWAH INI JIKA MENGGUNAKAN NGROK
// export default defineConfig({
//     plugins: [laravel({
//         input: ['resources/js/app.jsx'],
//         refresh: true,
//     })],

//     server: {
//         host: true,
//         hmr: {
//             protocol: 'wss',
//             host: 'ponderously-dreich-jocelyn.ngrok-free.dev',
//         },
//     },
// });