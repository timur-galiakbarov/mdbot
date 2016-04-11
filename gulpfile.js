'use strict';

var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('default', function () {
    server.run(['index.js']);

    // Restart the server when file changes
    gulp.watch(['app/**/*.*'], function (){
        server.notify;
    });
});