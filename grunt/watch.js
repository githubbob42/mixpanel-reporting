module.exports = {
  web: {
    files: '<%= jshint.web.src %>',
    tasks: ['jshint:web'] //, 'jasmine_node']
  }
};