import path from 'path'
import fs from 'fs'

function getHtmlInputs (dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let htmlFiles = {}

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nestedHtmlFiles = getHtmlInputs(entryPath)
      htmlFiles = { ...htmlFiles, ...nestedHtmlFiles }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const relativePath = path.relative('src/pages', entryPath)
      const name = relativePath.replace(/\\/g, '/')
      htmlFiles[name] = entryPath
    }
  }

  return htmlFiles
}

export default getHtmlInputs
