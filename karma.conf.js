module.exports = function(config) {
    config.set({
 
        // base path, that will be used to resolve files and exclude
        basePath: '',
 
        // frameworks to use
        frameworks: ['jasmine'],
 
        // list of files / patterns to load in the browser
        files: [
            "bower_components/angular/angular.min.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "src/js/*.js",
            "bower_components/gui-2d-components/src/js/templates/*.html",
            "test/*.js"
        ],

        preprocessors: {
            "bower_components/gui-2d-components/src/js/templates/**/*.html": "ng-html2js"
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            // the name of the Angular module to create
            //stripPrefix: '../',
            //prependPrefix: '../bower_components/gui-2d-components/src/js/'
            moduleName: "templates"
        },
 
        // list of files to exclude
        exclude: [
        ],
 
        // test results reporter to use
        reporters: ['progress'],
 
        // web server port
        port: 9876,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: ['PhantomJS'],
 
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
