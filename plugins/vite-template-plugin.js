import fs from 'fs'
import path from 'path'

function embedTemplates () {
  return {
    name: 'vite-template-plugin',
    transformIndexHtml: {
      order: 'pre',
      async handler (html, { server, path: _htmlPath }) {
        const templateDir = path.resolve(__dirname, '../src/templates')
        const templateFiles = fs.readdirSync(templateDir).filter(file => file.endsWith('.template.html'))

        let transformedHtml = html

        for (const file of templateFiles) {
          const templatePath = path.join(templateDir, file)
          let templateContent = fs.readFileSync(templatePath, 'utf-8')
          const templateName = path.basename(file, '.template.html')

          if (server) {
            templateContent = templateContent.replace(
              /src="\.\.\/public\/assets\/([^"]+)"/g,
              'src="/src/public/assets/$1"'
            )
          } else {
            templateContent = templateContent.replace(
              /src="\.\.\/public\/assets\/([^"]+)"/g,
              'src="assets/$1"'
            )
          }

          transformedHtml = transformedHtml.replace(`%{${templateName}}%`, templateContent)
        }

        return transformedHtml
      }
    },
    handleHotUpdate ({ file, server }) {
      if (file.endsWith('.template.html')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        })
      }
    }
  }
}

export default embedTemplates
