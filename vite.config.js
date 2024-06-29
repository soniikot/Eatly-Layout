import {defineConfig} from 'vite';
import embedTemplates from './plugins/vite-template-plugin.js';
import moveHtmlFiles from './plugins/move-html-files-plugin';
import getHtmlInputs from './configs/getHtmlInputs.js';

import path from 'path';

export default defineConfig( {
  plugins: [
    embedTemplates(),
    moveHtmlFiles()
  ],
  publicDir: 'src/public',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: path.resolve( __dirname, 'index.html' ),
        ...getHtmlInputs( path.resolve( __dirname, 'src/pages' ) ),
      },
      output: {
        assetFileNames: ( assetInfo ) => {
          if ( assetInfo.name.endsWith( '.css' ) ) {
            return 'styles/[name].[ext]';
          } else {
            const ext = path.extname( assetInfo.name ).slice( 1 );
            return `assets/${ ext }/[name].[ext]`;
          }
        },
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].js',
        manualChunks: undefined,
      },

    }
  },
  server: {
    watch: {
      ignored: [],
      paths: ['src/templates/**/*.template.html'],
    }
  }
} );
