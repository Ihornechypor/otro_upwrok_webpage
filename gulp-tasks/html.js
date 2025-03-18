const { src, dest } = require("gulp");
const fileinclude = require("gulp-file-include");
const minifyHTML = require("gulp-minify-html");
const browserSync = require("browser-sync");

const html = (done) => {
  src("src/html/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "src/html/partials/"
      })
    )
    // .pipe(minifyHTML({ empty: true }))
    .pipe(dest("dist/"));
  browserSync.reload();
  done();
};

module.exports = html;
