const {src, dest} = require("gulp");

const documents = () => {
	return src('src/documents/**/*.*')
		.pipe(dest('dist/documents'));
};

module.exports = documents;
