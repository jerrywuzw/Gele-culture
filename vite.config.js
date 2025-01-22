import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  // If you're deploying to /Gele-culture/, keep this; otherwise remove it.
  base: '/Gele-culture/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        injectData: {
          title: 'Gele.Culture'
        }
      }
    })
  ]
});
