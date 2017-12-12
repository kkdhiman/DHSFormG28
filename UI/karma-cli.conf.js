// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-phantomjs-launcher'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputDir: 'UI-Unit-Tests',
      outputFile: 'test-results.xml',
      suite: 'UI-Unit-Tests',
    },
    browsers:  ['PhantomJS'],
    autoWatch: false,
    colors: false,
    logLevel: config.LOG_INFO,
    singleRun: true
  });
};
