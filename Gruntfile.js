'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		config: grunt.file.readJSON('config.json'),
		autoprefixer: {
			options: {
				browsers: ['last 10 version']
			},
			css: {
				files: [
					{
						expand: true,
						src: 'examples/**/*.css'
					}
				]
			}
		},
		connect: {
			options: {
				port: '<%= config.port %>',
				livereload: '<%= config.livereload %>',
				hostname: '<%= config.hostname %>'
			},
			server: {
				options: {
					open: true
				}
			}
		},
		grunticon: {
			iconify: {
				files: [
					{
						expand: true,
						cwd: 'examples/grunt-grunticon/src',
						src: ['*.svg', '*.png'],
						dest: "examples/grunt-grunticon/images"
					}
				]
			}
		},
		imageEmbed: {
			dist: {
				src: [ "examples/grunt-image-embed/_sprites.css" ],
				dest: "examples/grunt-image-embed/sprites.css"
			}
		},
		less: {
			compile: {
				files: [
					{
						expand: true,
						src: 'examples/**/*.less',
						ext: '.css'
					}
				]
			}
		},
		responsive_images: {
			responsify: {
				options: {
					sizes: [
						{
							name: 'small',
							width: 320
						},
						{
							name: 'medium',
							width: 640
						},
						{
							name: "large",
							width: 960
						}
					]
				},
				files: [
					{
						expand: true,
						cwd: 'examples/grunt-responsive-images/src',
						src: '*.{jpg,gif,png}',
						dest: 'examples/grunt-responsive-images/images'
					}
				]
			}
		},
		sprite: {
			all: {
				src: 'examples/grunt-spritesmith/src/*.png',
				destImg: 'examples/grunt-spritesmith/images/sprites.png',
				destCSS: 'examples/grunt-spritesmith/sprites.css'
			}
		},
		watch: {
			less: {
				files: ['examples/**/*.less'],
				tasks: ['newer:less:compile', 'newer:autoprefixer:css']
			},
			livereload: {
				options: {
					livereload: '<%= config.livereload %>'
				},
				files: [
					'index.html',
					'examples/**/*.{html,css}'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', [
		'less',
		'connect',
		'watch'
	]);

	grunt.registerTask('run-grunticon', [], function () {
	    grunt.loadNpmTasks('grunt-grunticon');
	    grunt.task.run('grunticon');
	});

	grunt.registerTask('run-responsive_images', [], function () {
	    grunt.loadNpmTasks('grunt-responsive-images');
	    grunt.task.run('responsive_images');
	});

	grunt.registerTask('run-grunt-spritesmith', [], function () {
	    grunt.loadNpmTasks('grunt-spritesmith');
	    grunt.task.run('sprite');
	});

	grunt.registerTask('run-grunt-image-embed', [], function () {
	    grunt.loadNpmTasks('grunt-image-embed');
	    grunt.task.run('imageEmbed');
	});

	grunt.registerTask('all', [
		'run-responsive_images',
		'run-grunticon',
		'run-grunt-image-embed',
		'run-grunt-spritesmith',
		'default'
	]);
};