module.exports = {
  'default': ['newer:jshint', 'test:unit', 'watch'],
  'version': ['replace'],
  'package': ['shell:build', 'shell:copyMainJs', 'shell:copyImages', 'shell:copyFonts']
};