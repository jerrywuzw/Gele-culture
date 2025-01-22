import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/Gele-culture/', // Set the correct base for GitHub Pages
  plugins: [react()],
});
