module.exports = {
    build: {
        command: 'npm run ci',
        options: {
          stdout: true
        }
    },
    copyImages: {
        command: 'cp -frv  assets/content/images dist/out/images'
    },
    copyFonts: {
        command: 'cp -frv assets/content/fonts dist/out/fonts'
    },
    copyMainJs: {
        command: 'cp -frv dist/app/main-built.js dist/out/mainjs.js'
    }
}