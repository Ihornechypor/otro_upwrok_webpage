const { src, dest } = require("gulp");

const videoRelocate = (done) => {
  src("src/video/**/*", { allowEmpty: true }).pipe(dest("dist/video"));
  done();
};

module.exports = {
  videoRelocate
};
