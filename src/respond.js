/*
 Default sizes based on bootstrap
 */
( function( $, document, window, undefined ) {
	$.respond = function ( options ) {
		var Respond = this;
		Respond.options = $.extend( true, {}, $.respond.options, options ),
			Respond.cache = {},
			Respond.functions = {
				callOnFunction: function ( type, fn, fnOptions ) {
					return Respond.options.functions.on[ type ][ fn ] ( fnOptions || {} ) || false;
				},
				handle: {
					cacheReInit: function () {
						Respond.cache = $.extend( {},
						                          Respond.cache,
						                          {
							                          $window: $( window ),
							                          $body: $( 'body' ),
							                          document: document,
							                          window: window
						                          }
						);
					},
					sizes: function () {
						for ( var size in Respond.options.variables.sizes ){
							Respond.options.variables.key = size;
							Respond.options.switches.is[ Respond.options.variables.key ] = false;
							Respond.options.switches.was[ Respond.options.variables.key ] = false;
						}
					},
					viewport: function () {
						var e = Respond.cache.window, a = 'inner';
						if (!(a+'Width' in Respond.cache.window )) {
							a = 'client';
							e = Respond.cache.document.documentElement || Respond.cache.document.body;
						}
						Respond.options.variables.viewport.height = e [ a + 'Height' ];
						Respond.options.variables.viewport.width = e [ a + 'Width' ];
					}
				},
				respond: function () {
					Respond.functions.handle.viewport();
					for ( var size in Respond.options.variables.sizes ){
						Respond.options.variables.key = size;
						Respond.options.switches.is[ Respond.options.variables.key ] = ( Respond.options.variables.sizes[ Respond.options.variables.key ].min === null || Respond.options.variables.viewport.width >= Respond.options.variables.sizes[ Respond.options.variables.key ].min ) && ( Respond.options.variables.sizes[ Respond.options.variables.key ].max === null || Respond.options.variables.viewport.width <= Respond.options.variables.sizes[ Respond.options.variables.key ].max );
						if ( Respond.options.variables.is !== '' ) { Respond.options.variables.was = Respond.options.variables.is; }
						if ( Respond.options.switches.is[ Respond.options.variables.key ] ) {
							if ( size != Respond.options.variables.was && Respond.options.variables.was !== '' ) {
								Respond.cache.$body.removeClass(Respond.options.variables.was);
								Respond.functions.callOnFunction( 'was', Respond.options.variables.was );
							}
							Respond.options.variables.is = size;
							if ( Respond.options.variables.is != Respond.options.variables.was ) {
								Respond.cache.$body.addClass(Respond.options.variables.is);
								Respond.functions.callOnFunction( 'is', Respond.options.variables.is );
							}
						}
					}
				},
				timeoutRespond: function () {
					clearTimeout( Respond.options.variables.timer );
					return Respond.options.variables.timer = setTimeout(
						Respond.functions.respond,
						Respond.options.variables.timeout
					);
				}
			},
			Respond.objectLength = function( obj ) {
				var intLength = 0;
				if( typeof obj === "object" ) {
					for( var key in obj ) {
						if( ( Object.prototype.hasOwnProperty.call( obj, key ) ) || obj.hasOwnProperty( key ) ) {
							intLength++;
						}
					}
				}
				return intLength;
			};
		
		Respond.functions.handle.cacheReInit();
		if ( Respond.objectLength( Respond.options.switches.is ) === 0 ) { Respond.functions.handle.sizes(); }
		Respond.functions.respond();
		Respond.cache.$window.on(
			'resize orientationchange',
			Respond.functions.timeoutRespond
		);
		if (Respond.cache.$window.addEventListener !== undefined) {
			Respond.cache.$window.addEventListener("orientationchange", function() {
				Respond.functions.respond();
				Respond.cache.$body.hide().show(0);
			}, false);
		}
		Respond.options.switches.loaded = true;
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
} )( jQuery, document, window );
