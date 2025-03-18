const { src, dest } = require("gulp");
const sharpResponsive = require("gulp-sharp-responsive");

const distFolder = "dist";
const srcFolder = "src";

const webpOptions = {
  quality: 70
};
const jpegOptions = {
  quality: 70,
  progressive: true
};
const pngOptions = {
  quality: 70
};

const avifOptions = {
  quality: 60
};

const convertToInt = (width, ratio) =>
  Math.trunc(width * ratio) ? Math.trunc(width * ratio) : 1;

const config = {
  dist: distFolder,
  src: srcFolder,
  srcFiles: "src/**/*.{jpg,png}",
  distDel: `${distFolder}/**/*`,
  imgArray: [
    {
      width: (metadata) => convertToInt(metadata.width, 1),
      format: "webp",
      webpOptions: webpOptions
    },
    {
      width: (metadata) => convertToInt(metadata.width, 1),
      pngOptions: pngOptions,
      jpegOptions: jpegOptions
    }
  ]
};

const respImages = (done) => {
  src("src/images/**/*.{jpg,png}", { allowEmpty: true })
    .pipe(sharpResponsive({ formats: config.imgArray }))
    .pipe(dest("dist/images"));
  done();
};

const svgRelocate = (done) => {
  src("src/images/**/*.svg", { allowEmpty: true }).pipe(dest("dist/images"));
  done();
};

const avifRelocate = (done) => {
  src("src/images/**/*.avif", { allowEmpty: true }).pipe(dest("dist/images"));
  done();
};
const webpRelocate = (done) => {
  src("src/images/**/*.webp", { allowEmpty: true }).pipe(dest("dist/images"));
  done();
};

module.exports = {
  respImages,
  svgRelocate,
  avifRelocate,
  webpRelocate
};
