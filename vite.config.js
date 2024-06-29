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
      const nestedHtmlFiles = getHtmlInputs( entryPath );
      htmlFiles = {...htmlFiles, ...nestedHtmlFiles};
    } else if ( entry.isFile() && entry.name.endsWith( '.html' ) ) {
      const relativePath = path.relative( 'src/pages', entryPath );
      const name = relativePath.replace( /\\/g, '/' ); // Keep the full relative path with .html extension
      htmlFiles[name] = entryPath;
    }
  }

  return htmlFiles;
}

function moveAndCleanupHtmlFiles () {
  const buildDir = path.resolve( __dirname, 'build' );
  const srcPagesBuildDir = path.join( buildDir, 'src/pages' );
  const htmlFiles = fs.readdirSync( srcPagesBuildDir, {withFileTypes: true} )
    .filter( file => file.isFile() && file.name.endsWith( '.html' ) )
    .map( file => path.join( srcPagesBuildDir, file.name ) );

  htmlFiles.forEach( file => {
    const destination = path.join( buildDir, path.basename( file ) );
    fs.renameSync( file, destination );
  } );

  fs.rmSync( path.join( buildDir, 'src' ), {recursive: true} );
}

export default defineConfig( {
  plugins: [
    embedTemplates(),
    {
      name: 'move-html-files',
      closeBundle () {
        moveAndCleanupHtmlFiles();
      }
    }
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
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: ( assetInfo ) => {
          if ( assetInfo.name.endsWith( '.css' ) ) {
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
