import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  resolve: {
    alias: {
      'react-bootstrap' : 'react-bootstrap/dist/react-bootstrap',
      'firebase/app': 'firebase/app',
      'firebase/auth': 'firebase/auth',
      'firebase/firestore': 'firebase/firestore',
      'firebase/storage': 'firebase/storage',
    },
    },
  });

