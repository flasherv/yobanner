module.exports = function(grunt) {

    // Project configuration.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replacer');

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.loadNpmTasks('grunt-string-replace');




    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["app/styles"],
                    rootpath:"/images"

                },
                files: {
                    "app/styles/main.css": "app/styles/less/main.less"
                }
            },
            production: {
                options: {
                    paths: ["app/styles"],
                    cleancss: true
                },
                files: {
                    "tmp/styles/main.css": "app/styles/less/main.less"
                }
            }
        },
        watch: {
            // files: "app/styles/less/*.less",
            files: "app/styles/less/**/*.less",
            tasks: ["lessc"],
            options: {
                event: ['all']
            }
        },

        imagemin: {
            // Task
            dynamic: {
                options: { // Target options
                    optimizationLevel: 3,
                    progressive:true,
                    interlaced:true,
                    pngquant:true
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'app/images', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'tmp/images1/' // Destination path prefix
                }]
            }
        },
        copy: {
            images: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, flatten: true, src: ['tmp/images1/**'], dest: 'build/images/', filter: 'isFile'}
                ]
            },
            indextemplate: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, flatten: true, src: ['tmp/index.html'], dest: 'build/', filter: 'isFile'}
                ]
            }
        },
        replacer: {
            index: {
                options : {
                    replace: {
                        '<link rel="stylesheet" type="text/css" href="styles/main.css"/>' : function(content) {

                            return '<style type="text/css">'+grunt.file.read("app/styles/main.css")+'</style>';
                        },
                        '<script src="scripts/prefixfree.min.js"></script>':'<script>'+grunt.file.read("app/scripts/prefixfree.min.js")+'</script>',
                        '<script src="scripts/repeater.js"></script>':'<script>'+grunt.file.read("app/scripts/repeater.js")+'</script>'
                    }
                },
                files : [
                    {src: ['build/index.html'], dest: 'build/index.html'}
                ]
            },
            framereplace: {
                options : {
                    replace: {
                        "/^frame/$" : "f1"
                    }
                },
                files : [
                    {src: ['build/index.html'], dest: 'build/index.html'}
                ]
            }

        },



        cssmin: {
            minify: {
                expand: true,
                cwd: 'app/styles/',
                src: ['*.css', '!*.min.css'],
                dest: 'app/styles/',
                ext: '.css'
            }
        },


        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: { // Dictionary of files
                    'build/index.html': 'build/index.html' // 'destination': 'source'
                }
            }/*,
            dev: { // Another target
                files: {
                    'app/index.html': 'app/index.html'
                }
            }*/
        },


        "string-replace": {
           // dist: {

            kit:{
                    options: {
                        replacements: [{
                            pattern: 'frame',
                            replacement: "f1"
                         }]
                    },
                    files: {'build/index.html':'build/index.html'}

                }

            }
     //   }






    });
    grunt.registerTask('build', ['less','cssmin','imagemin','copyimg','replace','minifyhtml']);



    grunt.registerTask('minifycss', ['cssmin']);
    grunt.registerTask('minifyhtml', ['htmlmin']);


   // grunt.registerTask('lessc', ['less','cssmin','imagemin','copyimg','replace','minifyhtml']);
    grunt.registerTask('lessc', ['less']);



    grunt.registerTask('copyimg', ['copy:images']);
    grunt.registerTask('imgoptimize', ['imagemin']);
    grunt.registerTask('watcher', ['watch']);
    grunt.registerTask('addprefix', ['copy:indextemplate','replacer']);
    grunt.registerTask('replace', ['copy:indextemplate','replacer:index']);
    grunt.registerTask('default',function () {
        grunt.task.run(['watcher']);
    });
};