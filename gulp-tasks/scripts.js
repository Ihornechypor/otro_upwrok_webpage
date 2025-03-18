const {src, dest} = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const rollup = require("gulp-better-rollup");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const uglify = require("gulp-uglify");
// const javascriptObfuscator = require('gulp-javascript-obfuscator'); // obfuscator

const scripts = () => {
	return src('src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(rollup({
			plugins: [
				nodeResolve(),
				commonjs()
			]
		}, 'umd'))
		.pipe(uglify())
		// .pipe(javascriptObfuscator())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist/js'));
};

module.exports = scripts;