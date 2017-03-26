'use strict';

// Dependencies
var gulp        = require('gulp');
var browserify  = require("browserify");
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var watchify    = require("watchify");
var gutil       = require("gulp-util");
var tsify       = require("tsify");
var eventStream = require('event-stream');
var rename      = require('gulp-rename');

// Shared variables
var sourceFiles = {};
sourceFiles.root                    = 'src/';
sourceFiles.cssRoot                 = sourceFiles.root + 'styles/';
sourceFiles.allCssSelector         = sourceFiles.cssRoot + '**/*.css';
sourceFiles.tsRoot                  = sourceFiles.root + 'scripts/';
sourceFiles.allTsSelector           = [sourceFiles.tsRoot + '**/*.ts',
                                        sourceFiles.tsRoot + '**/*.tsx'];
sourceFiles.allHtmlPagesSelector     = sourceFiles.root + 'browserBox.html';

var targetFiles = {};
targetFiles.root                    = 'target/';
targetFiles.cssRoot                 = targetFiles.root + 'styles/';
targetFiles.jsRoot                  = targetFiles.root + 'scripts/';
targetFiles.htmlPagesRoot           = targetFiles.root;

// Task definitions
gulp.task('default', ['styles', 'scripts', 'htmlPages']);

gulp.task('watch', function() {
    gulp.watch(sourceFiles.allCssSelector, ['styles']);
    watchifiedScripts();
    gulp.watch(sourceFiles.allHtmlPagesSelector, ['htmlPages']);
});

gulp.task('styles', function() {
    gulp.src(sourceFiles.allCssSelector)
        .pipe(gulp.dest(targetFiles.cssRoot));
});

// Begin scripts

gulp.task('scripts', unwatchifiedScripts);

var scriptEntrypoints = ['Main.ts'];
var browserifiedConfig = {
    basedir: './src/scripts/',
    debug: true,
    cache: {},
    packageCache: {}
};

function watchifiedScripts() {
    var streams = scriptEntrypoints.map((entrypointName) => {
        var currentBrowserifyConfig = Object.assign({}, browserifiedConfig);
        currentBrowserifyConfig.entries = entrypointName;

        var watchedBrowserify = 
            browserify(currentBrowserifyConfig)
                .plugin(tsify).plugin(watchify);

        watchedBrowserify.on('update', () => doScripts(watchedBrowserify, entrypointName));
        watchedBrowserify.on('log', gutil.log);

        return doScripts(
            watchedBrowserify,
            entrypointName);
    });

    return eventStream.merge(streams);
}

function unwatchifiedScripts() {
    var streams = scriptEntrypoints.map((entrypointName) => {
        var currentBrowserifyConfig = Object.assign({}, browserifiedConfig);
        currentBrowserifyConfig.entries = entrypointName;

        var browserified = browserify(currentBrowserifyConfig)
            .plugin(tsify);

        return doScripts(
            browserified,
            entrypointName);
    });

    return eventStream.merge(streams);
}

function doScripts(specificBrowserify, entrypointName) {
    return specificBrowserify
        .bundle()
        .pipe(source(entrypointName))
        .pipe(rename({
                extname: '.js'
        }))
        .pipe(gulp.dest(targetFiles.jsRoot));
}

// End scripts

gulp.task('htmlPages', function () {
    gulp.src(sourceFiles.allHtmlPagesSelector)
        .pipe(gulp.dest(targetFiles.htmlPagesRoot));
});