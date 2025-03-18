const { src, dest } = require("gulp");

const htaccess = () => {
  return src("src/.htaccess").pipe(dest("dist"));
};

module.exports = htaccess;
