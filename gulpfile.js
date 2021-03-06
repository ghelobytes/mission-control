const autoprefixer = require('gulp-autoprefixer');
const composer = require('gulp-uglify/composer');
const gulp = require('gulp');
const pump = require('pump');
const purify = require('gulp-purifycss');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglifyjs = require('uglify-es');

const minify = composer(uglifyjs, console);

//=============================================//
//                    CONFIG                   //
//=============================================//

const config = {
    // user configuration
    css_dir: 'public/css',
    js_dir: {
        all: 'public/js',
        modules: 'public/js/modules',
        packages: 'public/js/packages'
    },
    js_output: {
        modules: 'all-modules.js',
        packages: 'all-packages.js'
    },
    html_dir: 'pages',
    section_dir: 'sections',

    // plugin configuration
    autoprefixer: {
        browsers: ['ie 11'],  // added to later
        remove: false,  // we don't have legacy CSS
    },
    purifycss: {
        content: [
            'public/js/all-modules.js',
            'public/js/all-packages.js',
            'pages/**/*.erb',
            'sections/**/*.erb',
        ],
        options: {
            minify: true,
        },
    },
    sass: {
        indentedSyntax: true,  // Sass, not SCSS
    },
    js: {
        modules: {
            entry: 'public/js/modules.js',
            format: 'cjs',
            treeshake: false  // breaks some things
        },
        packages: {
            entry: 'public/js/packages.js',
            format: 'cjs'
        },
    },
    uglify: {
        mangle: true,
        compress: true
    },
};

// more readable than listing them all out in full
['chrome', 'ff', 'safari', 'opera', 'edge'].forEach(browser => config.autoprefixer.browsers.push(`last 2 ${browser} versions`));

//=============================================//
//                    TASKS                    //
//=============================================//

gulp.task('sass', () => {
    return gulp.src(`${config.css_dir}/all.sass`)
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(purify(config.purifycss.content, config.purifycss.options))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.css_dir));
});

gulp.task('rollup-modules', () => {
    return rollup(config.js.modules)
        .pipe(source(config.js_output.modules))
        .pipe(gulp.dest(config.js_dir.all));
});

gulp.task('rollup-packages', () => {
    return rollup(config.js.packages)
        .pipe(source(config.js_output.packages))
        .pipe(gulp.dest(config.js_dir.all));
});

gulp.task('js-modules', ['rollup-modules'], cb => {
    pump([
            gulp.src(`${config.js_dir.all}/${config.js_output.modules}`),
            minify(config.uglify),
            gulp.dest(config.js_dir.all)
        ],
        cb
    );
});

gulp.task('watch', () => {
    gulp.watch(`${config.css_dir}/**/*.sass`, ['sass']);
    gulp.watch(`${config.css_dir}/**/*.scss`, ['sass']);
    gulp.watch(`${config.html_dir}/**/*.erb`, ['sass']);
    gulp.watch(`${config.section_dir}/**/*.erb`, ['sass']);
    gulp.watch([`${config.js_dir.modules}/**/*.js`, config.js.modules.entry], ['js-modules']);
    gulp.watch([`${config.js_dir.packages}/**/*.js`, config.js.packages.entry], ['rollup-packages']);
});

gulp.task('default', ['sass', 'rollup-packages', 'js-modules', 'watch']);
