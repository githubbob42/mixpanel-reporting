module.exports = {
  options: { configFile: 'tests/karma.conf.js' },
  unit: { 
    configFile: '../tests/karma.conf.js',
    background: true,
    autoWatch: false
  },
  continuous: { 
    singleRun: true, 
    background: false,
    reporters: ['spec', 'junit'] //, 'coverage']
  }
};