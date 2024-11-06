import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        agGridCommunity: ['ag-grid-community'],
        agGridEnterprise: ['ag-grid-enterprise'],
        agGridReact: ['ag-grid-react'],
      },
    },
  },
},

})
