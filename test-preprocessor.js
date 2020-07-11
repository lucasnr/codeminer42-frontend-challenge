const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');

module.exports = {
	process(src, path) {
		if (
			path.endsWidth('.ts') ||
			path.endsWidth('.tsx') ||
			path.endsWidth('.js')
		) {
			return tsc.transpile(src, tsConfig.compilerOptions, path, []);
		}
		return src;
	},
};
