var browserSync = require("browser-sync"),
    path = require('path');

module.exports = function (grunt) {

    require('load-grunt-config')(grunt, {

        init: true,

        loadGruntTasks: {
            pattern: ['grunt-*', '@*/grunt-*'],
            config: require('package.json'),
            scope: 'dependencies'
        }
    });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                expand: true,
                cwd: '',
                src: ['*.html'],
                dest: 'min/html'
            }
        },
        phpmin: {
            options: {
                singleline: true,
                multiline: true,
                tabs: true,
                newline: true
            },
            files: {
                expand: true,
                cwd: '',
                src: ['*.php'],
                dest: 'min/php'
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [{ removeViewBox: false }]
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,jpeg}'],
                    dest: 'src/images/min/'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: 'last 2 versions'
            }
        }

    });

    grunt.registerTask('default', 'Default task');

    grunt.registerTask('checking', 'Checking DB by Can I Use', ['autoprefixer']);
    grunt.registerTask('minify', 'Minifies all file formats', ['imagemin', 'htmlmin', 'phpmin']);

    grunt.registerTask("bs-init", function () {
        var done = this.async();
        browserSync({
            open: "ui",
            logLevel: 'debug',
            timestamps: false,
            server: {
                baseDir: "/"
            }
        }, function (err, bs) {
            done();
        });
    });

    grunt.registerTask("bs-inject", function () {
        browserSync.reload([
            '*.html',
            '*.php'
        ]);
    });

    grunt.registerTask('bs-complete', 'BrowserSync start and reload', ['bs-init', 'bs-inject']);

}