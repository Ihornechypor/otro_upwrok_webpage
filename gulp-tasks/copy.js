const {src, dest} = require("gulp");

const fontsTask = () => {
	return src('src/fonts/**/*.*')
		.pipe(dest('dist/fonts'));
};

const faviconTask = () => {
	return src('src/favicon/**/*.*')
		.pipe(dest('dist/favicon'));
};

const copyFilesPWA = () => {
	return src(['src/*.*', 'src/.htaccess'])
		.pipe(dest('dist/'));
};

const copyFiles = () => {
	return src('src/.htaccess')
		.pipe(dest('dist'));
};

module.exports = {
	fontsTask,
	faviconTask,
	copyFiles,
	copyFilesPWA
}