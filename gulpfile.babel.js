import babel from "gulp-babel";
import browserSync from "browser-sync";
import concat from "gulp-concat";
import del from "del";
import gulp from "gulp";
import uglify from "gulp-uglify";
import sass from "gulp-sass";

// create browserSync server, so I don't have to reload the page all the time
const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./",
    },
  });
  done();
}

// create paths for scripts
const paths = {
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/scripts/",
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css/",
  },
  html: {
    src: "/*.html",
    dest: "/",
  },
};

// clean dist function
const clean = () => del(["dist"]);

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(concat("index.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
}

// watch the server and reload scripts on change
const watch = () => {
  gulp.watch("*.html", gulp.series(reload));
  gulp.watch(paths.styles.src, gulp.series(styles));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
};

const dev = gulp.series(clean, scripts, styles, serve, watch);
export default dev;
