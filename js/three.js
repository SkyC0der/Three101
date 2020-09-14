(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = {}));
}(this, (function (exports) { 'use strict';

	// Polyfills

	if ( Number.EPSILON === undefined ) {

		Number.EPSILON = Math.pow( 2, - 52 );

	}

	if ( Number.isInteger === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

		Number.isInteger = function ( value ) {

			return typeof value === 'number' && isFinite( value ) && Math.floor( value ) === value;

		};

	}

	//

	if ( Math.sign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

		Math.sign = function ( x ) {

			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

		};

	}

	if ( 'name' in Function.prototype === false ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

		Object.defineProperty( Function.prototype, 'name', {

			get: function () {

				return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];

			}

		} );

	}

	if ( Object.assign === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

		Object.assign = function ( target ) {

			if ( target === undefined || target === null ) {

				throw new TypeError( 'Cannot convert undefined or null to object' );

			}

			var output = Object( target );

			for ( var index = 1; index < arguments.length; index ++ ) {

				var source = arguments[ index ];

				if ( source !== undefined && source !== null ) {

					for ( var nextKey in source ) {

						if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

							output[ nextKey ] = source[ nextKey ];

						}

					}

				}

			}

			return output;

		};

	}

	var REVISION = '120';
	var MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
	var TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
	var CullFaceNone = 0;
	var CullFaceBack = 1;
	var CullFaceFront = 2;
	var CullFaceFrontBack = 3;
	var BasicShadowMap = 0;
	var PCFShadowMap = 1;
	var PCFSoftShadowMap = 2;
	var VSMShadowMap = 3;
	var FrontSide = 0;
	var BackSide = 1;
	var DoubleSide = 2;
	var FlatShading = 1;
	var SmoothShading = 2;
	var NoBlending = 0;
	var NormalBlending = 1;
	var AdditiveBlending = 2;
	var SubtractiveBlending = 3;
	var MultiplyBlending = 4;
	var CustomBlending = 5;
	var AddEquation = 100;
	var SubtractEquation = 101;
	var ReverseSubtractEquation = 102;
	var MinEquation = 103;
	var MaxEquation = 104;
	var ZeroFactor = 200;
	var OneFactor = 201;
	var SrcColorFactor = 202;
	var OneMinusSrcColorFactor = 203;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var DstAlphaFactor = 206;
	var OneMinusDstAlphaFactor = 207;
	var DstColorFactor = 208;
	var OneMinusDstColorFactor = 209;
	var SrcAlphaSaturateFactor = 210;
	var NeverDepth = 0;
	var AlwaysDepth = 1;
	var LessDepth = 2;
	var LessEqualDepth = 3;
	var EqualDepth = 4;
	var GreaterEqualDepth = 5;
	var GreaterDepth = 6;
	var NotEqualDepth = 7;
	var MultiplyOperation = 0;
	var MixOperation = 1;
	var AddOperation = 2;
	var NoToneMapping = 0;
	var LinearToneMapping = 1;
	var ReinhardToneMapping = 2;
	var CineonToneMapping = 3;
	var ACESFilmicToneMapping = 4;
	var CustomToneMapping = 5;

	var UVMapping = 300;
	var CubeReflectionMapping = 301;
	var CubeRefractionMapping = 302;
	var EquirectangularReflectionMapping = 303;
	var EquirectangularRefractionMapping = 304;
	var CubeUVReflectionMapping = 306;
	var CubeUVRefractionMapping = 307;
	var RepeatWrapping = 1000;
	var ClampToEdgeWrapping = 1001;
	var MirroredRepeatWrapping = 1002;
	var NearestFilter = 1003;
	var NearestMipmapNearestFilter = 1004;
	var NearestMipMapNearestFilter = 1004;
	var NearestMipmapLinearFilter = 1005;
	var NearestMipMapLinearFilter = 1005;
	var LinearFilter = 1006;
	var LinearMipmapNearestFilter = 1007;
	var LinearMipMapNearestFilter = 1007;
	var LinearMipmapLinearFilter = 1008;
	var LinearMipMapLinearFilter = 1008;
	var UnsignedByteType = 1009;
	var ByteType = 1010;
	var ShortType = 1011;
	var UnsignedShortType = 1012;
	var IntType = 1013;
	var UnsignedIntType = 1014;
	var FloatType = 1015;
	var HalfFloatType = 1016;
	var UnsignedShort4444Type = 1017;
	var UnsignedShort5551Type = 1018;
	var UnsignedShort565Type = 1019;
	var UnsignedInt248Type = 1020;
	var AlphaFormat = 1021;
	var RGBFormat = 1022;
	var RGBAFormat = 1023;
	var LuminanceFormat = 1024;
	var LuminanceAlphaFormat = 1025;
	var RGBEFormat = RGBAFormat;
	var DepthFormat = 1026;
	var DepthStencilFormat = 1027;
	var RedFormat = 1028;
	var RedIntegerFormat = 1029;
	var RGFormat = 1030;
	var RGIntegerFormat = 1031;
	var RGBIntegerFormat = 1032;
	var RGBAIntegerFormat = 1033;

	var RGB_S3TC_DXT1_Format = 33776;
	var RGBA_S3TC_DXT1_Format = 33777;
	var RGBA_S3TC_DXT3_Format = 33778;
	var RGBA_S3TC_DXT5_Format = 33779;
	var RGB_PVRTC_4BPPV1_Format = 35840;
	var RGB_PVRTC_2BPPV1_Format = 35841;
	var RGBA_PVRTC_4BPPV1_Format = 35842;
	var RGBA_PVRTC_2BPPV1_Format = 35843;
	var RGB_ETC1_Format = 36196;
	var RGB_ETC2_Format = 37492;
	var RGBA_ETC2_EAC_Format = 37496;
	var RGBA_ASTC_4x4_Format = 37808;
	var RGBA_ASTC_5x4_Format = 37809;
	var RGBA_ASTC_5x5_Format = 37810;
	var RGBA_ASTC_6x5_Format = 37811;
	var RGBA_ASTC_6x6_Format = 37812;
	var RGBA_ASTC_8x5_Format = 37813;
	var RGBA_ASTC_8x6_Format = 37814;
	var RGBA_ASTC_8x8_Format = 37815;
	var RGBA_ASTC_10x5_Format = 37816;
	var RGBA_ASTC_10x6_Format = 37817;
	var RGBA_ASTC_10x8_Format = 37818;
	var RGBA_ASTC_10x10_Format = 37819;
	var RGBA_ASTC_12x10_Format = 37820;
	var RGBA_ASTC_12x12_Format = 37821;
	var RGBA_BPTC_Format = 36492;
	var SRGB8_ALPHA8_ASTC_4x4_Format = 37840;
	var SRGB8_ALPHA8_ASTC_5x4_Format = 37841;
	var SRGB8_ALPHA8_ASTC_5x5_Format = 37842;
	var SRGB8_ALPHA8_ASTC_6x5_Format = 37843;
	var SRGB8_ALPHA8_ASTC_6x6_Format = 37844;
	var SRGB8_ALPHA8_ASTC_8x5_Format = 37845;
	var SRGB8_ALPHA8_ASTC_8x6_Format = 37846;
	var SRGB8_ALPHA8_ASTC_8x8_Format = 37847;
	var SRGB8_ALPHA8_ASTC_10x5_Format = 37848;
	var SRGB8_ALPHA8_ASTC_10x6_Format = 37849;
	var SRGB8_ALPHA8_ASTC_10x8_Format = 37850;
	var SRGB8_ALPHA8_ASTC_10x10_Format = 37851;
	var SRGB8_ALPHA8_ASTC_12x10_Format = 37852;
	var SRGB8_ALPHA8_ASTC_12x12_Format = 37853;
	var LoopOnce = 2200;
	var LoopRepeat = 2201;
	var LoopPingPong = 2202;
	var InterpolateDiscrete = 2300;
	var InterpolateLinear = 2301;
	var InterpolateSmooth = 2302;
	var ZeroCurvatureEnding = 2400;
	var ZeroSlopeEnding = 2401;
	var WrapAroundEnding = 2402;
	var NormalAnimationBlendMode = 2500;
	var AdditiveAnimationBlendMode = 2501;
	var TrianglesDrawMode = 0;
	var TriangleStripDrawMode = 1;
	var TriangleFanDrawMode = 2;
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var GammaEncoding = 3007;
	var RGBEEncoding = 3002;
	var LogLuvEncoding = 3003;
	var RGBM7Encoding = 3004;
	var RGBM16Encoding = 3005;
	var RGBDEncoding = 3006;
	var BasicDepthPacking = 3200;
	var RGBADepthPacking = 3201;
	var TangentSpaceNormalMap = 0;
	var ObjectSpaceNormalMap = 1;

	var ZeroStencilOp = 0;
	var KeepStencilOp = 7680;
	var ReplaceStencilOp = 7681;
	var IncrementStencilOp = 7682;
	var DecrementStencilOp = 7683;
	var IncrementWrapStencilOp = 34055;
	var DecrementWrapStencilOp = 34056;
	var InvertStencilOp = 5386;

	var NeverStencilFunc = 512;
	var LessStencilFunc = 513;
	var EqualStencilFunc = 514;
	var LessEqualStencilFunc = 515;
	var GreaterStencilFunc = 516;
	var NotEqualStencilFunc = 517;
	var GreaterEqualStencilFunc = 518;
	var AlwaysStencilFunc = 519;

	var StaticDrawUsage = 35044;
	var DynamicDrawUsage = 35048;
	var StreamDrawUsage = 35040;
	var StaticReadUsage = 35045;
	var DynamicReadUsage = 35049;
	var StreamReadUsage = 35041;
	var StaticCopyUsage = 35046;
	var DynamicCopyUsage = 35050;
	var StreamCopyUsage = 35042;

	var GLSL1 = "100";
	var GLSL3 = "300 es";

	/**
	 * https://github.com/mrdoob/eventdispatcher.js/
	 */

	function EventDispatcher() {}

	Object.assign( EventDispatcher.prototype, {

		addEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) { this._listeners = {}; }

			var listeners = this._listeners;

			if ( listeners[ type ] === undefined ) {

				listeners[ type ] = [];

			}

			if ( listeners[ type ].indexOf( listener ) === - 1 ) {

				listeners[ type ].push( listener );

			}

		},

		hasEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) { return false; }

			var listeners = this._listeners;

			return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

		},

		removeEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) { return; }

			var listeners = this._listeners;
			var listenerArray = listeners[ type ];

			if ( listenerArray !== undefined ) {

				var index = listenerArray.indexOf( listener );

				if ( index !== - 1 ) {

					listenerArray.splice( index, 1 );

				}

			}

		},

		dispatchEvent: function ( event ) {

			if ( this._listeners === undefined ) { return; }

			var listeners = this._listeners;
			var listenerArray = listeners[ event.type ];

			if ( listenerArray !== undefined ) {

				event.target = this;

				// Make a copy, in case listeners are removed while iterating.
				var array = listenerArray.slice( 0 );

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					array[ i ].call( this, event );

				}

			}

		}

	} );

	var _lut = [];

	for ( var i = 0; i < 256; i ++ ) {

		_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

	}

	var _seed = 1234567;

	var MathUtils = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var d0 = Math.random() * 0xffffffff | 0;
			var d1 = Math.random() * 0xffffffff | 0;
			var d2 = Math.random() * 0xffffffff | 0;
			var d3 = Math.random() * 0xffffffff | 0;
			var uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
				_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
				_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
				_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

			// .toUpperCase() here flattens concatenated strings to save heap memory space.
			return uuid.toUpperCase();

		},

		clamp: function ( value, min, max ) {

			return Math.max( min, Math.min( max, value ) );

		},

		// compute euclidian modulo of m % n
		// https://en.wikipedia.org/wiki/Modulo_operation

		euclideanModulo: function ( n, m ) {

			return ( ( n % m ) + m ) % m;

		},

		// Linear mapping from range <a1, a2> to range <b1, b2>

		mapLinear: function ( x, a1, a2, b1, b2 ) {

			return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

		},

		// https://en.wikipedia.org/wiki/Linear_interpolation

		lerp: function ( x, y, t ) {

			return ( 1 - t ) * x + t * y;

		},

		// http://en.wikipedia.org/wiki/Smoothstep

		smoothstep: function ( x, min, max ) {

			if ( x <= min ) { return 0; }
			if ( x >= max ) { return 1; }

			x = ( x - min ) / ( max - min );

			return x * x * ( 3 - 2 * x );

		},

		smootherstep: function ( x, min, max ) {

			if ( x <= min ) { return 0; }
			if ( x >= max ) { return 1; }

			x = ( x - min ) / ( max - min );

			return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

		},

		// Random integer from <low, high> interval

		randInt: function ( low, high ) {

			return low + Math.floor( Math.random() * ( high - low + 1 ) );

		},

		// Random float from <low, high> interval

		randFloat: function ( low, high ) {

			return low + Math.random() * ( high - low );

		},

		// Random float from <-range/2, range/2> interval

		randFloatSpread: function ( range ) {

			return range * ( 0.5 - Math.random() );

		},

		// Deterministic pseudo-random float in the interval [ 0, 1 ]

		seededRandom: function ( s ) {

			if ( s !== undefined ) { _seed = s % 2147483647; }

			// Park-Miller algorithm

			_seed = _seed * 16807 % 2147483647;

			return ( _seed - 1 ) / 2147483646;

		},

		degToRad: function ( degrees ) {

			return degrees * MathUtils.DEG2RAD;

		},

		radToDeg: function ( radians ) {

			return radians * MathUtils.RAD2DEG;

		},

		isPowerOfTwo: function ( value ) {

			return ( value & ( value - 1 ) ) === 0 && value !== 0;

		},

		ceilPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

		},

		floorPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

		},

		setQuaternionFromProperEuler: function ( q, a, b, c, order ) {

			// Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

			// rotations are applied to the axes in the order specified by 'order'
			// rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
			// angles are in radians

			var cos = Math.cos;
			var sin = Math.sin;

			var c2 = cos( b / 2 );
			var s2 = sin( b / 2 );

			var c13 = cos( ( a + c ) / 2 );
			var s13 = sin( ( a + c ) / 2 );

			var c1_3 = cos( ( a - c ) / 2 );
			var s1_3 = sin( ( a - c ) / 2 );

			var c3_1 = cos( ( c - a ) / 2 );
			var s3_1 = sin( ( c - a ) / 2 );

			switch ( order ) {

				case 'XYX':
					q.set( c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13 );
					break;

				case 'YZY':
					q.set( s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13 );
					break;

				case 'ZXZ':
					q.set( s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13 );
					break;

				case 'XZX':
					q.set( c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13 );
					break;

				case 'YXY':
					q.set( s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13 );
					break;

				case 'ZYZ':
					q.set( s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13 );
					break;

				default:
					console.warn( 'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order );

			}

		}

	};

	var Vector2 = function Vector2( x, y ) {
		if ( x === void 0 ) x = 0;
		if ( y === void 0 ) y = 0;


		Object.defineProperty( this, 'isVector2', { value: true } );

		this.x = x;
		this.y = y;

	};

	var prototypeAccessors = { width: { configurable: true },height: { configurable: true } };

	prototypeAccessors.width.get = function () {

		return this.x;

	};

	prototypeAccessors.width.set = function ( value ) {

		this.x = value;

	};

	prototypeAccessors.height.get = function () {

		return this.y;

	};

	prototypeAccessors.height.set = function ( value ) {

		this.y = value;

	};

	Vector2.prototype.set = function set ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	};

	Vector2.prototype.setScalar = function setScalar ( scalar ) {

		this.x = scalar;
		this.y = scalar;

		return this;

	};

	Vector2.prototype.setX = function setX ( x ) {

		this.x = x;

		return this;

	};

	Vector2.prototype.setY = function setY ( y ) {

		this.y = y;

		return this;

	};

	Vector2.prototype.setComponent = function setComponent ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	};

	Vector2.prototype.getComponent = function getComponent ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	};

	Vector2.prototype.clone = function clone () {

		return new this.constructor( this.x, this.y );

	};

	Vector2.prototype.copy = function copy ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	};

	Vector2.prototype.add = function add ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	};

	Vector2.prototype.addScalar = function addScalar ( s ) {

		this.x += s;
		this.y += s;

		return this;

	};

	Vector2.prototype.addVectors = function addVectors ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	};

	Vector2.prototype.addScaledVector = function addScaledVector ( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;

		return this;

	};

	Vector2.prototype.sub = function sub ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	};

	Vector2.prototype.subScalar = function subScalar ( s ) {

		this.x -= s;
		this.y -= s;

		return this;

	};

	Vector2.prototype.subVectors = function subVectors ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	};

	Vector2.prototype.multiply = function multiply ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	};

	Vector2.prototype.multiplyScalar = function multiplyScalar ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	};

	Vector2.prototype.divide = function divide ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	};

	Vector2.prototype.divideScalar = function divideScalar ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	};

	Vector2.prototype.applyMatrix3 = function applyMatrix3 ( m ) {

		var x = this.x, y = this.y;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

		return this;

	};

	Vector2.prototype.min = function min ( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );

		return this;

	};

	Vector2.prototype.max = function max ( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );

		return this;

	};

	Vector2.prototype.clamp = function clamp ( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );

		return this;

	};

	Vector2.prototype.clampScalar = function clampScalar ( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

		return this;

	};

	Vector2.prototype.clampLength = function clampLength ( min, max ) {

		var length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	};

	Vector2.prototype.floor = function floor () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	};

	Vector2.prototype.ceil = function ceil () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	};

	Vector2.prototype.round = function round () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	};

	Vector2.prototype.roundToZero = function roundToZero () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	};

	Vector2.prototype.negate = function negate () {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	};

	Vector2.prototype.dot = function dot ( v ) {

		return this.x * v.x + this.y * v.y;

	};

	Vector2.prototype.cross = function cross ( v ) {

		return this.x * v.y - this.y * v.x;

	};

	Vector2.prototype.lengthSq = function lengthSq () {

		return this.x * this.x + this.y * this.y;

	};

	Vector2.prototype.length = function length () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	};

	Vector2.prototype.manhattanLength = function manhattanLength () {

		return Math.abs( this.x ) + Math.abs( this.y );

	};

	Vector2.prototype.normalize = function normalize () {

		return this.divideScalar( this.length() || 1 );

	};

	Vector2.prototype.angle = function angle () {

		// computes the angle in radians with respect to the positive x-axis

		var angle = Math.atan2( - this.y, - this.x ) + Math.PI;

		return angle;

	};

	Vector2.prototype.distanceTo = function distanceTo ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	};

	Vector2.prototype.distanceToSquared = function distanceToSquared ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	};

	Vector2.prototype.manhattanDistanceTo = function manhattanDistanceTo ( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

	};

	Vector2.prototype.setLength = function setLength ( length ) {

		return this.normalize().multiplyScalar( length );

	};

	Vector2.prototype.lerp = function lerp ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	};

	Vector2.prototype.lerpVectors = function lerpVectors ( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;

		return this;

	};

	Vector2.prototype.equals = function equals ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	};

	Vector2.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	};

	Vector2.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	};

	Vector2.prototype.fromBufferAttribute = function fromBufferAttribute ( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );

		return this;

	};

	Vector2.prototype.rotateAround = function rotateAround ( center, angle ) {

		var c = Math.cos( angle ), s = Math.sin( angle );

		var x = this.x - center.x;
		var y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;

	};

	Vector2.prototype.random = function random () {

		this.x = Math.random();
		this.y = Math.random();

		return this;

	};

	Object.defineProperties( Vector2.prototype, prototypeAccessors );

	var Matrix3 = function Matrix3() {

		Object.defineProperty( this, 'isMatrix3', { value: true } );

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	};

	Matrix3.prototype.set = function set ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this;

	};

	Matrix3.prototype.identity = function identity () {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	};

	Matrix3.prototype.clone = function clone () {

		return new this.constructor().fromArray( this.elements );

	};

	Matrix3.prototype.copy = function copy ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this;

	};

	Matrix3.prototype.extractBasis = function extractBasis ( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrix3Column( this, 0 );
		yAxis.setFromMatrix3Column( this, 1 );
		zAxis.setFromMatrix3Column( this, 2 );

		return this;

	};

	Matrix3.prototype.setFromMatrix4 = function setFromMatrix4 ( m ) {

		var me = m.elements;

		this.set(

			me[ 0 ], me[ 4 ], me[ 8 ],
			me[ 1 ], me[ 5 ], me[ 9 ],
			me[ 2 ], me[ 6 ], me[ 10 ]

		);

		return this;

	};

	Matrix3.prototype.multiply = function multiply ( m ) {

		return this.multiplyMatrices( this, m );

	};

	Matrix3.prototype.premultiply = function premultiply ( m ) {

		return this.multiplyMatrices( m, this );

	};

	Matrix3.prototype.multiplyMatrices = function multiplyMatrices ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
		var a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
		var a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

		var b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
		var b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
		var b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
		te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
		te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
		te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
		te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
		te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
		te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

		return this;

	};

	Matrix3.prototype.multiplyScalar = function multiplyScalar ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	};

	Matrix3.prototype.determinant = function determinant () {

		var te = this.elements;

		var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	};

	Matrix3.prototype.getInverse = function getInverse ( matrix, throwOnDegenerate ) {

		if ( throwOnDegenerate !== undefined ) {

			console.warn( "THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate." );

		}

		var me = matrix.elements,
			te = this.elements,

			n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ],
			n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ],
			n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) { return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 ); }

		var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

		return this;

	};

	Matrix3.prototype.transpose = function transpose () {

		var tmp;
		var m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	};

	Matrix3.prototype.getNormalMatrix = function getNormalMatrix ( matrix4 ) {

		return this.setFromMatrix4( matrix4 ).getInverse( this ).transpose();

	};

	Matrix3.prototype.transposeIntoArray = function transposeIntoArray ( r ) {

		var m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	};

	Matrix3.prototype.setUvTransform = function setUvTransform ( tx, ty, sx, sy, rotation, cx, cy ) {

		var c = Math.cos( rotation );
		var s = Math.sin( rotation );

		this.set(
			sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
			- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
			0, 0, 1
		);

	};

	Matrix3.prototype.scale = function scale ( sx, sy ) {

		var te = this.elements;

		te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
		te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

		return this;

	};

	Matrix3.prototype.rotate = function rotate ( theta ) {

		var c = Math.cos( theta );
		var s = Math.sin( theta );

		var te = this.elements;

		var a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
		var a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

		te[ 0 ] = c * a11 + s * a21;
		te[ 3 ] = c * a12 + s * a22;
		te[ 6 ] = c * a13 + s * a23;

		te[ 1 ] = - s * a11 + c * a21;
		te[ 4 ] = - s * a12 + c * a22;
		te[ 7 ] = - s * a13 + c * a23;

		return this;

	};

	Matrix3.prototype.translate = function translate ( tx, ty ) {

		var te = this.elements;

		te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
		te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

		return this;

	};

	Matrix3.prototype.equals = function equals ( matrix ) {

		var te = this.elements;
		var me = matrix.elements;

		for ( var i = 0; i < 9; i ++ ) {

			if ( te[ i ] !== me[ i ] ) { return false; }

		}

		return true;

	};

	Matrix3.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		for ( var i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	};

	Matrix3.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		var te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ] = te[ 8 ];

		return array;

	};

	var _canvas;

	var ImageUtils = {

		getDataURL: function ( image ) {

			if ( /^data:/i.test( image.src ) ) {

				return image.src;

			}

			if ( typeof HTMLCanvasElement == 'undefined' ) {

				return image.src;

			}

			var canvas;

			if ( image instanceof HTMLCanvasElement ) {

				canvas = image;

			} else {

				if ( _canvas === undefined ) { _canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' ); }

				_canvas.width = image.width;
				_canvas.height = image.height;

				var context = _canvas.getContext( '2d' );

				if ( image instanceof ImageData ) {

					context.putImageData( image, 0, 0 );

				} else {

					context.drawImage( image, 0, 0, image.width, image.height );

				}

				canvas = _canvas;

			}

			if ( canvas.width > 2048 || canvas.height > 2048 ) {

				return canvas.toDataURL( 'image/jpeg', 0.6 );

			} else {

				return canvas.toDataURL( 'image/png' );

			}

		}

	};

	var textureId = 0;

	function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';

		this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
		this.mipmaps = [];

		this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

		this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
		this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
		this.minFilter = minFilter !== undefined ? minFilter : LinearMipmapLinearFilter;

		this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

		this.format = format !== undefined ? format : RGBAFormat;
		this.internalFormat = null;
		this.type = type !== undefined ? type : UnsignedByteType;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding !== undefined ? encoding : LinearEncoding;

		this.version = 0;
		this.onUpdate = null;

	}

	Texture.DEFAULT_IMAGE = undefined;
	Texture.DEFAULT_MAPPING = UVMapping;

	Texture.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Texture,

		isTexture: true,

		updateMatrix: function () {

			this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.image = source.image;
			this.mipmaps = source.mipmaps.slice( 0 );

			this.mapping = source.mapping;

			this.wrapS = source.wrapS;
			this.wrapT = source.wrapT;

			this.magFilter = source.magFilter;
			this.minFilter = source.minFilter;

			this.anisotropy = source.anisotropy;

			this.format = source.format;
			this.internalFormat = source.internalFormat;
			this.type = source.type;

			this.offset.copy( source.offset );
			this.repeat.copy( source.repeat );
			this.center.copy( source.center );
			this.rotation = source.rotation;

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrix.copy( source.matrix );

			this.generateMipmaps = source.generateMipmaps;
			this.premultiplyAlpha = source.premultiplyAlpha;
			this.flipY = source.flipY;
			this.unpackAlignment = source.unpackAlignment;
			this.encoding = source.encoding;

			return this;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

				return meta.textures[ this.uuid ];

			}

			var output = {

				metadata: {
					version: 4.5,
					type: 'Texture',
					generator: 'Texture.toJSON'
				},

				uuid: this.uuid,
				name: this.name,

				mapping: this.mapping,

				repeat: [ this.repeat.x, this.repeat.y ],
				offset: [ this.offset.x, this.offset.y ],
				center: [ this.center.x, this.center.y ],
				rotation: this.rotation,

				wrap: [ this.wrapS, this.wrapT ],

				format: this.format,
				type: this.type,
				encoding: this.encoding,

				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,

				flipY: this.flipY,

				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment

			};

			if ( this.image !== undefined ) {

				// TODO: Move to THREE.Image

				var image = this.image;

				if ( image.uuid === undefined ) {

					image.uuid = MathUtils.generateUUID(); // UGH

				}

				if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

					var url;

					if ( Array.isArray( image ) ) {

						// process array of images e.g. CubeTexture

						url = [];

						for ( var i = 0, l = image.length; i < l; i ++ ) {

							url.push( ImageUtils.getDataURL( image[ i ] ) );

						}

					} else {

						// process single image

						url = ImageUtils.getDataURL( image );

					}

					meta.images[ image.uuid ] = {
						uuid: image.uuid,
						url: url
					};

				}

				output.image = image.uuid;

			}

			if ( ! isRootObject ) {

				meta.textures[ this.uuid ] = output;

			}

			return output;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		},

		transformUv: function ( uv ) {

			if ( this.mapping !== UVMapping ) { return uv; }

			uv.applyMatrix3( this.matrix );

			if ( uv.x < 0 || uv.x > 1 ) {

				switch ( this.wrapS ) {

					case RepeatWrapping:

						uv.x = uv.x - Math.floor( uv.x );
						break;

					case ClampToEdgeWrapping:

						uv.x = uv.x < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

							uv.x = Math.ceil( uv.x ) - uv.x;

						} else {

							uv.x = uv.x - Math.floor( uv.x );

						}

						break;

				}

			}

			if ( uv.y < 0 || uv.y > 1 ) {

				switch ( this.wrapT ) {

					case RepeatWrapping:

						uv.y = uv.y - Math.floor( uv.y );
						break;

					case ClampToEdgeWrapping:

						uv.y = uv.y < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

							uv.y = Math.ceil( uv.y ) - uv.y;

						} else {

							uv.y = uv.y - Math.floor( uv.y );

						}

						break;

				}

			}

			if ( this.flipY ) {

				uv.y = 1 - uv.y;

			}

			return uv;

		}

	} );

	Object.defineProperty( Texture.prototype, "needsUpdate", {

		set: function ( value ) {

			if ( value === true ) { this.version ++; }

		}

	} );

	var Vector4 = function Vector4( x, y, z, w ) {
		if ( x === void 0 ) x = 0;
		if ( y === void 0 ) y = 0;
		if ( z === void 0 ) z = 0;
		if ( w === void 0 ) w = 1;


		Object.defineProperty( this, 'isVector4', { value: true } );

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	};

	var prototypeAccessors$1 = { width: { configurable: true },height: { configurable: true } };

	prototypeAccessors$1.width.get = function () {

		return this.z;

	};

	prototypeAccessors$1.width.set = function ( value ) {

		this.z = value;

	};

	prototypeAccessors$1.height.get = function () {

		return this.w;

	};

	prototypeAccessors$1.height.set = function ( value ) {

		this.w = value;

	};

	Vector4.prototype.set = function set ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	};

	Vector4.prototype.setScalar = function setScalar ( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;

		return this;

	};

	Vector4.prototype.setX = function setX ( x ) {

		this.x = x;

		return this;

	};

	Vector4.prototype.setY = function setY ( y ) {

		this.y = y;

		return this;

	};

	Vector4.prototype.setZ = function setZ ( z ) {

		this.z = z;

		return this;

	};

	Vector4.prototype.setW = function setW ( w ) {

		this.w = w;

		return this;

	};

	Vector4.prototype.setComponent = function setComponent ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	};

	Vector4.prototype.getComponent = function getComponent ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	};

	Vector4.prototype.clone = function clone () {

		return new this.constructor( this.x, this.y, this.z, this.w );

	};

	Vector4.prototype.copy = function copy ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	};

	Vector4.prototype.add = function add ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	};

	Vector4.prototype.addScalar = function addScalar ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	};

	Vector4.prototype.addVectors = function addVectors ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	};

	Vector4.prototype.addScaledVector = function addScaledVector ( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		this.w += v.w * s;

		return this;

	};

	Vector4.prototype.sub = function sub ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	};

	Vector4.prototype.subScalar = function subScalar ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	};

	Vector4.prototype.subVectors = function subVectors ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	};

	Vector4.prototype.multiplyScalar = function multiplyScalar ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	};

	Vector4.prototype.applyMatrix4 = function applyMatrix4 ( m ) {

		var x = this.x, y = this.y, z = this.z, w = this.w;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	};

	Vector4.prototype.divideScalar = function divideScalar ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	};

	Vector4.prototype.setAxisAngleFromQuaternion = function setAxisAngleFromQuaternion ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			this.x = 1;
			this.y = 0;
			this.z = 0;

		} else {

			this.x = q.x / s;
			this.y = q.y / s;
			this.z = q.z / s;

		}

		return this;

	};

	Vector4.prototype.setAxisAngleFromRotationMatrix = function setAxisAngleFromRotationMatrix ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z; // variables for result
		var epsilon = 0.01,	// margin to allow for rounding errors
			epsilon2 = 0.1,	// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
			     ( Math.abs( m13 - m31 ) < epsilon ) &&
			     ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
				     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
				     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
				     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) {

				// m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) {

				// m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else {

				// m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
			( m13 - m31 ) * ( m13 - m31 ) +
			( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) { s = 1; }

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	};

	Vector4.prototype.min = function min ( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );
		this.w = Math.min( this.w, v.w );

		return this;

	};

	Vector4.prototype.max = function max ( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );
		this.w = Math.max( this.w, v.w );

		return this;

	};

	Vector4.prototype.clamp = function clamp ( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );
		this.w = Math.max( min.w, Math.min( max.w, this.w ) );

		return this;

	};

	Vector4.prototype.clampScalar = function clampScalar ( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );
		this.w = Math.max( minVal, Math.min( maxVal, this.w ) );

		return this;

	};

	Vector4.prototype.clampLength = function clampLength ( min, max ) {

		var length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	};

	Vector4.prototype.floor = function floor () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );
		this.w = Math.floor( this.w );

		return this;

	};

	Vector4.prototype.ceil = function ceil () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );
		this.w = Math.ceil( this.w );

		return this;

	};

	Vector4.prototype.round = function round () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );
		this.w = Math.round( this.w );

		return this;

	};

	Vector4.prototype.roundToZero = function roundToZero () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
		this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

		return this;

	};

	Vector4.prototype.negate = function negate () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	};

	Vector4.prototype.dot = function dot ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	};

	Vector4.prototype.lengthSq = function lengthSq () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	};

	Vector4.prototype.length = function length () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	};

	Vector4.prototype.manhattanLength = function manhattanLength () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	};

	Vector4.prototype.normalize = function normalize () {

		return this.divideScalar( this.length() || 1 );

	};

	Vector4.prototype.setLength = function setLength ( length ) {

		return this.normalize().multiplyScalar( length );

	};

	Vector4.prototype.lerp = function lerp ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	};

	Vector4.prototype.lerpVectors = function lerpVectors ( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;
		this.w = v1.w + ( v2.w - v1.w ) * alpha;

		return this;

	};

	Vector4.prototype.equals = function equals ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	};

	Vector4.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	};

	Vector4.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	};

	Vector4.prototype.fromBufferAttribute = function fromBufferAttribute ( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector4: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );
		this.w = attribute.getW( index );

		return this;

	};

	Vector4.prototype.random = function random () {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		this.w = Math.random();

		return this;

	};

	Object.defineProperties( Vector4.prototype, prototypeAccessors$1 );

	/*
	 In options, we can specify:
	 * Texture parameters for an auto-generated target texture
	 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
	*/
	function WebGLRenderTarget( width, height, options ) {

		this.width = width;
		this.height = height;

		this.scissor = new Vector4( 0, 0, width, height );
		this.scissorTest = false;

		this.viewport = new Vector4( 0, 0, width, height );

		options = options || {};

		this.texture = new Texture( undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

		this.texture.image = {};
		this.texture.image.width = width;
		this.texture.image.height = height;

		this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
		this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;

		this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
		this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
		this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;

	}

	WebGLRenderTarget.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: WebGLRenderTarget,

		isWebGLRenderTarget: true,

		setSize: function ( width, height ) {

			if ( this.width !== width || this.height !== height ) {

				this.width = width;
				this.height = height;

				this.texture.image.width = width;
				this.texture.image.height = height;

				this.dispose();

			}

			this.viewport.set( 0, 0, width, height );
			this.scissor.set( 0, 0, width, height );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.width = source.width;
			this.height = source.height;

			this.viewport.copy( source.viewport );

			this.texture = source.texture.clone();

			this.depthBuffer = source.depthBuffer;
			this.stencilBuffer = source.stencilBuffer;
			this.depthTexture = source.depthTexture;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	function WebGLMultisampleRenderTarget( width, height, options ) {

		WebGLRenderTarget.call( this, width, height, options );

		this.samples = 4;

	}

	WebGLMultisampleRenderTarget.prototype = Object.assign( Object.create( WebGLRenderTarget.prototype ), {

		constructor: WebGLMultisampleRenderTarget,

		isWebGLMultisampleRenderTarget: true,

		copy: function ( source ) {

			WebGLRenderTarget.prototype.copy.call( this, source );

			this.samples = source.samples;

			return this;

		}

	} );

	var Quaternion = function Quaternion( x, y, z, w ) {
		if ( x === void 0 ) x = 0;
		if ( y === void 0 ) y = 0;
		if ( z === void 0 ) z = 0;
		if ( w === void 0 ) w = 1;


		Object.defineProperty( this, 'isQuaternion', { value: true } );

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

	};

	var prototypeAccessors$2 = { x: { configurable: true },y: { configurable: true },z: { configurable: true },w: { configurable: true } };

	Quaternion.slerp = function slerp ( qa, qb, qm, t ) {

		return qm.copy( qa ).slerp( qb, t );

	};

	Quaternion.slerpFlat = function slerpFlat ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

		// fuzz-free, array-based Quaternion SLERP operation

		var x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ];

		var x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			var s = 1 - t;
			var cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				var sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			var tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				var f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	};

	Quaternion.multiplyQuaternionsFlat = function multiplyQuaternionsFlat ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

		var x0 = src0[ srcOffset0 ];
		var y0 = src0[ srcOffset0 + 1 ];
		var z0 = src0[ srcOffset0 + 2 ];
		var w0 = src0[ srcOffset0 + 3 ];

		var x1 = src1[ srcOffset1 ];
		var y1 = src1[ srcOffset1 + 1 ];
		var z1 = src1[ srcOffset1 + 2 ];
		var w1 = src1[ srcOffset1 + 3 ];

		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

		return dst;

	};

	prototypeAccessors$2.x.get = function () {

		return this._x;

	};

	prototypeAccessors$2.x.set = function ( value ) {

		this._x = value;
		this._onChangeCallback();

	};

	prototypeAccessors$2.y.get = function () {

		return this._y;

	};

	prototypeAccessors$2.y.set = function ( value ) {

		this._y = value;
		this._onChangeCallback();

	};

	prototypeAccessors$2.z.get = function () {

		return this._z;

	};

	prototypeAccessors$2.z.set = function ( value ) {

		this._z = value;
		this._onChangeCallback();

	};

	prototypeAccessors$2.w.get = function () {

		return this._w;

	};

	prototypeAccessors$2.w.set = function ( value ) {

		this._w = value;
		this._onChangeCallback();

	};

	Quaternion.prototype.set = function set ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.clone = function clone () {

		return new this.constructor( this._x, this._y, this._z, this._w );

	};

	Quaternion.prototype.copy = function copy ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.setFromEuler = function setFromEuler ( euler, update ) {

		if ( ! ( euler && euler.isEuler ) ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		var x = euler._x, y = euler._y, z = euler._z, order = euler._order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//content/SpinCalc.m

		var cos = Math.cos;
		var sin = Math.sin;

		var c1 = cos( x / 2 );
		var c2 = cos( y / 2 );
		var c3 = cos( z / 2 );

		var s1 = sin( x / 2 );
		var s2 = sin( y / 2 );
		var s3 = sin( z / 2 );

		switch ( order ) {

			case 'XYZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'YXZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'ZXY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'ZYX':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'YZX':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'XZY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			default:
				console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

		}

		if ( update !== false ) { this._onChangeCallback(); }

		return this;

	};

	Quaternion.prototype.setFromAxisAngle = function setFromAxisAngle ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.setFromRotationMatrix = function setFromRotationMatrix ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33;

		if ( trace > 0 ) {

			var s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			var s$1 = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s$1;
			this._x = 0.25 * s$1;
			this._y = ( m12 + m21 ) / s$1;
			this._z = ( m13 + m31 ) / s$1;

		} else if ( m22 > m33 ) {

			var s$2 = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s$2;
			this._x = ( m12 + m21 ) / s$2;
			this._y = 0.25 * s$2;
			this._z = ( m23 + m32 ) / s$2;

		} else {

			var s$3 = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s$3;
			this._x = ( m13 + m31 ) / s$3;
			this._y = ( m23 + m32 ) / s$3;
			this._z = 0.25 * s$3;

		}

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.setFromUnitVectors = function setFromUnitVectors ( vFrom, vTo ) {

		// assumes direction vectors vFrom and vTo are normalized

		var EPS = 0.000001;

		var r = vFrom.dot( vTo ) + 1;

		if ( r < EPS ) {

			r = 0;

			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

				this._x = - vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = - vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	};

	Quaternion.prototype.angleTo = function angleTo ( q ) {

		return 2 * Math.acos( Math.abs( MathUtils.clamp( this.dot( q ), - 1, 1 ) ) );

	};

	Quaternion.prototype.rotateTowards = function rotateTowards ( q, step ) {

		var angle = this.angleTo( q );

		if ( angle === 0 ) { return this; }

		var t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;

	};

	Quaternion.prototype.identity = function identity () {

		return this.set( 0, 0, 0, 1 );

	};

	Quaternion.prototype.inverse = function inverse () {

		// quaternion is assumed to have unit length

		return this.conjugate();

	};

	Quaternion.prototype.conjugate = function conjugate () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.dot = function dot ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	};

	Quaternion.prototype.lengthSq = function lengthSq () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	};

	Quaternion.prototype.length = function length () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	};

	Quaternion.prototype.normalize = function normalize () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.multiply = function multiply ( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	};

	Quaternion.prototype.premultiply = function premultiply ( q ) {

		return this.multiplyQuaternions( q, this );

	};

	Quaternion.prototype.multiplyQuaternions = function multiplyQuaternions ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.slerp = function slerp ( qb, t ) {

		if ( t === 0 ) { return this; }
		if ( t === 1 ) { return this.copy( qb ); }

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			var s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.equals = function equals ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	};

	Quaternion.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this._onChangeCallback();

		return this;

	};

	Quaternion.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	};

	Quaternion.prototype.fromBufferAttribute = function fromBufferAttribute ( attribute, index ) {

		this._x = attribute.getX( index );
		this._y = attribute.getY( index );
		this._z = attribute.getZ( index );
		this._w = attribute.getW( index );

		return this;

	};

	Quaternion.prototype._onChange = function _onChange ( callback ) {

		this._onChangeCallback = callback;

		return this;

	};

	Quaternion.prototype._onChangeCallback = function _onChangeCallback () {};

	Object.defineProperties( Quaternion.prototype, prototypeAccessors$2 );

	var Vector3 = function Vector3( x, y, z ) {
		if ( x === void 0 ) x = 0;
		if ( y === void 0 ) y = 0;
		if ( z === void 0 ) z = 0;


		Object.defineProperty( this, 'isVector3', { value: true } );

		this.x = x;
		this.y = y;
		this.z = z;

	};

	Vector3.prototype.set = function set ( x, y, z ) {

		if ( z === undefined ) { z = this.z; } // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	};

	Vector3.prototype.setScalar = function setScalar ( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	};

	Vector3.prototype.setX = function setX ( x ) {

		this.x = x;

		return this;

	};

	Vector3.prototype.setY = function setY ( y ) {

		this.y = y;

		return this;

	};

	Vector3.prototype.setZ = function setZ ( z ) {

		this.z = z;

		return this;

	};

	Vector3.prototype.setComponent = function setComponent ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	};

	Vector3.prototype.getComponent = function getComponent ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	};

	Vector3.prototype.clone = function clone () {

		return new this.constructor( this.x, this.y, this.z );

	};

	Vector3.prototype.copy = function copy ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	};

	Vector3.prototype.add = function add ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	};

	Vector3.prototype.addScalar = function addScalar ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	};

	Vector3.prototype.addVectors = function addVectors ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	};

	Vector3.prototype.addScaledVector = function addScaledVector ( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	};

	Vector3.prototype.sub = function sub ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	};

	Vector3.prototype.subScalar = function subScalar ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	};

	Vector3.prototype.subVectors = function subVectors ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	};

	Vector3.prototype.multiply = function multiply ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	};

	Vector3.prototype.multiplyScalar = function multiplyScalar ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	};

	Vector3.prototype.multiplyVectors = function multiplyVectors ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	};

	Vector3.prototype.applyEuler = function applyEuler ( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion.setFromEuler( euler ) );

	};

	Vector3.prototype.applyAxisAngle = function applyAxisAngle ( axis, angle ) {

		return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ) );

	};

	Vector3.prototype.applyMatrix3 = function applyMatrix3 ( m ) {

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	};

	Vector3.prototype.applyNormalMatrix = function applyNormalMatrix ( m ) {

		return this.applyMatrix3( m ).normalize();

	};

	Vector3.prototype.applyMatrix4 = function applyMatrix4 ( m ) {

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		var w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	};

	Vector3.prototype.applyQuaternion = function applyQuaternion ( q ) {

		var x = this.x, y = this.y, z = this.z;
		var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	};

	Vector3.prototype.project = function project ( camera ) {

		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

	};

	Vector3.prototype.unproject = function unproject ( camera ) {

		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

	};

	Vector3.prototype.transformDirection = function transformDirection ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	};

	Vector3.prototype.divide = function divide ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	};

	Vector3.prototype.divideScalar = function divideScalar ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	};

	Vector3.prototype.min = function min ( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	};

	Vector3.prototype.max = function max ( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	};

	Vector3.prototype.clamp = function clamp ( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	};

	Vector3.prototype.clampScalar = function clampScalar ( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	};

	Vector3.prototype.clampLength = function clampLength ( min, max ) {

		var length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	};

	Vector3.prototype.floor = function floor () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	};

	Vector3.prototype.ceil = function ceil () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	};

	Vector3.prototype.round = function round () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	};

	Vector3.prototype.roundToZero = function roundToZero () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	};

	Vector3.prototype.negate = function negate () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	};

	Vector3.prototype.dot = function dot ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	};

	// TODO lengthSquared?

	Vector3.prototype.lengthSq = function lengthSq () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	};

	Vector3.prototype.length = function length () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	};

	Vector3.prototype.manhattanLength = function manhattanLength () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	};

	Vector3.prototype.normalize = function normalize () {

		return this.divideScalar( this.length() || 1 );

	};

	Vector3.prototype.setLength = function setLength ( length ) {

		return this.normalize().multiplyScalar( length );

	};

	Vector3.prototype.lerp = function lerp ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	};

	Vector3.prototype.lerpVectors = function lerpVectors ( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

	};

	Vector3.prototype.cross = function cross ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		return this.crossVectors( this, v );

	};

	Vector3.prototype.crossVectors = function crossVectors ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	};

	Vector3.prototype.projectOnVector = function projectOnVector ( v ) {

		var denominator = v.lengthSq();

		if ( denominator === 0 ) { return this.set( 0, 0, 0 ); }

		var scalar = v.dot( this ) / denominator;

		return this.copy( v ).multiplyScalar( scalar );

	};

	Vector3.prototype.projectOnPlane = function projectOnPlane ( planeNormal ) {

		_vector.copy( this ).projectOnVector( planeNormal );

		return this.sub( _vector );

	};

	Vector3.prototype.reflect = function reflect ( normal ) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	};

	Vector3.prototype.angleTo = function angleTo ( v ) {

		var denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

		if ( denominator === 0 ) { return Math.PI / 2; }

		var theta = this.dot( v ) / denominator;

		// clamp, to handle numerical problems

		return Math.acos( MathUtils.clamp( theta, - 1, 1 ) );

	};

	Vector3.prototype.distanceTo = function distanceTo ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	};

	Vector3.prototype.distanceToSquared = function distanceToSquared ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	};

	Vector3.prototype.manhattanDistanceTo = function manhattanDistanceTo ( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

	};

	Vector3.prototype.setFromSpherical = function setFromSpherical ( s ) {

		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

	};

	Vector3.prototype.setFromSphericalCoords = function setFromSphericalCoords ( radius, phi, theta ) {

		var sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;

	};

	Vector3.prototype.setFromCylindrical = function setFromCylindrical ( c ) {

		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

	};

	Vector3.prototype.setFromCylindricalCoords = function setFromCylindricalCoords ( radius, theta, y ) {

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	};

	Vector3.prototype.setFromMatrixPosition = function setFromMatrixPosition ( m ) {

		var e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	};

	Vector3.prototype.setFromMatrixScale = function setFromMatrixScale ( m ) {

		var sx = this.setFromMatrixColumn( m, 0 ).length();
		var sy = this.setFromMatrixColumn( m, 1 ).length();
		var sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	};

	Vector3.prototype.setFromMatrixColumn = function setFromMatrixColumn ( m, index ) {

		return this.fromArray( m.elements, index * 4 );

	};

	Vector3.prototype.setFromMatrix3Column = function setFromMatrix3Column ( m, index ) {

		return this.fromArray( m.elements, index * 3 );

	};

	Vector3.prototype.equals = function equals ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	};

	Vector3.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	};

	Vector3.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	};

	Vector3.prototype.fromBufferAttribute = function fromBufferAttribute ( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );

		return this;

	};

	Vector3.prototype.random = function random () {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	};

	var _vector = new Vector3();
	var _quaternion = new Quaternion();

	var Box3 = function Box3( min, max ) {

		Object.defineProperty( this, 'isBox3', { value: true } );

		this.min = ( min !== undefined ) ? min : new Vector3( + Infinity, + Infinity, + Infinity );
		this.max = ( max !== undefined ) ? max : new Vector3( - Infinity, - Infinity, - Infinity );

	};

	Box3.prototype.set = function set ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	};

	Box3.prototype.setFromArray = function setFromArray ( array ) {

		var minX = + Infinity;
		var minY = + Infinity;
		var minZ = + Infinity;

		var maxX = - Infinity;
		var maxY = - Infinity;
		var maxZ = - Infinity;

		for ( var i = 0, l = array.length; i < l; i += 3 ) {

			var x = array[ i ];
			var y = array[ i + 1 ];
			var z = array[ i + 2 ];

			if ( x < minX ) { minX = x; }
			if ( y < minY ) { minY = y; }
			if ( z < minZ ) { minZ = z; }

			if ( x > maxX ) { maxX = x; }
			if ( y > maxY ) { maxY = y; }
			if ( z > maxZ ) { maxZ = z; }

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	};

	Box3.prototype.setFromBufferAttribute = function setFromBufferAttribute ( attribute ) {

		var minX = + Infinity;
		var minY = + Infinity;
		var minZ = + Infinity;

		var maxX = - Infinity;
		var maxY = - Infinity;
		var maxZ = - Infinity;

		for ( var i = 0, l = attribute.count; i < l; i ++ ) {

			var x = attribute.getX( i );
			var y = attribute.getY( i );
			var z = attribute.getZ( i );

			if ( x < minX ) { minX = x; }
			if ( y < minY ) { minY = y; }
			if ( z < minZ ) { minZ = z; }

			if ( x > maxX ) { maxX = x; }
			if ( y > maxY ) { maxY = y; }
			if ( z > maxZ ) { maxZ = z; }

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	};

	Box3.prototype.setFromPoints = function setFromPoints ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	};

	Box3.prototype.setFromCenterAndSize = function setFromCenterAndSize ( center, size ) {

		var halfSize = _vector$1.copy( size ).multiplyScalar( 0.5 );

		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;

	};

	Box3.prototype.setFromObject = function setFromObject ( object ) {

		this.makeEmpty();

		return this.expandByObject( object );

	};

	Box3.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Box3.prototype.copy = function copy ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	};

	Box3.prototype.makeEmpty = function makeEmpty () {

		this.min.x = this.min.y = this.min.z = + Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	};

	Box3.prototype.isEmpty = function isEmpty () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	};

	Box3.prototype.getCenter = function getCenter ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getCenter() target is now required' );
			target = new Vector3();

		}

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	};

	Box3.prototype.getSize = function getSize ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getSize() target is now required' );
			target = new Vector3();

		}

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

	};

	Box3.prototype.expandByPoint = function expandByPoint ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	};

	Box3.prototype.expandByVector = function expandByVector ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	};

	Box3.prototype.expandByScalar = function expandByScalar ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	};

	Box3.prototype.expandByObject = function expandByObject ( object ) {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and children's, world transforms

		object.updateWorldMatrix( false, false );

		var geometry = object.geometry;

		if ( geometry !== undefined ) {

			if ( geometry.boundingBox === null ) {

				geometry.computeBoundingBox();

			}

			_box.copy( geometry.boundingBox );
			_box.applyMatrix4( object.matrixWorld );

			this.union( _box );

		}

		var children = object.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			this.expandByObject( children[ i ] );

		}

		return this;

	};

	Box3.prototype.containsPoint = function containsPoint ( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z ? false : true;

	};

	Box3.prototype.containsBox = function containsBox ( box ) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z;

	};

	Box3.prototype.getParameter = function getParameter ( point, target ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getParameter() target is now required' );
			target = new Vector3();

		}

		return target.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	};

	Box3.prototype.intersectsBox = function intersectsBox ( box ) {

		// using 6 splitting planes to rule out intersections.
		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

	};

	Box3.prototype.intersectsSphere = function intersectsSphere ( sphere ) {

		// Find the point on the AABB closest to the sphere center.
		this.clampPoint( sphere.center, _vector$1 );

		// If that point is inside the sphere, the AABB and sphere intersect.
		return _vector$1.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

	};

	Box3.prototype.intersectsPlane = function intersectsPlane ( plane ) {

		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.

		var min, max;

		if ( plane.normal.x > 0 ) {

			min = plane.normal.x * this.min.x;
			max = plane.normal.x * this.max.x;

		} else {

			min = plane.normal.x * this.max.x;
			max = plane.normal.x * this.min.x;

		}

		if ( plane.normal.y > 0 ) {

			min += plane.normal.y * this.min.y;
			max += plane.normal.y * this.max.y;

		} else {

			min += plane.normal.y * this.max.y;
			max += plane.normal.y * this.min.y;

		}

		if ( plane.normal.z > 0 ) {

			min += plane.normal.z * this.min.z;
			max += plane.normal.z * this.max.z;

		} else {

			min += plane.normal.z * this.max.z;
			max += plane.normal.z * this.min.z;

		}

		return ( min <= - plane.constant && max >= - plane.constant );

	};

	Box3.prototype.intersectsTriangle = function intersectsTriangle ( triangle ) {

		if ( this.isEmpty() ) {

			return false;

		}

		// compute box center and extents
		this.getCenter( _center );
		_extents.subVectors( this.max, _center );

		// translate triangle to aabb origin
		_v0.subVectors( triangle.a, _center );
		_v1.subVectors( triangle.b, _center );
		_v2.subVectors( triangle.c, _center );

		// compute edge vectors for triangle
		_f0.subVectors( _v1, _v0 );
		_f1.subVectors( _v2, _v1 );
		_f2.subVectors( _v0, _v2 );

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		var axes = [
			0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
			_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
			- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
		];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// test 3 face normals from the aabb
		axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors( _f0, _f1 );
		axes = [ _triangleNormal.x, _triangleNormal.y, _triangleNormal.z ];

		return satForAxes( axes, _v0, _v1, _v2, _extents );

	};

	Box3.prototype.clampPoint = function clampPoint ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .clampPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( point ).clamp( this.min, this.max );

	};

	Box3.prototype.distanceToPoint = function distanceToPoint ( point ) {

		var clampedPoint = _vector$1.copy( point ).clamp( this.min, this.max );

		return clampedPoint.sub( point ).length();

	};

	Box3.prototype.getBoundingSphere = function getBoundingSphere ( target ) {

		if ( target === undefined ) {

			console.error( 'THREE.Box3: .getBoundingSphere() target is now required' );
			//target = new Sphere(); // removed to avoid cyclic dependency

		}

		this.getCenter( target.center );

		target.radius = this.getSize( _vector$1 ).length() * 0.5;

		return target;

	};

	Box3.prototype.intersect = function intersect ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if ( this.isEmpty() ) { this.makeEmpty(); }

		return this;

	};

	Box3.prototype.union = function union ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	};

	Box3.prototype.applyMatrix4 = function applyMatrix4 ( matrix ) {

		// transform of empty box is an empty box.
		if ( this.isEmpty() ) { return this; }

		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		_points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
		_points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
		_points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
		_points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
		_points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
		_points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
		_points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
		_points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

		this.setFromPoints( _points );

		return this;

	};

	Box3.prototype.translate = function translate ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	};

	Box3.prototype.equals = function equals ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	};

	function satForAxes( axes, v0, v1, v2, extents ) {

		for ( var i = 0, j = axes.length - 3; i <= j; i += 3 ) {

			_testAxis.fromArray( axes, i );
			// project the aabb onto the seperating axis
			var r = extents.x * Math.abs( _testAxis.x ) + extents.y * Math.abs( _testAxis.y ) + extents.z * Math.abs( _testAxis.z );
			// project all 3 vertices of the triangle onto the seperating axis
			var p0 = v0.dot( _testAxis );
			var p1 = v1.dot( _testAxis );
			var p2 = v2.dot( _testAxis );
			// actual test, basically see if either of the most extreme of the triangle points intersects r
			if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

				// points of the projected triangle are outside the projected half-length of the aabb
				// the axis is seperating and we can exit
				return false;

			}

		}

		return true;

	}

	var _points = [
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3()
	];

	var _vector$1 = new Vector3();

	var _box = new Box3();

	// triangle centered vertices

	var _v0 = new Vector3();
	var _v1 = new Vector3();
	var _v2 = new Vector3();

	// triangle edge vectors

	var _f0 = new Vector3();
	var _f1 = new Vector3();
	var _f2 = new Vector3();

	var _center = new Vector3();
	var _extents = new Vector3();
	var _triangleNormal = new Vector3();
	var _testAxis = new Vector3();

	var _box$1 = new Box3();

	var Sphere = function Sphere( center, radius ) {

		this.center = ( center !== undefined ) ? center : new Vector3();
		this.radius = ( radius !== undefined ) ? radius : - 1;

	};

	Sphere.prototype.set = function set ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	};

	Sphere.prototype.setFromPoints = function setFromPoints ( points, optionalCenter ) {

		var center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			_box$1.setFromPoints( points ).getCenter( center );

		}

		var maxRadiusSq = 0;

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( maxRadiusSq );

		return this;

	};

	Sphere.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Sphere.prototype.copy = function copy ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	};

	Sphere.prototype.isEmpty = function isEmpty () {

		return ( this.radius < 0 );

	};

	Sphere.prototype.makeEmpty = function makeEmpty () {

		this.center.set( 0, 0, 0 );
		this.radius = - 1;

		return this;

	};

	Sphere.prototype.containsPoint = function containsPoint ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	};

	Sphere.prototype.distanceToPoint = function distanceToPoint ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	};

	Sphere.prototype.intersectsSphere = function intersectsSphere ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	};

	Sphere.prototype.intersectsBox = function intersectsBox ( box ) {

		return box.intersectsSphere( this );

	};

	Sphere.prototype.intersectsPlane = function intersectsPlane ( plane ) {

		return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

	};

	Sphere.prototype.clampPoint = function clampPoint ( point, target ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .clampPoint() target is now required' );
			target = new Vector3();

		}

		target.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			target.sub( this.center ).normalize();
			target.multiplyScalar( this.radius ).add( this.center );

		}

		return target;

	};

	Sphere.prototype.getBoundingBox = function getBoundingBox ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .getBoundingBox() target is now required' );
			target = new Box3();

		}

		if ( this.isEmpty() ) {

			// Empty sphere produces empty bounding box
			target.makeEmpty();
			return target;

		}

		target.set( this.center, this.center );
		target.expandByScalar( this.radius );

		return target;

	};

	Sphere.prototype.applyMatrix4 = function applyMatrix4 ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	};

	Sphere.prototype.translate = function translate ( offset ) {

		this.center.add( offset );

		return this;

	};

	Sphere.prototype.equals = function equals ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	};

	var _vector$2 = new Vector3();
	var _segCenter = new Vector3();
	var _segDir = new Vector3();
	var _diff = new Vector3();

	var _edge1 = new Vector3();
	var _edge2 = new Vector3();
	var _normal = new Vector3();

	var Ray = function Ray( origin, direction ) {

		this.origin = ( origin !== undefined ) ? origin : new Vector3();
		this.direction = ( direction !== undefined ) ? direction : new Vector3( 0, 0, - 1 );

	};

	Ray.prototype.set = function set ( origin, direction ) {

		this.origin.copy( origin );
		this.direction.copy( direction );

		return this;

	};

	Ray.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Ray.prototype.copy = function copy ( ray ) {

		this.origin.copy( ray.origin );
		this.direction.copy( ray.direction );

		return this;

	};

	Ray.prototype.at = function at ( t, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Ray: .at() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

	};

	Ray.prototype.lookAt = function lookAt ( v ) {

		this.direction.copy( v ).sub( this.origin ).normalize();

		return this;

	};

	Ray.prototype.recast = function recast ( t ) {

		this.origin.copy( this.at( t, _vector$2 ) );

		return this;

	};

	Ray.prototype.closestPointToPoint = function closestPointToPoint ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Ray: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		target.subVectors( point, this.origin );

		var directionDistance = target.dot( this.direction );

		if ( directionDistance < 0 ) {

			return target.copy( this.origin );

		}

		return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

	};

	Ray.prototype.distanceToPoint = function distanceToPoint ( point ) {

		return Math.sqrt( this.distanceSqToPoint( point ) );

	};

	Ray.prototype.distanceSqToPoint = function distanceSqToPoint ( point ) {

		var directionDistance = _vector$2.subVectors( point, this.origin ).dot( this.direction );

		// point behind the ray

		if ( directionDistance < 0 ) {

			return this.origin.distanceToSquared( point );

		}

		_vector$2.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		return _vector$2.distanceToSquared( point );

	};

	Ray.prototype.distanceSqToSegment = function distanceSqToSegment ( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

		// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
		// It returns the min distance between the ray and the segment
		// defined by v0 and v1
		// It can also set two optional targets :
		// - The closest point on the ray
		// - The closest point on the segment

		_segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
		_segDir.copy( v1 ).sub( v0 ).normalize();
		_diff.copy( this.origin ).sub( _segCenter );

		var segExtent = v0.distanceTo( v1 ) * 0.5;
		var a01 = - this.direction.dot( _segDir );
		var b0 = _diff.dot( this.direction );
		var b1 = - _diff.dot( _segDir );
		var c = _diff.lengthSq();
		var det = Math.abs( 1 - a01 * a01 );
		var s0, s1, sqrDist, extDet;

		if ( det > 0 ) {

			// The ray and segment are not parallel.

			s0 = a01 * b1 - b0;
			s1 = a01 * b0 - b1;
			extDet = segExtent * det;

			if ( s0 >= 0 ) {

				if ( s1 >= - extDet ) {

					if ( s1 <= extDet ) {

						// region 0
						// Minimum at interior points of ray and segment.

						var invDet = 1 / det;
						s0 *= invDet;
						s1 *= invDet;
						sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

					} else {

						// region 1

						s1 = segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					// region 5

					s1 = - segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			} else {

				if ( s1 <= - extDet ) {

					// region 4

					s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				} else if ( s1 <= extDet ) {

					// region 3

					s0 = 0;
					s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = s1 * ( s1 + 2 * b1 ) + c;

				} else {

					// region 2

					s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			}

		} else {

			// Ray and segment are parallel.

			s1 = ( a01 > 0 ) ? - segExtent : segExtent;
			s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
			sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

		}

		if ( optionalPointOnRay ) {

			optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

		}

		if ( optionalPointOnSegment ) {

			optionalPointOnSegment.copy( _segDir ).multiplyScalar( s1 ).add( _segCenter );

		}

		return sqrDist;

	};

	Ray.prototype.intersectSphere = function intersectSphere ( sphere, target ) {

		_vector$2.subVectors( sphere.center, this.origin );
		var tca = _vector$2.dot( this.direction );
		var d2 = _vector$2.dot( _vector$2 ) - tca * tca;
		var radius2 = sphere.radius * sphere.radius;

		if ( d2 > radius2 ) { return null; }

		var thc = Math.sqrt( radius2 - d2 );

		// t0 = first intersect point - entrance on front of sphere
		var t0 = tca - thc;

		// t1 = second intersect point - exit point on back of sphere
		var t1 = tca + thc;

		// test to see if both t0 and t1 are behind the ray - if so, return null
		if ( t0 < 0 && t1 < 0 ) { return null; }

		// test to see if t0 is behind the ray:
		// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
		// in order to always return an intersect point that is in front of the ray.
		if ( t0 < 0 ) { return this.at( t1, target ); }

		// else t0 is in front of the ray, so return the first collision point scaled by t0
		return this.at( t0, target );

	};

	Ray.prototype.intersectsSphere = function intersectsSphere ( sphere ) {

		return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

	};

	Ray.prototype.distanceToPlane = function distanceToPlane ( plane ) {

		var denominator = plane.normal.dot( this.direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( plane.distanceToPoint( this.origin ) === 0 ) {

				return 0;

			}

			// Null is preferable to undefined since undefined means.... it is undefined

			return null;

		}

		var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

		// Return if the ray never intersects the plane

		return t >= 0 ? t : null;

	};

	Ray.prototype.intersectPlane = function intersectPlane ( plane, target ) {

		var t = this.distanceToPlane( plane );

		if ( t === null ) {

			return null;

		}

		return this.at( t, target );

	};

	Ray.prototype.intersectsPlane = function intersectsPlane ( plane ) {

		// check if the ray lies on the plane first

		var distToPoint = plane.distanceToPoint( this.origin );

		if ( distToPoint === 0 ) {

			return true;

		}

		var denominator = plane.normal.dot( this.direction );

		if ( denominator * distToPoint < 0 ) {

			return true;

		}

		// ray origin is behind the plane (and is pointing behind it)

		return false;

	};

	Ray.prototype.intersectBox = function intersectBox ( box, target ) {

		var tmin, tmax, tymin, tymax, tzmin, tzmax;

		var invdirx = 1 / this.direction.x,
			invdiry = 1 / this.direction.y,
			invdirz = 1 / this.direction.z;

		var origin = this.origin;

		if ( invdirx >= 0 ) {

			tmin = ( box.min.x - origin.x ) * invdirx;
			tmax = ( box.max.x - origin.x ) * invdirx;

		} else {

			tmin = ( box.max.x - origin.x ) * invdirx;
			tmax = ( box.min.x - origin.x ) * invdirx;

		}

		if ( invdiry >= 0 ) {

			tymin = ( box.min.y - origin.y ) * invdiry;
			tymax = ( box.max.y - origin.y ) * invdiry;

		} else {

			tymin = ( box.max.y - origin.y ) * invdiry;
			tymax = ( box.min.y - origin.y ) * invdiry;

		}

		if ( ( tmin > tymax ) || ( tymin > tmax ) ) { return null; }

		// These lines also handle the case where tmin or tmax is NaN
		// (result of 0 * Infinity). x !== x returns true if x is NaN

		if ( tymin > tmin || tmin !== tmin ) { tmin = tymin; }

		if ( tymax < tmax || tmax !== tmax ) { tmax = tymax; }

		if ( invdirz >= 0 ) {

			tzmin = ( box.min.z - origin.z ) * invdirz;
			tzmax = ( box.max.z - origin.z ) * invdirz;

		} else {

			tzmin = ( box.max.z - origin.z ) * invdirz;
			tzmax = ( box.min.z - origin.z ) * invdirz;

		}

		if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) { return null; }

		if ( tzmin > tmin || tmin !== tmin ) { tmin = tzmin; }

		if ( tzmax < tmax || tmax !== tmax ) { tmax = tzmax; }

		//return point closest to the ray (positive side)

		if ( tmax < 0 ) { return null; }

		return this.at( tmin >= 0 ? tmin : tmax, target );

	};

	Ray.prototype.intersectsBox = function intersectsBox ( box ) {

		return this.intersectBox( box, _vector$2 ) !== null;

	};

	Ray.prototype.intersectTriangle = function intersectTriangle ( a, b, c, backfaceCulling, target ) {

		// Compute the offset origin, edges, and normal.

		// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

		_edge1.subVectors( b, a );
		_edge2.subVectors( c, a );
		_normal.crossVectors( _edge1, _edge2 );

		// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
		// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
		//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
		//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
		//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
		var DdN = this.direction.dot( _normal );
		var sign;

		if ( DdN > 0 ) {

			if ( backfaceCulling ) { return null; }
			sign = 1;

		} else if ( DdN < 0 ) {

			sign = - 1;
			DdN = - DdN;

		} else {

			return null;

		}

		_diff.subVectors( this.origin, a );
		var DdQxE2 = sign * this.direction.dot( _edge2.crossVectors( _diff, _edge2 ) );

		// b1 < 0, no intersection
		if ( DdQxE2 < 0 ) {

			return null;

		}

		var DdE1xQ = sign * this.direction.dot( _edge1.cross( _diff ) );

		// b2 < 0, no intersection
		if ( DdE1xQ < 0 ) {

			return null;

		}

		// b1+b2 > 1, no intersection
		if ( DdQxE2 + DdE1xQ > DdN ) {

			return null;

		}

		// Line intersects triangle, check if ray does.
		var QdN = - sign * _diff.dot( _normal );

		// t < 0, no intersection
		if ( QdN < 0 ) {

			return null;

		}

		// Ray intersects triangle.
		return this.at( QdN / DdN, target );

	};

	Ray.prototype.applyMatrix4 = function applyMatrix4 ( matrix4 ) {

		this.origin.applyMatrix4( matrix4 );
		this.direction.transformDirection( matrix4 );

		return this;

	};

	Ray.prototype.equals = function equals ( ray ) {

		return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

	};

	var Matrix4 = function Matrix4() {

		Object.defineProperty( this, 'isMatrix4', { value: true } );

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	};

	Matrix4.prototype.set = function set ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	};

	Matrix4.prototype.identity = function identity () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.clone = function clone () {

		return new Matrix4().fromArray( this.elements );

	};

	Matrix4.prototype.copy = function copy ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	};

	Matrix4.prototype.copyPosition = function copyPosition ( m ) {

		var te = this.elements, me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	};

	Matrix4.prototype.extractBasis = function extractBasis ( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );

		return this;

	};

	Matrix4.prototype.makeBasis = function makeBasis ( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);

		return this;

	};

	Matrix4.prototype.extractRotation = function extractRotation ( m ) {

		// this method does not support reflection matrices

		var te = this.elements;
		var me = m.elements;

		var scaleX = 1 / _v1$1.setFromMatrixColumn( m, 0 ).length();
		var scaleY = 1 / _v1$1.setFromMatrixColumn( m, 1 ).length();
		var scaleZ = 1 / _v1$1.setFromMatrixColumn( m, 2 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = 0;

		te[ 4 ] = me[ 4 ] * scaleY;
		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = 0;

		te[ 8 ] = me[ 8 ] * scaleZ;
		te[ 9 ] = me[ 9 ] * scaleZ;
		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = 0;

		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	};

	Matrix4.prototype.makeRotationFromEuler = function makeRotationFromEuler ( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		var te = this.elements;

		var x = euler.x, y = euler.y, z = euler.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			var ce$1 = c * e, cf$1 = c * f, de$1 = d * e, df$1 = d * f;

			te[ 0 ] = ce$1 - df$1 * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de$1 + cf$1 * b;

			te[ 1 ] = cf$1 + de$1 * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df$1 - ce$1 * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			var ae$1 = a * e, af$1 = a * f, be$1 = b * e, bf$1 = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be$1 * d - af$1;
			te[ 8 ] = ae$1 * d + bf$1;

			te[ 1 ] = c * f;
			te[ 5 ] = bf$1 * d + ae$1;
			te[ 9 ] = af$1 * d - be$1;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			var ac$1 = a * c, ad$1 = a * d, bc$1 = b * c, bd$1 = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac$1 * f + bd$1;
			te[ 5 ] = a * e;
			te[ 9 ] = ad$1 * f - bc$1;

			te[ 2 ] = bc$1 * f - ad$1;
			te[ 6 ] = b * e;
			te[ 10 ] = bd$1 * f + ac$1;

		}

		// bottom row
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	};

	Matrix4.prototype.makeRotationFromQuaternion = function makeRotationFromQuaternion ( q ) {

		return this.compose( _zero, q, _one );

	};

	Matrix4.prototype.lookAt = function lookAt ( eye, target, up ) {

		var te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		return this;

	};

	Matrix4.prototype.multiply = function multiply ( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	};

	Matrix4.prototype.premultiply = function premultiply ( m ) {

		return this.multiplyMatrices( m, this );

	};

	Matrix4.prototype.multiplyMatrices = function multiplyMatrices ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	};

	Matrix4.prototype.multiplyScalar = function multiplyScalar ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	};

	Matrix4.prototype.determinant = function determinant () {

		var te = this.elements;

		var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
					 - n13 * n24 * n32
					 - n14 * n22 * n33
					 + n12 * n24 * n33
					 + n13 * n22 * n34
					 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
					 - n11 * n24 * n33
					 + n14 * n21 * n33
					 - n13 * n21 * n34
					 + n13 * n24 * n31
					 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
					 - n11 * n22 * n34
					 - n14 * n21 * n32
					 + n12 * n21 * n34
					 + n14 * n22 * n31
					 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
					 - n11 * n23 * n32
					 + n11 * n22 * n33
					 + n13 * n21 * n32
					 - n12 * n21 * n33
					 + n12 * n23 * n31
			)

		);

	};

	Matrix4.prototype.transpose = function transpose () {

		var te = this.elements;
		var tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	};

	Matrix4.prototype.setPosition = function setPosition ( x, y, z ) {

		var te = this.elements;

		if ( x.isVector3 ) {

			te[ 12 ] = x.x;
			te[ 13 ] = x.y;
			te[ 14 ] = x.z;

		} else {

			te[ 12 ] = x;
			te[ 13 ] = y;
			te[ 14 ] = z;

		}

		return this;

	};

	Matrix4.prototype.getInverse = function getInverse ( m, throwOnDegenerate ) {

		if ( throwOnDegenerate !== undefined ) {

			console.warn( "THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate." );

		}

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = m.elements,

			n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
			n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
			n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
			n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) { return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ); }

		var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	};

	Matrix4.prototype.scale = function scale ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	};

	Matrix4.prototype.getMaxScaleOnAxis = function getMaxScaleOnAxis () {

		var te = this.elements;

		var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

	};

	Matrix4.prototype.makeTranslation = function makeTranslation ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeRotationX = function makeRotationX ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeRotationY = function makeRotationY ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

				 c, 0, s, 0,
				 0, 1, 0, 0,
			- s, 0, c, 0,
				 0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeRotationZ = function makeRotationZ ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeRotationAxis = function makeRotationAxis ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeScale = function makeScale ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.makeShear = function makeShear ( x, y, z ) {

		this.set(

			1, y, z, 0,
			x, 1, z, 0,
			x, y, 1, 0,
			0, 0, 0, 1

		);

		return this;

	};

	Matrix4.prototype.compose = function compose ( position, quaternion, scale ) {

		var te = this.elements;

		var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		var x2 = x + x,y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		var sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;

	};

	Matrix4.prototype.decompose = function decompose ( position, quaternion, scale ) {

		var te = this.elements;

		var sx = _v1$1.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		var sy = _v1$1.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		var sz = _v1$1.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		var det = this.determinant();
		if ( det < 0 ) { sx = - sx; }

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		_m1.copy( this );

		var invSX = 1 / sx;
		var invSY = 1 / sy;
		var invSZ = 1 / sz;

		_m1.elements[ 0 ] *= invSX;
		_m1.elements[ 1 ] *= invSX;
		_m1.elements[ 2 ] *= invSX;

		_m1.elements[ 4 ] *= invSY;
		_m1.elements[ 5 ] *= invSY;
		_m1.elements[ 6 ] *= invSY;

		_m1.elements[ 8 ] *= invSZ;
		_m1.elements[ 9 ] *= invSZ;
		_m1.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		return this;

	};

	Matrix4.prototype.makePerspective = function makePerspective ( left, right, top, bottom, near, far ) {

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

		var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;te[ 4 ] = 0;te[ 8 ] = a;te[ 12 ] = 0;
		te[ 1 ] = 0;te[ 5 ] = y;te[ 9 ] = b;te[ 13 ] = 0;
		te[ 2 ] = 0;te[ 6 ] = 0;te[ 10 ] = c;te[ 14 ] = d;
		te[ 3 ] = 0;te[ 7 ] = 0;te[ 11 ] = - 1;te[ 15 ] = 0;

		return this;

	};

	Matrix4.prototype.makeOrthographic = function makeOrthographic ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = 1.0 / ( right - left );
		var h = 1.0 / ( top - bottom );
		var p = 1.0 / ( far - near );

		var x = ( right + left ) * w;
		var y = ( top + bottom ) * h;
		var z = ( far + near ) * p;

		te[ 0 ] = 2 * w;te[ 4 ] = 0;te[ 8 ] = 0;te[ 12 ] = - x;
		te[ 1 ] = 0;te[ 5 ] = 2 * h;te[ 9 ] = 0;te[ 13 ] = - y;
		te[ 2 ] = 0;te[ 6 ] = 0;te[ 10 ] = - 2 * p;te[ 14 ] = - z;
		te[ 3 ] = 0;te[ 7 ] = 0;te[ 11 ] = 0;te[ 15 ] = 1;

		return this;

	};

	Matrix4.prototype.equals = function equals ( matrix ) {

		var te = this.elements;
		var me = matrix.elements;

		for ( var i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) { return false; }

		}

		return true;

	};

	Matrix4.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		for ( var i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	};

	Matrix4.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		var te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	};

	var _v1$1 = new Vector3();
	var _m1 = new Matrix4();
	var _zero = new Vector3( 0, 0, 0 );
	var _one = new Vector3( 1, 1, 1 );
	var _x = new Vector3();
	var _y = new Vector3();
	var _z = new Vector3();

	var Euler = function Euler( x, y, z, order ) {
		if ( x === void 0 ) x = 0;
		if ( y === void 0 ) y = 0;
		if ( z === void 0 ) z = 0;
		if ( order === void 0 ) order = Euler.DefaultOrder;


		Object.defineProperty( this, 'isEuler', { value: true } );

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

	};

	var prototypeAccessors$3 = { x: { configurable: true },y: { configurable: true },z: { configurable: true },order: { configurable: true } };

	prototypeAccessors$3.x.get = function () {

		return this._x;

	};

	prototypeAccessors$3.x.set = function ( value ) {

		this._x = value;
		this._onChangeCallback();

	};

	prototypeAccessors$3.y.get = function () {

		return this._y;

	};

	prototypeAccessors$3.y.set = function ( value ) {

		this._y = value;
		this._onChangeCallback();

	};

	prototypeAccessors$3.z.get = function () {

		return this._z;

	};

	prototypeAccessors$3.z.set = function ( value ) {

		this._z = value;
		this._onChangeCallback();

	};

	prototypeAccessors$3.order.get = function () {

		return this._order;

	};

	prototypeAccessors$3.order.set = function ( value ) {

		this._order = value;
		this._onChangeCallback();

	};

	Euler.prototype.set = function set ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this._onChangeCallback();

		return this;

	};

	Euler.prototype.clone = function clone () {

		return new this.constructor( this._x, this._y, this._z, this._order );

	};

	Euler.prototype.copy = function copy ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	};

	Euler.prototype.setFromRotationMatrix = function setFromRotationMatrix ( m, order, update ) {

		var clamp = MathUtils.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		switch ( order ) {

			case 'XYZ':

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

				break;

			case 'YXZ':

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.9999999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

				break;

			case 'ZXY':

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.9999999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

				break;

			case 'ZYX':

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

				break;

			case 'YZX':

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

				break;

			case 'XZY':

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

				break;

			default:

				console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

		}

		this._order = order;

		if ( update !== false ) { this._onChangeCallback(); }

		return this;

	};

	Euler.prototype.setFromQuaternion = function setFromQuaternion ( q, order, update ) {

		_matrix.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix, order, update );

	};

	Euler.prototype.setFromVector3 = function setFromVector3 ( v, order ) {

		return this.set( v.x, v.y, v.z, order || this._order );

	};

	Euler.prototype.reorder = function reorder ( newOrder ) {

		// WARNING: this discards revolution information -bhouston

		_quaternion$1.setFromEuler( this );

		return this.setFromQuaternion( _quaternion$1, newOrder );

	};

	Euler.prototype.equals = function equals ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	};

	Euler.prototype.fromArray = function fromArray ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) { this._order = array[ 3 ]; }

		this._onChangeCallback();

		return this;

	};

	Euler.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;

	};

	Euler.prototype.toVector3 = function toVector3 ( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new Vector3( this._x, this._y, this._z );

		}

	};

	Euler.prototype._onChange = function _onChange ( callback ) {

		this._onChangeCallback = callback;

		return this;

	};

	Euler.prototype._onChangeCallback = function _onChangeCallback () {};

	Object.defineProperties( Euler.prototype, prototypeAccessors$3 );

	Euler.DefaultOrder = 'XYZ';
	Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

	var _matrix = new Matrix4();
	var _quaternion$1 = new Quaternion();

	var Layers = function Layers() {

		this.mask = 1 | 0;

	};

	Layers.prototype.set = function set ( channel ) {

		this.mask = 1 << channel | 0;

	};

	Layers.prototype.enable = function enable ( channel ) {

		this.mask |= 1 << channel | 0;

	};

	Layers.prototype.enableAll = function enableAll () {

		this.mask = 0xffffffff | 0;

	};

	Layers.prototype.toggle = function toggle ( channel ) {

		this.mask ^= 1 << channel | 0;

	};

	Layers.prototype.disable = function disable ( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	};

	Layers.prototype.disableAll = function disableAll () {

		this.mask = 0;

	};

	Layers.prototype.test = function test ( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	};

	var _object3DId = 0;

	var _v1$2 = new Vector3();
	var _q1 = new Quaternion();
	var _m1$1 = new Matrix4();
	var _target = new Vector3();

	var _position = new Vector3();
	var _scale = new Vector3();
	var _quaternion$2 = new Quaternion();

	var _xAxis = new Vector3( 1, 0, 0 );
	var _yAxis = new Vector3( 0, 1, 0 );
	var _zAxis = new Vector3( 0, 0, 1 );

	var _addedEvent = { type: 'added' };
	var _removedEvent = { type: 'removed' };

	function Object3D() {

		Object.defineProperty( this, 'id', { value: _object3DId ++ } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		var position = new Vector3();
		var rotation = new Euler();
		var quaternion = new Quaternion();
		var scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation._onChange( onRotationChange );
		quaternion._onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.userData = {};

	}

	Object3D.DefaultUp = new Vector3( 0, 1, 0 );
	Object3D.DefaultMatrixAutoUpdate = true;

	Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Object3D,

		isObject3D: true,

		onBeforeRender: function () {},
		onAfterRender: function () {},

		applyMatrix4: function ( matrix ) {

			if ( this.matrixAutoUpdate ) { this.updateMatrix(); }

			this.matrix.premultiply( matrix );

			this.matrix.decompose( this.position, this.quaternion, this.scale );

		},

		applyQuaternion: function ( q ) {

			this.quaternion.premultiply( q );

			return this;

		},

		setRotationFromAxisAngle: function ( axis, angle ) {

			// assumes axis is normalized

			this.quaternion.setFromAxisAngle( axis, angle );

		},

		setRotationFromEuler: function ( euler ) {

			this.quaternion.setFromEuler( euler, true );

		},

		setRotationFromMatrix: function ( m ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			this.quaternion.setFromRotationMatrix( m );

		},

		setRotationFromQuaternion: function ( q ) {

			// assumes q is normalized

			this.quaternion.copy( q );

		},

		rotateOnAxis: function ( axis, angle ) {

			// rotate object on axis in object space
			// axis is assumed to be normalized

			_q1.setFromAxisAngle( axis, angle );

			this.quaternion.multiply( _q1 );

			return this;

		},

		rotateOnWorldAxis: function ( axis, angle ) {

			// rotate object on axis in world space
			// axis is assumed to be normalized
			// method assumes no rotated parent

			_q1.setFromAxisAngle( axis, angle );

			this.quaternion.premultiply( _q1 );

			return this;

		},

		rotateX: function ( angle ) {

			return this.rotateOnAxis( _xAxis, angle );

		},

		rotateY: function ( angle ) {

			return this.rotateOnAxis( _yAxis, angle );

		},

		rotateZ: function ( angle ) {

			return this.rotateOnAxis( _zAxis, angle );

		},

		translateOnAxis: function ( axis, distance ) {

			// translate object by distance along axis in object space
			// axis is assumed to be normalized

			_v1$2.copy( axis ).applyQuaternion( this.quaternion );

			this.position.add( _v1$2.multiplyScalar( distance ) );

			return this;

		},

		translateX: function ( distance ) {

			return this.translateOnAxis( _xAxis, distance );

		},

		translateY: function ( distance ) {

			return this.translateOnAxis( _yAxis, distance );

		},

		translateZ: function ( distance ) {

			return this.translateOnAxis( _zAxis, distance );

		},

		localToWorld: function ( vector ) {

			return vector.applyMatrix4( this.matrixWorld );

		},

		worldToLocal: function ( vector ) {

			return vector.applyMatrix4( _m1$1.getInverse( this.matrixWorld ) );

		},

		lookAt: function ( x, y, z ) {

			// This method does not support objects having non-uniformly-scaled parent(s)

			if ( x.isVector3 ) {

				_target.copy( x );

			} else {

				_target.set( x, y, z );

			}

			var parent = this.parent;

			this.updateWorldMatrix( true, false );

			_position.setFromMatrixPosition( this.matrixWorld );

			if ( this.isCamera || this.isLight ) {

				_m1$1.lookAt( _position, _target, this.up );

			} else {

				_m1$1.lookAt( _target, _position, this.up );

			}

			this.quaternion.setFromRotationMatrix( _m1$1 );

			if ( parent ) {

				_m1$1.extractRotation( parent.matrixWorld );
				_q1.setFromRotationMatrix( _m1$1 );
				this.quaternion.premultiply( _q1.inverse() );

			}

		},

		add: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.add( arguments[ i ] );

				}

				return this;

			}

			if ( object === this ) {

				console.error( "THREE.Object3D.add: object can't be added as a child of itself.", object );
				return this;

			}

			if ( ( object && object.isObject3D ) ) {

				if ( object.parent !== null ) {

					object.parent.remove( object );

				}

				object.parent = this;
				this.children.push( object );

				object.dispatchEvent( _addedEvent );

			} else {

				console.error( "THREE.Object3D.add: object not an instance of THREE.Object3D.", object );

			}

			return this;

		},

		remove: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.remove( arguments[ i ] );

				}

				return this;

			}

			var index = this.children.indexOf( object );

			if ( index !== - 1 ) {

				object.parent = null;
				this.children.splice( index, 1 );

				object.dispatchEvent( _removedEvent );

			}

			return this;

		},

		attach: function ( object ) {

			// adds object as a child of this, while maintaining the object's world transform

			this.updateWorldMatrix( true, false );

			_m1$1.getInverse( this.matrixWorld );

			if ( object.parent !== null ) {

				object.parent.updateWorldMatrix( true, false );

				_m1$1.multiply( object.parent.matrixWorld );

			}

			object.applyMatrix4( _m1$1 );

			object.updateWorldMatrix( false, false );

			this.add( object );

			return this;

		},

		getObjectById: function ( id ) {

			return this.getObjectByProperty( 'id', id );

		},

		getObjectByName: function ( name ) {

			return this.getObjectByProperty( 'name', name );

		},

		getObjectByProperty: function ( name, value ) {

			if ( this[ name ] === value ) { return this; }

			for ( var i = 0, l = this.children.length; i < l; i ++ ) {

				var child = this.children[ i ];
				var object = child.getObjectByProperty( name, value );

				if ( object !== undefined ) {

					return object;

				}

			}

			return undefined;

		},

		getWorldPosition: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldPosition() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			return target.setFromMatrixPosition( this.matrixWorld );

		},

		getWorldQuaternion: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldQuaternion() target is now required' );
				target = new Quaternion();

			}

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( _position, target, _scale );

			return target;

		},

		getWorldScale: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldScale() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( _position, _quaternion$2, target );

			return target;

		},

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

		},

		raycast: function () {},

		traverse: function ( callback ) {

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverse( callback );

			}

		},

		traverseVisible: function ( callback ) {

			if ( this.visible === false ) { return; }

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverseVisible( callback );

			}

		},

		traverseAncestors: function ( callback ) {

			var parent = this.parent;

			if ( parent !== null ) {

				callback( parent );

				parent.traverseAncestors( callback );

			}

		},

		updateMatrix: function () {

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.matrixWorldNeedsUpdate = true;

		},

		updateMatrixWorld: function ( force ) {

			if ( this.matrixAutoUpdate ) { this.updateMatrix(); }

			if ( this.matrixWorldNeedsUpdate || force ) {

				if ( this.parent === null ) {

					this.matrixWorld.copy( this.matrix );

				} else {

					this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				}

				this.matrixWorldNeedsUpdate = false;

				force = true;

			}

			// update children

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateMatrixWorld( force );

			}

		},

		updateWorldMatrix: function ( updateParents, updateChildren ) {

			var parent = this.parent;

			if ( updateParents === true && parent !== null ) {

				parent.updateWorldMatrix( true, false );

			}

			if ( this.matrixAutoUpdate ) { this.updateMatrix(); }

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			// update children

			if ( updateChildren === true ) {

				var children = this.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateWorldMatrix( false, true );

				}

			}

		},

		toJSON: function ( meta ) {

			// meta is a string when called from JSON.stringify
			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var output = {};

			// meta is a hash used to collect geometries, materials.
			// not providing it implies that this is the root object
			// being serialized.
			if ( isRootObject ) {

				// initialize meta obj
				meta = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {}
				};

				output.metadata = {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				};

			}

			// standard Object3D serialization

			var object = {};

			object.uuid = this.uuid;
			object.type = this.type;

			if ( this.name !== '' ) { object.name = this.name; }
			if ( this.castShadow === true ) { object.castShadow = true; }
			if ( this.receiveShadow === true ) { object.receiveShadow = true; }
			if ( this.visible === false ) { object.visible = false; }
			if ( this.frustumCulled === false ) { object.frustumCulled = false; }
			if ( this.renderOrder !== 0 ) { object.renderOrder = this.renderOrder; }
			if ( JSON.stringify( this.userData ) !== '{}' ) { object.userData = this.userData; }

			object.layers = this.layers.mask;
			object.matrix = this.matrix.toArray();

			if ( this.matrixAutoUpdate === false ) { object.matrixAutoUpdate = false; }

			// object specific properties

			if ( this.isInstancedMesh ) {

				object.type = 'InstancedMesh';
				object.count = this.count;
				object.instanceMatrix = this.instanceMatrix.toJSON();

			}

			//

			function serialize( library, element ) {

				if ( library[ element.uuid ] === undefined ) {

					library[ element.uuid ] = element.toJSON( meta );

				}

				return element.uuid;

			}

			if ( this.isMesh || this.isLine || this.isPoints ) {

				object.geometry = serialize( meta.geometries, this.geometry );

				var parameters = this.geometry.parameters;

				if ( parameters !== undefined && parameters.shapes !== undefined ) {

					var shapes = parameters.shapes;

					if ( Array.isArray( shapes ) ) {

						for ( var i = 0, l = shapes.length; i < l; i ++ ) {

							var shape = shapes[ i ];

							serialize( meta.shapes, shape );

						}

					} else {

						serialize( meta.shapes, shapes );

					}

				}

			}

			if ( this.material !== undefined ) {

				if ( Array.isArray( this.material ) ) {

					var uuids = [];

					for ( var i$1 = 0, l$1 = this.material.length; i$1 < l$1; i$1 ++ ) {

						uuids.push( serialize( meta.materials, this.material[ i$1 ] ) );

					}

					object.material = uuids;

				} else {

					object.material = serialize( meta.materials, this.material );

				}

			}

			//

			if ( this.children.length > 0 ) {

				object.children = [];

				for ( var i$2 = 0; i$2 < this.children.length; i$2 ++ ) {

					object.children.push( this.children[ i$2 ].toJSON( meta ).object );

				}

			}

			if ( isRootObject ) {

				var geometries = extractFromCache( meta.geometries );
				var materials = extractFromCache( meta.materials );
				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );
				var shapes$1 = extractFromCache( meta.shapes );

				if ( geometries.length > 0 ) { output.geometries = geometries; }
				if ( materials.length > 0 ) { output.materials = materials; }
				if ( textures.length > 0 ) { output.textures = textures; }
				if ( images.length > 0 ) { output.images = images; }
				if ( shapes$1.length > 0 ) { output.shapes = shapes$1; }

			}

			output.object = object;

			return output;

			// extract data from the cache hash
			// remove metadata on each item
			// and return as array
			function extractFromCache( cache ) {

				var values = [];
				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

		},

		clone: function ( recursive ) {

			return new this.constructor().copy( this, recursive );

		},

		copy: function ( source, recursive ) {

			if ( recursive === undefined ) { recursive = true; }

			this.name = source.name;

			this.up.copy( source.up );

			this.position.copy( source.position );
			this.rotation.order = source.rotation.order;
			this.quaternion.copy( source.quaternion );
			this.scale.copy( source.scale );

			this.matrix.copy( source.matrix );
			this.matrixWorld.copy( source.matrixWorld );

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

			this.layers.mask = source.layers.mask;
			this.visible = source.visible;

			this.castShadow = source.castShadow;
			this.receiveShadow = source.receiveShadow;

			this.frustumCulled = source.frustumCulled;
			this.renderOrder = source.renderOrder;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			if ( recursive === true ) {

				for ( var i = 0; i < source.children.length; i ++ ) {

					var child = source.children[ i ];
					this.add( child.clone() );

				}

			}

			return this;

		}

	} );

	var _vector1 = new Vector3();
	var _vector2 = new Vector3();
	var _normalMatrix = new Matrix3();

	var Plane = function Plane( normal, constant ) {

		Object.defineProperty( this, 'isPlane', { value: true } );

		// normal is assumed to be normalized

		this.normal = ( normal !== undefined ) ? normal : new Vector3( 1, 0, 0 );
		this.constant = ( constant !== undefined ) ? constant : 0;

	};

	Plane.prototype.set = function set ( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	};

	Plane.prototype.setComponents = function setComponents ( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	};

	Plane.prototype.setFromNormalAndCoplanarPoint = function setFromNormalAndCoplanarPoint ( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );

		return this;

	};

	Plane.prototype.setFromCoplanarPoints = function setFromCoplanarPoints ( a, b, c ) {

		var normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

		this.setFromNormalAndCoplanarPoint( normal, a );

		return this;

	};

	Plane.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Plane.prototype.copy = function copy ( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	};

	Plane.prototype.normalize = function normalize () {

		// Note: will lead to a divide by zero if the plane is invalid.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	};

	Plane.prototype.negate = function negate () {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	};

	Plane.prototype.distanceToPoint = function distanceToPoint ( point ) {

		return this.normal.dot( point ) + this.constant;

	};

	Plane.prototype.distanceToSphere = function distanceToSphere ( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	};

	Plane.prototype.projectPoint = function projectPoint ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .projectPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

	};

	Plane.prototype.intersectLine = function intersectLine ( line, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .intersectLine() target is now required' );
			target = new Vector3();

		}

		var direction = line.delta( _vector1 );

		var denominator = this.normal.dot( direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( this.distanceToPoint( line.start ) === 0 ) {

				return target.copy( line.start );

			}

			// Unsure if this is the correct method to handle this case.
			return undefined;

		}

		var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

		if ( t < 0 || t > 1 ) {

			return undefined;

		}

		return target.copy( direction ).multiplyScalar( t ).add( line.start );

	};

	Plane.prototype.intersectsLine = function intersectsLine ( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	};

	Plane.prototype.intersectsBox = function intersectsBox ( box ) {

		return box.intersectsPlane( this );

	};

	Plane.prototype.intersectsSphere = function intersectsSphere ( sphere ) {

		return sphere.intersectsPlane( this );

	};

	Plane.prototype.coplanarPoint = function coplanarPoint ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .coplanarPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.constant );

	};

	Plane.prototype.applyMatrix4 = function applyMatrix4 ( matrix, optionalNormalMatrix ) {

		var normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

		var referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

		var normal = this.normal.applyMatrix3( normalMatrix ).normalize();

		this.constant = - referencePoint.dot( normal );

		return this;

	};

	Plane.prototype.translate = function translate ( offset ) {

		this.constant -= offset.dot( this.normal );

		return this;

	};

	Plane.prototype.equals = function equals ( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	};

	var _v0$1 = new Vector3();
	var _v1$3 = new Vector3();
	var _v2$1 = new Vector3();
	var _v3 = new Vector3();

	var _vab = new Vector3();
	var _vac = new Vector3();
	var _vbc = new Vector3();
	var _vap = new Vector3();
	var _vbp = new Vector3();
	var _vcp = new Vector3();

	var Triangle = function Triangle( a, b, c ) {

		this.a = ( a !== undefined ) ? a : new Vector3();
		this.b = ( b !== undefined ) ? b : new Vector3();
		this.c = ( c !== undefined ) ? c : new Vector3();

	};

	Triangle.getNormal = function getNormal ( a, b, c, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getNormal() target is now required' );
			target = new Vector3();

		}

		target.subVectors( c, b );
		_v0$1.subVectors( a, b );
		target.cross( _v0$1 );

		var targetLengthSq = target.lengthSq();
		if ( targetLengthSq > 0 ) {

			return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

		}

		return target.set( 0, 0, 0 );

	};

	// static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	Triangle.getBarycoord = function getBarycoord ( point, a, b, c, target ) {

		_v0$1.subVectors( c, a );
		_v1$3.subVectors( b, a );
		_v2$1.subVectors( point, a );

		var dot00 = _v0$1.dot( _v0$1 );
		var dot01 = _v0$1.dot( _v1$3 );
		var dot02 = _v0$1.dot( _v2$1 );
		var dot11 = _v1$3.dot( _v1$3 );
		var dot12 = _v1$3.dot( _v2$1 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getBarycoord() target is now required' );
			target = new Vector3();

		}

		// collinear or singular triangle
		if ( denom === 0 ) {

			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return target.set( - 2, - 1, - 1 );

		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycentric coordinates must always sum to 1
		return target.set( 1 - u - v, v, u );

	};

	Triangle.containsPoint = function containsPoint ( point, a, b, c ) {

		this.getBarycoord( point, a, b, c, _v3 );

		return ( _v3.x >= 0 ) && ( _v3.y >= 0 ) && ( ( _v3.x + _v3.y ) <= 1 );

	};

	Triangle.getUV = function getUV ( point, p1, p2, p3, uv1, uv2, uv3, target ) {

		this.getBarycoord( point, p1, p2, p3, _v3 );

		target.set( 0, 0 );
		target.addScaledVector( uv1, _v3.x );
		target.addScaledVector( uv2, _v3.y );
		target.addScaledVector( uv3, _v3.z );

		return target;

	};

	Triangle.isFrontFacing = function isFrontFacing ( a, b, c, direction ) {

		_v0$1.subVectors( c, b );
		_v1$3.subVectors( a, b );

		// strictly front facing
		return ( _v0$1.cross( _v1$3 ).dot( direction ) < 0 ) ? true : false;

	};

	Triangle.prototype.set = function set ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	};

	Triangle.prototype.setFromPointsAndIndices = function setFromPointsAndIndices ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	};

	Triangle.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Triangle.prototype.copy = function copy ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	};

	Triangle.prototype.getArea = function getArea () {

		_v0$1.subVectors( this.c, this.b );
		_v1$3.subVectors( this.a, this.b );

		return _v0$1.cross( _v1$3 ).length() * 0.5;

	};

	Triangle.prototype.getMidpoint = function getMidpoint ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getMidpoint() target is now required' );
			target = new Vector3();

		}

		return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	};

	Triangle.prototype.getNormal = function getNormal ( target ) {

		return Triangle.getNormal( this.a, this.b, this.c, target );

	};

	Triangle.prototype.getPlane = function getPlane ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getPlane() target is now required' );
			target = new Plane();

		}

		return target.setFromCoplanarPoints( this.a, this.b, this.c );

	};

	Triangle.prototype.getBarycoord = function getBarycoord ( point, target ) {

		return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

	};

	Triangle.prototype.getUV = function getUV ( point, uv1, uv2, uv3, target ) {

		return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, target );

	};

	Triangle.prototype.containsPoint = function containsPoint ( point ) {

		return Triangle.containsPoint( point, this.a, this.b, this.c );

	};

	Triangle.prototype.isFrontFacing = function isFrontFacing ( direction ) {

		return Triangle.isFrontFacing( this.a, this.b, this.c, direction );

	};

	Triangle.prototype.intersectsBox = function intersectsBox ( box ) {

		return box.intersectsTriangle( this );

	};

	Triangle.prototype.closestPointToPoint = function closestPointToPoint ( p, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		var a = this.a, b = this.b, c = this.c;
		var v, w;

		// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
		// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
		// under the accompanying license; see chapter 5.1.5 for detailed explanation.
		// basically, we're distinguishing which of the voronoi regions of the triangle
		// the point lies in with the minimum amount of redundant computation.

		_vab.subVectors( b, a );
		_vac.subVectors( c, a );
		_vap.subVectors( p, a );
		var d1 = _vab.dot( _vap );
		var d2 = _vac.dot( _vap );
		if ( d1 <= 0 && d2 <= 0 ) {

			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy( a );

		}

		_vbp.subVectors( p, b );
		var d3 = _vab.dot( _vbp );
		var d4 = _vac.dot( _vbp );
		if ( d3 >= 0 && d4 <= d3 ) {

			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy( b );

		}

		var vc = d1 * d4 - d3 * d2;
		if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

			v = d1 / ( d1 - d3 );
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy( a ).addScaledVector( _vab, v );

		}

		_vcp.subVectors( p, c );
		var d5 = _vab.dot( _vcp );
		var d6 = _vac.dot( _vcp );
		if ( d6 >= 0 && d5 <= d6 ) {

			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy( c );

		}

		var vb = d5 * d2 - d1 * d6;
		if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

			w = d2 / ( d2 - d6 );
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy( a ).addScaledVector( _vac, w );

		}

		var va = d3 * d6 - d5 * d4;
		if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

			_vbc.subVectors( c, b );
			w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy( b ).addScaledVector( _vbc, w ); // edge region of BC

		}

		// face region
		var denom = 1 / ( va + vb + vc );
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy( a ).addScaledVector( _vab, v ).addScaledVector( _vac, w );

	};

	Triangle.prototype.equals = function equals ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	};

	var _colorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

	var _hslA = { h: 0, s: 0, l: 0 };
	var _hslB = { h: 0, s: 0, l: 0 };

	function hue2rgb( p, q, t ) {

		if ( t < 0 ) { t += 1; }
		if ( t > 1 ) { t -= 1; }
		if ( t < 1 / 6 ) { return p + ( q - p ) * 6 * t; }
		if ( t < 1 / 2 ) { return q; }
		if ( t < 2 / 3 ) { return p + ( q - p ) * 6 * ( 2 / 3 - t ); }
		return p;

	}

	function SRGBToLinear( c ) {

		return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

	}

	function LinearToSRGB( c ) {

		return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

	}

	var Color = function Color( r, g, b ) {

		Object.defineProperty( this, 'isColor', { value: true } );

		if ( g === undefined && b === undefined ) {

			// r is THREE.Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	};

	Color.prototype.set = function set ( value ) {

		if ( value && value.isColor ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	};

	Color.prototype.setScalar = function setScalar ( scalar ) {

		this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;

	};

	Color.prototype.setHex = function setHex ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	};

	Color.prototype.setRGB = function setRGB ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	};

	Color.prototype.setHSL = function setHSL ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0
		h = MathUtils.euclideanModulo( h, 1 );
		s = MathUtils.clamp( s, 0, 1 );
		l = MathUtils.clamp( l, 0, 1 );

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	};

	Color.prototype.setStyle = function setStyle ( style ) {

		function handleAlpha( string ) {

			if ( string === undefined ) { return; }

			if ( parseFloat( string ) < 1 ) {

				console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

			}

		}


		var m;

		if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

			// rgb / hsl

			var color;
			var name = m[ 1 ];
			var components = m[ 2 ];

			switch ( name ) {

				case 'rgb':
				case 'rgba':

					if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						// rgb(255,0,0) rgba(255,0,0,0.5)
						this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
						this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
						this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

						handleAlpha( color[ 5 ] );

						return this;

					}

					if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
						this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
						this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
						this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

						handleAlpha( color[ 5 ] );

						return this;

					}

					break;

				case 'hsl':
				case 'hsla':

					if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
						var h = parseFloat( color[ 1 ] ) / 360;
						var s = parseInt( color[ 2 ], 10 ) / 100;
						var l = parseInt( color[ 3 ], 10 ) / 100;

						handleAlpha( color[ 5 ] );

						return this.setHSL( h, s, l );

					}

					break;

			}

		} else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

			// hex color

			var hex = m[ 1 ];
			var size = hex.length;

			if ( size === 3 ) {

				// #ff0
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

				return this;

			} else if ( size === 6 ) {

				// #ff0000
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

				return this;

			}

		}

		if ( style && style.length > 0 ) {

			return this.setColorName( style );

		}

		return this;

	};

	Color.prototype.setColorName = function setColorName ( style ) {

		// color keywords
		var hex = _colorKeywords[ style ];

		if ( hex !== undefined ) {

			// red
			this.setHex( hex );

		} else {

			// unknown color
			console.warn( 'THREE.Color: Unknown color ' + style );

		}

		return this;

	};

	Color.prototype.clone = function clone () {

		return new this.constructor( this.r, this.g, this.b );

	};

	Color.prototype.copy = function copy ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	};

	Color.prototype.copyGammaToLinear = function copyGammaToLinear ( color, gammaFactor ) {

		if ( gammaFactor === undefined ) { gammaFactor = 2.0; }

		this.r = Math.pow( color.r, gammaFactor );
		this.g = Math.pow( color.g, gammaFactor );
		this.b = Math.pow( color.b, gammaFactor );

		return this;

	};

	Color.prototype.copyLinearToGamma = function copyLinearToGamma ( color, gammaFactor ) {

		if ( gammaFactor === undefined ) { gammaFactor = 2.0; }

		var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

		this.r = Math.pow( color.r, safeInverse );
		this.g = Math.pow( color.g, safeInverse );
		this.b = Math.pow( color.b, safeInverse );

		return this;

	};

	Color.prototype.convertGammaToLinear = function convertGammaToLinear ( gammaFactor ) {

		this.copyGammaToLinear( this, gammaFactor );

		return this;

	};

	Color.prototype.convertLinearToGamma = function convertLinearToGamma ( gammaFactor ) {

		this.copyLinearToGamma( this, gammaFactor );

		return this;

	};

	Color.prototype.copySRGBToLinear = function copySRGBToLinear ( color ) {

		this.r = SRGBToLinear( color.r );
		this.g = SRGBToLinear( color.g );
		this.b = SRGBToLinear( color.b );

		return this;

	};

	Color.prototype.copyLinearToSRGB = function copyLinearToSRGB ( color ) {

		this.r = LinearToSRGB( color.r );
		this.g = LinearToSRGB( color.g );
		this.b = LinearToSRGB( color.b );

		return this;

	};

	Color.prototype.convertSRGBToLinear = function convertSRGBToLinear () {

		this.copySRGBToLinear( this );

		return this;

	};

	Color.prototype.convertLinearToSRGB = function convertLinearToSRGB () {

		this.copyLinearToSRGB( this );

		return this;

	};

	Color.prototype.getHex = function getHex () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	};

	Color.prototype.getHexString = function getHexString () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	};

	Color.prototype.getHSL = function getHSL ( target ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( target === undefined ) {

			console.warn( 'THREE.Color: .getHSL() target is now required' );
			target = { h: 0, s: 0, l: 0 };

		}

		var r = this.r, g = this.g, b = this.b;

		var max = Math.max( r, g, b );
		var min = Math.min( r, g, b );

		var hue, saturation;
		var lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			var delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		target.h = hue;
		target.s = saturation;
		target.l = lightness;

		return target;

	};

	Color.prototype.getStyle = function getStyle () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	};

	Color.prototype.offsetHSL = function offsetHSL ( h, s, l ) {

		this.getHSL( _hslA );

		_hslA.h += h; _hslA.s += s; _hslA.l += l;

		this.setHSL( _hslA.h, _hslA.s, _hslA.l );

		return this;

	};

	Color.prototype.add = function add ( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	};

	Color.prototype.addColors = function addColors ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	};

	Color.prototype.addScalar = function addScalar ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	};

	Color.prototype.sub = function sub ( color ) {

		this.r = Math.max( 0, this.r - color.r );
		this.g = Math.max( 0, this.g - color.g );
		this.b = Math.max( 0, this.b - color.b );

		return this;

	};

	Color.prototype.multiply = function multiply ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	};

	Color.prototype.multiplyScalar = function multiplyScalar ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	};

	Color.prototype.lerp = function lerp ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	};

	Color.prototype.lerpHSL = function lerpHSL ( color, alpha ) {

		this.getHSL( _hslA );
		color.getHSL( _hslB );

		var h = MathUtils.lerp( _hslA.h, _hslB.h, alpha );
		var s = MathUtils.lerp( _hslA.s, _hslB.s, alpha );
		var l = MathUtils.lerp( _hslA.l, _hslB.l, alpha );

		this.setHSL( h, s, l );

		return this;

	};

	Color.prototype.equals = function equals ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	};

	Color.prototype.fromArray = function fromArray ( array, offset ) {

		if ( offset === undefined ) { offset = 0; }

		this.r = array[ offset ];
		this.g = array[ offset + 1 ];
		this.b = array[ offset + 2 ];

		return this;

	};

	Color.prototype.toArray = function toArray ( array, offset ) {

		if ( array === undefined ) { array = []; }
		if ( offset === undefined ) { offset = 0; }

		array[ offset ] = this.r;
		array[ offset + 1 ] = this.g;
		array[ offset + 2 ] = this.b;

		return array;

	};

	Color.prototype.fromBufferAttribute = function fromBufferAttribute ( attribute, index ) {

		this.r = attribute.getX( index );
		this.g = attribute.getY( index );
		this.b = attribute.getZ( index );

		if ( attribute.normalized === true ) {

			// assuming Uint8Array

			this.r /= 255;
			this.g /= 255;
			this.b /= 255;

		}

		return this;

	};

	Color.prototype.toJSON = function toJSON () {

		return this.getHex();

	};

	Color.NAMES = _colorKeywords;
	Color.prototype.r = 1;
	Color.prototype.g = 1;
	Color.prototype.b = 1;

	var Face3 = function Face3( a, b, c, normal, color, materialIndex ) {

		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal.isVector3 ) ? normal : new Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color.isColor ) ? color : new Color();
		this.vertexColors = Array.isArray( color ) ? color : [];

		this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

	};

	Face3.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Face3.prototype.copy = function copy ( source ) {

		this.a = source.a;
		this.b = source.b;
		this.c = source.c;

		this.normal.copy( source.normal );
		this.color.copy( source.color );

		this.materialIndex = source.materialIndex;

		for ( var i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

			this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

		}

		for ( var i$1 = 0, il$1 = source.vertexColors.length; i$1 < il$1; i$1 ++ ) {

			this.vertexColors[ i$1 ] = source.vertexColors[ i$1 ].clone();

		}

		return this;

	};

	var materialId = 0;

	function Material() {

		Object.defineProperty( this, 'id', { value: materialId ++ } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';
		this.type = 'Material';

		this.fog = true;

		this.blending = NormalBlending;
		this.side = FrontSide;
		this.flatShading = false;
		this.vertexColors = false;

		this.opacity = 1;
		this.transparent = false;

		this.blendSrc = SrcAlphaFactor;
		this.blendDst = OneMinusSrcAlphaFactor;
		this.blendEquation = AddEquation;
		this.blendSrcAlpha = null;
		this.blendDstAlpha = null;
		this.blendEquationAlpha = null;

		this.depthFunc = LessEqualDepth;
		this.depthTest = true;
		this.depthWrite = true;

		this.stencilWriteMask = 0xff;
		this.stencilFunc = AlwaysStencilFunc;
		this.stencilRef = 0;
		this.stencilFuncMask = 0xff;
		this.stencilFail = KeepStencilOp;
		this.stencilZFail = KeepStencilOp;
		this.stencilZPass = KeepStencilOp;
		this.stencilWrite = false;

		this.clippingPlanes = null;
		this.clipIntersection = false;
		this.clipShadows = false;

		this.shadowSide = null;

		this.colorWrite = true;

		this.precision = null; // override the renderer's default precision for this material

		this.polygonOffset = false;
		this.polygonOffsetFactor = 0;
		this.polygonOffsetUnits = 0;

		this.dithering = false;

		this.alphaTest = 0;
		this.premultipliedAlpha = false;

		this.visible = true;

		this.toneMapped = true;

		this.userData = {};

		this.version = 0;

	}

	Material.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Material,

		isMaterial: true,

		onBeforeCompile: function ( /* shaderobject, renderer */ ) {},

		customProgramCacheKey: function () {

			return this.onBeforeCompile.toString();

		},

		setValues: function ( values ) {

			if ( values === undefined ) { return; }

			for ( var key in values ) {

				var newValue = values[ key ];

				if ( newValue === undefined ) {

					console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
					continue;

				}

				// for backward compatability if shading is set in the constructor
				if ( key === 'shading' ) {

					console.warn( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
					this.flatShading = ( newValue === FlatShading ) ? true : false;
					continue;

				}

				var currentValue = this[ key ];

				if ( currentValue === undefined ) {

					console.warn( "THREE." + this.type + ": '" + key + "' is not a property of this material." );
					continue;

				}

				if ( currentValue && currentValue.isColor ) {

					currentValue.set( newValue );

				} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

					currentValue.copy( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		},

		toJSON: function ( meta ) {

			var isRoot = ( meta === undefined || typeof meta === 'string' );

			if ( isRoot ) {

				meta = {
					textures: {},
					images: {}
				};

			}

			var data = {
				metadata: {
					version: 4.5,
					type: 'Material',
					generator: 'Material.toJSON'
				}
			};

			// standard Material serialization
			data.uuid = this.uuid;
			data.type = this.type;

			if ( this.name !== '' ) { data.name = this.name; }

			if ( this.color && this.color.isColor ) { data.color = this.color.getHex(); }

			if ( this.roughness !== undefined ) { data.roughness = this.roughness; }
			if ( this.metalness !== undefined ) { data.metalness = this.metalness; }

			if ( this.sheen && this.sheen.isColor ) { data.sheen = this.sheen.getHex(); }
			if ( this.emissive && this.emissive.isColor ) { data.emissive = this.emissive.getHex(); }
			if ( this.emissiveIntensity && this.emissiveIntensity !== 1 ) { data.emissiveIntensity = this.emissiveIntensity; }

			if ( this.specular && this.specular.isColor ) { data.specular = this.specular.getHex(); }
			if ( this.shininess !== undefined ) { data.shininess = this.shininess; }
			if ( this.clearcoat !== undefined ) { data.clearcoat = this.clearcoat; }
			if ( this.clearcoatRoughness !== undefined ) { data.clearcoatRoughness = this.clearcoatRoughness; }

			if ( this.clearcoatMap && this.clearcoatMap.isTexture ) {

				data.clearcoatMap = this.clearcoatMap.toJSON( meta ).uuid;

			}

			if ( this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture ) {

				data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON( meta ).uuid;

			}

			if ( this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture ) {

				data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON( meta ).uuid;
				data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();

			}

			if ( this.map && this.map.isTexture ) { data.map = this.map.toJSON( meta ).uuid; }
			if ( this.matcap && this.matcap.isTexture ) { data.matcap = this.matcap.toJSON( meta ).uuid; }
			if ( this.alphaMap && this.alphaMap.isTexture ) { data.alphaMap = this.alphaMap.toJSON( meta ).uuid; }
			if ( this.lightMap && this.lightMap.isTexture ) { data.lightMap = this.lightMap.toJSON( meta ).uuid; }

			if ( this.aoMap && this.aoMap.isTexture ) {

				data.aoMap = this.aoMap.toJSON( meta ).uuid;
				data.aoMapIntensity = this.aoMapIntensity;

			}

			if ( this.bumpMap && this.bumpMap.isTexture ) {

				data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
				data.bumpScale = this.bumpScale;

			}

			if ( this.normalMap && this.normalMap.isTexture ) {

				data.normalMap = this.normalMap.toJSON( meta ).uuid;
				data.normalMapType = this.normalMapType;
				data.normalScale = this.normalScale.toArray();

			}

			if ( this.displacementMap && this.displacementMap.isTexture ) {

				data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
				data.displacementScale = this.displacementScale;
				data.displacementBias = this.displacementBias;

			}

			if ( this.roughnessMap && this.roughnessMap.isTexture ) { data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid; }
			if ( this.metalnessMap && this.metalnessMap.isTexture ) { data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid; }

			if ( this.emissiveMap && this.emissiveMap.isTexture ) { data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid; }
			if ( this.specularMap && this.specularMap.isTexture ) { data.specularMap = this.specularMap.toJSON( meta ).uuid; }

			if ( this.envMap && this.envMap.isTexture ) {

				data.envMap = this.envMap.toJSON( meta ).uuid;
				data.reflectivity = this.reflectivity; // Scale behind envMap
				data.refractionRatio = this.refractionRatio;

				if ( this.combine !== undefined ) { data.combine = this.combine; }
				if ( this.envMapIntensity !== undefined ) { data.envMapIntensity = this.envMapIntensity; }

			}

			if ( this.gradientMap && this.gradientMap.isTexture ) {

				data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

			}

			if ( this.size !== undefined ) { data.size = this.size; }
			if ( this.sizeAttenuation !== undefined ) { data.sizeAttenuation = this.sizeAttenuation; }

			if ( this.blending !== NormalBlending ) { data.blending = this.blending; }
			if ( this.flatShading === true ) { data.flatShading = this.flatShading; }
			if ( this.side !== FrontSide ) { data.side = this.side; }
			if ( this.vertexColors ) { data.vertexColors = true; }

			if ( this.opacity < 1 ) { data.opacity = this.opacity; }
			if ( this.transparent === true ) { data.transparent = this.transparent; }

			data.depthFunc = this.depthFunc;
			data.depthTest = this.depthTest;
			data.depthWrite = this.depthWrite;

			data.stencilWrite = this.stencilWrite;
			data.stencilWriteMask = this.stencilWriteMask;
			data.stencilFunc = this.stencilFunc;
			data.stencilRef = this.stencilRef;
			data.stencilFuncMask = this.stencilFuncMask;
			data.stencilFail = this.stencilFail;
			data.stencilZFail = this.stencilZFail;
			data.stencilZPass = this.stencilZPass;

			// rotation (SpriteMaterial)
			if ( this.rotation && this.rotation !== 0 ) { data.rotation = this.rotation; }

			if ( this.polygonOffset === true ) { data.polygonOffset = true; }
			if ( this.polygonOffsetFactor !== 0 ) { data.polygonOffsetFactor = this.polygonOffsetFactor; }
			if ( this.polygonOffsetUnits !== 0 ) { data.polygonOffsetUnits = this.polygonOffsetUnits; }

			if ( this.linewidth && this.linewidth !== 1 ) { data.linewidth = this.linewidth; }
			if ( this.dashSize !== undefined ) { data.dashSize = this.dashSize; }
			if ( this.gapSize !== undefined ) { data.gapSize = this.gapSize; }
			if ( this.scale !== undefined ) { data.scale = this.scale; }

			if ( this.dithering === true ) { data.dithering = true; }

			if ( this.alphaTest > 0 ) { data.alphaTest = this.alphaTest; }
			if ( this.premultipliedAlpha === true ) { data.premultipliedAlpha = this.premultipliedAlpha; }

			if ( this.wireframe === true ) { data.wireframe = this.wireframe; }
			if ( this.wireframeLinewidth > 1 ) { data.wireframeLinewidth = this.wireframeLinewidth; }
			if ( this.wireframeLinecap !== 'round' ) { data.wireframeLinecap = this.wireframeLinecap; }
			if ( this.wireframeLinejoin !== 'round' ) { data.wireframeLinejoin = this.wireframeLinejoin; }

			if ( this.morphTargets === true ) { data.morphTargets = true; }
			if ( this.morphNormals === true ) { data.morphNormals = true; }
			if ( this.skinning === true ) { data.skinning = true; }

			if ( this.visible === false ) { data.visible = false; }

			if ( this.toneMapped === false ) { data.toneMapped = false; }

			if ( JSON.stringify( this.userData ) !== '{}' ) { data.userData = this.userData; }

			// TODO: Copied from Object3D.toJSON

			function extractFromCache( cache ) {

				var values = [];

				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

			if ( isRoot ) {

				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );

				if ( textures.length > 0 ) { data.textures = textures; }
				if ( images.length > 0 ) { data.images = images; }

			}

			return data;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.fog = source.fog;

			this.blending = source.blending;
			this.side = source.side;
			this.flatShading = source.flatShading;
			this.vertexColors = source.vertexColors;

			this.opacity = source.opacity;
			this.transparent = source.transparent;

			this.blendSrc = source.blendSrc;
			this.blendDst = source.blendDst;
			this.blendEquation = source.blendEquation;
			this.blendSrcAlpha = source.blendSrcAlpha;
			this.blendDstAlpha = source.blendDstAlpha;
			this.blendEquationAlpha = source.blendEquationAlpha;

			this.depthFunc = source.depthFunc;
			this.depthTest = source.depthTest;
			this.depthWrite = source.depthWrite;

			this.stencilWriteMask = source.stencilWriteMask;
			this.stencilFunc = source.stencilFunc;
			this.stencilRef = source.stencilRef;
			this.stencilFuncMask = source.stencilFuncMask;
			this.stencilFail = source.stencilFail;
			this.stencilZFail = source.stencilZFail;
			this.stencilZPass = source.stencilZPass;
			this.stencilWrite = source.stencilWrite;

			var srcPlanes = source.clippingPlanes;
			var dstPlanes = null;

			if ( srcPlanes !== null ) {

				var n = srcPlanes.length;
				dstPlanes = new Array( n );

				for ( var i = 0; i !== n; ++ i ) {

					dstPlanes[ i ] = srcPlanes[ i ].clone();

				}

			}

			this.clippingPlanes = dstPlanes;
			this.clipIntersection = source.clipIntersection;
			this.clipShadows = source.clipShadows;

			this.shadowSide = source.shadowSide;

			this.colorWrite = source.colorWrite;

			this.precision = source.precision;

			this.polygonOffset = source.polygonOffset;
			this.polygonOffsetFactor = source.polygonOffsetFactor;
			this.polygonOffsetUnits = source.polygonOffsetUnits;

			this.dithering = source.dithering;

			this.alphaTest = source.alphaTest;
			this.premultipliedAlpha = source.premultipliedAlpha;

			this.visible = source.visible;

			this.toneMapped = source.toneMapped;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	Object.defineProperty( Material.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) { this.version ++; }

		}

	} );

	/**
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>
	 * }
	 */

	function MeshBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;

		this.setValues( parameters );

	}

	MeshBasicMaterial.prototype = Object.create( Material.prototype );
	MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

	MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

	MeshBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		return this;

	};

	var _vector$3 = new Vector3();
	var _vector2$1 = new Vector2();

	function BufferAttribute( array, itemSize, normalized ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

		}

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.usage = StaticDrawUsage;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( BufferAttribute.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) { this.version ++; }

		}

	} );

	Object.assign( BufferAttribute.prototype, {

		isBufferAttribute: true,

		onUploadCallback: function () {},

		setUsage: function ( value ) {

			this.usage = value;

			return this;

		},

		copy: function ( source ) {

			this.name = source.name;
			this.array = new source.array.constructor( source.array );
			this.itemSize = source.itemSize;
			this.count = source.count;
			this.normalized = source.normalized;

			this.usage = source.usage;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.itemSize;
			index2 *= attribute.itemSize;

			for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		copyArray: function ( array ) {

			this.array.set( array );

			return this;

		},

		copyColorsArray: function ( colors ) {

			var array = this.array;
			var offset = 0;

			for ( var i = 0, l = colors.length; i < l; i ++ ) {

				var color = colors[ i ];

				if ( color === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
					color = new Color();

				}

				array[ offset ++ ] = color.r;
				array[ offset ++ ] = color.g;
				array[ offset ++ ] = color.b;

			}

			return this;

		},

		copyVector2sArray: function ( vectors ) {

			var array = this.array;
			var offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
					vector = new Vector2();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;

			}

			return this;

		},

		copyVector3sArray: function ( vectors ) {

			var array = this.array;
			var offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
					vector = new Vector3();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;

			}

			return this;

		},

		copyVector4sArray: function ( vectors ) {

			var array = this.array;
			var offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
					vector = new Vector4();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;
				array[ offset ++ ] = vector.w;

			}

			return this;

		},

		applyMatrix3: function ( m ) {

			if ( this.itemSize === 2 ) {

				for ( var i = 0, l = this.count; i < l; i ++ ) {

					_vector2$1.fromBufferAttribute( this, i );
					_vector2$1.applyMatrix3( m );

					this.setXY( i, _vector2$1.x, _vector2$1.y );

				}

			} else if ( this.itemSize === 3 ) {

				for ( var i$1 = 0, l$1 = this.count; i$1 < l$1; i$1 ++ ) {

					_vector$3.fromBufferAttribute( this, i$1 );
					_vector$3.applyMatrix3( m );

					this.setXYZ( i$1, _vector$3.x, _vector$3.y, _vector$3.z );

				}

			}

			return this;

		},

		applyMatrix4: function ( m ) {

			for ( var i = 0, l = this.count; i < l; i ++ ) {

				_vector$3.x = this.getX( i );
				_vector$3.y = this.getY( i );
				_vector$3.z = this.getZ( i );

				_vector$3.applyMatrix4( m );

				this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

			}

			return this;

		},

		applyNormalMatrix: function ( m ) {

			for ( var i = 0, l = this.count; i < l; i ++ ) {

				_vector$3.x = this.getX( i );
				_vector$3.y = this.getY( i );
				_vector$3.z = this.getZ( i );

				_vector$3.applyNormalMatrix( m );

				this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

			}

			return this;

		},

		transformDirection: function ( m ) {

			for ( var i = 0, l = this.count; i < l; i ++ ) {

				_vector$3.x = this.getX( i );
				_vector$3.y = this.getY( i );
				_vector$3.z = this.getZ( i );

				_vector$3.transformDirection( m );

				this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) { offset = 0; }

			this.array.set( value, offset );

			return this;

		},

		getX: function ( index ) {

			return this.array[ index * this.itemSize ];

		},

		setX: function ( index, x ) {

			this.array[ index * this.itemSize ] = x;

			return this;

		},

		getY: function ( index ) {

			return this.array[ index * this.itemSize + 1 ];

		},

		setY: function ( index, y ) {

			this.array[ index * this.itemSize + 1 ] = y;

			return this;

		},

		getZ: function ( index ) {

			return this.array[ index * this.itemSize + 2 ];

		},

		setZ: function ( index, z ) {

			this.array[ index * this.itemSize + 2 ] = z;

			return this;

		},

		getW: function ( index ) {

			return this.array[ index * this.itemSize + 3 ];

		},

		setW: function ( index, w ) {

			this.array[ index * this.itemSize + 3 ] = w;

			return this;

		},

		setXY: function ( index, x, y ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;
			this.array[ index + 3 ] = w;

			return this;

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		},

		clone: function () {

			return new this.constructor( this.array, this.itemSize ).copy( this );

		},

		toJSON: function () {

			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: Array.prototype.slice.call( this.array ),
				normalized: this.normalized
			};

		}

	} );

	//

	function Int8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int8Array( array ), itemSize, normalized );

	}

	Int8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;


	function Uint8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8Array( array ), itemSize, normalized );

	}

	Uint8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;


	function Uint8ClampedBufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8ClampedArray( array ), itemSize, normalized );

	}

	Uint8ClampedBufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;


	function Int16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int16Array( array ), itemSize, normalized );

	}

	Int16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;


	function Uint16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

	}

	Uint16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;


	function Int32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int32Array( array ), itemSize, normalized );

	}

	Int32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;


	function Uint32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint32Array( array ), itemSize, normalized );

	}

	Uint32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;


	function Float32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );

	}

	Float32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;


	function Float64BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float64Array( array ), itemSize, normalized );

	}

	Float64BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

	var DirectGeometry = function DirectGeometry() {

		this.vertices = [];
		this.normals = [];
		this.colors = [];
		this.uvs = [];
		this.uvs2 = [];

		this.groups = [];

		this.morphTargets = {};

		this.skinWeights = [];
		this.skinIndices = [];

		// this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.verticesNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.groupsNeedUpdate = false;

	};

	DirectGeometry.prototype.computeGroups = function computeGroups ( geometry ) {

		var groups = [];

		var group, i;
		var materialIndex = undefined;

		var faces = geometry.faces;

		for ( i = 0; i < faces.length; i ++ ) {

			var face = faces[ i ];

			// materials

			if ( face.materialIndex !== materialIndex ) {

				materialIndex = face.materialIndex;

				if ( group !== undefined ) {

					group.count = ( i * 3 ) - group.start;
					groups.push( group );

				}

				group = {
					start: i * 3,
					materialIndex: materialIndex
				};

			}

		}

		if ( group !== undefined ) {

			group.count = ( i * 3 ) - group.start;
			groups.push( group );

		}

		this.groups = groups;

	};

	DirectGeometry.prototype.fromGeometry = function fromGeometry ( geometry ) {

		var faces = geometry.faces;
		var vertices = geometry.vertices;
		var faceVertexUvs = geometry.faceVertexUvs;

		var hasFaceVertexUv = faceVertexUvs[ 0 ] && faceVertexUvs[ 0 ].length > 0;
		var hasFaceVertexUv2 = faceVertexUvs[ 1 ] && faceVertexUvs[ 1 ].length > 0;

		// morphs

		var morphTargets = geometry.morphTargets;
		var morphTargetsLength = morphTargets.length;

		var morphTargetsPosition;

		if ( morphTargetsLength > 0 ) {

			morphTargetsPosition = [];

			for ( var i = 0; i < morphTargetsLength; i ++ ) {

				morphTargetsPosition[ i ] = {
					name: morphTargets[ i ].name,
					 data: []
				};

			}

			this.morphTargets.position = morphTargetsPosition;

		}

		var morphNormals = geometry.morphNormals;
		var morphNormalsLength = morphNormals.length;

		var morphTargetsNormal;

		if ( morphNormalsLength > 0 ) {

			morphTargetsNormal = [];

			for ( var i$1 = 0; i$1 < morphNormalsLength; i$1 ++ ) {

				morphTargetsNormal[ i$1 ] = {
					name: morphNormals[ i$1 ].name,
					 data: []
				};

			}

			this.morphTargets.normal = morphTargetsNormal;

		}

		// skins

		var skinIndices = geometry.skinIndices;
		var skinWeights = geometry.skinWeights;

		var hasSkinIndices = skinIndices.length === vertices.length;
		var hasSkinWeights = skinWeights.length === vertices.length;

		//

		if ( vertices.length > 0 && faces.length === 0 ) {

			console.error( 'THREE.DirectGeometry: Faceless geometries are not supported.' );

		}

		for ( var i$2 = 0; i$2 < faces.length; i$2 ++ ) {

			var face = faces[ i$2 ];

			this.vertices.push( vertices[ face.a ], vertices[ face.b ], vertices[ face.c ] );

			var vertexNormals = face.vertexNormals;

			if ( vertexNormals.length === 3 ) {

				this.normals.push( vertexNormals[ 0 ], vertexNormals[ 1 ], vertexNormals[ 2 ] );

			} else {

				var normal = face.normal;

				this.normals.push( normal, normal, normal );

			}

			var vertexColors = face.vertexColors;

			if ( vertexColors.length === 3 ) {

				this.colors.push( vertexColors[ 0 ], vertexColors[ 1 ], vertexColors[ 2 ] );

			} else {

				var color = face.color;

				this.colors.push( color, color, color );

			}

			if ( hasFaceVertexUv === true ) {

				var vertexUvs = faceVertexUvs[ 0 ][ i$2 ];

				if ( vertexUvs !== undefined ) {

					this.uvs.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

				} else {

					console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i$2 );

					this.uvs.push( new Vector2(), new Vector2(), new Vector2() );

				}

			}

			if ( hasFaceVertexUv2 === true ) {

				var vertexUvs$1 = faceVertexUvs[ 1 ][ i$2 ];

				if ( vertexUvs$1 !== undefined ) {

					this.uvs2.push( vertexUvs$1[ 0 ], vertexUvs$1[ 1 ], vertexUvs$1[ 2 ] );

				} else {

					console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i$2 );

					this.uvs2.push( new Vector2(), new Vector2(), new Vector2() );

				}

			}

			// morphs

			for ( var j = 0; j < morphTargetsLength; j ++ ) {

				var morphTarget = morphTargets[ j ].vertices;

				morphTargetsPosition[ j ].data.push( morphTarget[ face.a ], morphTarget[ face.b ], morphTarget[ face.c ] );

			}

			for ( var j$1 = 0; j$1 < morphNormalsLength; j$1 ++ ) {

				var morphNormal = morphNormals[ j$1 ].vertexNormals[ i$2 ];

				morphTargetsNormal[ j$1 ].data.push( morphNormal.a, morphNormal.b, morphNormal.c );

			}

			// skins

			if ( hasSkinIndices ) {

				this.skinIndices.push( skinIndices[ face.a ], skinIndices[ face.b ], skinIndices[ face.c ] );

			}

			if ( hasSkinWeights ) {

				this.skinWeights.push( skinWeights[ face.a ], skinWeights[ face.b ], skinWeights[ face.c ] );

			}

		}

		this.computeGroups( geometry );

		this.verticesNeedUpdate = geometry.verticesNeedUpdate;
		this.normalsNeedUpdate = geometry.normalsNeedUpdate;
		this.colorsNeedUpdate = geometry.colorsNeedUpdate;
		this.uvsNeedUpdate = geometry.uvsNeedUpdate;
		this.groupsNeedUpdate = geometry.groupsNeedUpdate;

		if ( geometry.boundingSphere !== null ) {

			this.boundingSphere = geometry.boundingSphere.clone();

		}

		if ( geometry.boundingBox !== null ) {

			this.boundingBox = geometry.boundingBox.clone();

		}

		return this;

	};

	function arrayMax( array ) {

		if ( array.length === 0 ) { return - Infinity; }

		var max = array[ 0 ];

		for ( var i = 1, l = array.length; i < l; ++ i ) {

			if ( array[ i ] > max ) { max = array[ i ]; }

		}

		return max;

	}

	var _bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id

	var _m1$2 = new Matrix4();
	var _obj = new Object3D();
	var _offset = new Vector3();
	var _box$2 = new Box3();
	var _boxMorphTargets = new Box3();
	var _vector$4 = new Vector3();

	function BufferGeometry() {

		Object.defineProperty( this, 'id', { value: _bufferGeometryId += 2 } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};
		this.morphTargetsRelative = false;

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = { start: 0, count: Infinity };

		this.userData = {};

	}

	BufferGeometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: BufferGeometry,

		isBufferGeometry: true,

		getIndex: function () {

			return this.index;

		},

		setIndex: function ( index ) {

			if ( Array.isArray( index ) ) {

				this.index = new ( arrayMax( index ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

			} else {

				this.index = index;

			}

		},

		getAttribute: function ( name ) {

			return this.attributes[ name ];

		},

		setAttribute: function ( name, attribute ) {

			this.attributes[ name ] = attribute;

			return this;

		},

		deleteAttribute: function ( name ) {

			delete this.attributes[ name ];

			return this;

		},

		addGroup: function ( start, count, materialIndex ) {

			this.groups.push( {

				start: start,
				count: count,
				materialIndex: materialIndex !== undefined ? materialIndex : 0

			} );

		},

		clearGroups: function () {

			this.groups = [];

		},

		setDrawRange: function ( start, count ) {

			this.drawRange.start = start;
			this.drawRange.count = count;

		},

		applyMatrix4: function ( matrix ) {

			var position = this.attributes.position;

			if ( position !== undefined ) {

				position.applyMatrix4( matrix );

				position.needsUpdate = true;

			}

			var normal = this.attributes.normal;

			if ( normal !== undefined ) {

				var normalMatrix = new Matrix3().getNormalMatrix( matrix );

				normal.applyNormalMatrix( normalMatrix );

				normal.needsUpdate = true;

			}

			var tangent = this.attributes.tangent;

			if ( tangent !== undefined ) {

				tangent.transformDirection( matrix );

				tangent.needsUpdate = true;

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			return this;

		},

		rotateX: function ( angle ) {

			// rotate geometry around world x-axis

			_m1$2.makeRotationX( angle );

			this.applyMatrix4( _m1$2 );

			return this;

		},

		rotateY: function ( angle ) {

			// rotate geometry around world y-axis

			_m1$2.makeRotationY( angle );

			this.applyMatrix4( _m1$2 );

			return this;

		},

		rotateZ: function ( angle ) {

			// rotate geometry around world z-axis

			_m1$2.makeRotationZ( angle );

			this.applyMatrix4( _m1$2 );

			return this;

		},

		translate: function ( x, y, z ) {

			// translate geometry

			_m1$2.makeTranslation( x, y, z );

			this.applyMatrix4( _m1$2 );

			return this;

		},

		scale: function ( x, y, z ) {

			// scale geometry

			_m1$2.makeScale( x, y, z );

			this.applyMatrix4( _m1$2 );

			return this;

		},

		lookAt: function ( vector ) {

			_obj.lookAt( vector );

			_obj.updateMatrix();

			this.applyMatrix4( _obj.matrix );

			return this;

		},

		center: function () {

			this.computeBoundingBox();

			this.boundingBox.getCenter( _offset ).negate();

			this.translate( _offset.x, _offset.y, _offset.z );

			return this;

		},

		setFromObject: function ( object ) {

			// console.log( 'THREE.BufferGeometry.setFromObject(). Converting', object, this );

			var geometry = object.geometry;

			if ( object.isPoints || object.isLine ) {

				var positions = new Float32BufferAttribute( geometry.vertices.length * 3, 3 );
				var colors = new Float32BufferAttribute( geometry.colors.length * 3, 3 );

				this.setAttribute( 'position', positions.copyVector3sArray( geometry.vertices ) );
				this.setAttribute( 'color', colors.copyColorsArray( geometry.colors ) );

				if ( geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length ) {

					var lineDistances = new Float32BufferAttribute( geometry.lineDistances.length, 1 );

					this.setAttribute( 'lineDistance', lineDistances.copyArray( geometry.lineDistances ) );

				}

				if ( geometry.boundingSphere !== null ) {

					this.boundingSphere = geometry.boundingSphere.clone();

				}

				if ( geometry.boundingBox !== null ) {

					this.boundingBox = geometry.boundingBox.clone();

				}

			} else if ( object.isMesh ) {

				if ( geometry && geometry.isGeometry ) {

					this.fromGeometry( geometry );

				}

			}

			return this;

		},

		setFromPoints: function ( points ) {

			var position = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				position.push( point.x, point.y, point.z || 0 );

			}

			this.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

			return this;

		},

		updateFromObject: function ( object ) {

			var geometry = object.geometry;

			if ( object.isMesh ) {

				var direct = geometry.__directGeometry;

				if ( geometry.elementsNeedUpdate === true ) {

					direct = undefined;
					geometry.elementsNeedUpdate = false;

				}

				if ( direct === undefined ) {

					return this.fromGeometry( geometry );

				}

				direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
				direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
				direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
				direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
				direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

				geometry.verticesNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.groupsNeedUpdate = false;

				geometry = direct;

			}

			if ( geometry.verticesNeedUpdate === true ) {

				var attribute = this.attributes.position;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.vertices );
					attribute.needsUpdate = true;

				}

				geometry.verticesNeedUpdate = false;

			}

			if ( geometry.normalsNeedUpdate === true ) {

				var attribute$1 = this.attributes.normal;

				if ( attribute$1 !== undefined ) {

					attribute$1.copyVector3sArray( geometry.normals );
					attribute$1.needsUpdate = true;

				}

				geometry.normalsNeedUpdate = false;

			}

			if ( geometry.colorsNeedUpdate === true ) {

				var attribute$2 = this.attributes.color;

				if ( attribute$2 !== undefined ) {

					attribute$2.copyColorsArray( geometry.colors );
					attribute$2.needsUpdate = true;

				}

				geometry.colorsNeedUpdate = false;

			}

			if ( geometry.uvsNeedUpdate ) {

				var attribute$3 = this.attributes.uv;

				if ( attribute$3 !== undefined ) {

					attribute$3.copyVector2sArray( geometry.uvs );
					attribute$3.needsUpdate = true;

				}

				geometry.uvsNeedUpdate = false;

			}

			if ( geometry.lineDistancesNeedUpdate ) {

				var attribute$4 = this.attributes.lineDistance;

				if ( attribute$4 !== undefined ) {

					attribute$4.copyArray( geometry.lineDistances );
					attribute$4.needsUpdate = true;

				}

				geometry.lineDistancesNeedUpdate = false;

			}

			if ( geometry.groupsNeedUpdate ) {

				geometry.computeGroups( object.geometry );
				this.groups = geometry.groups;

				geometry.groupsNeedUpdate = false;

			}

			return this;

		},

		fromGeometry: function ( geometry ) {

			geometry.__directGeometry = new DirectGeometry().fromGeometry( geometry );

			return this.fromDirectGeometry( geometry.__directGeometry );

		},

		fromDirectGeometry: function ( geometry ) {

			var positions = new Float32Array( geometry.vertices.length * 3 );
			this.setAttribute( 'position', new BufferAttribute( positions, 3 ).copyVector3sArray( geometry.vertices ) );

			if ( geometry.normals.length > 0 ) {

				var normals = new Float32Array( geometry.normals.length * 3 );
				this.setAttribute( 'normal', new BufferAttribute( normals, 3 ).copyVector3sArray( geometry.normals ) );

			}

			if ( geometry.colors.length > 0 ) {

				var colors = new Float32Array( geometry.colors.length * 3 );
				this.setAttribute( 'color', new BufferAttribute( colors, 3 ).copyColorsArray( geometry.colors ) );

			}

			if ( geometry.uvs.length > 0 ) {

				var uvs = new Float32Array( geometry.uvs.length * 2 );
				this.setAttribute( 'uv', new BufferAttribute( uvs, 2 ).copyVector2sArray( geometry.uvs ) );

			}

			if ( geometry.uvs2.length > 0 ) {

				var uvs2 = new Float32Array( geometry.uvs2.length * 2 );
				this.setAttribute( 'uv2', new BufferAttribute( uvs2, 2 ).copyVector2sArray( geometry.uvs2 ) );

			}

			// groups

			this.groups = geometry.groups;

			// morphs

			for ( var name in geometry.morphTargets ) {

				var array = [];
				var morphTargets = geometry.morphTargets[ name ];

				for ( var i = 0, l = morphTargets.length; i < l; i ++ ) {

					var morphTarget = morphTargets[ i ];

					var attribute = new Float32BufferAttribute( morphTarget.data.length * 3, 3 );
					attribute.name = morphTarget.name;

					array.push( attribute.copyVector3sArray( morphTarget.data ) );

				}

				this.morphAttributes[ name ] = array;

			}

			// skinning

			if ( geometry.skinIndices.length > 0 ) {

				var skinIndices = new Float32BufferAttribute( geometry.skinIndices.length * 4, 4 );
				this.setAttribute( 'skinIndex', skinIndices.copyVector4sArray( geometry.skinIndices ) );

			}

			if ( geometry.skinWeights.length > 0 ) {

				var skinWeights = new Float32BufferAttribute( geometry.skinWeights.length * 4, 4 );
				this.setAttribute( 'skinWeight', skinWeights.copyVector4sArray( geometry.skinWeights ) );

			}

			//

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			return this;

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			var position = this.attributes.position;
			var morphAttributesPosition = this.morphAttributes.position;

			if ( position && position.isGLBufferAttribute ) {

				console.error( 'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this );

				this.boundingBox.set(
					new Vector3( - Infinity, - Infinity, - Infinity ),
					new Vector3( + Infinity, + Infinity, + Infinity )
				);

				return;

			}

			if ( position !== undefined ) {

				this.boundingBox.setFromBufferAttribute( position );

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( var i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

						var morphAttribute = morphAttributesPosition[ i ];
						_box$2.setFromBufferAttribute( morphAttribute );

						if ( this.morphTargetsRelative ) {

							_vector$4.addVectors( this.boundingBox.min, _box$2.min );
							this.boundingBox.expandByPoint( _vector$4 );

							_vector$4.addVectors( this.boundingBox.max, _box$2.max );
							this.boundingBox.expandByPoint( _vector$4 );

						} else {

							this.boundingBox.expandByPoint( _box$2.min );
							this.boundingBox.expandByPoint( _box$2.max );

						}

					}

				}

			} else {

				this.boundingBox.makeEmpty();

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				console.error( 'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

			}

		},

		computeBoundingSphere: function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new Sphere();

			}

			var position = this.attributes.position;
			var morphAttributesPosition = this.morphAttributes.position;

			if ( position && position.isGLBufferAttribute ) {

				console.error( 'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this );

				this.boundingSphere.set( new Vector3(), Infinity );

				return;

			}

			if ( position ) {

				// first, find the center of the bounding sphere

				var center = this.boundingSphere.center;

				_box$2.setFromBufferAttribute( position );

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( var i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

						var morphAttribute = morphAttributesPosition[ i ];
						_boxMorphTargets.setFromBufferAttribute( morphAttribute );

						if ( this.morphTargetsRelative ) {

							_vector$4.addVectors( _box$2.min, _boxMorphTargets.min );
							_box$2.expandByPoint( _vector$4 );

							_vector$4.addVectors( _box$2.max, _boxMorphTargets.max );
							_box$2.expandByPoint( _vector$4 );

						} else {

							_box$2.expandByPoint( _boxMorphTargets.min );
							_box$2.expandByPoint( _boxMorphTargets.max );

						}

					}

				}

				_box$2.getCenter( center );

				// second, try to find a boundingSphere with a radius smaller than the
				// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

				var maxRadiusSq = 0;

				for ( var i$1 = 0, il$1 = position.count; i$1 < il$1; i$1 ++ ) {

					_vector$4.fromBufferAttribute( position, i$1 );

					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$4 ) );

				}

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( var i$2 = 0, il$2 = morphAttributesPosition.length; i$2 < il$2; i$2 ++ ) {

						var morphAttribute$1 = morphAttributesPosition[ i$2 ];
						var morphTargetsRelative = this.morphTargetsRelative;

						for ( var j = 0, jl = morphAttribute$1.count; j < jl; j ++ ) {

							_vector$4.fromBufferAttribute( morphAttribute$1, j );

							if ( morphTargetsRelative ) {

								_offset.fromBufferAttribute( position, j );
								_vector$4.add( _offset );

							}

							maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$4 ) );

						}

					}

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

				}

			}

		},

		computeFaceNormals: function () {

			// backwards compatibility

		},

		computeVertexNormals: function () {

			var index = this.index;
			var positionAttribute = this.getAttribute( 'position' );

			if ( positionAttribute !== undefined ) {

				var normalAttribute = this.getAttribute( 'normal' );

				if ( normalAttribute === undefined ) {

					normalAttribute = new BufferAttribute( new Float32Array( positionAttribute.count * 3 ), 3 );
					this.setAttribute( 'normal', normalAttribute );

				} else {

					// reset existing normals to zero

					for ( var i = 0, il = normalAttribute.count; i < il; i ++ ) {

						normalAttribute.setXYZ( i, 0, 0, 0 );

					}

				}

				var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
				var nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
				var cb = new Vector3(), ab = new Vector3();

				// indexed elements

				if ( index ) {

					for ( var i$1 = 0, il$1 = index.count; i$1 < il$1; i$1 += 3 ) {

						var vA = index.getX( i$1 + 0 );
						var vB = index.getX( i$1 + 1 );
						var vC = index.getX( i$1 + 2 );

						pA.fromBufferAttribute( positionAttribute, vA );
						pB.fromBufferAttribute( positionAttribute, vB );
						pC.fromBufferAttribute( positionAttribute, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						nA.fromBufferAttribute( normalAttribute, vA );
						nB.fromBufferAttribute( normalAttribute, vB );
						nC.fromBufferAttribute( normalAttribute, vC );

						nA.add( cb );
						nB.add( cb );
						nC.add( cb );

						normalAttribute.setXYZ( vA, nA.x, nA.y, nA.z );
						normalAttribute.setXYZ( vB, nB.x, nB.y, nB.z );
						normalAttribute.setXYZ( vC, nC.x, nC.y, nC.z );

					}

				} else {

					// non-indexed elements (unconnected triangle soup)

					for ( var i$2 = 0, il$2 = positionAttribute.count; i$2 < il$2; i$2 += 3 ) {

						pA.fromBufferAttribute( positionAttribute, i$2 + 0 );
						pB.fromBufferAttribute( positionAttribute, i$2 + 1 );
						pC.fromBufferAttribute( positionAttribute, i$2 + 2 );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normalAttribute.setXYZ( i$2 + 0, cb.x, cb.y, cb.z );
						normalAttribute.setXYZ( i$2 + 1, cb.x, cb.y, cb.z );
						normalAttribute.setXYZ( i$2 + 2, cb.x, cb.y, cb.z );

					}

				}

				this.normalizeNormals();

				normalAttribute.needsUpdate = true;

			}

		},

		merge: function ( geometry, offset ) {

			if ( ! ( geometry && geometry.isBufferGeometry ) ) {

				console.error( 'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry );
				return;

			}

			if ( offset === undefined ) {

				offset = 0;

				console.warn(
					'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
					+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
				);

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				if ( geometry.attributes[ key ] === undefined ) { continue; }

				var attribute1 = attributes[ key ];
				var attributeArray1 = attribute1.array;

				var attribute2 = geometry.attributes[ key ];
				var attributeArray2 = attribute2.array;

				var attributeOffset = attribute2.itemSize * offset;
				var length = Math.min( attributeArray2.length, attributeArray1.length - attributeOffset );

				for ( var i = 0, j = attributeOffset; i < length; i ++, j ++ ) {

					attributeArray1[ j ] = attributeArray2[ i ];

				}

			}

			return this;

		},

		normalizeNormals: function () {

			var normals = this.attributes.normal;

			for ( var i = 0, il = normals.count; i < il; i ++ ) {

				_vector$4.fromBufferAttribute( normals, i );

				_vector$4.normalize();

				normals.setXYZ( i, _vector$4.x, _vector$4.y, _vector$4.z );

			}

		},

		toNonIndexed: function () {

			function convertBufferAttribute( attribute, indices ) {

				var array = attribute.array;
				var itemSize = attribute.itemSize;
				var normalized = attribute.normalized;

				var array2 = new array.constructor( indices.length * itemSize );

				var index = 0, index2 = 0;

				for ( var i = 0, l = indices.length; i < l; i ++ ) {

					index = indices[ i ] * itemSize;

					for ( var j = 0; j < itemSize; j ++ ) {

						array2[ index2 ++ ] = array[ index ++ ];

					}

				}

				return new BufferAttribute( array2, itemSize, normalized );

			}

			//

			if ( this.index === null ) {

				console.warn( 'THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.' );
				return this;

			}

			var geometry2 = new BufferGeometry();

			var indices = this.index.array;
			var attributes = this.attributes;

			// attributes

			for ( var name in attributes ) {

				var attribute = attributes[ name ];

				var newAttribute = convertBufferAttribute( attribute, indices );

				geometry2.setAttribute( name, newAttribute );

			}

			// morph attributes

			var morphAttributes = this.morphAttributes;

			for ( var name$1 in morphAttributes ) {

				var morphArray = [];
				var morphAttribute = morphAttributes[ name$1 ]; // morphAttribute: array of Float32BufferAttributes

				for ( var i = 0, il = morphAttribute.length; i < il; i ++ ) {

					var attribute$1 = morphAttribute[ i ];

					var newAttribute$1 = convertBufferAttribute( attribute$1, indices );

					morphArray.push( newAttribute$1 );

				}

				geometry2.morphAttributes[ name$1 ] = morphArray;

			}

			geometry2.morphTargetsRelative = this.morphTargetsRelative;

			// groups

			var groups = this.groups;

			for ( var i$1 = 0, l = groups.length; i$1 < l; i$1 ++ ) {

				var group = groups[ i$1 ];
				geometry2.addGroup( group.start, group.count, group.materialIndex );

			}

			return geometry2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'BufferGeometry',
					generator: 'BufferGeometry.toJSON'
				}
			};

			// standard BufferGeometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) { data.name = this.name; }
			if ( Object.keys( this.userData ).length > 0 ) { data.userData = this.userData; }

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) { data[ key ] = parameters[ key ]; }

				}

				return data;

			}

			data.data = { attributes: {} };

			var index = this.index;

			if ( index !== null ) {

				data.data.index = {
					type: index.array.constructor.name,
					array: Array.prototype.slice.call( index.array )
				};

			}

			var attributes = this.attributes;

			for ( var key$1 in attributes ) {

				var attribute = attributes[ key$1 ];

				var attributeData = attribute.toJSON( data.data );

				if ( attribute.name !== '' ) { attributeData.name = attribute.name; }

				data.data.attributes[ key$1 ] = attributeData;

			}

			var morphAttributes = {};
			var hasMorphAttributes = false;

			for ( var key$2 in this.morphAttributes ) {

				var attributeArray = this.morphAttributes[ key$2 ];

				var array = [];

				for ( var i = 0, il = attributeArray.length; i < il; i ++ ) {

					var attribute$1 = attributeArray[ i ];

					var attributeData$1 = attribute$1.toJSON( data.data );

					if ( attribute$1.name !== '' ) { attributeData$1.name = attribute$1.name; }

					array.push( attributeData$1 );

				}

				if ( array.length > 0 ) {

					morphAttributes[ key$2 ] = array;

					hasMorphAttributes = true;

				}

			}

			if ( hasMorphAttributes ) {

				data.data.morphAttributes = morphAttributes;
				data.data.morphTargetsRelative = this.morphTargetsRelative;

			}

			var groups = this.groups;

			if ( groups.length > 0 ) {

				data.data.groups = JSON.parse( JSON.stringify( groups ) );

			}

			var boundingSphere = this.boundingSphere;

			if ( boundingSphere !== null ) {

				data.data.boundingSphere = {
					center: boundingSphere.center.toArray(),
					radius: boundingSphere.radius
				};

			}

			return data;

		},

		clone: function () {

			/*
			 // Handle primitives

			 const parameters = this.parameters;

			 if ( parameters !== undefined ) {

			 const values = [];

			 for ( const key in parameters ) {

			 values.push( parameters[ key ] );

			 }

			 const geometry = Object.create( this.constructor.prototype );
			 this.constructor.apply( geometry, values );
			 return geometry;

			 }

			 return new this.constructor().copy( this );
			 */

			return new BufferGeometry().copy( this );

		},

		copy: function ( source ) {

			// reset

			this.index = null;
			this.attributes = {};
			this.morphAttributes = {};
			this.groups = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// used for storing cloned, shared data

			var data = {};

			// name

			this.name = source.name;

			// index

			var index = source.index;

			if ( index !== null ) {

				this.setIndex( index.clone( data ) );

			}

			// attributes

			var attributes = source.attributes;

			for ( var name in attributes ) {

				var attribute = attributes[ name ];
				this.setAttribute( name, attribute.clone( data ) );

			}

			// morph attributes

			var morphAttributes = source.morphAttributes;

			for ( var name$1 in morphAttributes ) {

				var array = [];
				var morphAttribute = morphAttributes[ name$1 ]; // morphAttribute: array of Float32BufferAttributes

				for ( var i = 0, l = morphAttribute.length; i < l; i ++ ) {

					array.push( morphAttribute[ i ].clone( data ) );

				}

				this.morphAttributes[ name$1 ] = array;

			}

			this.morphTargetsRelative = source.morphTargetsRelative;

			// groups

			var groups = source.groups;

			for ( var i$1 = 0, l$1 = groups.length; i$1 < l$1; i$1 ++ ) {

				var group = groups[ i$1 ];
				this.addGroup( group.start, group.count, group.materialIndex );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// draw range

			this.drawRange.start = source.drawRange.start;
			this.drawRange.count = source.drawRange.count;

			// user data

			this.userData = source.userData;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	var _inverseMatrix = new Matrix4();
	var _ray = new Ray();
	var _sphere = new Sphere();

	var _vA = new Vector3();
	var _vB = new Vector3();
	var _vC = new Vector3();

	var _tempA = new Vector3();
	var _tempB = new Vector3();
	var _tempC = new Vector3();

	var _morphA = new Vector3();
	var _morphB = new Vector3();
	var _morphC = new Vector3();

	var _uvA = new Vector2();
	var _uvB = new Vector2();
	var _uvC = new Vector2();

	var _intersectionPoint = new Vector3();
	var _intersectionPointWorld = new Vector3();

	function Mesh( geometry, material ) {

		Object3D.call( this );

		this.type = 'Mesh';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new MeshBasicMaterial();

		this.updateMorphTargets();

	}

	Mesh.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Mesh,

		isMesh: true,

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			if ( source.morphTargetInfluences !== undefined ) {

				this.morphTargetInfluences = source.morphTargetInfluences.slice();

			}

			if ( source.morphTargetDictionary !== undefined ) {

				this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

			}

			this.material = source.material;
			this.geometry = source.geometry;

			return this;

		},

		updateMorphTargets: function () {

			var geometry = this.geometry;

			if ( geometry.isBufferGeometry ) {

				var morphAttributes = geometry.morphAttributes;
				var keys = Object.keys( morphAttributes );

				if ( keys.length > 0 ) {

					var morphAttribute = morphAttributes[ keys[ 0 ] ];

					if ( morphAttribute !== undefined ) {

						this.morphTargetInfluences = [];
						this.morphTargetDictionary = {};

						for ( var m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

							var name = morphAttribute[ m ].name || String( m );

							this.morphTargetInfluences.push( 0 );
							this.morphTargetDictionary[ name ] = m;

						}

					}

				}

			} else {

				var morphTargets = geometry.morphTargets;

				if ( morphTargets !== undefined && morphTargets.length > 0 ) {

					console.error( 'THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

				}

			}

		},

		raycast: function ( raycaster, intersects ) {

			var geometry = this.geometry;
			var material = this.material;
			var matrixWorld = this.matrixWorld;

			if ( material === undefined ) { return; }

			// Checking boundingSphere distance to ray

			if ( geometry.boundingSphere === null ) { geometry.computeBoundingSphere(); }

			_sphere.copy( geometry.boundingSphere );
			_sphere.applyMatrix4( matrixWorld );

			if ( raycaster.ray.intersectsSphere( _sphere ) === false ) { return; }

			//

			_inverseMatrix.getInverse( matrixWorld );
			_ray.copy( raycaster.ray ).applyMatrix4( _inverseMatrix );

			// Check boundingBox before continuing

			if ( geometry.boundingBox !== null ) {

				if ( _ray.intersectsBox( geometry.boundingBox ) === false ) { return; }

			}

			var intersection;

			if ( geometry.isBufferGeometry ) {

				var index = geometry.index;
				var position = geometry.attributes.position;
				var morphPosition = geometry.morphAttributes.position;
				var morphTargetsRelative = geometry.morphTargetsRelative;
				var uv = geometry.attributes.uv;
				var uv2 = geometry.attributes.uv2;
				var groups = geometry.groups;
				var drawRange = geometry.drawRange;

				if ( index !== null ) {

					// indexed buffer geometry

					if ( Array.isArray( material ) ) {

						for ( var i = 0, il = groups.length; i < il; i ++ ) {

							var group = groups[ i ];
							var groupMaterial = material[ group.materialIndex ];

							var start = Math.max( group.start, drawRange.start );
							var end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

							for ( var j = start, jl = end; j < jl; j += 3 ) {

								var a = index.getX( j );
								var b = index.getX( j + 1 );
								var c = index.getX( j + 2 );

								intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
									intersection.face.materialIndex = group.materialIndex;
									intersects.push( intersection );

								}

							}

						}

					} else {

						var start$1 = Math.max( 0, drawRange.start );
						var end$1 = Math.min( index.count, ( drawRange.start + drawRange.count ) );

						for ( var i$1 = start$1, il$1 = end$1; i$1 < il$1; i$1 += 3 ) {

							var a$1 = index.getX( i$1 );
							var b$1 = index.getX( i$1 + 1 );
							var c$1 = index.getX( i$1 + 2 );

							intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a$1, b$1, c$1 );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( i$1 / 3 ); // triangle number in indexed buffer semantics
								intersects.push( intersection );

							}

						}

					}

				} else if ( position !== undefined ) {

					// non-indexed buffer geometry

					if ( Array.isArray( material ) ) {

						for ( var i$2 = 0, il$2 = groups.length; i$2 < il$2; i$2 ++ ) {

							var group$1 = groups[ i$2 ];
							var groupMaterial$1 = material[ group$1.materialIndex ];

							var start$2 = Math.max( group$1.start, drawRange.start );
							var end$2 = Math.min( ( group$1.start + group$1.count ), ( drawRange.start + drawRange.count ) );

							for ( var j$1 = start$2, jl$1 = end$2; j$1 < jl$1; j$1 += 3 ) {

								var a$2 = j$1;
								var b$2 = j$1 + 1;
								var c$2 = j$1 + 2;

								intersection = checkBufferGeometryIntersection( this, groupMaterial$1, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a$2, b$2, c$2 );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( j$1 / 3 ); // triangle number in non-indexed buffer semantics
									intersection.face.materialIndex = group$1.materialIndex;
									intersects.push( intersection );

								}

							}

						}

					} else {

						var start$3 = Math.max( 0, drawRange.start );
						var end$3 = Math.min( position.count, ( drawRange.start + drawRange.count ) );

						for ( var i$3 = start$3, il$3 = end$3; i$3 < il$3; i$3 += 3 ) {

							var a$3 = i$3;
							var b$3 = i$3 + 1;
							var c$3 = i$3 + 2;

							intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a$3, b$3, c$3 );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( i$3 / 3 ); // triangle number in non-indexed buffer semantics
								intersects.push( intersection );

							}

						}

					}

				}

			} else if ( geometry.isGeometry ) {

				var isMultiMaterial = Array.isArray( material );

				var vertices = geometry.vertices;
				var faces = geometry.faces;
				var uvs;

				var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
				if ( faceVertexUvs.length > 0 ) { uvs = faceVertexUvs; }

				for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

					var face = faces[ f ];
					var faceMaterial = isMultiMaterial ? material[ face.materialIndex ] : material;

					if ( faceMaterial === undefined ) { continue; }

					var fvA = vertices[ face.a ];
					var fvB = vertices[ face.b ];
					var fvC = vertices[ face.c ];

					intersection = checkIntersection( this, faceMaterial, raycaster, _ray, fvA, fvB, fvC, _intersectionPoint );

					if ( intersection ) {

						if ( uvs && uvs[ f ] ) {

							var uvs_f = uvs[ f ];
							_uvA.copy( uvs_f[ 0 ] );
							_uvB.copy( uvs_f[ 1 ] );
							_uvC.copy( uvs_f[ 2 ] );

							intersection.uv = Triangle.getUV( _intersectionPoint, fvA, fvB, fvC, _uvA, _uvB, _uvC, new Vector2() );

						}

						intersection.face = face;
						intersection.faceIndex = f;
						intersects.push( intersection );

					}

				}

			}

		}

	} );

	function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

		var intersect;

		if ( material.side === BackSide ) {

			intersect = ray.intersectTriangle( pC, pB, pA, true, point );

		} else {

			intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

		}

		if ( intersect === null ) { return null; }

		_intersectionPointWorld.copy( point );
		_intersectionPointWorld.applyMatrix4( object.matrixWorld );

		var distance = raycaster.ray.origin.distanceTo( _intersectionPointWorld );

		if ( distance < raycaster.near || distance > raycaster.far ) { return null; }

		return {
			distance: distance,
			point: _intersectionPointWorld.clone(),
			object: object
		};

	}

	function checkBufferGeometryIntersection( object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c ) {

		_vA.fromBufferAttribute( position, a );
		_vB.fromBufferAttribute( position, b );
		_vC.fromBufferAttribute( position, c );

		var morphInfluences = object.morphTargetInfluences;

		if ( material.morphTargets && morphPosition && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( var i = 0, il = morphPosition.length; i < il; i ++ ) {

				var influence = morphInfluences[ i ];
				var morphAttribute = morphPosition[ i ];

				if ( influence === 0 ) { continue; }

				_tempA.fromBufferAttribute( morphAttribute, a );
				_tempB.fromBufferAttribute( morphAttribute, b );
				_tempC.fromBufferAttribute( morphAttribute, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.boneTransform( a, _vA );
			object.boneTransform( b, _vB );
			object.boneTransform( c, _vC );

		}

		var intersection = checkIntersection( object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint );

		if ( intersection ) {

			if ( uv ) {

				_uvA.fromBufferAttribute( uv, a );
				_uvB.fromBufferAttribute( uv, b );
				_uvC.fromBufferAttribute( uv, c );

				intersection.uv = Triangle.getUV( _intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2() );

			}

			if ( uv2 ) {

				_uvA.fromBufferAttribute( uv2, a );
				_uvB.fromBufferAttribute( uv2, b );
				_uvC.fromBufferAttribute( uv2, c );

				intersection.uv2 = Triangle.getUV( _intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2() );

			}

			var face = new Face3( a, b, c );
			Triangle.getNormal( _vA, _vB, _vC, face.normal );

			intersection.face = face;

		}

		return intersection;

	}

	var _geometryId = 0; // Geometry uses even numbers as Id
	var _m1$3 = new Matrix4();
	var _obj$1 = new Object3D();
	var _offset$1 = new Vector3();

	function Geometry() {

		Object.defineProperty( this, 'id', { value: _geometryId += 2 } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';
		this.type = 'Geometry';

		this.vertices = [];
		this.colors = [];
		this.faces = [];
		this.faceVertexUvs = [[]];

		this.morphTargets = [];
		this.morphNormals = [];

		this.skinWeights = [];
		this.skinIndices = [];

		this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.elementsNeedUpdate = false;
		this.verticesNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.lineDistancesNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Geometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Geometry,

		isGeometry: true,

		applyMatrix4: function ( matrix ) {

			var normalMatrix = new Matrix3().getNormalMatrix( matrix );

			for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

				var vertex = this.vertices[ i ];
				vertex.applyMatrix4( matrix );

			}

			for ( var i$1 = 0, il$1 = this.faces.length; i$1 < il$1; i$1 ++ ) {

				var face = this.faces[ i$1 ];
				face.normal.applyMatrix3( normalMatrix ).normalize();

				for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

					face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

				}

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			this.verticesNeedUpdate = true;
			this.normalsNeedUpdate = true;

			return this;

		},

		rotateX: function ( angle ) {

			// rotate geometry around world x-axis

			_m1$3.makeRotationX( angle );

			this.applyMatrix4( _m1$3 );

			return this;

		},

		rotateY: function ( angle ) {

			// rotate geometry around world y-axis

			_m1$3.makeRotationY( angle );

			this.applyMatrix4( _m1$3 );

			return this;

		},

		rotateZ: function ( angle ) {

			// rotate geometry around world z-axis

			_m1$3.makeRotationZ( angle );

			this.applyMatrix4( _m1$3 );

			return this;

		},

		translate: function ( x, y, z ) {

			// translate geometry

			_m1$3.makeTranslation( x, y, z );

			this.applyMatrix4( _m1$3 );

			return this;

		},

		scale: function ( x, y, z ) {

			// scale geometry

			_m1$3.makeScale( x, y, z );

			this.applyMatrix4( _m1$3 );

			return this;

		},

		lookAt: function ( vector ) {

			_obj$1.lookAt( vector );

			_obj$1.updateMatrix();

			this.applyMatrix4( _obj$1.matrix );

			return this;

		},

		fromBufferGeometry: function ( geometry ) {

			var scope = this;

			var index = geometry.index !== null ? geometry.index : undefined;
			var attributes = geometry.attributes;

			if ( attributes.position === undefined ) {

				console.error( 'THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion.' );
				return this;

			}

			var position = attributes.position;
			var normal = attributes.normal;
			var color = attributes.color;
			var uv = attributes.uv;
			var uv2 = attributes.uv2;

			if ( uv2 !== undefined ) { this.faceVertexUvs[ 1 ] = []; }

			for ( var i = 0; i < position.count; i ++ ) {

				scope.vertices.push( new Vector3().fromBufferAttribute( position, i ) );

				if ( color !== undefined ) {

					scope.colors.push( new Color().fromBufferAttribute( color, i ) );

				}

			}

			function addFace( a, b, c, materialIndex ) {

				var vertexColors = ( color === undefined ) ? [] : [
					scope.colors[ a ].clone(),
					scope.colors[ b ].clone(),
					scope.colors[ c ].clone()
				];

				var vertexNormals = ( normal === undefined ) ? [] : [
					new Vector3().fromBufferAttribute( normal, a ),
					new Vector3().fromBufferAttribute( normal, b ),
					new Vector3().fromBufferAttribute( normal, c )
				];

				var face = new Face3( a, b, c, vertexNormals, vertexColors, materialIndex );

				scope.faces.push( face );

				if ( uv !== undefined ) {

					scope.faceVertexUvs[ 0 ].push( [
						new Vector2().fromBufferAttribute( uv, a ),
						new Vector2().fromBufferAttribute( uv, b ),
						new Vector2().fromBufferAttribute( uv, c )
					] );

				}

				if ( uv2 !== undefined ) {

					scope.faceVertexUvs[ 1 ].push( [
						new Vector2().fromBufferAttribute( uv2, a ),
						new Vector2().fromBufferAttribute( uv2, b ),
						new Vector2().fromBufferAttribute( uv2, c )
					] );

				}

			}

			var groups = geometry.groups;

			if ( groups.length > 0 ) {

				for ( var i$1 = 0; i$1 < groups.length; i$1 ++ ) {

					var group = groups[ i$1 ];

					var start = group.start;
					var count = group.count;

					for ( var j = start, jl = start + count; j < jl; j += 3 ) {

						if ( index !== undefined ) {

							addFace( index.getX( j ), index.getX( j + 1 ), index.getX( j + 2 ), group.materialIndex );

						} else {

							addFace( j, j + 1, j + 2, group.materialIndex );

						}

					}

				}

			} else {

				if ( index !== undefined ) {

					for ( var i$2 = 0; i$2 < index.count; i$2 += 3 ) {

						addFace( index.getX( i$2 ), index.getX( i$2 + 1 ), index.getX( i$2 + 2 ) );

					}

				} else {

					for ( var i$3 = 0; i$3 < position.count; i$3 += 3 ) {

						addFace( i$3, i$3 + 1, i$3 + 2 );

					}

				}

			}

			this.computeFaceNormals();

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			return this;

		},

		center: function () {

			this.computeBoundingBox();

			this.boundingBox.getCenter( _offset$1 ).negate();

			this.translate( _offset$1.x, _offset$1.y, _offset$1.z );

			return this;

		},

		normalize: function () {

			this.computeBoundingSphere();

			var center = this.boundingSphere.center;
			var radius = this.boundingSphere.radius;

			var s = radius === 0 ? 1 : 1.0 / radius;

			var matrix = new Matrix4();
			matrix.set(
				s, 0, 0, - s * center.x,
				0, s, 0, - s * center.y,
				0, 0, s, - s * center.z,
				0, 0, 0, 1
			);

			this.applyMatrix4( matrix );

			return this;

		},

		computeFaceNormals: function () {

			var cb = new Vector3(), ab = new Vector3();

			for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

				var face = this.faces[ f ];

				var vA = this.vertices[ face.a ];
				var vB = this.vertices[ face.b ];
				var vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				cb.normalize();

				face.normal.copy( cb );

			}

		},

		computeVertexNormals: function ( areaWeighted ) {

			if ( areaWeighted === undefined ) { areaWeighted = true; }

			var vertices = new Array( this.vertices.length );

			for ( var v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ] = new Vector3();

			}

			if ( areaWeighted ) {

				// vertex normals weighted by triangle areas
				// http://www.iquilezles.org/www/articles/normals/normals.htm

				var cb = new Vector3(), ab = new Vector3();

				for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

					var face = this.faces[ f ];

					var vA = this.vertices[ face.a ];
					var vB = this.vertices[ face.b ];
					var vC = this.vertices[ face.c ];

					cb.subVectors( vC, vB );
					ab.subVectors( vA, vB );
					cb.cross( ab );

					vertices[ face.a ].add( cb );
					vertices[ face.b ].add( cb );
					vertices[ face.c ].add( cb );

				}

			} else {

				this.computeFaceNormals();

				for ( var f$1 = 0, fl$1 = this.faces.length; f$1 < fl$1; f$1 ++ ) {

					var face$1 = this.faces[ f$1 ];

					vertices[ face$1.a ].add( face$1.normal );
					vertices[ face$1.b ].add( face$1.normal );
					vertices[ face$1.c ].add( face$1.normal );

				}

			}

			for ( var v$1 = 0, vl$1 = this.vertices.length; v$1 < vl$1; v$1 ++ ) {

				vertices[ v$1 ].normalize();

			}

			for ( var f$2 = 0, fl$2 = this.faces.length; f$2 < fl$2; f$2 ++ ) {

				var face$2 = this.faces[ f$2 ];

				var vertexNormals = face$2.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( vertices[ face$2.a ] );
					vertexNormals[ 1 ].copy( vertices[ face$2.b ] );
					vertexNormals[ 2 ].copy( vertices[ face$2.c ] );

				} else {

					vertexNormals[ 0 ] = vertices[ face$2.a ].clone();
					vertexNormals[ 1 ] = vertices[ face$2.b ].clone();
					vertexNormals[ 2 ] = vertices[ face$2.c ].clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeFlatVertexNormals: function () {

			this.computeFaceNormals();

			for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

				var face = this.faces[ f ];

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( face.normal );
					vertexNormals[ 1 ].copy( face.normal );
					vertexNormals[ 2 ].copy( face.normal );

				} else {

					vertexNormals[ 0 ] = face.normal.clone();
					vertexNormals[ 1 ] = face.normal.clone();
					vertexNormals[ 2 ] = face.normal.clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeMorphNormals: function () {

			// save original normals
			// - create temp variables on first access
			//   otherwise just copy (for faster repeated calls)

			for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

				var face = this.faces[ f ];

				if ( ! face.__originalFaceNormal ) {

					face.__originalFaceNormal = face.normal.clone();

				} else {

					face.__originalFaceNormal.copy( face.normal );

				}

				if ( ! face.__originalVertexNormals ) { face.__originalVertexNormals = []; }

				for ( var i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

					if ( ! face.__originalVertexNormals[ i ] ) {

						face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

					} else {

						face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

					}

				}

			}

			// use temp geometry to compute face and vertex normals for each morph

			var tmpGeo = new Geometry();
			tmpGeo.faces = this.faces;

			for ( var i$1 = 0, il$1 = this.morphTargets.length; i$1 < il$1; i$1 ++ ) {

				// create on first access

				if ( ! this.morphNormals[ i$1 ] ) {

					this.morphNormals[ i$1 ] = {};
					this.morphNormals[ i$1 ].faceNormals = [];
					this.morphNormals[ i$1 ].vertexNormals = [];

					var dstNormalsFace = this.morphNormals[ i$1 ].faceNormals;
					var dstNormalsVertex = this.morphNormals[ i$1 ].vertexNormals;

					for ( var f$1 = 0, fl$1 = this.faces.length; f$1 < fl$1; f$1 ++ ) {

						var faceNormal = new Vector3();
						var vertexNormals = { a: new Vector3(), b: new Vector3(), c: new Vector3() };

						dstNormalsFace.push( faceNormal );
						dstNormalsVertex.push( vertexNormals );

					}

				}

				var morphNormals = this.morphNormals[ i$1 ];

				// set vertices to morph target

				tmpGeo.vertices = this.morphTargets[ i$1 ].vertices;

				// compute morph normals

				tmpGeo.computeFaceNormals();
				tmpGeo.computeVertexNormals();

				// store morph normals

				for ( var f$2 = 0, fl$2 = this.faces.length; f$2 < fl$2; f$2 ++ ) {

					var face$1 = this.faces[ f$2 ];

					var faceNormal$1 = morphNormals.faceNormals[ f$2 ];
					var vertexNormals$1 = morphNormals.vertexNormals[ f$2 ];

					faceNormal$1.copy( face$1.normal );

					vertexNormals$1.a.copy( face$1.vertexNormals[ 0 ] );
					vertexNormals$1.b.copy( face$1.vertexNormals[ 1 ] );
					vertexNormals$1.c.copy( face$1.vertexNormals[ 2 ] );

				}

			}

			// restore original normals

			for ( var f$3 = 0, fl$3 = this.faces.length; f$3 < fl$3; f$3 ++ ) {

				var face$2 = this.faces[ f$3 ];

				face$2.normal = face$2.__originalFaceNormal;
				face$2.vertexNormals = face$2.__originalVertexNormals;

			}

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			this.boundingBox.setFromPoints( this.vertices );

		},

		computeBoundingSphere: function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new Sphere();

			}

			this.boundingSphere.setFromPoints( this.vertices );

		},

		merge: function ( geometry, matrix, materialIndexOffset ) {

			if ( ! ( geometry && geometry.isGeometry ) ) {

				console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
				return;

			}

			var normalMatrix;
			var vertexOffset = this.vertices.length,
				vertices1 = this.vertices,
				vertices2 = geometry.vertices,
				faces1 = this.faces,
				faces2 = geometry.faces,
				colors1 = this.colors,
				colors2 = geometry.colors;

			if ( materialIndexOffset === undefined ) { materialIndexOffset = 0; }

			if ( matrix !== undefined ) {

				normalMatrix = new Matrix3().getNormalMatrix( matrix );

			}

			// vertices

			for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

				var vertex = vertices2[ i ];

				var vertexCopy = vertex.clone();

				if ( matrix !== undefined ) { vertexCopy.applyMatrix4( matrix ); }

				vertices1.push( vertexCopy );

			}

			// colors

			for ( var i$1 = 0, il$1 = colors2.length; i$1 < il$1; i$1 ++ ) {

				colors1.push( colors2[ i$1 ].clone() );

			}

			// faces

			for ( var i$2 = 0, il$2 = faces2.length; i$2 < il$2; i$2 ++ ) {

				var face = faces2[ i$2 ];
				var normal = (void 0), color = (void 0);
				var faceVertexNormals = face.vertexNormals,
					faceVertexColors = face.vertexColors;

				var faceCopy = new Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
				faceCopy.normal.copy( face.normal );

				if ( normalMatrix !== undefined ) {

					faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

				}

				for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

					normal = faceVertexNormals[ j ].clone();

					if ( normalMatrix !== undefined ) {

						normal.applyMatrix3( normalMatrix ).normalize();

					}

					faceCopy.vertexNormals.push( normal );

				}

				faceCopy.color.copy( face.color );

				for ( var j$1 = 0, jl$1 = faceVertexColors.length; j$1 < jl$1; j$1 ++ ) {

					color = faceVertexColors[ j$1 ];
					faceCopy.vertexColors.push( color.clone() );

				}

				faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

				faces1.push( faceCopy );

			}

			// uvs

			for ( var i$3 = 0, il$3 = geometry.faceVertexUvs.length; i$3 < il$3; i$3 ++ ) {

				var faceVertexUvs2 = geometry.faceVertexUvs[ i$3 ];

				if ( this.faceVertexUvs[ i$3 ] === undefined ) { this.faceVertexUvs[ i$3 ] = []; }

				for ( var j$2 = 0, jl$2 = faceVertexUvs2.length; j$2 < jl$2; j$2 ++ ) {

					var uvs2 = faceVertexUvs2[ j$2 ], uvsCopy = [];

					for ( var k = 0, kl = uvs2.length; k < kl; k ++ ) {

						uvsCopy.push( uvs2[ k ].clone() );

					}

					this.faceVertexUvs[ i$3 ].push( uvsCopy );

				}

			}

		},

		mergeMesh: function ( mesh ) {

			if ( ! ( mesh && mesh.isMesh ) ) {

				console.error( 'THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh );
				return;

			}

			if ( mesh.matrixAutoUpdate ) { mesh.updateMatrix(); }

			this.merge( mesh.geometry, mesh.matrix );

		},

		/*
		 * Checks for duplicate vertices with hashmap.
		 * Duplicated vertices are removed
		 * and faces' vertices are updated.
		 */

		mergeVertices: function () {

			var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
			var unique = [], changes = [];

			var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
			var precision = Math.pow( 10, precisionPoints );

			for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

				var v = this.vertices[ i ];
				var key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

				if ( verticesMap[ key ] === undefined ) {

					verticesMap[ key ] = i;
					unique.push( this.vertices[ i ] );
					changes[ i ] = unique.length - 1;

				} else {

					//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
					changes[ i ] = changes[ verticesMap[ key ] ];

				}

			}


			// if faces are completely degenerate after merging vertices, we
			// have to remove them from the geometry.
			var faceIndicesToRemove = [];

			for ( var i$1 = 0, il$1 = this.faces.length; i$1 < il$1; i$1 ++ ) {

				var face = this.faces[ i$1 ];

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

				var indices = [ face.a, face.b, face.c ];

				// if any duplicate vertices are found in a Face3
				// we have to remove the face as nothing can be saved
				for ( var n = 0; n < 3; n ++ ) {

					if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

						faceIndicesToRemove.push( i$1 );
						break;

					}

				}

			}

			for ( var i$2 = faceIndicesToRemove.length - 1; i$2 >= 0; i$2 -- ) {

				var idx = faceIndicesToRemove[ i$2 ];

				this.faces.splice( idx, 1 );

				for ( var j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

					this.faceVertexUvs[ j ].splice( idx, 1 );

				}

			}

			// Use unique set of vertices

			var diff = this.vertices.length - unique.length;
			this.vertices = unique;
			return diff;

		},

		setFromPoints: function ( points ) {

			this.vertices = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				this.vertices.push( new Vector3( point.x, point.y, point.z || 0 ) );

			}

			return this;

		},

		sortFacesByMaterialIndex: function () {

			var faces = this.faces;
			var length = faces.length;

			// tag faces

			for ( var i = 0; i < length; i ++ ) {

				faces[ i ]._id = i;

			}

			// sort faces

			function materialIndexSort( a, b ) {

				return a.materialIndex - b.materialIndex;

			}

			faces.sort( materialIndexSort );

			// sort uvs

			var uvs1 = this.faceVertexUvs[ 0 ];
			var uvs2 = this.faceVertexUvs[ 1 ];

			var newUvs1, newUvs2;

			if ( uvs1 && uvs1.length === length ) { newUvs1 = []; }
			if ( uvs2 && uvs2.length === length ) { newUvs2 = []; }

			for ( var i$1 = 0; i$1 < length; i$1 ++ ) {

				var id = faces[ i$1 ]._id;

				if ( newUvs1 ) { newUvs1.push( uvs1[ id ] ); }
				if ( newUvs2 ) { newUvs2.push( uvs2[ id ] ); }

			}

			if ( newUvs1 ) { this.faceVertexUvs[ 0 ] = newUvs1; }
			if ( newUvs2 ) { this.faceVertexUvs[ 1 ] = newUvs2; }

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'Geometry',
					generator: 'Geometry.toJSON'
				}
			};

			// standard Geometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) { data.name = this.name; }

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) { data[ key ] = parameters[ key ]; }

				}

				return data;

			}

			var vertices = [];

			for ( var i = 0; i < this.vertices.length; i ++ ) {

				var vertex = this.vertices[ i ];
				vertices.push( vertex.x, vertex.y, vertex.z );

			}

			var faces = [];
			var normals = [];
			var normalsHash = {};
			var colors = [];
			var colorsHash = {};
			var uvs = [];
			var uvsHash = {};

			for ( var i$1 = 0; i$1 < this.faces.length; i$1 ++ ) {

				var face = this.faces[ i$1 ];

				var hasMaterial = true;
				var hasFaceUv = false; // deprecated
				var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i$1 ] !== undefined;
				var hasFaceNormal = face.normal.length() > 0;
				var hasFaceVertexNormal = face.vertexNormals.length > 0;
				var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
				var hasFaceVertexColor = face.vertexColors.length > 0;

				var faceType = 0;

				faceType = setBit( faceType, 0, 0 ); // isQuad
				faceType = setBit( faceType, 1, hasMaterial );
				faceType = setBit( faceType, 2, hasFaceUv );
				faceType = setBit( faceType, 3, hasFaceVertexUv );
				faceType = setBit( faceType, 4, hasFaceNormal );
				faceType = setBit( faceType, 5, hasFaceVertexNormal );
				faceType = setBit( faceType, 6, hasFaceColor );
				faceType = setBit( faceType, 7, hasFaceVertexColor );

				faces.push( faceType );
				faces.push( face.a, face.b, face.c );
				faces.push( face.materialIndex );

				if ( hasFaceVertexUv ) {

					var faceVertexUvs = this.faceVertexUvs[ 0 ][ i$1 ];

					faces.push(
						getUvIndex( faceVertexUvs[ 0 ] ),
						getUvIndex( faceVertexUvs[ 1 ] ),
						getUvIndex( faceVertexUvs[ 2 ] )
					);

				}

				if ( hasFaceNormal ) {

					faces.push( getNormalIndex( face.normal ) );

				}

				if ( hasFaceVertexNormal ) {

					var vertexNormals = face.vertexNormals;

					faces.push(
						getNormalIndex( vertexNormals[ 0 ] ),
						getNormalIndex( vertexNormals[ 1 ] ),
						getNormalIndex( vertexNormals[ 2 ] )
					);

				}

				if ( hasFaceColor ) {

					faces.push( getColorIndex( face.color ) );

				}

				if ( hasFaceVertexColor ) {

					var vertexColors = face.vertexColors;

					faces.push(
						getColorIndex( vertexColors[ 0 ] ),
						getColorIndex( vertexColors[ 1 ] ),
						getColorIndex( vertexColors[ 2 ] )
					);

				}

			}

			function setBit( value, position, enabled ) {

				return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position ) );

			}

			function getNormalIndex( normal ) {

				var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

				if ( normalsHash[ hash ] !== undefined ) {

					return normalsHash[ hash ];

				}

				normalsHash[ hash ] = normals.length / 3;
				normals.push( normal.x, normal.y, normal.z );

				return normalsHash[ hash ];

			}

			function getColorIndex( color ) {

				var hash = color.r.toString() + color.g.toString() + color.b.toString();

				if ( colorsHash[ hash ] !== undefined ) {

					return colorsHash[ hash ];

				}

				colorsHash[ hash ] = colors.length;
				colors.push( color.getHex() );

				return colorsHash[ hash ];

			}

			function getUvIndex( uv ) {

				var hash = uv.x.toString() + uv.y.toString();

				if ( uvsHash[ hash ] !== undefined ) {

					return uvsHash[ hash ];

				}

				uvsHash[ hash ] = uvs.length / 2;
				uvs.push( uv.x, uv.y );

				return uvsHash[ hash ];

			}

			data.data = {};

			data.data.vertices = vertices;
			data.data.normals = normals;
			if ( colors.length > 0 ) { data.data.colors = colors; }
			if ( uvs.length > 0 ) { data.data.uvs = [ uvs ]; } // temporal backward compatibility
			data.data.faces = faces;

			return data;

		},

		clone: function () {

			/*
			 // Handle primitives

			 const parameters = this.parameters;

			 if ( parameters !== undefined ) {

			 const values = [];

			 for ( const key in parameters ) {

			 values.push( parameters[ key ] );

			 }

			 const geometry = Object.create( this.constructor.prototype );
			 this.constructor.apply( geometry, values );
			 return geometry;

			 }

			 return new this.constructor().copy( this );
			 */

			return new Geometry().copy( this );

		},

		copy: function ( source ) {

			// reset

			this.vertices = [];
			this.colors = [];
			this.faces = [];
			this.faceVertexUvs = [[]];
			this.morphTargets = [];
			this.morphNormals = [];
			this.skinWeights = [];
			this.skinIndices = [];
			this.lineDistances = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// vertices

			var vertices = source.vertices;

			for ( var i = 0, il = vertices.length; i < il; i ++ ) {

				this.vertices.push( vertices[ i ].clone() );

			}

			// colors

			var colors = source.colors;

			for ( var i$1 = 0, il$1 = colors.length; i$1 < il$1; i$1 ++ ) {

				this.colors.push( colors[ i$1 ].clone() );

			}

			// faces

			var faces = source.faces;

			for ( var i$2 = 0, il$2 = faces.length; i$2 < il$2; i$2 ++ ) {

				this.faces.push( faces[ i$2 ].clone() );

			}

			// face vertex uvs

			for ( var i$3 = 0, il$3 = source.faceVertexUvs.length; i$3 < il$3; i$3 ++ ) {

				var faceVertexUvs = source.faceVertexUvs[ i$3 ];

				if ( this.faceVertexUvs[ i$3 ] === undefined ) {

					this.faceVertexUvs[ i$3 ] = [];

				}

				for ( var j = 0, jl = faceVertexUvs.length; j < jl; j ++ ) {

					var uvs = faceVertexUvs[ j ], uvsCopy = [];

					for ( var k = 0, kl = uvs.length; k < kl; k ++ ) {

						var uv = uvs[ k ];

						uvsCopy.push( uv.clone() );

					}

					this.faceVertexUvs[ i$3 ].push( uvsCopy );

				}

			}

			// morph targets

			var morphTargets = source.morphTargets;

			for ( var i$4 = 0, il$4 = morphTargets.length; i$4 < il$4; i$4 ++ ) {

				var morphTarget = {};
				morphTarget.name = morphTargets[ i$4 ].name;

				// vertices

				if ( morphTargets[ i$4 ].vertices !== undefined ) {

					morphTarget.vertices = [];

					for ( var j$1 = 0, jl$1 = morphTargets[ i$4 ].vertices.length; j$1 < jl$1; j$1 ++ ) {

						morphTarget.vertices.push( morphTargets[ i$4 ].vertices[ j$1 ].clone() );

					}

				}

				// normals

				if ( morphTargets[ i$4 ].normals !== undefined ) {

					morphTarget.normals = [];

					for ( var j$2 = 0, jl$2 = morphTargets[ i$4 ].normals.length; j$2 < jl$2; j$2 ++ ) {

						morphTarget.normals.push( morphTargets[ i$4 ].normals[ j$2 ].clone() );

					}

				}

				this.morphTargets.push( morphTarget );

			}

			// morph normals

			var morphNormals = source.morphNormals;

			for ( var i$5 = 0, il$5 = morphNormals.length; i$5 < il$5; i$5 ++ ) {

				var morphNormal = {};

				// vertex normals

				if ( morphNormals[ i$5 ].vertexNormals !== undefined ) {

					morphNormal.vertexNormals = [];

					for ( var j$3 = 0, jl$3 = morphNormals[ i$5 ].vertexNormals.length; j$3 < jl$3; j$3 ++ ) {

						var srcVertexNormal = morphNormals[ i$5 ].vertexNormals[ j$3 ];
						var destVertexNormal = {};

						destVertexNormal.a = srcVertexNormal.a.clone();
						destVertexNormal.b = srcVertexNormal.b.clone();
						destVertexNormal.c = srcVertexNormal.c.clone();

						morphNormal.vertexNormals.push( destVertexNormal );

					}

				}

				// face normals

				if ( morphNormals[ i$5 ].faceNormals !== undefined ) {

					morphNormal.faceNormals = [];

					for ( var j$4 = 0, jl$4 = morphNormals[ i$5 ].faceNormals.length; j$4 < jl$4; j$4 ++ ) {

						morphNormal.faceNormals.push( morphNormals[ i$5 ].faceNormals[ j$4 ].clone() );

					}

				}

				this.morphNormals.push( morphNormal );

			}

			// skin weights

			var skinWeights = source.skinWeights;

			for ( var i$6 = 0, il$6 = skinWeights.length; i$6 < il$6; i$6 ++ ) {

				this.skinWeights.push( skinWeights[ i$6 ].clone() );

			}

			// skin indices

			var skinIndices = source.skinIndices;

			for ( var i$7 = 0, il$7 = skinIndices.length; i$7 < il$7; i$7 ++ ) {

				this.skinIndices.push( skinIndices[ i$7 ].clone() );

			}

			// line distances

			var lineDistances = source.lineDistances;

			for ( var i$8 = 0, il$8 = lineDistances.length; i$8 < il$8; i$8 ++ ) {

				this.lineDistances.push( lineDistances[ i$8 ] );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// update flags

			this.elementsNeedUpdate = source.elementsNeedUpdate;
			this.verticesNeedUpdate = source.verticesNeedUpdate;
			this.uvsNeedUpdate = source.uvsNeedUpdate;
			this.normalsNeedUpdate = source.normalsNeedUpdate;
			this.colorsNeedUpdate = source.colorsNeedUpdate;
			this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
			this.groupsNeedUpdate = source.groupsNeedUpdate;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	// BoxGeometry

		function BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {

			Geometry.call(this);

			this.type = 'BoxGeometry';

			this.parameters = {
				width: width,
				height: height,
				depth: depth,
				widthSegments: widthSegments,
				heightSegments: heightSegments,
				depthSegments: depthSegments
			};

			this.fromBufferGeometry( new BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) );
			this.mergeVertices();

		}

		BoxGeometry.prototype = Object.create( Geometry.prototype );
		BoxGeometry.prototype.constructor = BoxGeometry;

	// BoxBufferGeometry

		function BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {
			if ( width === void 0 ) width = 1;
			if ( height === void 0 ) height = 1;
			if ( depth === void 0 ) depth = 1;
			if ( widthSegments === void 0 ) widthSegments = 1;
			if ( heightSegments === void 0 ) heightSegments = 1;
			if ( depthSegments === void 0 ) depthSegments = 1;


			BufferGeometry.call(this);

			this.type = 'BoxBufferGeometry';

			this.parameters = {
				width: width,
				height: height,
				depth: depth,
				widthSegments: widthSegments,
				heightSegments: heightSegments,
				depthSegments: depthSegments
			};

			var scope = this;

			// segments

			widthSegments = Math.floor( widthSegments );
			heightSegments = Math.floor( heightSegments );
			depthSegments = Math.floor( depthSegments );

			// buffers

			var indices = [];
			var vertices = [];
			var normals = [];
			var uvs = [];

			// helper variables

			var numberOfVertices = 0;
			var groupStart = 0;

			// build each side of the box geometry

			buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
			buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
			buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
			buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
			buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
			buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

			// build geometry

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

			function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

				var segmentWidth = width / gridX;
				var segmentHeight = height / gridY;

				var widthHalf = width / 2;
				var heightHalf = height / 2;
				var depthHalf = depth / 2;

				var gridX1 = gridX + 1;
				var gridY1 = gridY + 1;

				var vertexCounter = 0;
				var groupCount = 0;

				var vector = new Vector3();

				// generate vertices, normals and uvs

				for ( var iy = 0; iy < gridY1; iy ++ ) {

					var y = iy * segmentHeight - heightHalf;

					for ( var ix = 0; ix < gridX1; ix ++ ) {

						var x = ix * segmentWidth - widthHalf;

						// set values to correct vector component

						vector[ u ] = x * udir;
						vector[ v ] = y * vdir;
						vector[ w ] = depthHalf;

						// now apply vector to vertex buffer

						vertices.push( vector.x, vector.y, vector.z );

						// set values to correct vector component

						vector[ u ] = 0;
						vector[ v ] = 0;
						vector[ w ] = depth > 0 ? 1 : - 1;

						// now apply vector to normal buffer

						normals.push( vector.x, vector.y, vector.z );

						// uvs

						uvs.push( ix / gridX );
						uvs.push( 1 - ( iy / gridY ) );

						// counters

						vertexCounter += 1;

					}

				}

				// indices

				// 1. you need three indices to draw a single face
				// 2. a single segment consists of two faces
				// 3. so we need to generate six (2*3) indices per segment

				for ( var iy$1 = 0; iy$1 < gridY; iy$1 ++ ) {

					for ( var ix$1 = 0; ix$1 < gridX; ix$1 ++ ) {

						var a = numberOfVertices + ix$1 + gridX1 * iy$1;
						var b = numberOfVertices + ix$1 + gridX1 * ( iy$1 + 1 );
						var c = numberOfVertices + ( ix$1 + 1 ) + gridX1 * ( iy$1 + 1 );
						var d = numberOfVertices + ( ix$1 + 1 ) + gridX1 * iy$1;

						// faces

						indices.push( a, b, d );
						indices.push( b, c, d );

						// increase counter

						groupCount += 6;

					}

				}

				// add a group to the geometry. this will ensure multi material support

				scope.addGroup( groupStart, groupCount, materialIndex );

				// calculate new start value for groups

				groupStart += groupCount;

				// update total number of vertices

				numberOfVertices += vertexCounter;

			}

		}

		BoxBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
		BoxBufferGeometry.prototype.constructor = BoxBufferGeometry;

	/**
	 * Uniform Utilities
	 */

	function cloneUniforms( src ) {

		var dst = {};

		for ( var u in src ) {

			dst[ u ] = {};

			for ( var p in src[ u ] ) {

				var property = src[ u ][ p ];

				if ( property && ( property.isColor ||
					property.isMatrix3 || property.isMatrix4 ||
					property.isVector2 || property.isVector3 || property.isVector4 ||
					property.isTexture ) ) {

					dst[ u ][ p ] = property.clone();

				} else if ( Array.isArray( property ) ) {

					dst[ u ][ p ] = property.slice();

				} else {

					dst[ u ][ p ] = property;

				}

			}

		}

		return dst;

	}

	function mergeUniforms( uniforms ) {

		var merged = {};

		for ( var u = 0; u < uniforms.length; u ++ ) {

			var tmp = cloneUniforms( uniforms[ u ] );

			for ( var p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	}

	// Legacy

	var UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };

	var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

	var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

	/**
	 * parameters = {
	 *  defines: { "label" : "value" },
	 *  uniforms: { "parameter1": { value: 1.0 }, "parameter2": { value2: 2 } },
	 *
	 *  fragmentShader: <string>,
	 *  vertexShader: <string>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  lights: <bool>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function ShaderMaterial( parameters ) {

		Material.call( this );

		this.type = 'ShaderMaterial';

		this.defines = {};
		this.uniforms = {};

		this.vertexShader = default_vertex;
		this.fragmentShader = default_fragment;

		this.linewidth = 1;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false; // set to use scene fog
		this.lights = false; // set to use scene lights
		this.clipping = false; // set to use user-defined clipping planes

		this.skinning = false; // set to use skinning attribute streams
		this.morphTargets = false; // set to use morph targets
		this.morphNormals = false; // set to use morph normals

		this.extensions = {
			derivatives: false, // set to use derivatives
			fragDepth: false, // set to use fragment depth values
			drawBuffers: false, // set to use draw buffers
			shaderTextureLOD: false // set to use shader texture LOD
		};

		// When rendered geometry doesn't include these attributes but the material does,
		// use these default values in WebGL. This avoids errors when buffer data is missing.
		this.defaultAttributeValues = {
			'color': [ 1, 1, 1 ],
			'uv': [ 0, 0 ],
			'uv2': [ 0, 0 ]
		};

		this.index0AttributeName = undefined;
		this.uniformsNeedUpdate = false;

		this.glslVersion = null;

		if ( parameters !== undefined ) {

			if ( parameters.attributes !== undefined ) {

				console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );

			}

			this.setValues( parameters );

		}

	}

	ShaderMaterial.prototype = Object.create( Material.prototype );
	ShaderMaterial.prototype.constructor = ShaderMaterial;

	ShaderMaterial.prototype.isShaderMaterial = true;

	ShaderMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.fragmentShader = source.fragmentShader;
		this.vertexShader = source.vertexShader;

		this.uniforms = cloneUniforms( source.uniforms );

		this.defines = Object.assign( {}, source.defines );

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.lights = source.lights;
		this.clipping = source.clipping;

		this.skinning = source.skinning;

		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		this.extensions = Object.assign( {}, source.extensions );

		this.glslVersion = source.glslVersion;

		return this;

	};

	ShaderMaterial.prototype.toJSON = function ( meta ) {

		var data = Material.prototype.toJSON.call( this, meta );

		data.glslVersion = this.glslVersion;
		data.uniforms = {};

		for ( var name in this.uniforms ) {

			var uniform = this.uniforms[ name ];
			var value = uniform.value;

			if ( value && value.isTexture ) {

				data.uniforms[ name ] = {
					type: 't',
					value: value.toJSON( meta ).uuid
				};

			} else if ( value && value.isColor ) {

				data.uniforms[ name ] = {
					type: 'c',
					value: value.getHex()
				};

			} else if ( value && value.isVector2 ) {

				data.uniforms[ name ] = {
					type: 'v2',
					value: value.toArray()
				};

			} else if ( value && value.isVector3 ) {

				data.uniforms[ name ] = {
					type: 'v3',
					value: value.toArray()
				};

			} else if ( value && value.isVector4 ) {

				data.uniforms[ name ] = {
					type: 'v4',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix3 ) {

				data.uniforms[ name ] = {
					type: 'm3',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix4 ) {

				data.uniforms[ name ] = {
					type: 'm4',
					value: value.toArray()
				};

			} else {

				data.uniforms[ name ] = {
					value: value
				};

				// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

			}

		}

		if ( Object.keys( this.defines ).length > 0 ) { data.defines = this.defines; }

		data.vertexShader = this.vertexShader;
		data.fragmentShader = this.fragmentShader;

		var extensions = {};

		for ( var key in this.extensions ) {

			if ( this.extensions[ key ] === true ) { extensions[ key ] = true; }

		}

		if ( Object.keys( extensions ).length > 0 ) { data.extensions = extensions; }

		return data;

	};

	function Camera() {

		Object3D.call( this );

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Camera,

		isCamera: true,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			this.matrixWorldInverse.copy( source.matrixWorldInverse );

			this.projectionMatrix.copy( source.projectionMatrix );
			this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

			return this;

		},

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

		},

		updateMatrixWorld: function ( force ) {

			Object3D.prototype.updateMatrixWorld.call( this, force );

			this.matrixWorldInverse.getInverse( this.matrixWorld );

		},

		updateWorldMatrix: function ( updateParents, updateChildren ) {

			Object3D.prototype.updateWorldMatrix.call( this, updateParents, updateChildren );

			this.matrixWorldInverse.getInverse( this.matrixWorld );

		},

		clone: function () {

			return new this.constructor().copy( this );

		}

	} );

	function PerspectiveCamera( fov, aspect, near, far ) {

		Camera.call( this );

		this.type = 'PerspectiveCamera';

		this.fov = fov !== undefined ? fov : 50;
		this.zoom = 1;

		this.near = near !== undefined ? near : 0.1;
		this.far = far !== undefined ? far : 2000;
		this.focus = 10;

		this.aspect = aspect !== undefined ? aspect : 1;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	PerspectiveCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: PerspectiveCamera,

		isPerspectiveCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.fov = source.fov;
			this.zoom = source.zoom;

			this.near = source.near;
			this.far = source.far;
			this.focus = source.focus;

			this.aspect = source.aspect;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			this.filmGauge = source.filmGauge;
			this.filmOffset = source.filmOffset;

			return this;

		},

		/**
		 * Sets the FOV by focal length in respect to the current .filmGauge.
		 *
		 * The default film gauge is 35, so that the focal length can be specified for
		 * a 35mm (full frame) camera.
		 *
		 * Values for focal length and film gauge must have the same unit.
		 */
		setFocalLength: function ( focalLength ) {

			// see http://www.bobatkins.com/photography/technical/field_of_view.html
			var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

			this.fov = MathUtils.RAD2DEG * 2 * Math.atan( vExtentSlope );
			this.updateProjectionMatrix();

		},

		/**
		 * Calculates the focal length from the current .fov and .filmGauge.
		 */
		getFocalLength: function () {

			var vExtentSlope = Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov );

			return 0.5 * this.getFilmHeight() / vExtentSlope;

		},

		getEffectiveFOV: function () {

			return MathUtils.RAD2DEG * 2 * Math.atan(
				Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov ) / this.zoom );

		},

		getFilmWidth: function () {

			// film not completely covered in portrait format (aspect < 1)
			return this.filmGauge * Math.min( this.aspect, 1 );

		},

		getFilmHeight: function () {

			// film not completely covered in landscape format (aspect > 1)
			return this.filmGauge / Math.max( this.aspect, 1 );

		},

		/**
		 * Sets an offset in a larger frustum. This is useful for multi-window or
		 * multi-monitor/multi-machine setups.
		 *
		 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
		 * the monitors are in grid like this
		 *
		 *   +---+---+---+
		 *   | A | B | C |
		 *   +---+---+---+
		 *   | D | E | F |
		 *   +---+---+---+
		 *
		 * then for each monitor you would call it like this
		 *
		 *   const w = 1920;
		 *   const h = 1080;
		 *   const fullWidth = w * 3;
		 *   const fullHeight = h * 2;
		 *
		 *   --A--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
		 *   --B--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
		 *   --C--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
		 *   --D--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
		 *   --E--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
		 *   --F--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
		 *
		 *   Note there is no reason monitors have to be the same size or in a grid.
		 */
		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			this.aspect = fullWidth / fullHeight;

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var near = this.near;
			var top = near * Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov ) / this.zoom;
			var height = 2 * top;
			var width = this.aspect * height;
			var left = - 0.5 * width;
			var view = this.view;

			if ( this.view !== null && this.view.enabled ) {

				var fullWidth = view.fullWidth,
					fullHeight = view.fullHeight;

				left += view.offsetX * width / fullWidth;
				top -= view.offsetY * height / fullHeight;
				width *= view.width / fullWidth;
				height *= view.height / fullHeight;

			}

			var skew = this.filmOffset;
			if ( skew !== 0 ) { left += near * skew / this.getFilmWidth(); }

			this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.fov = this.fov;
			data.object.zoom = this.zoom;

			data.object.near = this.near;
			data.object.far = this.far;
			data.object.focus = this.focus;

			data.object.aspect = this.aspect;

			if ( this.view !== null ) { data.object.view = Object.assign( {}, this.view ); }

			data.object.filmGauge = this.filmGauge;
			data.object.filmOffset = this.filmOffset;

			return data;

		}

	} );

	var fov = 90, aspect = 1;

	function CubeCamera( near, far, renderTarget ) {

		Object3D.call( this );

		this.type = 'CubeCamera';

		if ( renderTarget.isWebGLCubeRenderTarget !== true ) {

			console.error( 'THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.' );
			return;

		}

		this.renderTarget = renderTarget;

		var cameraPX = new PerspectiveCamera( fov, aspect, near, far );
		cameraPX.layers = this.layers;
		cameraPX.up.set( 0, - 1, 0 );
		cameraPX.lookAt( new Vector3( 1, 0, 0 ) );
		this.add( cameraPX );

		var cameraNX = new PerspectiveCamera( fov, aspect, near, far );
		cameraNX.layers = this.layers;
		cameraNX.up.set( 0, - 1, 0 );
		cameraNX.lookAt( new Vector3( - 1, 0, 0 ) );
		this.add( cameraNX );

		var cameraPY = new PerspectiveCamera( fov, aspect, near, far );
		cameraPY.layers = this.layers;
		cameraPY.up.set( 0, 0, 1 );
		cameraPY.lookAt( new Vector3( 0, 1, 0 ) );
		this.add( cameraPY );

		var cameraNY = new PerspectiveCamera( fov, aspect, near, far );
		cameraNY.layers = this.layers;
		cameraNY.up.set( 0, 0, - 1 );
		cameraNY.lookAt( new Vector3( 0, - 1, 0 ) );
		this.add( cameraNY );

		var cameraPZ = new PerspectiveCamera( fov, aspect, near, far );
		cameraPZ.layers = this.layers;
		cameraPZ.up.set( 0, - 1, 0 );
		cameraPZ.lookAt( new Vector3( 0, 0, 1 ) );
		this.add( cameraPZ );

		var cameraNZ = new PerspectiveCamera( fov, aspect, near, far );
		cameraNZ.layers = this.layers;
		cameraNZ.up.set( 0, - 1, 0 );
		cameraNZ.lookAt( new Vector3( 0, 0, - 1 ) );
		this.add( cameraNZ );

		this.update = function ( renderer, scene ) {

			if ( this.parent === null ) { this.updateMatrixWorld(); }

			var currentXrEnabled = renderer.xr.enabled;
			var currentRenderTarget = renderer.getRenderTarget();

			renderer.xr.enabled = false;

			var generateMipmaps = renderTarget.texture.generateMipmaps;

			renderTarget.texture.generateMipmaps = false;

			renderer.setRenderTarget( renderTarget, 0 );
			renderer.render( scene, cameraPX );

			renderer.setRenderTarget( renderTarget, 1 );
			renderer.render( scene, cameraNX );

			renderer.setRenderTarget( renderTarget, 2 );
			renderer.render( scene, cameraPY );

			renderer.setRenderTarget( renderTarget, 3 );
			renderer.render( scene, cameraNY );

			renderer.setRenderTarget( renderTarget, 4 );
			renderer.render( scene, cameraPZ );

			renderTarget.texture.generateMipmaps = generateMipmaps;

			renderer.setRenderTarget( renderTarget, 5 );
			renderer.render( scene, cameraNZ );

			renderer.setRenderTarget( currentRenderTarget );

			renderer.xr.enabled = currentXrEnabled;

		};

		this.clear = function ( renderer, color, depth, stencil ) {

			var currentRenderTarget = renderer.getRenderTarget();

			for ( var i = 0; i < 6; i ++ ) {

				renderer.setRenderTarget( renderTarget, i );

				renderer.clear( color, depth, stencil );

			}

			renderer.setRenderTarget( currentRenderTarget );

		};

	}

	CubeCamera.prototype = Object.create( Object3D.prototype );
	CubeCamera.prototype.constructor = CubeCamera;

	function WebGLCubeRenderTarget( size, options, dummy ) {

		if ( Number.isInteger( options ) ) {

			console.warn( 'THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )' );

			options = dummy;

		}

		WebGLRenderTarget.call( this, size, size, options );

		this.texture.isWebGLCubeRenderTargetTexture = true; // HACK Why is texture not a CubeTexture?

	}

	WebGLCubeRenderTarget.prototype = Object.create( WebGLRenderTarget.prototype );
	WebGLCubeRenderTarget.prototype.constructor = WebGLCubeRenderTarget;

	WebGLCubeRenderTarget.prototype.isWebGLCubeRenderTarget = true;

	WebGLCubeRenderTarget.prototype.fromEquirectangularTexture = function ( renderer, texture ) {

		this.texture.type = texture.type;
		this.texture.format = RGBAFormat; // see #18859
		this.texture.encoding = texture.encoding;

		this.texture.generateMipmaps = texture.generateMipmaps;
		this.texture.minFilter = texture.minFilter;
		this.texture.magFilter = texture.magFilter;

		var shader = {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: /* glsl */"\n\n\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t#include <begin_vertex>\n\t\t\t\t#include <project_vertex>\n\n\t\t\t}\n\t\t",

			fragmentShader: /* glsl */"\n\n\t\t\tuniform sampler2D tEquirect;\n\n\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t}\n\t\t"
		};

		var geometry = new BoxBufferGeometry( 5, 5, 5 );

		var material = new ShaderMaterial( {

			name: 'CubemapFromEquirect',

			uniforms: cloneUniforms( shader.uniforms ),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: BackSide,
			blending: NoBlending

		} );

		material.uniforms.tEquirect.value = texture;

		var mesh = new Mesh( geometry, material );

		var currentMinFilter = texture.minFilter;

		// Avoid blurred poles
		if ( texture.minFilter === LinearMipmapLinearFilter ) { texture.minFilter = LinearFilter; }

		var camera = new CubeCamera( 1, 10, this );
		camera.update( renderer, mesh );

		texture.minFilter = currentMinFilter;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	};

	function DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { data: data || null, width: width || 1, height: height || 1 };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.generateMipmaps = false;
		this.flipY = false;
		this.unpackAlignment = 1;

		this.needsUpdate = true;

	}

	DataTexture.prototype = Object.create( Texture.prototype );
	DataTexture.prototype.constructor = DataTexture;

	DataTexture.prototype.isDataTexture = true;

	var _sphere$1 = new Sphere();
	var _vector$5 = new Vector3();

	var Frustum = function Frustum( p0, p1, p2, p3, p4, p5 ) {

		this.planes = [

			( p0 !== undefined ) ? p0 : new Plane(),
			( p1 !== undefined ) ? p1 : new Plane(),
			( p2 !== undefined ) ? p2 : new Plane(),
			( p3 !== undefined ) ? p3 : new Plane(),
			( p4 !== undefined ) ? p4 : new Plane(),
			( p5 !== undefined ) ? p5 : new Plane()

		];

	};

	Frustum.prototype.set = function set ( p0, p1, p2, p3, p4, p5 ) {

		var planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );

		return this;

	};

	Frustum.prototype.clone = function clone () {

		return new this.constructor().copy( this );

	};

	Frustum.prototype.copy = function copy ( frustum ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	};

	Frustum.prototype.setFromProjectionMatrix = function setFromProjectionMatrix ( m ) {

		var planes = this.planes;
		var me = m.elements;
		var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
		var me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
		var me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
		var me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

		planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
		planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
		planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
		planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
		planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
		planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

		return this;

	};

	Frustum.prototype.intersectsObject = function intersectsObject ( object ) {

		var geometry = object.geometry;

		if ( geometry.boundingSphere === null ) { geometry.computeBoundingSphere(); }

		_sphere$1.copy( geometry.boundingSphere ).applyMatrix4( object.matrixWorld );

		return this.intersectsSphere( _sphere$1 );

	};

	Frustum.prototype.intersectsSprite = function intersectsSprite ( sprite ) {

		_sphere$1.center.set( 0, 0, 0 );
		_sphere$1.radius = 0.7071067811865476;
		_sphere$1.applyMatrix4( sprite.matrixWorld );

		return this.intersectsSphere( _sphere$1 );

	};

	Frustum.prototype.intersectsSphere = function intersectsSphere ( sphere ) {

		var planes = this.planes;
		var center = sphere.center;
		var negRadius = - sphere.radius;

		for ( var i = 0; i < 6; i ++ ) {

			var distance = planes[ i ].distanceToPoint( center );

			if ( distance < negRadius ) {

				return false;

			}

		}

		return true;

	};

	Frustum.prototype.intersectsBox = function intersectsBox ( box ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			var plane = planes[ i ];

			// corner at max distance

			_vector$5.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			_vector$5.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			_vector$5.z = plane.normal.z > 0 ? box.max.z : box.min.z;

			if ( plane.distanceToPoint( _vector$5 ) < 0 ) {

				return false;

			}

		}

		return true;

	};

	Frustum.prototype.containsPoint = function containsPoint ( point ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	};

	function WebGLAnimation() {

		var context = null;
		var isAnimating = false;
		var animationLoop = null;
		var requestId = null;

		function onAnimationFrame( time, frame ) {

			animationLoop( time, frame );

			requestId = context.requestAnimationFrame( onAnimationFrame );

		}

		return {

			start: function () {

				if ( isAnimating === true ) { return; }
				if ( animationLoop === null ) { return; }

				requestId = context.requestAnimationFrame( onAnimationFrame );

				isAnimating = true;

			},

			stop: function () {

				context.cancelAnimationFrame( requestId );

				isAnimating = false;

			},

			setAnimationLoop: function ( callback ) {

				animationLoop = callback;

			},

			setContext: function ( value ) {

				context = value;

			}

		};

	}

	function WebGLAttributes( gl, capabilities ) {

		var isWebGL2 = capabilities.isWebGL2;

		var buffers = new WeakMap();

		function createBuffer( attribute, bufferType ) {

			var array = attribute.array;
			var usage = attribute.usage;

			var buffer = gl.createBuffer();

			gl.bindBuffer( bufferType, buffer );
			gl.bufferData( bufferType, array, usage );

			attribute.onUploadCallback();

			var type = 5126;

			if ( array instanceof Float32Array ) {

				type = 5126;

			} else if ( array instanceof Float64Array ) {

				console.warn( 'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.' );

			} else if ( array instanceof Uint16Array ) {

				type = 5123;

			} else if ( array instanceof Int16Array ) {

				type = 5122;

			} else if ( array instanceof Uint32Array ) {

				type = 5125;

			} else if ( array instanceof Int32Array ) {

				type = 5124;

			} else if ( array instanceof Int8Array ) {

				type = 5120;

			} else if ( array instanceof Uint8Array ) {

				type = 5121;

			}

			return {
				buffer: buffer,
				type: type,
				bytesPerElement: array.BYTES_PER_ELEMENT,
				version: attribute.version
			};

		}

		function updateBuffer( buffer, attribute, bufferType ) {

			var array = attribute.array;
			var updateRange = attribute.updateRange;

			gl.bindBuffer( bufferType, buffer );

			if ( updateRange.count === - 1 ) {

				// Not using update ranges

				gl.bufferSubData( bufferType, 0, array );

			} else {

				if ( isWebGL2 ) {

					gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
						array, updateRange.offset, updateRange.count );

				} else {

					gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
						array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

				}

				updateRange.count = - 1; // reset range

			}

		}

		//

		function get( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) { attribute = attribute.data; }

			return buffers.get( attribute );

		}

		function remove( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) { attribute = attribute.data; }

			var data = buffers.get( attribute );

			if ( data ) {

				gl.deleteBuffer( data.buffer );

				buffers.delete( attribute );

			}

		}

		function update( attribute, bufferType ) {

			if ( attribute.isGLBufferAttribute ) {

				var cached = buffers.get( attribute );

				if ( ! cached || cached.version < attribute.version ) {

					buffers.set( attribute, {
						buffer: attribute.buffer,
						type: attribute.type,
						bytesPerElement: attribute.elementSize,
						version: attribute.version
					} );

				}

				return;

			}

			if ( attribute.isInterleavedBufferAttribute ) { attribute = attribute.data; }

			var data = buffers.get( attribute );

			if ( data === undefined ) {

				buffers.set( attribute, createBuffer( attribute, bufferType ) );

			} else if ( data.version < attribute.version ) {

				updateBuffer( data.buffer, attribute, bufferType );

				data.version = attribute.version;

			}

		}

		return {

			get: get,
			remove: remove,
			update: update

		};

	}

	// PlaneGeometry

		function PlaneGeometry( width, height, widthSegments, heightSegments ) {

			Geometry.call(this);

			this.type = 'PlaneGeometry';

			this.parameters = {
				width: width,
				height: height,
				widthSegments: widthSegments,
				heightSegments: heightSegments
			};

			this.fromBufferGeometry( new PlaneBufferGeometry( width, height, widthSegments, heightSegments ) );
			this.mergeVertices();

		}

		PlaneGeometry.prototype = Object.create( Geometry.prototype );
		PlaneGeometry.prototype.constructor = PlaneGeometry;

	// PlaneBufferGeometry

		function PlaneBufferGeometry( width, height, widthSegments, heightSegments ) {

			BufferGeometry.call(this);
			this.type = 'PlaneBufferGeometry';

			this.parameters = {
				width: width,
				height: height,
				widthSegments: widthSegments,
				heightSegments: heightSegments
			};

			width = width || 1;
			height = height || 1;

			var width_half = width / 2;
			var height_half = height / 2;

			var gridX = Math.floor( widthSegments ) || 1;
			var gridY = Math.floor( heightSegments ) || 1;

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;

			var segment_width = width / gridX;
			var segment_height = height / gridY;

			// buffers

			var indices = [];
			var vertices = [];
			var normals = [];
			var uvs = [];

			// generate vertices, normals and uvs

			for ( var iy = 0; iy < gridY1; iy ++ ) {

				var y = iy * segment_height - height_half;

				for ( var ix = 0; ix < gridX1; ix ++ ) {

					var x = ix * segment_width - width_half;

					vertices.push( x, - y, 0 );

					normals.push( 0, 0, 1 );

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

				}

			}

			// indices

			for ( var iy$1 = 0; iy$1 < gridY; iy$1 ++ ) {

				for ( var ix$1 = 0; ix$1 < gridX; ix$1 ++ ) {

					var a = ix$1 + gridX1 * iy$1;
					var b = ix$1 + gridX1 * ( iy$1 + 1 );
					var c = ( ix$1 + 1 ) + gridX1 * ( iy$1 + 1 );
					var d = ( ix$1 + 1 ) + gridX1 * iy$1;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

				}

			}

			// build geometry

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		}

		PlaneBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
		PlaneBufferGeometry.prototype.constructor = PlaneBufferGeometry;

	var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif";

	var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

	var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif";

	var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif";

	var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

	var begin_vertex = "vec3 transformed = vec3( position );";

	var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";

	var bsdfs = "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif";

	var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";

	var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";

	var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";

	var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";

	var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";

	var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

	var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

	var color_pars_vertex = "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";

	var color_vertex = "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz *= color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";

	var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}";

	var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";

	var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";

	var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";

	var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif";

	var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";

	var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";

	var encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";

	var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}";

	var envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";

	var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";

	var envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";

	var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";

	var envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";

	var fog_vertex = "#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif";

	var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif";

	var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";

	var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";

	var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}";

	var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif";

	var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

	var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif";

	var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif";

	var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif";

	var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";

	var lights_toon_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)";

	var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";

	var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)";

	var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif";

	var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";

	var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";

	var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif";

	var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif";

	var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

	var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";

	var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";

	var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";

	var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif";

	var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";

	var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";

	var map_particle_pars_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

	var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";

	var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

	var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif";

	var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

	var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif";

	var normal_fragment_begin = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;";

	var normal_fragment_maps = "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif";

	var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tmat3 tsn = mat3( S, T, N );\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif";

	var clearcoat_normal_fragment_begin = "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif";

	var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );\n\t#endif\n#endif";

	var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif";

	var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}";

	var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";

	var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";

	var dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";

	var dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";

	var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";

	var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

	var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";

	var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";

	var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif";

	var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";

	var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

	var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif";

	var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";

	var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";

	var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

	var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

	var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";

	var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";

	var transmissionmap_fragment = "#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif";

	var transmissionmap_pars_fragment = "#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif";

	var uv_pars_fragment = "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif";

	var uv_pars_vertex = "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif";

	var uv_vertex = "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

	var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

	var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif";

	var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif";

	var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";

	var background_frag = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var background_vert = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";

	var cube_frag = "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var cube_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";

	var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";

	var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";

	var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";

	var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";

	var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var equirect_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";

	var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

	var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshmatcap_frag = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshmatcap_vert = "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";

	var meshtoon_frag = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshtoon_vert = "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshphysical_frag = "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshphysical_vert = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}";

	var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";

	var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

	var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";

	var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var shadow_vert = "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	var ShaderChunk = {
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		encodings_fragment: encodings_fragment,
		encodings_pars_fragment: encodings_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_common_pars_fragment: envmap_common_pars_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_vertex: lights_lambert_vertex,
		lights_pars_begin: lights_pars_begin,
		lights_toon_fragment: lights_toon_fragment,
		lights_toon_pars_fragment: lights_toon_pars_fragment,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normalmap_pars_fragment: normalmap_pars_fragment,
		clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
		clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
		clearcoat_pars_fragment: clearcoat_pars_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		transmissionmap_fragment: transmissionmap_fragment,
		transmissionmap_pars_fragment: transmissionmap_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		uv2_pars_fragment: uv2_pars_fragment,
		uv2_pars_vertex: uv2_pars_vertex,
		uv2_vertex: uv2_vertex,
		worldpos_vertex: worldpos_vertex,

		background_frag: background_frag,
		background_vert: background_vert,
		cube_frag: cube_frag,
		cube_vert: cube_vert,
		depth_frag: depth_frag,
		depth_vert: depth_vert,
		distanceRGBA_frag: distanceRGBA_frag,
		distanceRGBA_vert: distanceRGBA_vert,
		equirect_frag: equirect_frag,
		equirect_vert: equirect_vert,
		linedashed_frag: linedashed_frag,
		linedashed_vert: linedashed_vert,
		meshbasic_frag: meshbasic_frag,
		meshbasic_vert: meshbasic_vert,
		meshlambert_frag: meshlambert_frag,
		meshlambert_vert: meshlambert_vert,
		meshmatcap_frag: meshmatcap_frag,
		meshmatcap_vert: meshmatcap_vert,
		meshtoon_frag: meshtoon_frag,
		meshtoon_vert: meshtoon_vert,
		meshphong_frag: meshphong_frag,
		meshphong_vert: meshphong_vert,
		meshphysical_frag: meshphysical_frag,
		meshphysical_vert: meshphysical_vert,
		normal_frag: normal_frag,
		normal_vert: normal_vert,
		points_frag: points_frag,
		points_vert: points_vert,
		shadow_frag: shadow_frag,
		shadow_vert: shadow_vert,
		sprite_frag: sprite_frag,
		sprite_vert: sprite_vert
	};

	/**
	 * Uniforms library for shared webgl shaders
	 */

	var UniformsLib = {

		common: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },

			map: { value: null },
			uvTransform: { value: new Matrix3() },
			uv2Transform: { value: new Matrix3() },

			alphaMap: { value: null },

		},

		specularmap: {

			specularMap: { value: null },

		},

		envmap: {

			envMap: { value: null },
			flipEnvMap: { value: - 1 },
			reflectivity: { value: 1.0 },
			refractionRatio: { value: 0.98 },
			maxMipLevel: { value: 0 }

		},

		aomap: {

			aoMap: { value: null },
			aoMapIntensity: { value: 1 }

		},

		lightmap: {

			lightMap: { value: null },
			lightMapIntensity: { value: 1 }

		},

		emissivemap: {

			emissiveMap: { value: null }

		},

		bumpmap: {

			bumpMap: { value: null },
			bumpScale: { value: 1 }

		},

		normalmap: {

			normalMap: { value: null },
			normalScale: { value: new Vector2( 1, 1 ) }

		},

		displacementmap: {

			displacementMap: { value: null },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }

		},

		roughnessmap: {

			roughnessMap: { value: null }

		},

		metalnessmap: {

			metalnessMap: { value: null }

		},

		gradientmap: {

			gradientMap: { value: null }

		},

		fog: {

			fogDensity: { value: 0.00025 },
			fogNear: { value: 1 },
			fogFar: { value: 2000 },
			fogColor: { value: new Color( 0xffffff ) }

		},

		lights: {

			ambientLightColor: { value: [] },

			lightProbe: { value: [] },

			directionalLights: { value: [], properties: {
				direction: {},
				color: {}
			} },

			directionalLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },

			spotLights: { value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			} },

			spotLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			spotShadowMap: { value: [] },
			spotShadowMatrix: { value: [] },

			pointLights: { value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			} },

			pointLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			} },

			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },

			hemisphereLights: { value: [], properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			} },

			// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
			rectAreaLights: { value: [], properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			} },

			ltc_1: { value: null },
			ltc_2: { value: null }

		},

		points: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			size: { value: 1.0 },
			scale: { value: 1.0 },
			map: { value: null },
			alphaMap: { value: null },
			uvTransform: { value: new Matrix3() }

		},

		sprite: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			center: { value: new Vector2( 0.5, 0.5 ) },
			rotation: { value: 0.0 },
			map: { value: null },
			alphaMap: { value: null },
			uvTransform: { value: new Matrix3() }

		}

	};

	var ShaderLib = {

		basic: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.meshbasic_vert,
			fragmentShader: ShaderChunk.meshbasic_frag

		},

		lambert: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshlambert_vert,
			fragmentShader: ShaderChunk.meshlambert_frag

		},

		phong: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					specular: { value: new Color( 0x111111 ) },
					shininess: { value: 30 }
				}
			] ),

			vertexShader: ShaderChunk.meshphong_vert,
			fragmentShader: ShaderChunk.meshphong_frag

		},

		standard: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					roughness: { value: 1.0 },
					metalness: { value: 0.0 },
					envMapIntensity: { value: 1 } // temporary
				}
			] ),

			vertexShader: ShaderChunk.meshphysical_vert,
			fragmentShader: ShaderChunk.meshphysical_frag

		},

		toon: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.gradientmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshtoon_vert,
			fragmentShader: ShaderChunk.meshtoon_frag

		},

		matcap: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				{
					matcap: { value: null }
				}
			] ),

			vertexShader: ShaderChunk.meshmatcap_vert,
			fragmentShader: ShaderChunk.meshmatcap_frag

		},

		points: {

			uniforms: mergeUniforms( [
				UniformsLib.points,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.points_vert,
			fragmentShader: ShaderChunk.points_frag

		},

		dashed: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.fog,
				{
					scale: { value: 1 },
					dashSize: { value: 1 },
					totalSize: { value: 2 }
				}
			] ),

			vertexShader: ShaderChunk.linedashed_vert,
			fragmentShader: ShaderChunk.linedashed_frag

		},

		depth: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap
			] ),

			vertexShader: ShaderChunk.depth_vert,
			fragmentShader: ShaderChunk.depth_frag

		},

		normal: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.normal_vert,
			fragmentShader: ShaderChunk.normal_frag

		},

		sprite: {

			uniforms: mergeUniforms( [
				UniformsLib.sprite,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.sprite_vert,
			fragmentShader: ShaderChunk.sprite_frag

		},

		background: {

			uniforms: {
				uvTransform: { value: new Matrix3() },
				t2D: { value: null },
			},

			vertexShader: ShaderChunk.background_vert,
			fragmentShader: ShaderChunk.background_frag

		},
		/* -------------------------------------------------------------------------
		//	Cube map shader
		 ------------------------------------------------------------------------- */

		cube: {

			uniforms: mergeUniforms( [
				UniformsLib.envmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.cube_vert,
			fragmentShader: ShaderChunk.cube_frag

		},

		equirect: {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: ShaderChunk.equirect_vert,
			fragmentShader: ShaderChunk.equirect_frag

		},

		distanceRGBA: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap,
				{
					referencePosition: { value: new Vector3() },
					nearDistance: { value: 1 },
					farDistance: { value: 1000 }
				}
			] ),

			vertexShader: ShaderChunk.distanceRGBA_vert,
			fragmentShader: ShaderChunk.distanceRGBA_frag

		},

		shadow: {

			uniforms: mergeUniforms( [
				UniformsLib.lights,
				UniformsLib.fog,
				{
					color: { value: new Color( 0x00000 ) },
					opacity: { value: 1.0 }
				} ] ),

			vertexShader: ShaderChunk.shadow_vert,
			fragmentShader: ShaderChunk.shadow_frag

		}

	};

	ShaderLib.physical = {

		uniforms: mergeUniforms( [
			ShaderLib.standard.uniforms,
			{
				clearcoat: { value: 0 },
				clearcoatMap: { value: null },
				clearcoatRoughness: { value: 0 },
				clearcoatRoughnessMap: { value: null },
				clearcoatNormalScale: { value: new Vector2( 1, 1 ) },
				clearcoatNormalMap: { value: null },
				sheen: { value: new Color( 0x000000 ) },
				transmission: { value: 0 },
				transmissionMap: { value: null },
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	};

	function WebGLBackground( renderer, cubemaps, state, objects, premultipliedAlpha ) {

		var clearColor = new Color( 0x000000 );
		var clearAlpha = 0;

		var planeMesh;
		var boxMesh;

		var currentBackground = null;
		var currentBackgroundVersion = 0;
		var currentTonemapping = null;

		function render( renderList, scene, camera, forceClear ) {

			var background = scene.isScene === true ? scene.background : null;

			if ( background && background.isTexture ) {

				background = cubemaps.get( background );

			}

			// Ignore background in AR
			// TODO: Reconsider this.

			var xr = renderer.xr;
			var session = xr.getSession && xr.getSession();

			if ( session && session.environmentBlendMode === 'additive' ) {

				background = null;

			}

			if ( background === null ) {

				setClear( clearColor, clearAlpha );

			} else if ( background && background.isColor ) {

				setClear( background, 1 );
				forceClear = true;

			}

			if ( renderer.autoClear || forceClear ) {

				renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );

			}

			if ( background && ( background.isCubeTexture || background.isWebGLCubeRenderTarget || background.isWebGLCubeRenderTargetTexture || background.mapping === CubeUVReflectionMapping ) ) {

				if ( boxMesh === undefined ) {

					boxMesh = new Mesh(
						new BoxBufferGeometry( 1, 1, 1 ),
						new ShaderMaterial( {
							name: 'BackgroundCubeMaterial',
							uniforms: cloneUniforms( ShaderLib.cube.uniforms ),
							vertexShader: ShaderLib.cube.vertexShader,
							fragmentShader: ShaderLib.cube.fragmentShader,
							side: BackSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					boxMesh.geometry.deleteAttribute( 'normal' );
					boxMesh.geometry.deleteAttribute( 'uv' );

					boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

						this.matrixWorld.copyPosition( camera.matrixWorld );

					};

					// enable code injection for non-built-in material
					Object.defineProperty( boxMesh.material, 'envMap', {

						get: function () {

							return this.uniforms.envMap.value;

						}

					} );

					objects.update( boxMesh );

				}

				if ( background.isWebGLCubeRenderTarget ) {

					// TODO Deprecate

					background = background.texture;

				}

				boxMesh.material.uniforms.envMap.value = background;
				boxMesh.material.uniforms.flipEnvMap.value = background.isCubeTexture ? - 1 : 1;

				if ( currentBackground !== background ||
					currentBackgroundVersion !== background.version ||
					currentTonemapping !== renderer.toneMapping ) {

					boxMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = background.version;
					currentTonemapping = renderer.toneMapping;

				}

				// push to the pre-sorted opaque render list
				renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

			} else if ( background && background.isTexture ) {

				if ( planeMesh === undefined ) {

					planeMesh = new Mesh(
						new PlaneBufferGeometry( 2, 2 ),
						new ShaderMaterial( {
							name: 'BackgroundMaterial',
							uniforms: cloneUniforms( ShaderLib.background.uniforms ),
							vertexShader: ShaderLib.background.vertexShader,
							fragmentShader: ShaderLib.background.fragmentShader,
							side: FrontSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					planeMesh.geometry.deleteAttribute( 'normal' );

					// enable code injection for non-built-in material
					Object.defineProperty( planeMesh.material, 'map', {

						get: function () {

							return this.uniforms.t2D.value;

						}

					} );

					objects.update( planeMesh );

				}

				planeMesh.material.uniforms.t2D.value = background;

				if ( background.matrixAutoUpdate === true ) {

					background.updateMatrix();

				}

				planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

				if ( currentBackground !== background ||
					currentBackgroundVersion !== background.version ||
					currentTonemapping !== renderer.toneMapping ) {

					planeMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = background.version;
					currentTonemapping = renderer.toneMapping;

				}


				// push to the pre-sorted opaque render list
				renderList.unshift( planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null );

			}

		}

		function setClear( color, alpha ) {

			state.buffers.color.setClear( color.r, color.g, color.b, alpha, premultipliedAlpha );

		}

		return {

			getClearColor: function () {

				return clearColor;

			},
			setClearColor: function ( color, alpha ) {

				clearColor.set( color );
				clearAlpha = alpha !== undefined ? alpha : 1;
				setClear( clearColor, clearAlpha );

			},
			getClearAlpha: function () {

				return clearAlpha;

			},
			setClearAlpha: function ( alpha ) {

				clearAlpha = alpha;
				setClear( clearColor, clearAlpha );

			},
			render: render

		};

	}

	function WebGLBindingStates( gl, extensions, attributes, capabilities ) {

		var maxVertexAttributes = gl.getParameter( 34921 );

		var extension = capabilities.isWebGL2 ? null : extensions.get( 'OES_vertex_array_object' );
		var vaoAvailable = capabilities.isWebGL2 || extension !== null;

		var bindingStates = {};

		var defaultState = createBindingState( null );
		var currentState = defaultState;

		function setup( object, material, program, geometry, index ) {

			var updateBuffers = false;

			if ( vaoAvailable ) {

				var state = getBindingState( geometry, program, material );

				if ( currentState !== state ) {

					currentState = state;
					bindVertexArrayObject( currentState.object );

				}

				updateBuffers = needsUpdate( geometry, index );

				if ( updateBuffers ) { saveCache( geometry, index ); }

			} else {

				var wireframe = ( material.wireframe === true );

				if ( currentState.geometry !== geometry.id ||
					currentState.program !== program.id ||
					currentState.wireframe !== wireframe ) {

					currentState.geometry = geometry.id;
					currentState.program = program.id;
					currentState.wireframe = wireframe;

					updateBuffers = true;

				}

			}

			if ( object.isInstancedMesh === true ) {

				updateBuffers = true;

			}

			if ( index !== null ) {

				attributes.update( index, 34963 );

			}

			if ( updateBuffers ) {

				setupVertexAttributes( object, material, program, geometry );

				if ( index !== null ) {

					gl.bindBuffer( 34963, attributes.get( index ).buffer );

				}

			}

		}

		function createVertexArrayObject() {

			if ( capabilities.isWebGL2 ) { return gl.createVertexArray(); }

			return extension.createVertexArrayOES();

		}

		function bindVertexArrayObject( vao ) {

			if ( capabilities.isWebGL2 ) { return gl.bindVertexArray( vao ); }

			return extension.bindVertexArrayOES( vao );

		}

		function deleteVertexArrayObject( vao ) {

			if ( capabilities.isWebGL2 ) { return gl.deleteVertexArray( vao ); }

			return extension.deleteVertexArrayOES( vao );

		}

		function getBindingState( geometry, program, material ) {

			var wireframe = ( material.wireframe === true );

			var programMap = bindingStates[ geometry.id ];

			if ( programMap === undefined ) {

				programMap = {};
				bindingStates[ geometry.id ] = programMap;

			}

			var stateMap = programMap[ program.id ];

			if ( stateMap === undefined ) {

				stateMap = {};
				programMap[ program.id ] = stateMap;

			}

			var state = stateMap[ wireframe ];

			if ( state === undefined ) {

				state = createBindingState( createVertexArrayObject() );
				stateMap[ wireframe ] = state;

			}

			return state;

		}

		function createBindingState( vao ) {

			var newAttributes = [];
			var enabledAttributes = [];
			var attributeDivisors = [];

			for ( var i = 0; i < maxVertexAttributes; i ++ ) {

				newAttributes[ i ] = 0;
				enabledAttributes[ i ] = 0;
				attributeDivisors[ i ] = 0;

			}

			return {

				// for backward compatibility on non-VAO support browser
				geometry: null,
				program: null,
				wireframe: false,

				newAttributes: newAttributes,
				enabledAttributes: enabledAttributes,
				attributeDivisors: attributeDivisors,
				object: vao,
				attributes: {},
				index: null

			};

		}

		function needsUpdate( geometry, index ) {

			var cachedAttributes = currentState.attributes;
			var geometryAttributes = geometry.attributes;

			if ( Object.keys( cachedAttributes ).length !== Object.keys( geometryAttributes ).length ) { return true; }

			for ( var key in geometryAttributes ) {

				var cachedAttribute = cachedAttributes[ key ];
				var geometryAttribute = geometryAttributes[ key ];

				if ( cachedAttribute === undefined ) { return true; }

				if ( cachedAttribute.attribute !== geometryAttribute ) { return true; }

				if ( cachedAttribute.data !== geometryAttribute.data ) { return true; }

			}

			if ( currentState.index !== index ) { return true; }

			return false;

		}

		function saveCache( geometry, index ) {

			var cache = {};
			var attributes = geometry.attributes;

			for ( var key in attributes ) {

				var attribute = attributes[ key ];

				var data = {};
				data.attribute = attribute;

				if ( attribute.data ) {

					data.data = attribute.data;

				}

				cache[ key ] = data;

			}

			currentState.attributes = cache;

			currentState.index = index;

		}

		function initAttributes() {

			var newAttributes = currentState.newAttributes;

			for ( var i = 0, il = newAttributes.length; i < il; i ++ ) {

				newAttributes[ i ] = 0;

			}

		}

		function enableAttribute( attribute ) {

			enableAttributeAndDivisor( attribute, 0 );

		}

		function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

			var newAttributes = currentState.newAttributes;
			var enabledAttributes = currentState.enabledAttributes;
			var attributeDivisors = currentState.attributeDivisors;

			newAttributes[ attribute ] = 1;

			if ( enabledAttributes[ attribute ] === 0 ) {

				gl.enableVertexAttribArray( attribute );
				enabledAttributes[ attribute ] = 1;

			}

			if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

				var extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

				extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
				attributeDivisors[ attribute ] = meshPerAttribute;

			}

		}

		function disableUnusedAttributes() {

			var newAttributes = currentState.newAttributes;
			var enabledAttributes = currentState.enabledAttributes;

			for ( var i = 0, il = enabledAttributes.length; i < il; i ++ ) {

				if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

		}

		function vertexAttribPointer( index, size, type, normalized, stride, offset ) {

			if ( capabilities.isWebGL2 === true && ( type === 5124 || type === 5125 ) ) {

				gl.vertexAttribIPointer( index, size, type, stride, offset );

			} else {

				gl.vertexAttribPointer( index, size, type, normalized, stride, offset );

			}

		}

		function setupVertexAttributes( object, material, program, geometry ) {

			if ( capabilities.isWebGL2 === false && ( object.isInstancedMesh || geometry.isInstancedBufferGeometry ) ) {

				if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) { return; }

			}

			initAttributes();

			var geometryAttributes = geometry.attributes;

			var programAttributes = program.getAttributes();

			var materialDefaultAttributeValues = material.defaultAttributeValues;

			for ( var name in programAttributes ) {

				var programAttribute = programAttributes[ name ];

				if ( programAttribute >= 0 ) {

					var geometryAttribute = geometryAttributes[ name ];

					if ( geometryAttribute !== undefined ) {

						var normalized = geometryAttribute.normalized;
						var size = geometryAttribute.itemSize;

						var attribute = attributes.get( geometryAttribute );

						// TODO Attribute may not be available on context restore

						if ( attribute === undefined ) { continue; }

						var buffer = attribute.buffer;
						var type = attribute.type;
						var bytesPerElement = attribute.bytesPerElement;

						if ( geometryAttribute.isInterleavedBufferAttribute ) {

							var data = geometryAttribute.data;
							var stride = data.stride;
							var offset = geometryAttribute.offset;

							if ( data && data.isInstancedInterleavedBuffer ) {

								enableAttributeAndDivisor( programAttribute, data.meshPerAttribute );

								if ( geometry._maxInstanceCount === undefined ) {

									geometry._maxInstanceCount = data.meshPerAttribute * data.count;

								}

							} else {

								enableAttribute( programAttribute );

							}

							gl.bindBuffer( 34962, buffer );
							vertexAttribPointer( programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement );

						} else {

							if ( geometryAttribute.isInstancedBufferAttribute ) {

								enableAttributeAndDivisor( programAttribute, geometryAttribute.meshPerAttribute );

								if ( geometry._maxInstanceCount === undefined ) {

									geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

								}

							} else {

								enableAttribute( programAttribute );

							}

							gl.bindBuffer( 34962, buffer );
							vertexAttribPointer( programAttribute, size, type, normalized, 0, 0 );

						}

					} else if ( name === 'instanceMatrix' ) {

						var attribute$1 = attributes.get( object.instanceMatrix );

						// TODO Attribute may not be available on context restore

						if ( attribute$1 === undefined ) { continue; }

						var buffer$1 = attribute$1.buffer;
						var type$1 = attribute$1.type;

						enableAttributeAndDivisor( programAttribute + 0, 1 );
						enableAttributeAndDivisor( programAttribute + 1, 1 );
						enableAttributeAndDivisor( programAttribute + 2, 1 );
						enableAttributeAndDivisor( programAttribute + 3, 1 );

						gl.bindBuffer( 34962, buffer$1 );

						gl.vertexAttribPointer( programAttribute + 0, 4, type$1, false, 64, 0 );
						gl.vertexAttribPointer( programAttribute + 1, 4, type$1, false, 64, 16 );
						gl.vertexAttribPointer( programAttribute + 2, 4, type$1, false, 64, 32 );
						gl.vertexAttribPointer( programAttribute + 3, 4, type$1, false, 64, 48 );

					} else if ( name === 'instanceColor' ) {

						var attribute$2 = attributes.get( object.instanceColor );

						// TODO Attribute may not be available on context restore

						if ( attribute$2 === undefined ) { continue; }

						var buffer$2 = attribute$2.buffer;
						var type$2 = attribute$2.type;

						enableAttributeAndDivisor( programAttribute, 1 );

						gl.bindBuffer( 34962, buffer$2 );

						gl.vertexAttribPointer( programAttribute, 3, type$2, false, 12, 0 );

					} else if ( materialDefaultAttributeValues !== undefined ) {

						var value = materialDefaultAttributeValues[ name ];

						if ( value !== undefined ) {

							switch ( value.length ) {

								case 2:
									gl.vertexAttrib2fv( programAttribute, value );
									break;

								case 3:
									gl.vertexAttrib3fv( programAttribute, value );
									break;

								case 4:
									gl.vertexAttrib4fv( programAttribute, value );
									break;

								default:
									gl.vertexAttrib1fv( programAttribute, value );

							}

						}

					}

				}

			}

			disableUnusedAttributes();

		}

		function dispose() {

			reset();

			for ( var geometryId in bindingStates ) {

				var programMap = bindingStates[ geometryId ];

				for ( var programId in programMap ) {

					var stateMap = programMap[ programId ];

					for ( var wireframe in stateMap ) {

						deleteVertexArrayObject( stateMap[ wireframe ].object );

						delete stateMap[ wireframe ];

					}

					delete programMap[ programId ];

				}

				delete bindingStates[ geometryId ];

			}

		}

		function releaseStatesOfGeometry( geometry ) {

			if ( bindingStates[ geometry.id ] === undefined ) { return; }

			var programMap = bindingStates[ geometry.id ];

			for ( var programId in programMap ) {

				var stateMap = programMap[ programId ];

				for ( var wireframe in stateMap ) {

					deleteVertexArrayObject( stateMap[ wireframe ].object );

					delete stateMap[ wireframe ];

				}

				delete programMap[ programId ];

			}

			delete bindingStates[ geometry.id ];

		}

		function releaseStatesOfProgram( program ) {

			for ( var geometryId in bindingStates ) {

				var programMap = bindingStates[ geometryId ];

				if ( programMap[ program.id ] === undefined ) { continue; }

				var stateMap = programMap[ program.id ];

				for ( var wireframe in stateMap ) {

					deleteVertexArrayObject( stateMap[ wireframe ].object );

					delete stateMap[ wireframe ];

				}

				delete programMap[ program.id ];

			}

		}

		function reset() {

			resetDefaultState();

			if ( currentState === defaultState ) { return; }

			currentState = defaultState;
			bindVertexArrayObject( currentState.object );

		}

		// for backward-compatilibity

		function resetDefaultState() {

			defaultState.geometry = null;
			defaultState.program = null;
			defaultState.wireframe = false;

		}

		return {

			setup: setup,
			reset: reset,
			resetDefaultState: resetDefaultState,
			dispose: dispose,
			releaseStatesOfGeometry: releaseStatesOfGeometry,
			releaseStatesOfProgram: releaseStatesOfProgram,

			initAttributes: initAttributes,
			enableAttribute: enableAttribute,
			disableUnusedAttributes: disableUnusedAttributes

		};

	}

	function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

		var isWebGL2 = capabilities.isWebGL2;

		var mode;

		function setMode( value ) {

			mode = value;

		}

		function render( start, count ) {

			gl.drawArrays( mode, start, count );

			info.update( count, mode, 1 );

		}

		function renderInstances( start, count, primcount ) {

			if ( primcount === 0 ) { return; }

			var extension, methodName;

			if ( isWebGL2 ) {

				extension = gl;
				methodName = 'drawArraysInstanced';

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );
				methodName = 'drawArraysInstancedANGLE';

				if ( extension === null ) {

					console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ methodName ]( mode, start, count, primcount );

			info.update( count, mode, primcount );

		}

		//

		this.setMode = setMode;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	function WebGLCapabilities( gl, extensions, parameters ) {

		var maxAnisotropy;

		function getMaxAnisotropy() {

			if ( maxAnisotropy !== undefined ) { return maxAnisotropy; }

			var extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( extension !== null ) {

				maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

			} else {

				maxAnisotropy = 0;

			}

			return maxAnisotropy;

		}

		function getMaxPrecision( precision ) {

			if ( precision === 'highp' ) {

				if ( gl.getShaderPrecisionFormat( 35633, 36338 ).precision > 0 &&
					gl.getShaderPrecisionFormat( 35632, 36338 ).precision > 0 ) {

					return 'highp';

				}

				precision = 'mediump';

			}

			if ( precision === 'mediump' ) {

				if ( gl.getShaderPrecisionFormat( 35633, 36337 ).precision > 0 &&
					gl.getShaderPrecisionFormat( 35632, 36337 ).precision > 0 ) {

					return 'mediump';

				}

			}

			return 'lowp';

		}

		/* eslint-disable no-undef */
		var isWebGL2 = ( typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext ) ||
			( typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext );
		/* eslint-enable no-undef */

		var precision = parameters.precision !== undefined ? parameters.precision : 'highp';
		var maxPrecision = getMaxPrecision( precision );

		if ( maxPrecision !== precision ) {

			console.warn( 'THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
			precision = maxPrecision;

		}

		var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

		var maxTextures = gl.getParameter( 34930 );
		var maxVertexTextures = gl.getParameter( 35660 );
		var maxTextureSize = gl.getParameter( 3379 );
		var maxCubemapSize = gl.getParameter( 34076 );

		var maxAttributes = gl.getParameter( 34921 );
		var maxVertexUniforms = gl.getParameter( 36347 );
		var maxVaryings = gl.getParameter( 36348 );
		var maxFragmentUniforms = gl.getParameter( 36349 );

		var vertexTextures = maxVertexTextures > 0;
		var floatFragmentTextures = isWebGL2 || !! extensions.get( 'OES_texture_float' );
		var floatVertexTextures = vertexTextures && floatFragmentTextures;

		var maxSamples = isWebGL2 ? gl.getParameter( 36183 ) : 0;

		return {

			isWebGL2: isWebGL2,

			getMaxAnisotropy: getMaxAnisotropy,
			getMaxPrecision: getMaxPrecision,

			precision: precision,
			logarithmicDepthBuffer: logarithmicDepthBuffer,

			maxTextures: maxTextures,
			maxVertexTextures: maxVertexTextures,
			maxTextureSize: maxTextureSize,
			maxCubemapSize: maxCubemapSize,

			maxAttributes: maxAttributes,
			maxVertexUniforms: maxVertexUniforms,
			maxVaryings: maxVaryings,
			maxFragmentUniforms: maxFragmentUniforms,

			vertexTextures: vertexTextures,
			floatFragmentTextures: floatFragmentTextures,
			floatVertexTextures: floatVertexTextures,

			maxSamples: maxSamples

		};

	}

	function WebGLClipping( properties ) {

		var scope = this;

		var globalState = null,
			numGlobalPlanes = 0,
			localClippingEnabled = false,
			renderingShadows = false;

		var plane = new Plane(),
			viewNormalMatrix = new Matrix3(),

			uniform = { value: null, needsUpdate: false };

		this.uniform = uniform;
		this.numPlanes = 0;
		this.numIntersection = 0;

		this.init = function ( planes, enableLocalClipping, camera ) {

			var enabled =
				planes.length !== 0 ||
				enableLocalClipping ||
				// enable state of previous frame - the clipping code has to
				// run another frame in order to reset the state:
				numGlobalPlanes !== 0 ||
				localClippingEnabled;

			localClippingEnabled = enableLocalClipping;

			globalState = projectPlanes( planes, camera, 0 );
			numGlobalPlanes = planes.length;

			return enabled;

		};

		this.beginShadows = function () {

			renderingShadows = true;
			projectPlanes( null );

		};

		this.endShadows = function () {

			renderingShadows = false;
			resetGlobalState();

		};

		this.setState = function ( material, camera, useCache ) {

			var planes = material.clippingPlanes,
				clipIntersection = material.clipIntersection,
				clipShadows = material.clipShadows;

			var materialProperties = properties.get( material );

			if ( ! localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && ! clipShadows ) {

				// there's no local clipping

				if ( renderingShadows ) {

					// there's no global clipping

					projectPlanes( null );

				} else {

					resetGlobalState();

				}

			} else {

				var nGlobal = renderingShadows ? 0 : numGlobalPlanes,
					lGlobal = nGlobal * 4;

				var dstArray = materialProperties.clippingState || null;

				uniform.value = dstArray; // ensure unique state

				dstArray = projectPlanes( planes, camera, lGlobal, useCache );

				for ( var i = 0; i !== lGlobal; ++ i ) {

					dstArray[ i ] = globalState[ i ];

				}

				materialProperties.clippingState = dstArray;
				this.numIntersection = clipIntersection ? this.numPlanes : 0;
				this.numPlanes += nGlobal;

			}


		};

		function resetGlobalState() {

			if ( uniform.value !== globalState ) {

				uniform.value = globalState;
				uniform.needsUpdate = numGlobalPlanes > 0;

			}

			scope.numPlanes = numGlobalPlanes;
			scope.numIntersection = 0;

		}

		function projectPlanes( planes, camera, dstOffset, skipTransform ) {

			var nPlanes = planes !== null ? planes.length : 0;
			var dstArray = null;

			if ( nPlanes !== 0 ) {

				dstArray = uniform.value;

				if ( skipTransform !== true || dstArray === null ) {

					var flatSize = dstOffset + nPlanes * 4,
						viewMatrix = camera.matrixWorldInverse;

					viewNormalMatrix.getNormalMatrix( viewMatrix );

					if ( dstArray === null || dstArray.length < flatSize ) {

						dstArray = new Float32Array( flatSize );

					}

					for ( var i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

						plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

						plane.normal.toArray( dstArray, i4 );
						dstArray[ i4 + 3 ] = plane.constant;

					}

				}

				uniform.value = dstArray;
				uniform.needsUpdate = true;

			}

			scope.numPlanes = nPlanes;
			scope.numIntersection = 0;

			return dstArray;

		}

	}

	function WebGLCubeMaps( renderer ) {

		var cubemaps = new WeakMap();

		function mapTextureMapping( texture, mapping ) {

			if ( mapping === EquirectangularReflectionMapping ) {

				texture.mapping = CubeReflectionMapping;

			} else if ( mapping === EquirectangularRefractionMapping ) {

				texture.mapping = CubeRefractionMapping;

			}

			return texture;

		}

		function get( texture ) {

			if ( texture && texture.isTexture ) {

				var mapping = texture.mapping;

				if ( mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping ) {

					if ( cubemaps.has( texture ) ) {

						var cubemap = cubemaps.get( texture ).texture;
						return mapTextureMapping( cubemap, texture.mapping );

					} else {

						var image = texture.image;

						if ( image && image.height > 0 ) {

							var currentRenderList = renderer.getRenderList();
							var currentRenderTarget = renderer.getRenderTarget();
							var currentRenderState = renderer.getRenderState();

							var renderTarget = new WebGLCubeRenderTarget( image.height / 2 );
							renderTarget.fromEquirectangularTexture( renderer, texture );
							cubemaps.set( texture, renderTarget );

							renderer.setRenderTarget( currentRenderTarget );
							renderer.setRenderList( currentRenderList );
							renderer.setRenderState( currentRenderState );

							return mapTextureMapping( renderTarget.texture, texture.mapping );

						} else {

							// image not yet ready. try the conversion next frame

							return null;

						}

					}

				}

			}

			return texture;

		}

		function dispose() {

			cubemaps = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	function WebGLExtensions( gl ) {

		var extensions = {};

		return {

			has: function ( name ) {

				if ( extensions[ name ] !== undefined ) {

					return extensions[ name ] !== null;

				}

				var extension;

				switch ( name ) {

					case 'WEBGL_depth_texture':
						extension = gl.getExtension( 'WEBGL_depth_texture' ) || gl.getExtension( 'MOZ_WEBGL_depth_texture' ) || gl.getExtension( 'WEBKIT_WEBGL_depth_texture' );
						break;

					case 'EXT_texture_filter_anisotropic':
						extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
						break;

					case 'WEBGL_compressed_texture_s3tc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
						break;

					case 'WEBGL_compressed_texture_pvrtc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
						break;

					default:
						extension = gl.getExtension( name );

				}

				extensions[ name ] = extension;

				return extension !== null;

			},

			get: function ( name ) {

				if ( ! this.has( name ) ) {

					console.warn( 'THREE.WebGLRenderer: ' + name + ' extension not supported.' );

				}

				return extensions[ name ];

			}

		};

	}

	function WebGLGeometries( gl, attributes, info, bindingStates ) {

		var geometries = new WeakMap();
		var wireframeAttributes = new WeakMap();

		function onGeometryDispose( event ) {

			var geometry = event.target;
			var buffergeometry = geometries.get( geometry );

			if ( buffergeometry.index !== null ) {

				attributes.remove( buffergeometry.index );

			}

			for ( var name in buffergeometry.attributes ) {

				attributes.remove( buffergeometry.attributes[ name ] );

			}

			geometry.removeEventListener( 'dispose', onGeometryDispose );

			geometries.delete( geometry );

			var attribute = wireframeAttributes.get( buffergeometry );

			if ( attribute ) {

				attributes.remove( attribute );
				wireframeAttributes.delete( buffergeometry );

			}

			bindingStates.releaseStatesOfGeometry( geometry );

			if ( geometry.isInstancedBufferGeometry === true ) {

				delete geometry._maxInstanceCount;

			}

			//

			info.memory.geometries --;

		}

		function get( object, geometry ) {

			var buffergeometry = geometries.get( geometry );

			if ( buffergeometry ) { return buffergeometry; }

			geometry.addEventListener( 'dispose', onGeometryDispose );

			if ( geometry.isBufferGeometry ) {

				buffergeometry = geometry;

			} else if ( geometry.isGeometry ) {

				if ( geometry._bufferGeometry === undefined ) {

					geometry._bufferGeometry = new BufferGeometry().setFromObject( object );

				}

				buffergeometry = geometry._bufferGeometry;

			}

			geometries.set( geometry, buffergeometry );

			info.memory.geometries ++;

			return buffergeometry;

		}

		function update( geometry ) {

			var geometryAttributes = geometry.attributes;

			// Updating index buffer in VAO now. See WebGLBindingStates.

			for ( var name in geometryAttributes ) {

				attributes.update( geometryAttributes[ name ], 34962 );

			}

			// morph targets

			var morphAttributes = geometry.morphAttributes;

			for ( var name$1 in morphAttributes ) {

				var array = morphAttributes[ name$1 ];

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					attributes.update( array[ i ], 34962 );

				}

			}

		}

		function updateWireframeAttribute( geometry ) {

			var indices = [];

			var geometryIndex = geometry.index;
			var geometryPosition = geometry.attributes.position;
			var version = 0;

			if ( geometryIndex !== null ) {

				var array = geometryIndex.array;
				version = geometryIndex.version;

				for ( var i = 0, l = array.length; i < l; i += 3 ) {

					var a = array[ i + 0 ];
					var b = array[ i + 1 ];
					var c = array[ i + 2 ];

					indices.push( a, b, b, c, c, a );

				}

			} else {

				var array$1 = geometryPosition.array;
				version = geometryPosition.version;

				for ( var i$1 = 0, l$1 = ( array$1.length / 3 ) - 1; i$1 < l$1; i$1 += 3 ) {

					var a$1 = i$1 + 0;
					var b$1 = i$1 + 1;
					var c$1 = i$1 + 2;

					indices.push( a$1, b$1, b$1, c$1, c$1, a$1 );

				}

			}

			var attribute = new ( arrayMax( indices ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );
			attribute.version = version;

			// Updating index buffer in VAO now. See WebGLBindingStates

			//

			var previousAttribute = wireframeAttributes.get( geometry );

			if ( previousAttribute ) { attributes.remove( previousAttribute ); }

			//

			wireframeAttributes.set( geometry, attribute );

		}

		function getWireframeAttribute( geometry ) {

			var currentAttribute = wireframeAttributes.get( geometry );

			if ( currentAttribute ) {

				var geometryIndex = geometry.index;

				if ( geometryIndex !== null ) {

					// if the attribute is obsolete, create a new one

					if ( currentAttribute.version < geometryIndex.version ) {

						updateWireframeAttribute( geometry );

					}

				}

			} else {

				updateWireframeAttribute( geometry );

			}

			return wireframeAttributes.get( geometry );

		}

		return {

			get: get,
			update: update,

			getWireframeAttribute: getWireframeAttribute

		};

	}

	function WebGLIndexedBufferRenderer( gl, extensions, info, capabilities ) {

		var isWebGL2 = capabilities.isWebGL2;

		var mode;

		function setMode( value ) {

			mode = value;

		}

		var type, bytesPerElement;

		function setIndex( value ) {

			type = value.type;
			bytesPerElement = value.bytesPerElement;

		}

		function render( start, count ) {

			gl.drawElements( mode, count, type, start * bytesPerElement );

			info.update( count, mode, 1 );

		}

		function renderInstances( start, count, primcount ) {

			if ( primcount === 0 ) { return; }

			var extension, methodName;

			if ( isWebGL2 ) {

				extension = gl;
				methodName = 'drawElementsInstanced';

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );
				methodName = 'drawElementsInstancedANGLE';

				if ( extension === null ) {

					console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ methodName ]( mode, count, type, start * bytesPerElement, primcount );

			info.update( count, mode, primcount );

		}

		//

		this.setMode = setMode;
		this.setIndex = setIndex;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	function WebGLInfo( gl ) {

		var memory = {
			geometries: 0,
			textures: 0
		};

		var render = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};

		function update( count, mode, instanceCount ) {

			render.calls ++;

			switch ( mode ) {

				case 4:
					render.triangles += instanceCount * ( count / 3 );
					break;

				case 1:
					render.lines += instanceCount * ( count / 2 );
					break;

				case 3:
					render.lines += instanceCount * ( count - 1 );
					break;

				case 2:
					render.lines += instanceCount * count;
					break;

				case 0:
					render.points += instanceCount * count;
					break;

				default:
					console.error( 'THREE.WebGLInfo: Unknown draw mode:', mode );
					break;

			}

		}

		function reset() {

			render.frame ++;
			render.calls = 0;
			render.triangles = 0;
			render.points = 0;
			render.lines = 0;

		}

		return {
			memory: memory,
			render: render,
			programs: null,
			autoReset: true,
			reset: reset,
			update: update
		};

	}

	function numericalSort( a, b ) {

		return a[ 0 ] - b[ 0 ];

	}

	function absNumericalSort( a, b ) {

		return Math.abs( b[ 1 ] ) - Math.abs( a[ 1 ] );

	}

	function WebGLMorphtargets( gl ) {

		var influencesList = {};
		var morphInfluences = new Float32Array( 8 );

		var workInfluences = [];

		for ( var i = 0; i < 8; i ++ ) {

			workInfluences[ i ] = [ i, 0 ];

		}

		function update( object, geometry, material, program ) {

			var objectInfluences = object.morphTargetInfluences;

			// When object doesn't have morph target influences defined, we treat it as a 0-length array
			// This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences

			var length = objectInfluences === undefined ? 0 : objectInfluences.length;

			var influences = influencesList[ geometry.id ];

			if ( influences === undefined ) {

				// initialise list

				influences = [];

				for ( var i = 0; i < length; i ++ ) {

					influences[ i ] = [ i, 0 ];

				}

				influencesList[ geometry.id ] = influences;

			}

			// Collect influences

			for ( var i$1 = 0; i$1 < length; i$1 ++ ) {

				var influence = influences[ i$1 ];

				influence[ 0 ] = i$1;
				influence[ 1 ] = objectInfluences[ i$1 ];

			}

			influences.sort( absNumericalSort );

			for ( var i$2 = 0; i$2 < 8; i$2 ++ ) {

				if ( i$2 < length && influences[ i$2 ][ 1 ] ) {

					workInfluences[ i$2 ][ 0 ] = influences[ i$2 ][ 0 ];
					workInfluences[ i$2 ][ 1 ] = influences[ i$2 ][ 1 ];

				} else {

					workInfluences[ i$2 ][ 0 ] = Number.MAX_SAFE_INTEGER;
					workInfluences[ i$2 ][ 1 ] = 0;

				}

			}

			workInfluences.sort( numericalSort );

			var morphTargets = material.morphTargets && geometry.morphAttributes.position;
			var morphNormals = material.morphNormals && geometry.morphAttributes.normal;

			var morphInfluencesSum = 0;

			for ( var i$3 = 0; i$3 < 8; i$3 ++ ) {

				var influence$1 = workInfluences[ i$3 ];
				var index = influence$1[ 0 ];
				var value = influence$1[ 1 ];

				if ( index !== Number.MAX_SAFE_INTEGER && value ) {

					if ( morphTargets && geometry.getAttribute( 'morphTarget' + i$3 ) !== morphTargets[ index ] ) {

						geometry.setAttribute( 'morphTarget' + i$3, morphTargets[ index ] );

					}

					if ( morphNormals && geometry.getAttribute( 'morphNormal' + i$3 ) !== morphNormals[ index ] ) {

						geometry.setAttribute( 'morphNormal' + i$3, morphNormals[ index ] );

					}

					morphInfluences[ i$3 ] = value;
					morphInfluencesSum += value;

				} else {

					if ( morphTargets && geometry.getAttribute( 'morphTarget' + i$3 ) !== undefined ) {

						geometry.deleteAttribute( 'morphTarget' + i$3 );

					}

					if ( morphNormals && geometry.getAttribute( 'morphNormal' + i$3 ) !== undefined ) {

						geometry.deleteAttribute( 'morphNormal' + i$3 );

					}

					morphInfluences[ i$3 ] = 0;

				}

			}

			// GLSL shader uses formula baseinfluence * base + sum(target * influence)
			// This allows us to switch between absolute morphs and relative morphs without changing shader code
			// When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
			var morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;

			program.getUniforms().setValue( gl, 'morphTargetBaseInfluence', morphBaseInfluence );
			program.getUniforms().setValue( gl, 'morphTargetInfluences', morphInfluences );

		}

		return {

			update: update

		};

	}

	function WebGLObjects( gl, geometries, attributes, info ) {

		var updateMap = new WeakMap();

		function update( object ) {

			var frame = info.render.frame;

			var geometry = object.geometry;
			var buffergeometry = geometries.get( object, geometry );

			// Update once per frame

			if ( updateMap.get( buffergeometry ) !== frame ) {

				if ( geometry.isGeometry ) {

					buffergeometry.updateFromObject( object );

				}

				geometries.update( buffergeometry );

				updateMap.set( buffergeometry, frame );

			}

			if ( object.isInstancedMesh ) {

				attributes.update( object.instanceMatrix, 34962 );

				if ( object.instanceColor !== null ) {

					attributes.update( object.instanceColor, 34962 );

				}

			}

			return buffergeometry;

		}

		function dispose() {

			updateMap = new WeakMap();

		}

		return {

			update: update,
			dispose: dispose

		};

	}

	function CubeTexture( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		images = images !== undefined ? images : [];
		mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
		format = format !== undefined ? format : RGBFormat;

		Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.flipY = false;

	}

	CubeTexture.prototype = Object.create( Texture.prototype );
	CubeTexture.prototype.constructor = CubeTexture;

	CubeTexture.prototype.isCubeTexture = true;

	Object.defineProperty( CubeTexture.prototype, 'images', {

		get: function () {

			return this.image;

		},

		set: function ( value ) {

			this.image = value;

		}

	} );

	function DataTexture2DArray( data, width, height, depth ) {

		Texture.call( this, null );

		this.image = { data: data || null, width: width || 1, height: height || 1, depth: depth || 1 };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

		this.needsUpdate = true;

	}

	DataTexture2DArray.prototype = Object.create( Texture.prototype );
	DataTexture2DArray.prototype.constructor = DataTexture2DArray;
	DataTexture2DArray.prototype.isDataTexture2DArray = true;

	function DataTexture3D( data, width, height, depth ) {

		// We're going to add .setXXX() methods for setting properties later.
		// Users can still set in DataTexture3D directly.
		//
		//	const texture = new THREE.DataTexture3D( data, width, height, depth );
		// 	texture.anisotropy = 16;
		//
		// See #14839

		Texture.call( this, null );

		this.image = { data: data || null, width: width || 1, height: height || 1, depth: depth || 1 };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

		this.needsUpdate = true;


	}

	DataTexture3D.prototype = Object.create( Texture.prototype );
	DataTexture3D.prototype.constructor = DataTexture3D;
	DataTexture3D.prototype.isDataTexture3D = true;

	/**
	 * Uniforms of a program.
	 * Those form a tree structure with a special top-level container for the root,
	 * which you get by calling 'new WebGLUniforms( gl, program )'.
	 *
	 *
	 * Properties of inner nodes including the top-level container:
	 *
	 * .seq - array of nested uniforms
	 * .map - nested uniforms by name
	 *
	 *
	 * Methods of all nodes except the top-level container:
	 *
	 * .setValue( gl, value, [textures] )
	 *
	 * 		uploads a uniform value(s)
	 *  	the 'textures' parameter is needed for sampler uniforms
	 *
	 *
	 * Static methods of the top-level container (textures factorizations):
	 *
	 * .upload( gl, seq, values, textures )
	 *
	 * 		sets uniforms in 'seq' to 'values[id].value'
	 *
	 * .seqWithValue( seq, values ) : filteredSeq
	 *
	 * 		filters 'seq' entries with corresponding entry in values
	 *
	 *
	 * Methods of the top-level container (textures factorizations):
	 *
	 * .setValue( gl, name, value, textures )
	 *
	 * 		sets uniform with  name 'name' to 'value'
	 *
	 * .setOptional( gl, obj, prop )
	 *
	 * 		like .set for an optional property of the object
	 *
	 */

	var emptyTexture = new Texture();
	var emptyTexture2dArray = new DataTexture2DArray();
	var emptyTexture3d = new DataTexture3D();
	var emptyCubeTexture = new CubeTexture();

	// --- Utilities ---

	// Array Caches (provide typed arrays for temporary by size)

	var arrayCacheF32 = [];
	var arrayCacheI32 = [];

	// Float32Array caches used for uploading Matrix uniforms

	var mat4array = new Float32Array( 16 );
	var mat3array = new Float32Array( 9 );
	var mat2array = new Float32Array( 4 );

	// Flattening for arrays of vectors and matrices

	function flatten( array, nBlocks, blockSize ) {

		var firstElem = array[ 0 ];

		if ( firstElem <= 0 || firstElem > 0 ) { return array; }
		// unoptimized: ! isNaN( firstElem )
		// see http://jacksondunstan.com/articles/983

		var n = nBlocks * blockSize;
		var r = arrayCacheF32[ n ];

		if ( r === undefined ) {

			r = new Float32Array( n );
			arrayCacheF32[ n ] = r;

		}

		if ( nBlocks !== 0 ) {

			firstElem.toArray( r, 0 );

			for ( var i = 1, offset = 0; i !== nBlocks; ++ i ) {

				offset += blockSize;
				array[ i ].toArray( r, offset );

			}

		}

		return r;

	}

	function arraysEqual( a, b ) {

		if ( a.length !== b.length ) { return false; }

		for ( var i = 0, l = a.length; i < l; i ++ ) {

			if ( a[ i ] !== b[ i ] ) { return false; }

		}

		return true;

	}

	function copyArray( a, b ) {

		for ( var i = 0, l = b.length; i < l; i ++ ) {

			a[ i ] = b[ i ];

		}

	}

	// Texture unit allocation

	function allocTexUnits( textures, n ) {

		var r = arrayCacheI32[ n ];

		if ( r === undefined ) {

			r = new Int32Array( n );
			arrayCacheI32[ n ] = r;

		}

		for ( var i = 0; i !== n; ++ i ) {

			r[ i ] = textures.allocateTextureUnit();

		}

		return r;

	}

	// --- Setters ---

	// Note: Defining these methods externally, because they come in a bunch
	// and this way their names minify.

	// Single scalar

	function setValueV1f( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) { return; }

		gl.uniform1f( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single float vector (from flat array or THREE.VectorN)

	function setValueV2f( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2f( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniform2fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV3f( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3f( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else if ( v.r !== undefined ) {

			if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

				gl.uniform3f( this.addr, v.r, v.g, v.b );

				cache[ 0 ] = v.r;
				cache[ 1 ] = v.g;
				cache[ 2 ] = v.b;

			}

		} else {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniform3fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV4f( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniform4fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	// Single matrix (from flat array or MatrixN)

	function setValueM2( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniformMatrix2fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) { return; }

			mat2array.set( elements );

			gl.uniformMatrix2fv( this.addr, false, mat2array );

			copyArray( cache, elements );

		}

	}

	function setValueM3( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniformMatrix3fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) { return; }

			mat3array.set( elements );

			gl.uniformMatrix3fv( this.addr, false, mat3array );

			copyArray( cache, elements );

		}

	}

	function setValueM4( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) { return; }

			gl.uniformMatrix4fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) { return; }

			mat4array.set( elements );

			gl.uniformMatrix4fv( this.addr, false, mat4array );

			copyArray( cache, elements );

		}

	}

	// Single texture (2D / Cube)

	function setValueT1( gl, v, textures ) {

		var cache = this.cache;
		var unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.safeSetTexture2D( v || emptyTexture, unit );

	}

	function setValueT2DArray1( gl, v, textures ) {

		var cache = this.cache;
		var unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.setTexture2DArray( v || emptyTexture2dArray, unit );

	}

	function setValueT3D1( gl, v, textures ) {

		var cache = this.cache;
		var unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.setTexture3D( v || emptyTexture3d, unit );

	}

	function setValueT6( gl, v, textures ) {

		var cache = this.cache;
		var unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.safeSetTextureCube( v || emptyCubeTexture, unit );

	}

	// Integer / Boolean vectors or arrays thereof (always flat arrays)

	function setValueV1i( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) { return; }

		gl.uniform1i( this.addr, v );

		cache[ 0 ] = v;

	}

	function setValueV2i( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) { return; }

		gl.uniform2iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValueV3i( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) { return; }

		gl.uniform3iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValueV4i( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) { return; }

		gl.uniform4iv( this.addr, v );

		copyArray( cache, v );

	}

	// uint

	function setValueV1ui( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) { return; }

		gl.uniform1ui( this.addr, v );

		cache[ 0 ] = v;

	}

	// Helper to pick the right setter for the singular case

	function getSingularSetter( type ) {

		switch ( type ) {

			case 0x1406: return setValueV1f; // FLOAT
			case 0x8b50: return setValueV2f; // _VEC2
			case 0x8b51: return setValueV3f; // _VEC3
			case 0x8b52: return setValueV4f; // _VEC4

			case 0x8b5a: return setValueM2; // _MAT2
			case 0x8b5b: return setValueM3; // _MAT3
			case 0x8b5c: return setValueM4; // _MAT4

			case 0x1404: case 0x8b56: return setValueV1i; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValueV2i; // _VEC2
			case 0x8b54: case 0x8b58: return setValueV3i; // _VEC3
			case 0x8b55: case 0x8b59: return setValueV4i; // _VEC4

			case 0x1405: return setValueV1ui; // UINT

			case 0x8b5e: // SAMPLER_2D
			case 0x8d66: // SAMPLER_EXTERNAL_OES
			case 0x8dca: // INT_SAMPLER_2D
			case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
			case 0x8b62: // SAMPLER_2D_SHADOW
				return setValueT1;

			case 0x8b5f: // SAMPLER_3D
			case 0x8dcb: // INT_SAMPLER_3D
			case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
				return setValueT3D1;

			case 0x8b60: // SAMPLER_CUBE
			case 0x8dcc: // INT_SAMPLER_CUBE
			case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
			case 0x8dc5: // SAMPLER_CUBE_SHADOW
				return setValueT6;

			case 0x8dc1: // SAMPLER_2D_ARRAY
			case 0x8dcf: // INT_SAMPLER_2D_ARRAY
			case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
			case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
				return setValueT2DArray1;

		}

	}

	// Array of scalars
	function setValueV1fArray( gl, v ) {

		gl.uniform1fv( this.addr, v );

	}

	// Integer / Boolean vectors or arrays thereof (always flat arrays)
	function setValueV1iArray( gl, v ) {

		gl.uniform1iv( this.addr, v );

	}

	function setValueV2iArray( gl, v ) {

		gl.uniform2iv( this.addr, v );

	}

	function setValueV3iArray( gl, v ) {

		gl.uniform3iv( this.addr, v );

	}

	function setValueV4iArray( gl, v ) {

		gl.uniform4iv( this.addr, v );

	}


	// Array of vectors (flat or from THREE classes)

	function setValueV2fArray( gl, v ) {

		var data = flatten( v, this.size, 2 );

		gl.uniform2fv( this.addr, data );

	}

	function setValueV3fArray( gl, v ) {

		var data = flatten( v, this.size, 3 );

		gl.uniform3fv( this.addr, data );

	}

	function setValueV4fArray( gl, v ) {

		var data = flatten( v, this.size, 4 );

		gl.uniform4fv( this.addr, data );

	}

	// Array of matrices (flat or from THREE clases)

	function setValueM2Array( gl, v ) {

		var data = flatten( v, this.size, 4 );

		gl.uniformMatrix2fv( this.addr, false, data );

	}

	function setValueM3Array( gl, v ) {

		var data = flatten( v, this.size, 9 );

		gl.uniformMatrix3fv( this.addr, false, data );

	}

	function setValueM4Array( gl, v ) {

		var data = flatten( v, this.size, 16 );

		gl.uniformMatrix4fv( this.addr, false, data );

	}

	// Array of textures (2D / Cube)

	function setValueT1Array( gl, v, textures ) {

		var n = v.length;

		var units = allocTexUnits( textures, n );

		gl.uniform1iv( this.addr, units );

		for ( var i = 0; i !== n; ++ i ) {

			textures.safeSetTexture2D( v[ i ] || emptyTexture, units[ i ] );

		}

	}

	function setValueT6Array( gl, v, textures ) {

		var n = v.length;

		var units = allocTexUnits( textures, n );

		gl.uniform1iv( this.addr, units );

		for ( var i = 0; i !== n; ++ i ) {

			textures.safeSetTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

		}

	}

	// Helper to pick the right setter for a pure (bottom-level) array

	function getPureArraySetter( type ) {

		switch ( type ) {

			case 0x1406: return setValueV1fArray; // FLOAT
			case 0x8b50: return setValueV2fArray; // _VEC2
			case 0x8b51: return setValueV3fArray; // _VEC3
			case 0x8b52: return setValueV4fArray; // _VEC4

			case 0x8b5a: return setValueM2Array; // _MAT2
			case 0x8b5b: return setValueM3Array; // _MAT3
			case 0x8b5c: return setValueM4Array; // _MAT4

			case 0x1404: case 0x8b56: return setValueV1iArray; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValueV2iArray; // _VEC2
			case 0x8b54: case 0x8b58: return setValueV3iArray; // _VEC3
			case 0x8b55: case 0x8b59: return setValueV4iArray; // _VEC4

			case 0x8b5e: // SAMPLER_2D
			case 0x8d66: // SAMPLER_EXTERNAL_OES
			case 0x8dca: // INT_SAMPLER_2D
			case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
			case 0x8b62: // SAMPLER_2D_SHADOW
				return setValueT1Array;

			case 0x8b60: // SAMPLER_CUBE
			case 0x8dcc: // INT_SAMPLER_CUBE
			case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
			case 0x8dc5: // SAMPLER_CUBE_SHADOW
				return setValueT6Array;

		}

	}

	// --- Uniform Classes ---

	function SingleUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.setValue = getSingularSetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	function PureArrayUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.size = activeInfo.size;
		this.setValue = getPureArraySetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	PureArrayUniform.prototype.updateCache = function ( data ) {

		var cache = this.cache;

		if ( data instanceof Float32Array && cache.length !== data.length ) {

			this.cache = new Float32Array( data.length );

		}

		copyArray( cache, data );

	};

	function StructuredUniform( id ) {

		this.id = id;

		this.seq = [];
		this.map = {};

	}

	StructuredUniform.prototype.setValue = function ( gl, value, textures ) {

		var seq = this.seq;

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			u.setValue( gl, value[ u.id ], textures );

		}

	};

	// --- Top-level ---

	// Parser - builds up the property tree from the path strings

	var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

	// extracts
	// 	- the identifier (member name or array index)
	//  - followed by an optional right bracket (found when array index)
	//  - followed by an optional left bracket or dot (type of subscript)
	//
	// Note: These portions can be read in a non-overlapping fashion and
	// allow straightforward parsing of the hierarchy that WebGL encodes
	// in the uniform names.

	function addUniform( container, uniformObject ) {

		container.seq.push( uniformObject );
		container.map[ uniformObject.id ] = uniformObject;

	}

	function parseUniform( activeInfo, addr, container ) {

		var path = activeInfo.name,
			pathLength = path.length;

		// reset RegExp object, because of the early exit of a previous run
		RePathPart.lastIndex = 0;

		while ( true ) {

			var match = RePathPart.exec( path ),
				matchEnd = RePathPart.lastIndex;

			var id = match[ 1 ];
			var idIsIndex = match[ 2 ] === ']',
				subscript = match[ 3 ];

			if ( idIsIndex ) { id = id | 0; } // convert to integer

			if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

				// bare name or "pure" bottom-level array "[0]" suffix

				addUniform( container, subscript === undefined ?
					new SingleUniform( id, activeInfo, addr ) :
					new PureArrayUniform( id, activeInfo, addr ) );

				break;

			} else {

				// step into inner node / create it in case it doesn't exist

				var map = container.map;
				var next = map[ id ];

				if ( next === undefined ) {

					next = new StructuredUniform( id );
					addUniform( container, next );

				}

				container = next;

			}

		}

	}

	// Root Container

	function WebGLUniforms( gl, program ) {

		this.seq = [];
		this.map = {};

		var n = gl.getProgramParameter( program, 35718 );

		for ( var i = 0; i < n; ++ i ) {

			var info = gl.getActiveUniform( program, i ),
				addr = gl.getUniformLocation( program, info.name );

			parseUniform( info, addr, this );

		}

	}

	WebGLUniforms.prototype.setValue = function ( gl, name, value, textures ) {

		var u = this.map[ name ];

		if ( u !== undefined ) { u.setValue( gl, value, textures ); }

	};

	WebGLUniforms.prototype.setOptional = function ( gl, object, name ) {

		var v = object[ name ];

		if ( v !== undefined ) { this.setValue( gl, name, v ); }

	};


	// Static interface

	WebGLUniforms.upload = function ( gl, seq, values, textures ) {

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ],
				v = values[ u.id ];

			if ( v.needsUpdate !== false ) {

				// note: always updating when .needsUpdate is undefined
				u.setValue( gl, v.value, textures );

			}

		}

	};

	WebGLUniforms.seqWithValue = function ( seq, values ) {

		var r = [];

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			if ( u.id in values ) { r.push( u ); }

		}

		return r;

	};

	function WebGLShader( gl, type, string ) {

		var shader = gl.createShader( type );

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		return shader;

	}

	var programIdCount = 0;

	function addLineNumbers( string ) {

		var lines = string.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

		}

		return lines.join( '\n' );

	}

	function getEncodingComponents( encoding ) {

		switch ( encoding ) {

			case LinearEncoding:
				return [ 'Linear', '( value )' ];
			case sRGBEncoding:
				return [ 'sRGB', '( value )' ];
			case RGBEEncoding:
				return [ 'RGBE', '( value )' ];
			case RGBM7Encoding:
				return [ 'RGBM', '( value, 7.0 )' ];
			case RGBM16Encoding:
				return [ 'RGBM', '( value, 16.0 )' ];
			case RGBDEncoding:
				return [ 'RGBD', '( value, 256.0 )' ];
			case GammaEncoding:
				return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
			case LogLuvEncoding:
				return [ 'LogLuv', '( value )' ];
			default:
				console.warn( 'THREE.WebGLProgram: Unsupported encoding:', encoding );
				return [ 'Linear', '( value )' ];

		}

	}

	function getShaderErrors( gl, shader, type ) {

		var status = gl.getShaderParameter( shader, 35713 );
		var log = gl.getShaderInfoLog( shader ).trim();

		if ( status && log === '' ) { return ''; }

		// --enable-privileged-webgl-extension
		// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

		var source = gl.getShaderSource( shader );

		return 'THREE.WebGLShader: gl.getShaderInfoLog() ' + type + '\n' + log + addLineNumbers( source );

	}

	function getTexelDecodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

	}

	function getTexelEncodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

	}

	function getToneMappingFunction( functionName, toneMapping ) {

		var toneMappingName;

		switch ( toneMapping ) {

			case LinearToneMapping:
				toneMappingName = 'Linear';
				break;

			case ReinhardToneMapping:
				toneMappingName = 'Reinhard';
				break;

			case CineonToneMapping:
				toneMappingName = 'OptimizedCineon';
				break;

			case ACESFilmicToneMapping:
				toneMappingName = 'ACESFilmic';
				break;

			case CustomToneMapping:
				toneMappingName = 'Custom';
				break;

			default:
				console.warn( 'THREE.WebGLProgram: Unsupported toneMapping:', toneMapping );
				toneMappingName = 'Linear';

		}

		return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

	}

	function generateExtensions( parameters ) {

		var chunks = [
			( parameters.extensionDerivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.tangentSpaceNormalMap || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ) ? '#extension GL_OES_standard_derivatives : enable' : '',
			( parameters.extensionFragDepth || parameters.logarithmicDepthBuffer ) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
			( parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ) ? '#extension GL_EXT_draw_buffers : require' : '',
			( parameters.extensionShaderTextureLOD || parameters.envMap ) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
		];

		return chunks.filter( filterEmptyLine ).join( '\n' );

	}

	function generateDefines( defines ) {

		var chunks = [];

		for ( var name in defines ) {

			var value = defines[ name ];

			if ( value === false ) { continue; }

			chunks.push( '#define ' + name + ' ' + value );

		}

		return chunks.join( '\n' );

	}

	function fetchAttributeLocations( gl, program ) {

		var attributes = {};

		var n = gl.getProgramParameter( program, 35721 );

		for ( var i = 0; i < n; i ++ ) {

			var info = gl.getActiveAttrib( program, i );
			var name = info.name;

			// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

			attributes[ name ] = gl.getAttribLocation( program, name );

		}

		return attributes;

	}

	function filterEmptyLine( string ) {

		return string !== '';

	}

	function replaceLightNums( string, parameters ) {

		return string
			.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
			.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
			.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
			.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
			.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights )
			.replace( /NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows )
			.replace( /NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows )
			.replace( /NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows );

	}

	function replaceClippingPlaneNums( string, parameters ) {

		return string
			.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
			.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

	}

	// Resolve Includes

	var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function resolveIncludes( string ) {

		return string.replace( includePattern, includeReplacer );

	}

	function includeReplacer( match, include ) {

		var string = ShaderChunk[ include ];

		if ( string === undefined ) {

			throw new Error( 'Can not resolve #include <' + include + '>' );

		}

		return resolveIncludes( string );

	}

	// Unroll Loops

	var deprecatedUnrollLoopPattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
	var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

	function unrollLoops( string ) {

		return string
			.replace( unrollLoopPattern, loopReplacer )
			.replace( deprecatedUnrollLoopPattern, deprecatedLoopReplacer );

	}

	function deprecatedLoopReplacer( match, start, end, snippet ) {

		console.warn( 'WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.' );
		return loopReplacer( match, start, end, snippet );

	}

	function loopReplacer( match, start, end, snippet ) {

		var string = '';

		for ( var i = parseInt( start ); i < parseInt( end ); i ++ ) {

			string += snippet
				.replace( /\[\s*i\s*\]/g, '[ ' + i + ' ]' )
				.replace( /UNROLLED_LOOP_INDEX/g, i );

		}

		return string;

	}

	//

	function generatePrecision( parameters ) {

		var precisionstring = "precision " + parameters.precision + " float;\nprecision " + parameters.precision + " int;";

		if ( parameters.precision === "highp" ) {

			precisionstring += "\n#define HIGH_PRECISION";

		} else if ( parameters.precision === "mediump" ) {

			precisionstring += "\n#define MEDIUM_PRECISION";

		} else if ( parameters.precision === "lowp" ) {

			precisionstring += "\n#define LOW_PRECISION";

		}

		return precisionstring;

	}

	function generateShadowMapTypeDefine( parameters ) {

		var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

		if ( parameters.shadowMapType === PCFShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

		} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

		} else if ( parameters.shadowMapType === VSMShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';

		}

		return shadowMapTypeDefine;

	}

	function generateEnvMapTypeDefine( parameters ) {

		var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';

		if ( parameters.envMap ) {

			switch ( parameters.envMapMode ) {

				case CubeReflectionMapping:
				case CubeRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
					break;

				case CubeUVReflectionMapping:
				case CubeUVRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
					break;

			}

		}

		return envMapTypeDefine;

	}

	function generateEnvMapModeDefine( parameters ) {

		var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';

		if ( parameters.envMap ) {

			switch ( parameters.envMapMode ) {

				case CubeRefractionMapping:
				case CubeUVRefractionMapping:

					envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
					break;

			}

		}

		return envMapModeDefine;

	}

	function generateEnvMapBlendingDefine( parameters ) {

		var envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';

		if ( parameters.envMap ) {

			switch ( parameters.combine ) {

				case MultiplyOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
					break;

				case MixOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
					break;

				case AddOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
					break;

			}

		}

		return envMapBlendingDefine;

	}

	function WebGLProgram( renderer, cacheKey, parameters, bindingStates ) {

		var gl = renderer.getContext();

		var defines = parameters.defines;

		var vertexShader = parameters.vertexShader;
		var fragmentShader = parameters.fragmentShader;

		var shadowMapTypeDefine = generateShadowMapTypeDefine( parameters );
		var envMapTypeDefine = generateEnvMapTypeDefine( parameters );
		var envMapModeDefine = generateEnvMapModeDefine( parameters );
		var envMapBlendingDefine = generateEnvMapBlendingDefine( parameters );


		var gammaFactorDefine = ( renderer.gammaFactor > 0 ) ? renderer.gammaFactor : 1.0;

		var customExtensions = parameters.isWebGL2 ? '' : generateExtensions( parameters );

		var customDefines = generateDefines( defines );

		var program = gl.createProgram();

		var prefixVertex, prefixFragment;
		var versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + "\n" : '';

		if ( parameters.isRawShaderMaterial ) {

			prefixVertex = [

				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixVertex.length > 0 ) {

				prefixVertex += '\n';

			}

			prefixFragment = [

				customExtensions,
				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixFragment.length > 0 ) {

				prefixFragment += '\n';

			}

		} else {

			prefixVertex = [

				generatePrecision( parameters ),

				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines,

				parameters.instancing ? '#define USE_INSTANCING' : '',
				parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '',

				parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				'#define MAX_BONES ' + parameters.maxBones,
				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',

				parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
				parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
				parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
				parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
				parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',

				parameters.vertexTangents ? '#define USE_TANGENT' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',
				parameters.vertexUvs ? '#define USE_UV' : '',
				parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.skinning ? '#define USE_SKINNING' : '',
				parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

				parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
				parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				'uniform mat4 modelMatrix;',
				'uniform mat4 modelViewMatrix;',
				'uniform mat4 projectionMatrix;',
				'uniform mat4 viewMatrix;',
				'uniform mat3 normalMatrix;',
				'uniform vec3 cameraPosition;',
				'uniform bool isOrthographic;',

				'#ifdef USE_INSTANCING',

				'	attribute mat4 instanceMatrix;',

				'#endif',

				'#ifdef USE_INSTANCING_COLOR',

				'	attribute vec3 instanceColor;',

				'#endif',

				'attribute vec3 position;',
				'attribute vec3 normal;',
				'attribute vec2 uv;',

				'#ifdef USE_TANGENT',

				'	attribute vec4 tangent;',

				'#endif',

				'#ifdef USE_COLOR',

				'	attribute vec3 color;',

				'#endif',

				'#ifdef USE_MORPHTARGETS',

				'	attribute vec3 morphTarget0;',
				'	attribute vec3 morphTarget1;',
				'	attribute vec3 morphTarget2;',
				'	attribute vec3 morphTarget3;',

				'	#ifdef USE_MORPHNORMALS',

				'		attribute vec3 morphNormal0;',
				'		attribute vec3 morphNormal1;',
				'		attribute vec3 morphNormal2;',
				'		attribute vec3 morphNormal3;',

				'	#else',

				'		attribute vec3 morphTarget4;',
				'		attribute vec3 morphTarget5;',
				'		attribute vec3 morphTarget6;',
				'		attribute vec3 morphTarget7;',

				'	#endif',

				'#endif',

				'#ifdef USE_SKINNING',

				'	attribute vec4 skinIndex;',
				'	attribute vec4 skinWeight;',

				'#endif',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

			prefixFragment = [

				customExtensions,

				generatePrecision( parameters ),

				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines,

				parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + ( parameters.alphaTest % 1 ? '' : '.0' ) : '', // add '.0' if integer

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.matcap ? '#define USE_MATCAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapTypeDefine : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.envMap ? '#define ' + envMapBlendingDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',
				parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
				parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
				parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

				parameters.sheen ? '#define USE_SHEEN' : '',
				parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',

				parameters.vertexTangents ? '#define USE_TANGENT' : '',
				parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
				parameters.vertexUvs ? '#define USE_UV' : '',
				parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

				parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

				parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				( ( parameters.extensionShaderTextureLOD || parameters.envMap ) && parameters.rendererExtensionShaderTextureLod ) ? '#define TEXTURE_LOD_EXT' : '',

				'uniform mat4 viewMatrix;',
				'uniform vec3 cameraPosition;',
				'uniform bool isOrthographic;',

				( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
				( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
				( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

				parameters.dithering ? '#define DITHERING' : '',

				ShaderChunk[ 'encodings_pars_fragment' ], // this code is required here because it is used by the various encoding/decoding function defined below
				parameters.map ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
				parameters.matcap ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
				parameters.envMap ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
				parameters.emissiveMap ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
				parameters.lightMap ? getTexelDecodingFunction( 'lightMapTexelToLinear', parameters.lightMapEncoding ) : '',
				getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ),

				parameters.depthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

		}

		vertexShader = resolveIncludes( vertexShader );
		vertexShader = replaceLightNums( vertexShader, parameters );
		vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

		fragmentShader = resolveIncludes( fragmentShader );
		fragmentShader = replaceLightNums( fragmentShader, parameters );
		fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

		vertexShader = unrollLoops( vertexShader );
		fragmentShader = unrollLoops( fragmentShader );

		if ( parameters.isWebGL2 && parameters.isRawShaderMaterial !== true ) {

			// GLSL 3.0 conversion for built-in materials and ShaderMaterial

			versionString = '#version 300 es\n';

			prefixVertex = [
				'#define attribute in',
				'#define varying out',
				'#define texture2D texture'
			].join( '\n' ) + '\n' + prefixVertex;

			prefixFragment = [
				'#define varying in',
				( parameters.glslVersion === GLSL3 ) ? '' : 'out highp vec4 pc_fragColor;',
				( parameters.glslVersion === GLSL3 ) ? '' : '#define gl_FragColor pc_fragColor',
				'#define gl_FragDepthEXT gl_FragDepth',
				'#define texture2D texture',
				'#define textureCube texture',
				'#define texture2DProj textureProj',
				'#define texture2DLodEXT textureLod',
				'#define texture2DProjLodEXT textureProjLod',
				'#define textureCubeLodEXT textureLod',
				'#define texture2DGradEXT textureGrad',
				'#define texture2DProjGradEXT textureProjGrad',
				'#define textureCubeGradEXT textureGrad'
			].join( '\n' ) + '\n' + prefixFragment;

		}

		var vertexGlsl = versionString + prefixVertex + vertexShader;
		var fragmentGlsl = versionString + prefixFragment + fragmentShader;

		// console.log( '*VERTEX*', vertexGlsl );
		// console.log( '*FRAGMENT*', fragmentGlsl );

		var glVertexShader = WebGLShader( gl, 35633, vertexGlsl );
		var glFragmentShader = WebGLShader( gl, 35632, fragmentGlsl );

		gl.attachShader( program, glVertexShader );
		gl.attachShader( program, glFragmentShader );

		// Force a particular attribute to index 0.

		if ( parameters.index0AttributeName !== undefined ) {

			gl.bindAttribLocation( program, 0, parameters.index0AttributeName );

		} else if ( parameters.morphTargets === true ) {

			// programs with morphTargets displace position out of attribute 0
			gl.bindAttribLocation( program, 0, 'position' );

		}

		gl.linkProgram( program );

		// check for link errors
		if ( renderer.debug.checkShaderErrors ) {

			var programLog = gl.getProgramInfoLog( program ).trim();
			var vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
			var fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

			var runnable = true;
			var haveDiagnostics = true;

			if ( gl.getProgramParameter( program, 35714 ) === false ) {

				runnable = false;

				var vertexErrors = getShaderErrors( gl, glVertexShader, 'vertex' );
				var fragmentErrors = getShaderErrors( gl, glFragmentShader, 'fragment' );

				console.error( 'THREE.WebGLProgram: shader error: ', gl.getError(), '35715', gl.getProgramParameter( program, 35715 ), 'gl.getProgramInfoLog', programLog, vertexErrors, fragmentErrors );

			} else if ( programLog !== '' ) {

				console.warn( 'THREE.WebGLProgram: gl.getProgramInfoLog()', programLog );

			} else if ( vertexLog === '' || fragmentLog === '' ) {

				haveDiagnostics = false;

			}

			if ( haveDiagnostics ) {

				this.diagnostics = {

					runnable: runnable,

					programLog: programLog,

					vertexShader: {

						log: vertexLog,
						prefix: prefixVertex

					},

					fragmentShader: {

						log: fragmentLog,
						prefix: prefixFragment

					}

				};

			}

		}

		// Clean up

		// Crashes in iOS9 and iOS10. #18402
		// gl.detachShader( program, glVertexShader );
		// gl.detachShader( program, glFragmentShader );

		gl.deleteShader( glVertexShader );
		gl.deleteShader( glFragmentShader );

		// set up caching for uniform locations

		var cachedUniforms;

		this.getUniforms = function () {

			if ( cachedUniforms === undefined ) {

				cachedUniforms = new WebGLUniforms( gl, program );

			}

			return cachedUniforms;

		};

		// set up caching for attribute locations

		var cachedAttributes;

		this.getAttributes = function () {

			if ( cachedAttributes === undefined ) {

				cachedAttributes = fetchAttributeLocations( gl, program );

			}

			return cachedAttributes;

		};

		// free resource

		this.destroy = function () {

			bindingStates.releaseStatesOfProgram( this );

			gl.deleteProgram( program );
			this.program = undefined;

		};

		//

		this.name = parameters.shaderName;
		this.id = programIdCount ++;
		this.cacheKey = cacheKey;
		this.usedTimes = 1;
		this.program = program;
		this.vertexShader = glVertexShader;
		this.fragmentShader = glFragmentShader;

		return this;

	}

	function WebGLPrograms( renderer, cubemaps, extensions, capabilities, bindingStates, clipping ) {

		var programs = [];

		var isWebGL2 = capabilities.isWebGL2;
		var logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
		var floatVertexTextures = capabilities.floatVertexTextures;
		var maxVertexUniforms = capabilities.maxVertexUniforms;
		var vertexTextures = capabilities.vertexTextures;

		var precision = capabilities.precision;

		var shaderIDs = {
			MeshDepthMaterial: 'depth',
			MeshDistanceMaterial: 'distanceRGBA',
			MeshNormalMaterial: 'normal',
			MeshBasicMaterial: 'basic',
			MeshLambertMaterial: 'lambert',
			MeshPhongMaterial: 'phong',
			MeshToonMaterial: 'toon',
			MeshStandardMaterial: 'physical',
			MeshPhysicalMaterial: 'physical',
			MeshMatcapMaterial: 'matcap',
			LineBasicMaterial: 'basic',
			LineDashedMaterial: 'dashed',
			PointsMaterial: 'points',
			ShadowMaterial: 'shadow',
			SpriteMaterial: 'sprite'
		};

		var parameterNames = [
			"precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor",
			"map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV",
			"lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap",
			"roughnessMap", "metalnessMap", "gradientMap",
			"alphaMap", "combine", "vertexColors", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2",
			"flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
			"maxBones", "useVertexTexture", "morphTargets", "morphNormals",
			"maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
			"numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
			"numDirLightShadows", "numPointLightShadows", "numSpotLightShadows",
			"shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
			"alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering",
			"sheen", "transmissionMap"
		];

		function getMaxBones( object ) {

			var skeleton = object.skeleton;
			var bones = skeleton.bones;

			if ( floatVertexTextures ) {

				return 1024;

			} else {

				// default for when object is not specified
				// ( for example when prebuilding shader to be used with multiple objects )
				//
				//  - leave some extra space for other uniforms
				//  - limit here is ANGLE's 254 max uniform vectors
				//    (up to 54 should be safe)

				var nVertexUniforms = maxVertexUniforms;
				var nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

				var maxBones = Math.min( nVertexMatrices, bones.length );

				if ( maxBones < bones.length ) {

					console.warn( 'THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.' );
					return 0;

				}

				return maxBones;

			}

		}

		function getTextureEncodingFromMap( map ) {

			var encoding;

			if ( ! map ) {

				encoding = LinearEncoding;

			} else if ( map.isTexture ) {

				encoding = map.encoding;

			} else if ( map.isWebGLRenderTarget ) {

				console.warn( "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead." );
				encoding = map.texture.encoding;

			}

			return encoding;

		}

		function getParameters( material, lights, shadows, scene, object ) {

			var fog = scene.fog;
			var environment = material.isMeshStandardMaterial ? scene.environment : null;

			var envMap = cubemaps.get( material.envMap || environment );

			var shaderID = shaderIDs[ material.type ];

			// heuristics to create shader parameters according to lights in the scene
			// (not to blow over maxLights budget)

			var maxBones = object.isSkinnedMesh ? getMaxBones( object ) : 0;

			if ( material.precision !== null ) {

				precision = capabilities.getMaxPrecision( material.precision );

				if ( precision !== material.precision ) {

					console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

				}

			}

			var vertexShader, fragmentShader;

			if ( shaderID ) {

				var shader = ShaderLib[ shaderID ];

				vertexShader = shader.vertexShader;
				fragmentShader = shader.fragmentShader;

			} else {

				vertexShader = material.vertexShader;
				fragmentShader = material.fragmentShader;

			}

			var currentRenderTarget = renderer.getRenderTarget();

			var parameters = {

				isWebGL2: isWebGL2,

				shaderID: shaderID,
				shaderName: material.type,

				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				defines: material.defines,

				isRawShaderMaterial: material.isRawShaderMaterial === true,
				glslVersion: material.glslVersion,

				precision: precision,

				instancing: object.isInstancedMesh === true,
				instancingColor: object.isInstancedMesh === true && object.instanceColor !== null,

				supportsVertexTextures: vertexTextures,
				outputEncoding: ( currentRenderTarget !== null ) ? getTextureEncodingFromMap( currentRenderTarget.texture ) : renderer.outputEncoding,
				map: !! material.map,
				mapEncoding: getTextureEncodingFromMap( material.map ),
				matcap: !! material.matcap,
				matcapEncoding: getTextureEncodingFromMap( material.matcap ),
				envMap: !! envMap,
				envMapMode: envMap && envMap.mapping,
				envMapEncoding: getTextureEncodingFromMap( envMap ),
				envMapCubeUV: ( !! envMap ) && ( ( envMap.mapping === CubeUVReflectionMapping ) || ( envMap.mapping === CubeUVRefractionMapping ) ),
				lightMap: !! material.lightMap,
				lightMapEncoding: getTextureEncodingFromMap( material.lightMap ),
				aoMap: !! material.aoMap,
				emissiveMap: !! material.emissiveMap,
				emissiveMapEncoding: getTextureEncodingFromMap( material.emissiveMap ),
				bumpMap: !! material.bumpMap,
				normalMap: !! material.normalMap,
				objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
				tangentSpaceNormalMap: material.normalMapType === TangentSpaceNormalMap,
				clearcoatMap: !! material.clearcoatMap,
				clearcoatRoughnessMap: !! material.clearcoatRoughnessMap,
				clearcoatNormalMap: !! material.clearcoatNormalMap,
				displacementMap: !! material.displacementMap,
				roughnessMap: !! material.roughnessMap,
				metalnessMap: !! material.metalnessMap,
				specularMap: !! material.specularMap,
				alphaMap: !! material.alphaMap,

				gradientMap: !! material.gradientMap,

				sheen: !! material.sheen,

				transmissionMap: !! material.transmissionMap,

				combine: material.combine,

				vertexTangents: ( material.normalMap && material.vertexTangents ),
				vertexColors: material.vertexColors,
				vertexUvs: !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatMap || !! material.clearcoatRoughnessMap || !! material.clearcoatNormalMap || !! material.displacementMap || !! material.transmissionMap,
				uvsVertexOnly: ! ( !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatNormalMap || !! material.transmissionMap ) && !! material.displacementMap,

				fog: !! fog,
				useFog: material.fog,
				fogExp2: ( fog && fog.isFogExp2 ),

				flatShading: material.flatShading,

				sizeAttenuation: material.sizeAttenuation,
				logarithmicDepthBuffer: logarithmicDepthBuffer,

				skinning: material.skinning && maxBones > 0,
				maxBones: maxBones,
				useVertexTexture: floatVertexTextures,

				morphTargets: material.morphTargets,
				morphNormals: material.morphNormals,
				maxMorphTargets: renderer.maxMorphTargets,
				maxMorphNormals: renderer.maxMorphNormals,

				numDirLights: lights.directional.length,
				numPointLights: lights.point.length,
				numSpotLights: lights.spot.length,
				numRectAreaLights: lights.rectArea.length,
				numHemiLights: lights.hemi.length,

				numDirLightShadows: lights.directionalShadowMap.length,
				numPointLightShadows: lights.pointShadowMap.length,
				numSpotLightShadows: lights.spotShadowMap.length,

				numClippingPlanes: clipping.numPlanes,
				numClipIntersection: clipping.numIntersection,

				dithering: material.dithering,

				shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
				shadowMapType: renderer.shadowMap.type,

				toneMapping: material.toneMapped ? renderer.toneMapping : NoToneMapping,
				physicallyCorrectLights: renderer.physicallyCorrectLights,

				premultipliedAlpha: material.premultipliedAlpha,

				alphaTest: material.alphaTest,
				doubleSided: material.side === DoubleSide,
				flipSided: material.side === BackSide,

				depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false,

				index0AttributeName: material.index0AttributeName,

				extensionDerivatives: material.extensions && material.extensions.derivatives,
				extensionFragDepth: material.extensions && material.extensions.fragDepth,
				extensionDrawBuffers: material.extensions && material.extensions.drawBuffers,
				extensionShaderTextureLOD: material.extensions && material.extensions.shaderTextureLOD,

				rendererExtensionFragDepth: isWebGL2 || extensions.has( 'EXT_frag_depth' ),
				rendererExtensionDrawBuffers: isWebGL2 || extensions.has( 'WEBGL_draw_buffers' ),
				rendererExtensionShaderTextureLod: isWebGL2 || extensions.has( 'EXT_shader_texture_lod' ),

				customProgramCacheKey: material.customProgramCacheKey()

			};

			return parameters;

		}

		function getProgramCacheKey( parameters ) {

			var array = [];

			if ( parameters.shaderID ) {

				array.push( parameters.shaderID );

			} else {

				array.push( parameters.fragmentShader );
				array.push( parameters.vertexShader );

			}

			if ( parameters.defines !== undefined ) {

				for ( var name in parameters.defines ) {

					array.push( name );
					array.push( parameters.defines[ name ] );

				}

			}

			if ( parameters.isRawShaderMaterial === false ) {

				for ( var i = 0; i < parameterNames.length; i ++ ) {

					array.push( parameters[ parameterNames[ i ] ] );

				}

				array.push( renderer.outputEncoding );
				array.push( renderer.gammaFactor );

			}

			array.push( parameters.customProgramCacheKey );

			return array.join();

		}

		function getUniforms( material ) {

			var shaderID = shaderIDs[ material.type ];
			var uniforms;

			if ( shaderID ) {

				var shader = ShaderLib[ shaderID ];
				uniforms = UniformsUtils.clone( shader.uniforms );

			} else {

				uniforms = material.uniforms;

			}

			return uniforms;

		}

		function acquireProgram( parameters, cacheKey ) {

			var program;

			// Check if code has been already compiled
			for ( var p = 0, pl = programs.length; p < pl; p ++ ) {

				var preexistingProgram = programs[ p ];

				if ( preexistingProgram.cacheKey === cacheKey ) {

					program = preexistingProgram;
					++ program.usedTimes;

					break;

				}

			}

			if ( program === undefined ) {

				program = new WebGLProgram( renderer, cacheKey, parameters, bindingStates );
				programs.push( program );

			}

			return program;

		}

		function releaseProgram( program ) {

			if ( -- program.usedTimes === 0 ) {

				// Remove from unordered set
				var i = programs.indexOf( program );
				programs[ i ] = programs[ programs.length - 1 ];
				programs.pop();

				// Free WebGL resources
				program.destroy();

			}

		}

		return {
			getParameters: getParameters,
			getProgramCacheKey: getProgramCacheKey,
			getUniforms: getUniforms,
			acquireProgram: acquireProgram,
			releaseProgram: releaseProgram,
			// Exposed for resource monitoring & error feedback via renderer.info:
			programs: programs
		};

	}

	function WebGLProperties() {

		var properties = new WeakMap();

		function get( object ) {

			var map = properties.get( object );

			if ( map === undefined ) {

				map = {};
				properties.set( object, map );

			}

			return map;

		}

		function remove( object ) {

			properties.delete( object );

		}

		function update( object, key, value ) {

			properties.get( object )[ key ] = value;

		}

		function dispose() {

			properties = new WeakMap();

		}

		return {
			get: get,
			remove: remove,
			update: update,
			dispose: dispose
		};

	}

	function painterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.program !== b.program ) {

			return a.program.id - b.program.id;

		} else if ( a.material.id !== b.material.id ) {

			return a.material.id - b.material.id;

		} else if ( a.z !== b.z ) {

			return a.z - b.z;

		} else {

			return a.id - b.id;

		}

	}

	function reversePainterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return a.id - b.id;

		}

	}


	function WebGLRenderList( properties ) {

		var renderItems = [];
		var renderItemsIndex = 0;

		var opaque = [];
		var transparent = [];

		var defaultProgram = { id: - 1 };

		function init() {

			renderItemsIndex = 0;

			opaque.length = 0;
			transparent.length = 0;

		}

		function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

			var renderItem = renderItems[ renderItemsIndex ];
			var materialProperties = properties.get( material );

			if ( renderItem === undefined ) {

				renderItem = {
					id: object.id,
					object: object,
					geometry: geometry,
					material: material,
					program: materialProperties.program || defaultProgram,
					groupOrder: groupOrder,
					renderOrder: object.renderOrder,
					z: z,
					group: group
				};

				renderItems[ renderItemsIndex ] = renderItem;

			} else {

				renderItem.id = object.id;
				renderItem.object = object;
				renderItem.geometry = geometry;
				renderItem.material = material;
				renderItem.program = materialProperties.program || defaultProgram;
				renderItem.groupOrder = groupOrder;
				renderItem.renderOrder = object.renderOrder;
				renderItem.z = z;
				renderItem.group = group;

			}

			renderItemsIndex ++;

			return renderItem;

		}

		function push( object, geometry, material, groupOrder, z, group ) {

			var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			( material.transparent === true ? transparent : opaque ).push( renderItem );

		}

		function unshift( object, geometry, material, groupOrder, z, group ) {

			var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			( material.transparent === true ? transparent : opaque ).unshift( renderItem );

		}

		function sort( customOpaqueSort, customTransparentSort ) {

			if ( opaque.length > 1 ) { opaque.sort( customOpaqueSort || painterSortStable ); }
			if ( transparent.length > 1 ) { transparent.sort( customTransparentSort || reversePainterSortStable ); }

		}

		function finish() {

			// Clear references from inactive renderItems in the list

			for ( var i = renderItemsIndex, il = renderItems.length; i < il; i ++ ) {

				var renderItem = renderItems[ i ];

				if ( renderItem.id === null ) { break; }

				renderItem.id = null;
				renderItem.object = null;
				renderItem.geometry = null;
				renderItem.material = null;
				renderItem.program = null;
				renderItem.group = null;

			}

		}

		return {

			opaque: opaque,
			transparent: transparent,

			init: init,
			push: push,
			unshift: unshift,
			finish: finish,

			sort: sort
		};

	}

	function WebGLRenderLists( properties ) {

		var lists = new WeakMap();

		function get( scene, camera ) {

			var cameras = lists.get( scene );
			var list;

			if ( cameras === undefined ) {

				list = new WebGLRenderList( properties );
				lists.set( scene, new WeakMap() );
				lists.get( scene ).set( camera, list );

			} else {

				list = cameras.get( camera );
				if ( list === undefined ) {

					list = new WebGLRenderList( properties );
					cameras.set( camera, list );

				}

			}

			return list;

		}

		function dispose() {

			lists = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	function UniformsCache() {

		var lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				var uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							direction: new Vector3(),
							color: new Color()
						};
						break;

					case 'SpotLight':
						uniforms = {
							position: new Vector3(),
							direction: new Vector3(),
							color: new Color(),
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0
						};
						break;

					case 'PointLight':
						uniforms = {
							position: new Vector3(),
							color: new Color(),
							distance: 0,
							decay: 0
						};
						break;

					case 'HemisphereLight':
						uniforms = {
							direction: new Vector3(),
							skyColor: new Color(),
							groundColor: new Color()
						};
						break;

					case 'RectAreaLight':
						uniforms = {
							color: new Color(),
							position: new Vector3(),
							halfWidth: new Vector3(),
							halfHeight: new Vector3()
						};
						break;

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}

	function ShadowUniformsCache() {

		var lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				var uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'SpotLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'PointLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2(),
							shadowCameraNear: 1,
							shadowCameraFar: 1000
						};
						break;

					// TODO (abelnation): set RectAreaLight shadow uniforms

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}



	var nextVersion = 0;

	function shadowCastingLightsFirst( lightA, lightB ) {

		return ( lightB.castShadow ? 1 : 0 ) - ( lightA.castShadow ? 1 : 0 );

	}

	function WebGLLights() {

		var cache = new UniformsCache();

		var shadowCache = ShadowUniformsCache();

		var state = {

			version: 0,

			hash: {
				directionalLength: - 1,
				pointLength: - 1,
				spotLength: - 1,
				rectAreaLength: - 1,
				hemiLength: - 1,

				numDirectionalShadows: - 1,
				numPointShadows: - 1,
				numSpotShadows: - 1
			},

			ambient: [ 0, 0, 0 ],
			probe: [],
			directional: [],
			directionalShadow: [],
			directionalShadowMap: [],
			directionalShadowMatrix: [],
			spot: [],
			spotShadow: [],
			spotShadowMap: [],
			spotShadowMatrix: [],
			rectArea: [],
			rectAreaLTC1: null,
			rectAreaLTC2: null,
			point: [],
			pointShadow: [],
			pointShadowMap: [],
			pointShadowMatrix: [],
			hemi: []

		};

		for ( var i = 0; i < 9; i ++ ) { state.probe.push( new Vector3() ); }

		var vector3 = new Vector3();
		var matrix4 = new Matrix4();
		var matrix42 = new Matrix4();

		function setup( lights, shadows, camera ) {

			var r = 0, g = 0, b = 0;

			for ( var i = 0; i < 9; i ++ ) { state.probe[ i ].set( 0, 0, 0 ); }

			var directionalLength = 0;
			var pointLength = 0;
			var spotLength = 0;
			var rectAreaLength = 0;
			var hemiLength = 0;

			var numDirectionalShadows = 0;
			var numPointShadows = 0;
			var numSpotShadows = 0;

			var viewMatrix = camera.matrixWorldInverse;

			lights.sort( shadowCastingLightsFirst );

			for ( var i$1 = 0, l = lights.length; i$1 < l; i$1 ++ ) {

				var light = lights[ i$1 ];

				var color = light.color;
				var intensity = light.intensity;
				var distance = light.distance;

				var shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;

				if ( light.isAmbientLight ) {

					r += color.r * intensity;
					g += color.g * intensity;
					b += color.b * intensity;

				} else if ( light.isLightProbe ) {

					for ( var j = 0; j < 9; j ++ ) {

						state.probe[ j ].addScaledVector( light.sh.coefficients[ j ], intensity );

					}

				} else if ( light.isDirectionalLight ) {

					var uniforms = cache.get( light );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					if ( light.castShadow ) {

						var shadow = light.shadow;

						var shadowUniforms = shadowCache.get( light );

						shadowUniforms.shadowBias = shadow.bias;
						shadowUniforms.shadowNormalBias = shadow.normalBias;
						shadowUniforms.shadowRadius = shadow.radius;
						shadowUniforms.shadowMapSize = shadow.mapSize;

						state.directionalShadow[ directionalLength ] = shadowUniforms;
						state.directionalShadowMap[ directionalLength ] = shadowMap;
						state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;

						numDirectionalShadows ++;

					}

					state.directional[ directionalLength ] = uniforms;

					directionalLength ++;

				} else if ( light.isSpotLight ) {

					var uniforms$1 = cache.get( light );

					uniforms$1.position.setFromMatrixPosition( light.matrixWorld );
					uniforms$1.position.applyMatrix4( viewMatrix );

					uniforms$1.color.copy( color ).multiplyScalar( intensity );
					uniforms$1.distance = distance;

					uniforms$1.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms$1.direction.sub( vector3 );
					uniforms$1.direction.transformDirection( viewMatrix );

					uniforms$1.coneCos = Math.cos( light.angle );
					uniforms$1.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
					uniforms$1.decay = light.decay;

					if ( light.castShadow ) {

						var shadow$1 = light.shadow;

						var shadowUniforms$1 = shadowCache.get( light );

						shadowUniforms$1.shadowBias = shadow$1.bias;
						shadowUniforms$1.shadowNormalBias = shadow$1.normalBias;
						shadowUniforms$1.shadowRadius = shadow$1.radius;
						shadowUniforms$1.shadowMapSize = shadow$1.mapSize;

						state.spotShadow[ spotLength ] = shadowUniforms$1;
						state.spotShadowMap[ spotLength ] = shadowMap;
						state.spotShadowMatrix[ spotLength ] = light.shadow.matrix;

						numSpotShadows ++;

					}

					state.spot[ spotLength ] = uniforms$1;

					spotLength ++;

				} else if ( light.isRectAreaLight ) {

					var uniforms$2 = cache.get( light );

					// (a) intensity is the total visible light emitted
					//uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

					// (b) intensity is the brightness of the light
					uniforms$2.color.copy( color ).multiplyScalar( intensity );

					uniforms$2.position.setFromMatrixPosition( light.matrixWorld );
					uniforms$2.position.applyMatrix4( viewMatrix );

					// extract local rotation of light to derive width/height half vectors
					matrix42.identity();
					matrix4.copy( light.matrixWorld );
					matrix4.premultiply( viewMatrix );
					matrix42.extractRotation( matrix4 );

					uniforms$2.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
					uniforms$2.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

					uniforms$2.halfWidth.applyMatrix4( matrix42 );
					uniforms$2.halfHeight.applyMatrix4( matrix42 );

					// TODO (abelnation): RectAreaLight distance?
					// uniforms.distance = distance;

					state.rectArea[ rectAreaLength ] = uniforms$2;

					rectAreaLength ++;

				} else if ( light.isPointLight ) {

					var uniforms$3 = cache.get( light );

					uniforms$3.position.setFromMatrixPosition( light.matrixWorld );
					uniforms$3.position.applyMatrix4( viewMatrix );

					uniforms$3.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms$3.distance = light.distance;
					uniforms$3.decay = light.decay;

					if ( light.castShadow ) {

						var shadow$2 = light.shadow;

						var shadowUniforms$2 = shadowCache.get( light );

						shadowUniforms$2.shadowBias = shadow$2.bias;
						shadowUniforms$2.shadowNormalBias = shadow$2.normalBias;
						shadowUniforms$2.shadowRadius = shadow$2.radius;
						shadowUniforms$2.shadowMapSize = shadow$2.mapSize;
						shadowUniforms$2.shadowCameraNear = shadow$2.camera.near;
						shadowUniforms$2.shadowCameraFar = shadow$2.camera.far;

						state.pointShadow[ pointLength ] = shadowUniforms$2;
						state.pointShadowMap[ pointLength ] = shadowMap;
						state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;

						numPointShadows ++;

					}

					state.point[ pointLength ] = uniforms$3;

					pointLength ++;

				} else if ( light.isHemisphereLight ) {

					var uniforms$4 = cache.get( light );

					uniforms$4.direction.setFromMatrixPosition( light.matrixWorld );
					uniforms$4.direction.transformDirection( viewMatrix );
					uniforms$4.direction.normalize();

					uniforms$4.skyColor.copy( light.color ).multiplyScalar( intensity );
					uniforms$4.groundColor.copy( light.groundColor ).multiplyScalar( intensity );

					state.hemi[ hemiLength ] = uniforms$4;

					hemiLength ++;

				}

			}

			if ( rectAreaLength > 0 ) {

				state.rectAreaLTC1 = UniformsLib.LTC_1;
				state.rectAreaLTC2 = UniformsLib.LTC_2;

			}

			state.ambient[ 0 ] = r;
			state.ambient[ 1 ] = g;
			state.ambient[ 2 ] = b;

			var hash = state.hash;

			if ( hash.directionalLength !== directionalLength ||
				hash.pointLength !== pointLength ||
				hash.spotLength !== spotLength ||
				hash.rectAreaLength !== rectAreaLength ||
				hash.hemiLength !== hemiLength ||
				hash.numDirectionalShadows !== numDirectionalShadows ||
				hash.numPointShadows !== numPointShadows ||
				hash.numSpotShadows !== numSpotShadows ) {

				state.directional.length = directionalLength;
				state.spot.length = spotLength;
				state.rectArea.length = rectAreaLength;
				state.point.length = pointLength;
				state.hemi.length = hemiLength;

				state.directionalShadow.length = numDirectionalShadows;
				state.directionalShadowMap.length = numDirectionalShadows;
				state.pointShadow.length = numPointShadows;
				state.pointShadowMap.length = numPointShadows;
				state.spotShadow.length = numSpotShadows;
				state.spotShadowMap.length = numSpotShadows;
				state.directionalShadowMatrix.length = numDirectionalShadows;
				state.pointShadowMatrix.length = numPointShadows;
				state.spotShadowMatrix.length = numSpotShadows;

				hash.directionalLength = directionalLength;
				hash.pointLength = pointLength;
				hash.spotLength = spotLength;
				hash.rectAreaLength = rectAreaLength;
				hash.hemiLength = hemiLength;

				hash.numDirectionalShadows = numDirectionalShadows;
				hash.numPointShadows = numPointShadows;
				hash.numSpotShadows = numSpotShadows;

				state.version = nextVersion ++;

			}

		}

		return {
			setup: setup,
			state: state
		};

	}

	function WebGLRenderState() {

		var lights = new WebGLLights();

		var lightsArray = [];
		var shadowsArray = [];

		function init() {

			lightsArray.length = 0;
			shadowsArray.length = 0;

		}

		function pushLight( light ) {

			lightsArray.push( light );

		}

		function pushShadow( shadowLight ) {

			shadowsArray.push( shadowLight );

		}

		function setupLights( camera ) {

			lights.setup( lightsArray, shadowsArray, camera );

		}

		var state = {
			lightsArray: lightsArray,
			shadowsArray: shadowsArray,

			lights: lights
		};

		return {
			init: init,
			state: state,
			setupLights: setupLights,

			pushLight: pushLight,
			pushShadow: pushShadow
		};

	}

	function WebGLRenderStates() {

		var renderStates = new WeakMap();

		function get( scene, camera ) {

			var renderState;

			if ( renderStates.has( scene ) === false ) {

				renderState = new WebGLRenderState();
				renderStates.set( scene, new WeakMap() );
				renderStates.get( scene ).set( camera, renderState );

			} else {

				if ( renderStates.get( scene ).has( camera ) === false ) {

					renderState = new WebGLRenderState();
					renderStates.get( scene ).set( camera, renderState );

				} else {

					renderState = renderStates.get( scene ).get( camera );

				}

			}

			return renderState;

		}

		function dispose() {

			renderStates = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	/**
	 * parameters = {
	 *
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>
	 * }
	 */

	function MeshDepthMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDepthMaterial';

		this.depthPacking = BasicDepthPacking;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;

		this.setValues( parameters );

	}

	MeshDepthMaterial.prototype = Object.create( Material.prototype );
	MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

	MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

	MeshDepthMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.depthPacking = source.depthPacking;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		return this;

	};

	/**
	 * parameters = {
	 *
	 *  referencePosition: <float>,
	 *  nearDistance: <float>,
	 *  farDistance: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>
	 *
	 * }
	 */

	function MeshDistanceMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDistanceMaterial';

		this.referencePosition = new Vector3();
		this.nearDistance = 1;
		this.farDistance = 1000;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.fog = false;

		this.setValues( parameters );

	}

	MeshDistanceMaterial.prototype = Object.create( Material.prototype );
	MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;

	MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;

	MeshDistanceMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.referencePosition.copy( source.referencePosition );
		this.nearDistance = source.nearDistance;
		this.farDistance = source.farDistance;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		return this;

	};

	var vsm_frag = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";

	var vsm_vert = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";

	function WebGLShadowMap( _renderer, _objects, maxTextureSize ) {

		var _frustum = new Frustum();

		var _shadowMapSize = new Vector2(),
			_viewportSize = new Vector2(),

			_viewport = new Vector4(),

			_depthMaterials = [],
			_distanceMaterials = [],

			_materialCache = {};

		var shadowSide = { 0: BackSide, 1: FrontSide, 2: DoubleSide };

		var shadowMaterialVertical = new ShaderMaterial( {

			defines: {
				SAMPLE_RATE: 2.0 / 8.0,
				HALF_SAMPLE_RATE: 1.0 / 8.0
			},

			uniforms: {
				shadow_pass: { value: null },
				resolution: { value: new Vector2() },
				radius: { value: 4.0 }
			},

			vertexShader: vsm_vert,

			fragmentShader: vsm_frag

		} );

		var shadowMaterialHorizonal = shadowMaterialVertical.clone();
		shadowMaterialHorizonal.defines.HORIZONAL_PASS = 1;

		var fullScreenTri = new BufferGeometry();
		fullScreenTri.setAttribute(
			"position",
			new BufferAttribute(
				new Float32Array( [ - 1, - 1, 0.5, 3, - 1, 0.5, - 1, 3, 0.5 ] ),
				3
			)
		);

		var fullScreenMesh = new Mesh( fullScreenTri, shadowMaterialVertical );

		var scope = this;

		this.enabled = false;

		this.autoUpdate = true;
		this.needsUpdate = false;

		this.type = PCFShadowMap;

		this.render = function ( lights, scene, camera ) {

			if ( scope.enabled === false ) { return; }
			if ( scope.autoUpdate === false && scope.needsUpdate === false ) { return; }

			if ( lights.length === 0 ) { return; }

			var currentRenderTarget = _renderer.getRenderTarget();
			var activeCubeFace = _renderer.getActiveCubeFace();
			var activeMipmapLevel = _renderer.getActiveMipmapLevel();

			var _state = _renderer.state;

			// Set GL state for depth map.
			_state.setBlending( NoBlending );
			_state.buffers.color.setClear( 1, 1, 1, 1 );
			_state.buffers.depth.setTest( true );
			_state.setScissorTest( false );

			// render depth map

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];
				var shadow = light.shadow;

				if ( shadow.autoUpdate === false && shadow.needsUpdate === false ) { continue; }

				if ( shadow === undefined ) {

					console.warn( 'THREE.WebGLShadowMap:', light, 'has no shadow.' );
					continue;

				}

				_shadowMapSize.copy( shadow.mapSize );

				var shadowFrameExtents = shadow.getFrameExtents();

				_shadowMapSize.multiply( shadowFrameExtents );

				_viewportSize.copy( shadow.mapSize );

				if ( _shadowMapSize.x > maxTextureSize || _shadowMapSize.y > maxTextureSize ) {

					if ( _shadowMapSize.x > maxTextureSize ) {

						_viewportSize.x = Math.floor( maxTextureSize / shadowFrameExtents.x );
						_shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
						shadow.mapSize.x = _viewportSize.x;

					}

					if ( _shadowMapSize.y > maxTextureSize ) {

						_viewportSize.y = Math.floor( maxTextureSize / shadowFrameExtents.y );
						_shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
						shadow.mapSize.y = _viewportSize.y;

					}

				}

				if ( shadow.map === null && ! shadow.isPointLightShadow && this.type === VSMShadowMap ) {

					var pars = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat };

					shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
					shadow.map.texture.name = light.name + ".shadowMap";

					shadow.mapPass = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );

					shadow.camera.updateProjectionMatrix();

				}

				if ( shadow.map === null ) {

					var pars$1 = { minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat };

					shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars$1 );
					shadow.map.texture.name = light.name + ".shadowMap";

					shadow.camera.updateProjectionMatrix();

				}

				_renderer.setRenderTarget( shadow.map );
				_renderer.clear();

				var viewportCount = shadow.getViewportCount();

				for ( var vp = 0; vp < viewportCount; vp ++ ) {

					var viewport = shadow.getViewport( vp );

					_viewport.set(
						_viewportSize.x * viewport.x,
						_viewportSize.y * viewport.y,
						_viewportSize.x * viewport.z,
						_viewportSize.y * viewport.w
					);

					_state.viewport( _viewport );

					shadow.updateMatrices( light, vp );

					_frustum = shadow.getFrustum();

					renderObject( scene, camera, shadow.camera, light, this.type );

				}

				// do blur pass for VSM

				if ( ! shadow.isPointLightShadow && this.type === VSMShadowMap ) {

					VSMPass( shadow, camera );

				}

				shadow.needsUpdate = false;

			}

			scope.needsUpdate = false;

			_renderer.setRenderTarget( currentRenderTarget, activeCubeFace, activeMipmapLevel );

		};

		function VSMPass( shadow, camera ) {

			var geometry = _objects.update( fullScreenMesh );

			// vertical pass

			shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
			shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
			shadowMaterialVertical.uniforms.radius.value = shadow.radius;
			_renderer.setRenderTarget( shadow.mapPass );
			_renderer.clear();
			_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null );

			// horizonal pass

			shadowMaterialHorizonal.uniforms.shadow_pass.value = shadow.mapPass.texture;
			shadowMaterialHorizonal.uniforms.resolution.value = shadow.mapSize;
			shadowMaterialHorizonal.uniforms.radius.value = shadow.radius;
			_renderer.setRenderTarget( shadow.map );
			_renderer.clear();
			_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialHorizonal, fullScreenMesh, null );

		}

		function getDepthMaterialVariant( useMorphing, useSkinning, useInstancing ) {

			var index = useMorphing << 0 | useSkinning << 1 | useInstancing << 2;

			var material = _depthMaterials[ index ];

			if ( material === undefined ) {

				material = new MeshDepthMaterial( {

					depthPacking: RGBADepthPacking,

					morphTargets: useMorphing,
					skinning: useSkinning

				} );

				_depthMaterials[ index ] = material;

			}

			return material;

		}

		function getDistanceMaterialVariant( useMorphing, useSkinning, useInstancing ) {

			var index = useMorphing << 0 | useSkinning << 1 | useInstancing << 2;

			var material = _distanceMaterials[ index ];

			if ( material === undefined ) {

				material = new MeshDistanceMaterial( {

					morphTargets: useMorphing,
					skinning: useSkinning

				} );

				_distanceMaterials[ index ] = material;

			}

			return material;

		}

		function getDepthMaterial( object, geometry, material, light, shadowCameraNear, shadowCameraFar, type ) {

			var result = null;

			var getMaterialVariant = getDepthMaterialVariant;
			var customMaterial = object.customDepthMaterial;

			if ( light.isPointLight === true ) {

				getMaterialVariant = getDistanceMaterialVariant;
				customMaterial = object.customDistanceMaterial;

			}

			if ( customMaterial === undefined ) {

				var useMorphing = false;

				if ( material.morphTargets === true ) {

					useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;

				}

				var useSkinning = false;

				if ( object.isSkinnedMesh === true ) {

					if ( material.skinning === true ) {

						useSkinning = true;

					} else {

						console.warn( 'THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object );

					}

				}

				var useInstancing = object.isInstancedMesh === true;

				result = getMaterialVariant( useMorphing, useSkinning, useInstancing );

			} else {

				result = customMaterial;

			}

			if ( _renderer.localClippingEnabled &&
					material.clipShadows === true &&
					material.clippingPlanes.length !== 0 ) {

				// in this case we need a unique material instance reflecting the
				// appropriate state

				var keyA = result.uuid, keyB = material.uuid;

				var materialsForVariant = _materialCache[ keyA ];

				if ( materialsForVariant === undefined ) {

					materialsForVariant = {};
					_materialCache[ keyA ] = materialsForVariant;

				}

				var cachedMaterial = materialsForVariant[ keyB ];

				if ( cachedMaterial === undefined ) {

					cachedMaterial = result.clone();
					materialsForVariant[ keyB ] = cachedMaterial;

				}

				result = cachedMaterial;

			}

			result.visible = material.visible;
			result.wireframe = material.wireframe;

			if ( type === VSMShadowMap ) {

				result.side = ( material.shadowSide !== null ) ? material.shadowSide : material.side;

			} else {

				result.side = ( material.shadowSide !== null ) ? material.shadowSide : shadowSide[ material.side ];

			}

			result.clipShadows = material.clipShadows;
			result.clippingPlanes = material.clippingPlanes;
			result.clipIntersection = material.clipIntersection;

			result.wireframeLinewidth = material.wireframeLinewidth;
			result.linewidth = material.linewidth;

			if ( light.isPointLight === true && result.isMeshDistanceMaterial === true ) {

				result.referencePosition.setFromMatrixPosition( light.matrixWorld );
				result.nearDistance = shadowCameraNear;
				result.farDistance = shadowCameraFar;

			}

			return result;

		}

		function renderObject( object, camera, shadowCamera, light, type ) {

			if ( object.visible === false ) { return; }

			var visible = object.layers.test( camera.layers );

			if ( visible && ( object.isMesh || object.isLine || object.isPoints ) ) {

				if ( ( object.castShadow || ( object.receiveShadow && type === VSMShadowMap ) ) && ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) ) {

					object.modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

					var geometry = _objects.update( object );
					var material = object.material;

					if ( Array.isArray( material ) ) {

						var groups = geometry.groups;

						for ( var k = 0, kl = groups.length; k < kl; k ++ ) {

							var group = groups[ k ];
							var groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								var depthMaterial = getDepthMaterial( object, geometry, groupMaterial, light, shadowCamera.near, shadowCamera.far, type );

								_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, group );

							}

						}

					} else if ( material.visible ) {

						var depthMaterial$1 = getDepthMaterial( object, geometry, material, light, shadowCamera.near, shadowCamera.far, type );

						_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial$1, object, null );

					}

				}

			}

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				renderObject( children[ i ], camera, shadowCamera, light, type );

			}

		}

	}

	function WebGLState( gl, extensions, capabilities ) {

		var isWebGL2 = capabilities.isWebGL2;

		function ColorBuffer() {

			var locked = false;

			var color = new Vector4();
			var currentColorMask = null;
			var currentColorClear = new Vector4( 0, 0, 0, 0 );

			return {

				setMask: function ( colorMask ) {

					if ( currentColorMask !== colorMask && ! locked ) {

						gl.colorMask( colorMask, colorMask, colorMask, colorMask );
						currentColorMask = colorMask;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( r, g, b, a, premultipliedAlpha ) {

					if ( premultipliedAlpha === true ) {

						r *= a; g *= a; b *= a;

					}

					color.set( r, g, b, a );

					if ( currentColorClear.equals( color ) === false ) {

						gl.clearColor( r, g, b, a );
						currentColorClear.copy( color );

					}

				},

				reset: function () {

					locked = false;

					currentColorMask = null;
					currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

				}

			};

		}

		function DepthBuffer() {

			var locked = false;

			var currentDepthMask = null;
			var currentDepthFunc = null;
			var currentDepthClear = null;

			return {

				setTest: function ( depthTest ) {

					if ( depthTest ) {

						enable( 2929 );

					} else {

						disable( 2929 );

					}

				},

				setMask: function ( depthMask ) {

					if ( currentDepthMask !== depthMask && ! locked ) {

						gl.depthMask( depthMask );
						currentDepthMask = depthMask;

					}

				},

				setFunc: function ( depthFunc ) {

					if ( currentDepthFunc !== depthFunc ) {

						if ( depthFunc ) {

							switch ( depthFunc ) {

								case NeverDepth:

									gl.depthFunc( 512 );
									break;

								case AlwaysDepth:

									gl.depthFunc( 519 );
									break;

								case LessDepth:

									gl.depthFunc( 513 );
									break;

								case LessEqualDepth:

									gl.depthFunc( 515 );
									break;

								case EqualDepth:

									gl.depthFunc( 514 );
									break;

								case GreaterEqualDepth:

									gl.depthFunc( 518 );
									break;

								case GreaterDepth:

									gl.depthFunc( 516 );
									break;

								case NotEqualDepth:

									gl.depthFunc( 517 );
									break;

								default:

									gl.depthFunc( 515 );

							}

						} else {

							gl.depthFunc( 515 );

						}

						currentDepthFunc = depthFunc;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( depth ) {

					if ( currentDepthClear !== depth ) {

						gl.clearDepth( depth );
						currentDepthClear = depth;

					}

				},

				reset: function () {

					locked = false;

					currentDepthMask = null;
					currentDepthFunc = null;
					currentDepthClear = null;

				}

			};

		}

		function StencilBuffer() {

			var locked = false;

			var currentStencilMask = null;
			var currentStencilFunc = null;
			var currentStencilRef = null;
			var currentStencilFuncMask = null;
			var currentStencilFail = null;
			var currentStencilZFail = null;
			var currentStencilZPass = null;
			var currentStencilClear = null;

			return {

				setTest: function ( stencilTest ) {

					if ( ! locked ) {

						if ( stencilTest ) {

							enable( 2960 );

						} else {

							disable( 2960 );

						}

					}

				},

				setMask: function ( stencilMask ) {

					if ( currentStencilMask !== stencilMask && ! locked ) {

						gl.stencilMask( stencilMask );
						currentStencilMask = stencilMask;

					}

				},

				setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

					if ( currentStencilFunc !== stencilFunc ||
					     currentStencilRef !== stencilRef ||
					     currentStencilFuncMask !== stencilMask ) {

						gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

						currentStencilFunc = stencilFunc;
						currentStencilRef = stencilRef;
						currentStencilFuncMask = stencilMask;

					}

				},

				setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

					if ( currentStencilFail !== stencilFail ||
					     currentStencilZFail !== stencilZFail ||
					     currentStencilZPass !== stencilZPass ) {

						gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

						currentStencilFail = stencilFail;
						currentStencilZFail = stencilZFail;
						currentStencilZPass = stencilZPass;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( stencil ) {

					if ( currentStencilClear !== stencil ) {

						gl.clearStencil( stencil );
						currentStencilClear = stencil;

					}

				},

				reset: function () {

					locked = false;

					currentStencilMask = null;
					currentStencilFunc = null;
					currentStencilRef = null;
					currentStencilFuncMask = null;
					currentStencilFail = null;
					currentStencilZFail = null;
					currentStencilZPass = null;
					currentStencilClear = null;

				}

			};

		}

		//

		var colorBuffer = new ColorBuffer();
		var depthBuffer = new DepthBuffer();
		var stencilBuffer = new StencilBuffer();

		var enabledCapabilities = {};

		var currentProgram = null;

		var currentBlendingEnabled = null;
		var currentBlending = null;
		var currentBlendEquation = null;
		var currentBlendSrc = null;
		var currentBlendDst = null;
		var currentBlendEquationAlpha = null;
		var currentBlendSrcAlpha = null;
		var currentBlendDstAlpha = null;
		var currentPremultipledAlpha = false;

		var currentFlipSided = null;
		var currentCullFace = null;

		var currentLineWidth = null;

		var currentPolygonOffsetFactor = null;
		var currentPolygonOffsetUnits = null;

		var maxTextures = gl.getParameter( 35661 );

		var lineWidthAvailable = false;
		var version = 0;
		var glVersion = gl.getParameter( 7938 );

		if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

			version = parseFloat( /^WebGL\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 1.0 );

		} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

			version = parseFloat( /^OpenGL\ ES\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 2.0 );

		}

		var currentTextureSlot = null;
		var currentBoundTextures = {};

		var currentScissor = new Vector4();
		var currentViewport = new Vector4();

		function createTexture( type, target, count ) {

			var data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
			var texture = gl.createTexture();

			gl.bindTexture( type, texture );
			gl.texParameteri( type, 10241, 9728 );
			gl.texParameteri( type, 10240, 9728 );

			for ( var i = 0; i < count; i ++ ) {

				gl.texImage2D( target + i, 0, 6408, 1, 1, 0, 6408, 5121, data );

			}

			return texture;

		}

		var emptyTextures = {};
		emptyTextures[ 3553 ] = createTexture( 3553, 3553, 1 );
		emptyTextures[ 34067 ] = createTexture( 34067, 34069, 6 );

		// init

		colorBuffer.setClear( 0, 0, 0, 1 );
		depthBuffer.setClear( 1 );
		stencilBuffer.setClear( 0 );

		enable( 2929 );
		depthBuffer.setFunc( LessEqualDepth );

		setFlipSided( false );
		setCullFace( CullFaceBack );
		enable( 2884 );

		setBlending( NoBlending );

		//

		function enable( id ) {

			if ( enabledCapabilities[ id ] !== true ) {

				gl.enable( id );
				enabledCapabilities[ id ] = true;

			}

		}

		function disable( id ) {

			if ( enabledCapabilities[ id ] !== false ) {

				gl.disable( id );
				enabledCapabilities[ id ] = false;

			}

		}

		function useProgram( program ) {

			if ( currentProgram !== program ) {

				gl.useProgram( program );

				currentProgram = program;

				return true;

			}

			return false;

		}

		var equationToGL = {};
		equationToGL[ AddEquation ] = 32774;
		equationToGL[ SubtractEquation ] = 32778;
		equationToGL[ ReverseSubtractEquation ] = 32779;

		if ( isWebGL2 ) {

			equationToGL[ MinEquation ] = 32775;
			equationToGL[ MaxEquation ] = 32776;

		} else {

			var extension = extensions.get( 'EXT_blend_minmax' );

			if ( extension !== null ) {

				equationToGL[ MinEquation ] = extension.MIN_EXT;
				equationToGL[ MaxEquation ] = extension.MAX_EXT;

			}

		}

		var factorToGL = {};
		factorToGL[ ZeroFactor ] = 0;
		factorToGL[ OneFactor ] = 1;
		factorToGL[ SrcColorFactor ] = 768;
		factorToGL[ SrcAlphaFactor ] = 770;
		factorToGL[ SrcAlphaSaturateFactor ] = 776;
		factorToGL[ DstColorFactor ] = 774;
		factorToGL[ DstAlphaFactor ] = 772;
		factorToGL[ OneMinusSrcColorFactor ] = 769;
		factorToGL[ OneMinusSrcAlphaFactor ] = 771;
		factorToGL[ OneMinusDstColorFactor ] = 775;
		factorToGL[ OneMinusDstAlphaFactor ] = 773;

		function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha ) {

			if ( blending === NoBlending ) {

				if ( currentBlendingEnabled ) {

					disable( 3042 );
					currentBlendingEnabled = false;

				}

				return;

			}

			if ( ! currentBlendingEnabled ) {

				enable( 3042 );
				currentBlendingEnabled = true;

			}

			if ( blending !== CustomBlending ) {

				if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

					if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

						gl.blendEquation( 32774 );

						currentBlendEquation = AddEquation;
						currentBlendEquationAlpha = AddEquation;

					}

					if ( premultipliedAlpha ) {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( 1, 771, 1, 771 );
								break;

							case AdditiveBlending:
								gl.blendFunc( 1, 1 );
								break;

							case SubtractiveBlending:
								gl.blendFuncSeparate( 0, 0, 769, 771 );
								break;

							case MultiplyBlending:
								gl.blendFuncSeparate( 0, 768, 0, 770 );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					} else {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( 770, 771, 1, 771 );
								break;

							case AdditiveBlending:
								gl.blendFunc( 770, 1 );
								break;

							case SubtractiveBlending:
								gl.blendFunc( 0, 769 );
								break;

							case MultiplyBlending:
								gl.blendFunc( 0, 768 );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					}

					currentBlendSrc = null;
					currentBlendDst = null;
					currentBlendSrcAlpha = null;
					currentBlendDstAlpha = null;

					currentBlending = blending;
					currentPremultipledAlpha = premultipliedAlpha;

				}

				return;

			}

			// custom blending

			blendEquationAlpha = blendEquationAlpha || blendEquation;
			blendSrcAlpha = blendSrcAlpha || blendSrc;
			blendDstAlpha = blendDstAlpha || blendDst;

			if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

				gl.blendEquationSeparate( equationToGL[ blendEquation ], equationToGL[ blendEquationAlpha ] );

				currentBlendEquation = blendEquation;
				currentBlendEquationAlpha = blendEquationAlpha;

			}

			if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

				gl.blendFuncSeparate( factorToGL[ blendSrc ], factorToGL[ blendDst ], factorToGL[ blendSrcAlpha ], factorToGL[ blendDstAlpha ] );

				currentBlendSrc = blendSrc;
				currentBlendDst = blendDst;
				currentBlendSrcAlpha = blendSrcAlpha;
				currentBlendDstAlpha = blendDstAlpha;

			}

			currentBlending = blending;
			currentPremultipledAlpha = null;

		}

		function setMaterial( material, frontFaceCW ) {

			material.side === DoubleSide
				? disable( 2884 )
				: enable( 2884 );

			var flipSided = ( material.side === BackSide );
			if ( frontFaceCW ) { flipSided = ! flipSided; }

			setFlipSided( flipSided );

			( material.blending === NormalBlending && material.transparent === false )
				? setBlending( NoBlending )
				: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha );

			depthBuffer.setFunc( material.depthFunc );
			depthBuffer.setTest( material.depthTest );
			depthBuffer.setMask( material.depthWrite );
			colorBuffer.setMask( material.colorWrite );

			var stencilWrite = material.stencilWrite;
			stencilBuffer.setTest( stencilWrite );
			if ( stencilWrite ) {

				stencilBuffer.setMask( material.stencilWriteMask );
				stencilBuffer.setFunc( material.stencilFunc, material.stencilRef, material.stencilFuncMask );
				stencilBuffer.setOp( material.stencilFail, material.stencilZFail, material.stencilZPass );

			}

			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

		}

		//

		function setFlipSided( flipSided ) {

			if ( currentFlipSided !== flipSided ) {

				if ( flipSided ) {

					gl.frontFace( 2304 );

				} else {

					gl.frontFace( 2305 );

				}

				currentFlipSided = flipSided;

			}

		}

		function setCullFace( cullFace ) {

			if ( cullFace !== CullFaceNone ) {

				enable( 2884 );

				if ( cullFace !== currentCullFace ) {

					if ( cullFace === CullFaceBack ) {

						gl.cullFace( 1029 );

					} else if ( cullFace === CullFaceFront ) {

						gl.cullFace( 1028 );

					} else {

						gl.cullFace( 1032 );

					}

				}

			} else {

				disable( 2884 );

			}

			currentCullFace = cullFace;

		}

		function setLineWidth( width ) {

			if ( width !== currentLineWidth ) {

				if ( lineWidthAvailable ) { gl.lineWidth( width ); }

				currentLineWidth = width;

			}

		}

		function setPolygonOffset( polygonOffset, factor, units ) {

			if ( polygonOffset ) {

				enable( 32823 );

				if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

					gl.polygonOffset( factor, units );

					currentPolygonOffsetFactor = factor;
					currentPolygonOffsetUnits = units;

				}

			} else {

				disable( 32823 );

			}

		}

		function setScissorTest( scissorTest ) {

			if ( scissorTest ) {

				enable( 3089 );

			} else {

				disable( 3089 );

			}

		}

		// texture

		function activeTexture( webglSlot ) {

			if ( webglSlot === undefined ) { webglSlot = 33984 + maxTextures - 1; }

			if ( currentTextureSlot !== webglSlot ) {

				gl.activeTexture( webglSlot );
				currentTextureSlot = webglSlot;

			}

		}

		function bindTexture( webglType, webglTexture ) {

			if ( currentTextureSlot === null ) {

				activeTexture();

			}

			var boundTexture = currentBoundTextures[ currentTextureSlot ];

			if ( boundTexture === undefined ) {

				boundTexture = { type: undefined, texture: undefined };
				currentBoundTextures[ currentTextureSlot ] = boundTexture;

			}

			if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

				gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

				boundTexture.type = webglType;
				boundTexture.texture = webglTexture;

			}

		}

		function unbindTexture() {

			var boundTexture = currentBoundTextures[ currentTextureSlot ];

			if ( boundTexture !== undefined && boundTexture.type !== undefined ) {

				gl.bindTexture( boundTexture.type, null );

				boundTexture.type = undefined;
				boundTexture.texture = undefined;

			}

		}

		function compressedTexImage2D() {

			try {

				gl.compressedTexImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage2D() {

			try {

				gl.texImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage3D() {

			try {

				gl.texImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		//

		function scissor( scissor ) {

			if ( currentScissor.equals( scissor ) === false ) {

				gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
				currentScissor.copy( scissor );

			}

		}

		function viewport( viewport ) {

			if ( currentViewport.equals( viewport )