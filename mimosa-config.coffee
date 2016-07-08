exports.config = {
  minMimosaVersion:'2.1.22'

  sass:
    lib: require('node-sass')

  modules: ['copy',  'sass', 'server', 'require', 'minify', 'live-reload', 'combine', 'requirebuild-textplugin-include',  'web-package', 'requirebuild-include']

  combine: {
    folders: [
      {
        folder:'content'
        output:'out/stylescss.css'
      }
    ]
    removeCombined: {
      enabled:true
      exclude:[]
    }
  }

  minify: {
    exclude: [/\.css/, /\.js/]
  }

  copy:
    extensions: ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'htm', 'html', 'eot', 'svg', 'ttf', 'woff', 'otf', 'yaml', 'kml', 'ico', 'htc', 'json', 'txt', 'xml', 'xsd']

  watch:
    sourceDir: 'assets'
    javascriptDir: 'app'
    compiledDir: 'dist'

  vendor:
    javascripts:"vendor"

  server:
    port: 3004
    defaultServer:
      enabled: false
    path: 'server.js'
    views:
      path: 'views'
      compileWith: 'html'
      extension: 'html'

  requireBuildTextPluginInclude:
    pluginPath: 'text'
    extensions: ['html']

  requireBuildInclude:
    patterns: ['viewmodels/**/*.js', 'report/**/*.js', 'report-helpers/**/*.js']

  require:
    exclude: ['../vendor/require/r.js']
    optimize:
      overrides:
        name: '../vendor/require/almond-custom'
        inlineText: true
        stubModules: ['text']
        mainConfigFile: 'assets/app/require-config.js'
        paths:
          text: '../vendor/require/text'
        excludeShallow: ['api.json']
        mainConfigFile: 'assets/app/require-config.js'
}
