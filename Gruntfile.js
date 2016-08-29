module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    html2js: {
      options: {
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['src/templates/*.html'],
        dest: 'src/temp/templates.js'
      }
    },
    concat: {
      options: {
        separartor: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'public/app.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      compress: {
        files: {
          'public/app.min.js': 'public/app.js',
        }
      }
    },
    copy: {
      main: {
        expand: false,
        src: 'src/index.html',
        dest: 'public/index.html'
      }
    },
    clean: ['./src/temp', './public/app.js'],
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.html'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['html2js', 'concat', 'uglify', 'copy', 'clean']);
};
