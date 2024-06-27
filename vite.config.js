import {defineConfig} from 'vite';
import embedTemplates from './plugins/vite-template-plugin.js';
import path from 'path';

export default defineConfig( {
  plugins: [embedTemplates()],
  publicDir: 'src/public',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: ( assetInfo ) => {
          if ( assetInfo.name.endsWith( '.html' ) ) {
            return '[name].[ext]';
          } else if ( assetInfo.name.endsWith( '.css' ) ) {
            return 'styles/[name].[ext]';
          } else if ( assetInfo.name.endsWith( '.js' ) ) {
            return '[name].js';
          } else {
            const ext = path.extname( assetInfo.name ).slice( 1 );
            return `assets/${ ext }/[name].[ext]`;
          }
        }
      }
    }
  },
  server: {
    watch: {
      ignored: [],
      paths: ['src/templates/**/*.template.html'],
    }
  }
} );
