const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// Copy changeable files
// js files
gulp.task('copyMyJSFiles', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

// sass files
gulp.task('copyMySassFiles', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// html files
gulp.task('copyMyHtmlFiles', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Copy production files
// Fontawesome
gulp.task('fontawesomeSass', () => {
    return gulp.src('node_modules/font-awesome/scss/font-awesome.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fontawesomeFonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('copyFontAwesome', gulp.series('fontawesomeSass', 'fontawesomeFonts'));

// Popper
gulp.task('copyPopper', () => {
    return gulp.src('node_modules/popper.js/dist/umd/popper.min.js')
        .pipe(gulp.dest('dist/js'));
});

// JQuery
gulp.task('copyJQuery', () => {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
});

// Bootstrap
gulp.task('bootstrapSass', () => {
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('bootstrapJS', () => {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.js')
        .pipe(gulp.dest('dist/js'));

});
gulp.task('copyBootstrap', gulp.series('bootstrapSass', 'bootstrapJS'));

// Copy whole things
gulp.task('copyProductionFiles', gulp.series('copyBootstrap', 'copyPopper', 'copyJQuery', 'copyFontAwesome'));
gulp.task('copyChangeableFiles', gulp.series('copyMySassFiles', 'copyMyJSFiles', 'copyMyHtmlFiles', async () => {
    browserSync.stream();
}));


gulp.task('serve', gulp.series('copyProductionFiles', 'copyChangeableFiles', () => {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(['src/js/*.js', 'src/scss/*.scss', 'src/*.html']).on('change', gulp.series('copyChangeableFiles', browserSync.reload));
}));

gulp.task('default', gulp.series('serve'));
