import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import terser from 'rollup-plugin-terser'
import buble from 'rollup-plugin-buble'
import pkg from './package.json'

export default [
	// browser-friendly UMD build
	{
		entry: 'src/index.js',
		dest: pkg.browser,
		format: 'umd',
		moduleName: 'sifter',
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			buble({  // transpile ES2015+ to ES5
				exclude: ['node_modules/**']
			}),
			uglify()
		],
		// indicate which modules should be treated as external
		external: ['lodash', 'numeral', 'date-fns'],
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		entry: 'src/index.js',
		targets: [
			{ dest: pkg.main, format: 'cjs' },
			{ dest: pkg.module, format: 'es' }
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			buble({
				exclude: ['node_modules/**']
			}),
			terser()
		],
		// indicate which modules should be treated as external
		external: ['lodash', 'numeral', 'date-fns']
	}
];