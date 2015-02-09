module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            client: {
                src: [
                    'src/js/**/*.js',
                    '!src/libs/**/*.js',
                ],
                options: {
                    globals: {
                        jQuery: true,
                        console:true,
                        module: true,
                        strict: false,
                    }
                }
            }
        },
        concat: {
            client: {
                options: {
                    separator: '\n'
                },
                files: {
                    'dist/js/gui-2d-components.js': ['src/js/*.js'],
                    'dist/css/gui-2d-components.css': ['src/css/*.css']
                }
            }
        },
        
    	copy: {
    		client: {
    			files: [
    				{
    					expand: true,
    				    cwd: 'bower_components/jquery/dist',	
    					src: ['jquery.min.js'], 
    					dest: 'dist/js'
    				},
    				{
    					expand: true,
    					cwd: 'bower_components/angular',
    					src: ['angular.min.js'],
    					dest: 'dist/js'	
    				},
                    {
                        expand: true,
                        cwd: 'src/js/templates',
                        src: ['*.html'],
                        dest: 'dist/js/templates'
                    }
    			]
    		}
	},
        uglify: {
            client: {
                files: {
                    'dist/js/gui-2d-components.min.js': 'dist/js/gui-2d-components.js'
                }
            }

        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/js/**/*.js', 'src/css/*.css', 'src/js/**/*.html'],
                tasks: ['client'],
                options: {
                spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('client', ['jshint:client', 'concat:client', 'copy:client', 'uglify:client']);
    grunt.registerTask('test', ['karma']);

}
