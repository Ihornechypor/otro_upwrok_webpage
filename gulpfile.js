const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync"); // dev server with port

const { scss, purgeCss } = require("./gulp-tasks/scss");
const scripts = require("./gulp-tasks/scripts");
const html = require("./gulp-tasks/html");
const {
  respImages,
  svgRelocate,
  avifRelocate,
  webpRelocate
} = require("./gulp-tasks/images");
const { videoRelocate } = require("./gulp-tasks/video");
const { faviconTask } = require("./gulp-tasks/copy");

const localhost = () => {
  browserSync.init({
    server: {
      baseDir: "dist/"
    },
    port: 3000
  });
};

const watchTasks = () => {
  browserSync.init({
    server: {
      baseDir: `./dist/`
    },
    port: 3000
  });

  watch(["src/js/**/*"], scripts);
  watch(["src/scss/**/*"], scss);
  watch(["src/html/**/*.html"], html);
  watch(["src/images/**/*.{png,jpg}"], respImages);
  watch(["src/images/**/*.svg"], svgRelocate);
  watch(["src/video/**/*"], videoRelocate);
};

// gulp serve - run development with localhost server
exports.serve = series(
  html,
  scss,
  scripts,
  faviconTask,
  respImages,
  svgRelocate,
  avifRelocate,
  webpRelocate,
  watchTasks,
  videoRelocate
);

// gulp build - run production build with critical css & image optymize
exports.build = series(
  parallel(
    html,
    scss,
    purgeCss,
    scripts,
    faviconTask,
    respImages,
    svgRelocate,
    avifRelocate,
    webpRelocate,
    videoRelocate
  )
);
