import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/Gele-culture/',
  build: {
    rollupOptions: {
      input: 'public/index.html', // Ensure the path is relative to the project root
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        injectData: {
          title: 'Gele.Culture',
        },
      },
    }),
  ],
});