const gulp = require("gulp"),
	appRoot = require("app-root-path"),
	sass = require("gulp-sass"),
	path = require("path"),
	utilities = require(appRoot + "/Tools/Utilities-Functions/utilities-functions.js"),
	fs = require("fs"),
	through = require("through2"),
	uncss = require("uncss");

gulp.task("sass", () => {
	return (
		gulp
			.src("./Pages/**/*.scss")
			// Compile .scss into .css
			.pipe(sass())
			// Remove unused CSS
			.pipe(
				through.obj(function(file, encoding, callback) {
					try {
						const cssFileContent = file.contents.toString(); // Get the css file contents
						let transformedFile = file.clone(), // Clone new  file for manipulation
							fileName = path.basename(file.path),
							htmlFilePath;

						// This is a simple function that returns the file name without extension (homepage.css >> homepage)
						fileName = utilities.getFileNameWithoutExtension(fileName);

						// File path for the .html file
						htmlFilePath = "/fullPath/Pages/" + fileName + "/compiled/html/" + fileName + ".html";

						// Check if there is any css to be checked and if .html file exists
						if (cssFileContent.length && fs.existsSync(htmlFilePath)) {
							// Call uncss to remove unused css
							uncss([htmlFilePath], { raw: cssFileContent }, function(error, output) {
								if (error) {
									callback(null, transformedFile);
								}

								// Set new contents with the "used" css only (uncss' output)
								transformedFile.contents = Buffer.from(output);

								callback(null, transformedFile);
							});
						} else {
							callback(null, transformedFile);
						}
					} catch (e) {
						console.log("Gulp error - uncss: " + e.message);
						callback(null, transformedFile);
					}
				})
			)
			// Set the destination folder (main css)
			.pipe(gulp.dest("./dist/css"))
	);
});