// Gulp & plugins
var gulp           = require('gulp'),

    // gulp plugins
    changed        = require('gulp-changed'),
    imagemin       = require('gulp-imagemin'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    less           = require('gulp-less'),
    plumber        = require('gulp-plumber'),
    nunjucksRender = require('gulp-nunjucks-render'),

    // other plugins
    LessAutoPrefix = require('less-plugin-autoprefix'),
    browsersync    = require('browser-sync'),
    del            = require('del')
    ;

// Files path
var PATH = {
    source : 'src/',
    dest   : 'html/',
};
    PATH.images = {
        in  : PATH.source + 'images/**/*.*',
        out : PATH.dest   + 'images/'
    };
    PATH.less = {
        all : PATH.source + 'css/import.less',
        in  : PATH.source + 'css/**/*.less',
        out : PATH.dest   + 'css/'
    };
    PATH.css = {
        in  : PATH.source + 'css/**/*.css',
        out : PATH.dest   + 'css/'
    };
    PATH.fonts = {
        in  : PATH.source + 'fonts/**/*.*',
        out : PATH.dest   + 'fonts/'
    };
    PATH.js = {
        in  : PATH.source + 'js/**/*.js',
        out : PATH.dest   + 'js/'
    };
    PATH.html = {
        in  : PATH.source + '*.html',
        out : PATH.dest   + './'
    };
    PATH.tpl = {
        tpl : PATH.source + '_templates/**/*.+(tpl|html)',
        in  : PATH.source + '_pages/**/*.+(tpl|html)',
        out : PATH.source
    };

// Server options
var SYNC_CONFIG = {
    server : {
        baseDir : PATH.dest,
        // index : 'blog.html'
        // index : 'news.html'
        // index : 'about.html'
        index : 'index.html'
        // index : 'sales.html'
        // index : 'search.html'
        // index : 'catalog.html'
        // index : 'product.html'
        // index : 'contacts.html'
        // index : 'news-open.html'
        // index : 'catalog-filter.html'
    },
    open   : false,
    notify : true
};

// LESS options
var LESS_PREFIXER = new LessAutoPrefix({
        browsers: ['last 5 versions', 'ie 9', 'Firefox 14']
    });

// NUNJUCKS options
var NUNJUCKS_DEFAULTS = {
    path: 'src/_templates/'
    // envOptions: {
    //     watch: false
    // }
};

// handle styles
gulp.task('css', function() {
    // console.log('*************************');
    // console.log('*** Starting CSS task ***');
    // console.log('*************************');

    return gulp.src(PATH.css.in)
        .pipe(gulp.dest(PATH.css.out))
        ;
});

gulp.task('less', function() {
    // console.log('**************************');
    // console.log('*** Starting LESS task ***');
    // console.log('**************************');

    return gulp.src(PATH.less.all)
        .pipe(changed(PATH.less.out))
        .pipe(plumber( function (err) {
            console.log('***********************');
            console.log('*** LESS TASK ERROR ***');
            console.log('***********************');
            console.log(err);
            this.emit('end');
        }))
        .pipe(less({
            paths   : [PATH.less.in],
            plugins : [LESS_PREFIXER]
        }))
        .pipe(gulp.dest(PATH.less.out))
        .pipe(browsersync.reload({ stream: true }))
        ;
});

gulp.task('styles', ['css', 'less']);

// handle fonts
gulp.task('fonts', function(){
    // console.log('***************************');
    // console.log('*** Starting FONTS task ***');
    // console.log('***************************');

    return gulp.src(PATH.fonts.in)
        .pipe(gulp.dest(PATH.fonts.out))
        ;
});

// handle images
gulp.task('images', function() {
    // console.log('****************************');
    // console.log('*** Starting IMAGES task ***');
    // console.log('****************************');

    return gulp.src(PATH.images.in)
        .pipe(changed(PATH.images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.images.out))
        ;
});

// handle js
gulp.task('js', function() {
    // console.log('************************');
    // console.log('*** Starting JS task ***');
    // console.log('************************');

    return gulp.src(PATH.js.in)
        // .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(changed(PATH.js.out))
        .pipe(gulp.dest(PATH.js.out))
        ;
});

// handle nunjucks
gulp.task('nunjucks', function() {
    // console.log('******************************');
    // console.log('*** Starting NUNJUCKS task ***');
    // console.log('******************************');

    // var stream = gulp.src(PATH.tpl.in)
    return gulp.src(PATH.tpl.in)
        .pipe(changed(PATH.tpl.out))
        .pipe(nunjucksRender(NUNJUCKS_DEFAULTS))
        .pipe(gulp.dest(PATH.tpl.out))
        ;
    // return stream;
});

// handle html
gulp.task('html', ['nunjucks'], function() {
    // console.log('**************************');
    // console.log('*** Starting HTML task ***');
    // console.log('**************************');

    return gulp.src(PATH.html.in)
        .pipe(changed(PATH.html.out))
        .pipe(gulp.dest(PATH.html.out))
        ;
});

// build task
gulp.task('build',

    [   'styles',
        'fonts',
        'images',
        'js',
        'html'
    ],

    function() {
        console.log('***************************');
        console.log('*** Starting BUILD task ***');
        console.log('***************************');
    }
);

// clean html folder
gulp.task('clean', function() {
    console.log('***************************');
    console.log('*** Starting CLEAN task ***');
    console.log('***************************');
    del([
        PATH.dest + '*'
    ]);
});

// Browser-sync task
gulp.task('browsersync', function() {
    browsersync(SYNC_CONFIG);
});

// default task
gulp.task('default', ['browsersync'], function() {

    // image changes
    gulp.watch(PATH.images.in, ['images']);

    // css changes
    gulp.watch(PATH.css.in,    ['css']);

    // less changes
    gulp.watch(PATH.less.in,   ['less']);

    // js changes
    gulp.watch(PATH.js.in,     ['js', browsersync.reload]);

    // nunjucks changes
    // gulp.watch([PATH.tpl.tpl, PATH.tpl.in],   ['nunjucks', browsersync.reload]);

    // html changes
    // gulp.watch(PATH.html.in,   ['html', browsersync.reload]);
    gulp.watch(
        [
            PATH.tpl.tpl,
            PATH.tpl.in
        ],                     ['html', browsersync.reload]);

});
