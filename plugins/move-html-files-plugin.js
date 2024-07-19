import path from 'path'
import fs from 'fs'

function moveAndCleanupHtmlFiles () {
  const buildDir = path.resolve(__dirname, '../build')
  const srcPagesBuildDir = path.join(buildDir, 'src/pages')
  const htmlFiles = fs.readdirSync(srcPagesBuildDir, { withFileTypes: true })
    .filter(file => file.isFile() && file.name.endsWith('.html'))
    .map(file => path.join(srcPagesBuildDir, file.name))

  htmlFiles.forEach(file => {
    const destination = path.join(buildDir, path.basename(file))
    fs.renameSync(file, destination)
  })

  fs.rmSync(path.join(buildDir, 'src'), { recursive: true })
}

function moveHtmlFiles () {
  return {
    name: 'move-html-files',
    closeBundle () {
      moveAndCleanupHtmlFiles()
    }
  }
}

export default moveHtmlFiles
