import {defineConfig} from 'vite';
import embedTemplates from './plugins/vite-template-plugin.js';
import path from 'path';
import fs from 'fs';

function getHtmlInputs ( dir ) {
  const entries = fs.readdirSync( dir, {withFileTypes: true} );
  let htmlFiles = {};

  for ( const entry of entries ) {
    const entryPath = path.join( dir, entry.name );
    if ( entry.isDirectory() ) {
      htmlFiles = {...htmlFiles, ...getHtmlInputs( entryPath )};
    } else if ( entry.isFile() && entry.name.endsWith( '.html' ) ) {
      const name = path.relative( __dirname, entryPath ).replace( /\\/g, '/' );
      htmlFiles[name] = entryPath;
    }
  }

  return htmlFiles;
}

export default defineConfig( {
  plugins: [embedTemplates()],
  publicDir: 'src/public',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        ...getHtmlInputs( path.resolve( __dirname, 'src/pages/' ) ),
        main: path.resolve( __dirname, 'index.html' )
      },
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
