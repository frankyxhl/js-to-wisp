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


				execute: {
						simple_target: {
								// execute javascript files in a node child_process

								options: {
										// like call but executed before/after looping the files
										before: function(grunt, options){
												console.log('Begin to test');
										},
										after: function(grunt, options){
												console.log('Bye!');
										}
								},
								// can also be used outside the options
								before: function(grunt, options){
										console.log('Hello!');
								},
								src: ['target/*.js']
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
								tasks:["wisp","execute"]
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
		grunt.loadNpmTasks('grunt-execute');

		grunt.registerTask('run-js-to-wisp', 'run file after save', function(a, b) {
				grunt.log.writeln(this.name, a, b);
				
		});

		grunt.registerTask('default', ["watch"]);

};