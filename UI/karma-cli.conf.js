// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      //require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    port: 9876,  // karma web server port
    coverageIstanbulReporter: {
      reports: [ 'cobertura', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: 'test-results.xml',
      suite: 'UI-Unit-Tests',
    },
    browsers:  ['ChromeHeadless'],
    autoWatch: false,
    colors: false,
    logLevel: config.LOG_INFO,
    singleRun: true,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
          '--no-sandbox'
        ],
      }
    }
  });
};