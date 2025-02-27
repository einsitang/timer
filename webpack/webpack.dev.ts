import path from "path"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import FileManagerWebpackPlugin from "filemanager-webpack-plugin"
import optionGenerator from "./webpack.common"
import webpack from "webpack"

const outputDir = path.join(__dirname, '..', 'dist_dev')
let manifest: chrome.runtime.ManifestV2

const options = optionGenerator(
  outputDir,
  baseManifest => {
    baseManifest.name = 'IS DEV'
    // Fix the crx id for development mode
    baseManifest.key = "clbbddpinhgdejpoepalbfnkogbobfdb"
    manifest = baseManifest
  }
)

options.mode = 'development'

const manifestFirefoxName = 'manifest-firefox.json'
// The manifest.json is different from Chrome's with add-on ID
const firefoxManifestGeneratePlugin = new GenerateJsonPlugin(
  manifestFirefoxName,
  {
    ...manifest, browser_specific_settings: { gecko: { id: 'timer@zhy' } }
  }
) as unknown as webpack.WebpackPluginInstance
options.plugins.push(firefoxManifestGeneratePlugin)
const firefoxDevDir = path.join(__dirname, '..', 'firefox_dev')
// Generate FireFox dev files
options.plugins.push(
  new FileManagerWebpackPlugin({
    events: {
      onEnd: [
        {
          copy: [{ source: outputDir, destination: firefoxDevDir }],
          delete: [path.join(outputDir, manifestFirefoxName), path.join(firefoxDevDir, 'manifest.json')],
          move: [{ source: path.join(firefoxDevDir, manifestFirefoxName), destination: path.join(firefoxDevDir, 'manifest.json') }]
        }
      ]
    }
  }) as webpack.WebpackPluginInstance,
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  })
)

options.output.path = outputDir

// no eval with development, but generate *.map.js
options.devtool = 'cheap-module-source-map'

// Use cache with filesystem
options.cache = { type: 'filesystem' }

module.exports = options