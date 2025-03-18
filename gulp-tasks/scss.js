const { src, dest } = require("gulp");
const { path, cssMapping } = require("../config");

const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync"); // dev server with port
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer"); // browser prefixes
const purgecss = require("@fullhuman/postcss-purgecss"); // remove unused
const cssnano = require("cssnano"); // css compression
const postcss = require("gulp-postcss");
const through = require("through2");
const plumber = require("gulp-plumber");

const scss = (done) => {
  src(path.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ["./node_modules"] }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"));
  browserSync.reload();
  done();
};

const purgeCss = (done) => {
  src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules"]
      })
    )
    .pipe(
      postcss([
        autoprefixer(),
        cssnano({
          discardComments: { removeAll: true }
        }),
        purgecss({
          content: ["src/**/*.html", "src/**/*.js"],
          keyframes: true
        })
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"));
  done();
};

module.exports = {
  scss,
  purgeCss
};
