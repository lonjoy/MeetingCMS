seajs.config({
  // Enable plugins
  plugins: ['shim'],

  // Configure alias
  alias: {
    'jquery': {
      src: 'lib/jquery-1.9.1.min.js',
      exports: 'jQuery'
    },
    'jquery.tmpl': {
    	src: 'lib/jquery.tmpl.min.js',
    	deps: ['jquery']
    },
    'underscrore': {
      src: 'lib/underscore.js',
      exports: '_'
    },
    'backbone': {
      src: 'lib/backbone.js',
      exports: 'Backbone',
      deps: ['underscrore']
    },
    'socket.io': {
      src: 'lib/socket.io.min.js',
      exports: 'io'
    }
  }
});