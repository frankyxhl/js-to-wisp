module.exports = function(grunt) {

		grunt.loadNpmTasks('grunt-wisp-compile');
		grunt.initConfig({

				pkg: grunt.file.readJSON('package.json'),

				wisp: {
						noOptions: {
								files: {
										'target/js-to-wisp.js': ['src/js-to-wisp.wisp']
								}
						}
				},


				watch:{
						configFiles: {
								files: [ 'Gruntfile.js', 'config/*.js' ],
								options: {
										reload: true
								}
						},
						wisp:{
								files:["src/*.wisp"],
								tasks:"wisp"
						}
				},

				concat: {
						options: {
								separator: ';'
						},
						dist: {
								src: ['src/**/*.js'],
								dest: 'dist/<%= pkg.name %>.js'
						}
				},
				uglify: {
						options: {
								banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
						},
						dist: {
								files: {
										'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
								}
						}
				},
				qunit: {
						files: ['test/**/*.html']
				},
				jshint: {
						files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
						options: {
								// options here to override JSHint defaults
								globals: {
										jQuery: true,
										console: true,
										module: true,
										document: true
								}
						}
				}
		});

		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');

		grunt.registerTask('default', ["watch"]);

};