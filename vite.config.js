import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/Gele-culture/',
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