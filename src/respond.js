/*
 Default sizes based on bootstrap
 */
( function( $, document, window ) {
	$.respond = function ( options ) {
		var _self = $.respond;
		_self.functions.handle.cacheReInit();
		if ( typeof options != "undefined" ) {_self.options = $.extend( true, _self.options, options );}
		if ( _self.options.switches.is.length === 0 ) {_self.functions.handle.sizes();}
		_self.functions.respond();
		_self.cache.$window.on(
			'resize orientationchange',
			_self.functions.timeoutRespond
		);
		if (typeof _self.cache.$window.addEventListener !== "undefined") {
			_self.cache.$window.addEventListener("orientationchange", function() {
				_self.functions.respond();
				_self.cache.$body.hide().show(0);
			}, false);
		}
		_self.options.switches.loaded = true;
	};
	$.respond.options = {
		variables: {
			key: '',
			is: '',
			sizes: {
				xs: {
					min: null,
					max: 767
				},
				sm: {
					min: 768,
					max: 991
				},
				md: {
					min: 992,
					max: 1199
				},
				lg: {
					min: 1200,
					max: null
				}
			},
			timer: 0,
			timeout: 250,
			viewport: {
				height: 0,
				width: 0
			},
			was: ''
		},
		switches: {
			debug: false,
			is: {},
			loaded: false,
			was: {}
		},
		functions: {
			on: {
				is: {},
				was: {}
			}
		}
	};
	$.respond.cache = {};
	$.respond.functions = {
		callOnFunction: function ( type, fn, fnOptions ) {
			fnOptions = typeof fnOptions != "undefined" ? fnOptions : {};
			return $.respond.options.functions.on[ type ][ fn ] ( fnOptions ) || false;
		},
		handle: {
			cacheReInit: function () {
				$.respond.cache = $.extend(
					$.respond.cache,
					{
						$window: $( window ),
						$body: $( 'body' ),
						document: document,
						window: window
					}
				);
			},
			sizes: function () {
				for ( var size in $.respond.options.variables.sizes ){
					$.respond.options.variables.key = size;
					$.respond.options.switches.is[ $.respond.options.variables.key ] = false;
					$.respond.options.switches.was[ $.respond.options.variables.key ] = false;
				}
			},
			viewport: function () {
				var e = $.respond.cache.window, a = 'inner';
				if (!(a+'Width' in $.respond.cache.window )) {
					a = 'client';
					e = $.respond.cache.document.documentElement || $.respond.cache.document.body;
				}
				$.respond.options.variables.viewport.height = e [ a + 'Height' ];
				$.respond.options.variables.viewport.width = e [ a + 'Width' ];
			}
		},
		respond: function () {
			$.respond.functions.handle.viewport();
			for ( var size in $.respond.options.variables.sizes ){
				$.respond.options.variables.key = size;
				$.respond.options.switches.is[ $.respond.options.variables.key ] = ( $.respond.options.variables.sizes[ $.respond.options.variables.key ].min === null || $.respond.options.variables.viewport.width >= $.respond.options.variables.sizes[ $.respond.options.variables.key ].min ) && ( $.respond.options.variables.sizes[ $.respond.options.variables.key ].max === null || $.respond.options.variables.viewport.width <= $.respond.options.variables.sizes[ $.respond.options.variables.key ].max );
				if ( $.respond.options.variables.is != '' ) {$.respond.options.variables.was = $.respond.options.variables.is;}
				if ( $.respond.options.switches.is[ $.respond.options.variables.key ] ) {
					if ( size != $.respond.options.variables.was && $.respond.options.variables.was != '' ) {
						$.respond.cache.$body.removeClass($.respond.options.variables.was);
						$.respond.functions.callOnFunction( 'was', $.respond.options.variables.was );
					}
					$.respond.options.variables.is = size;
					if ( $.respond.options.variables.is != $.respond.options.variables.was ) {
						$.respond.cache.$body.addClass($.respond.options.variables.is);
						$.respond.functions.callOnFunction( 'is', $.respond.options.variables.is );
					}
				}
			}
		},
		timeoutRespond: function () {
			clearTimeout( $.respond.options.variables.timer );
			return $.respond.options.variables.timer = setTimeout(
				$.respond.functions.respond,
				$.respond.options.variables.timeout
			);
		}
	};
} ( jQuery, document, window ) );
