import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/Gele-culture/', // Match the repository name
  build: {
    outDir: 'dist', // Ensure this matches the deploy directory
  },
});
