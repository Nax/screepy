require('dotenv').config();

const gulp = require('gulp');
const rename = require('gulp-rename');
const screeps = require('gulp-screeps');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const webpackConfigWatch = Object.assign({}, webpackConfig, { watch: true });

gulp.task('build', () => {
  return gulp.src('./src/index.ts')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  return gulp.src('./src/index.ts')
    .pipe(webpackStream(webpackConfigWatch), webpack)
    .pipe(gulp.dest('./dist'));
});

gulp.task('send', ['build'], () => {
  return gulp.src('./dist/screepy.js')
    .pipe(rename('main.js'))
    .pipe(screeps({
      token: process.env.SCREEPS_TOKEN
    })
  );
});
