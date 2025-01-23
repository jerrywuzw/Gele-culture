import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/', // Use '/' for custom domains
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        injectData: {
          title: 'Gele'
        }
      }
    })
  ]
});
