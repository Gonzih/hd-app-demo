import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hd-app-demo/',
  plugins: [react()],
})
