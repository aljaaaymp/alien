import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change this back to '/' for Namecheap hosting
  base: '/', 
})