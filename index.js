"use strict";
const path = require('path');
const resolve = p => path.resolve(process.cwd(), p);
const fs = require('fs');

const readHtmlTemplate = async filePath => {
	return await fs.promises.readFile(filePath, { encoding: 'utf8' });
};

const getHtmlContent = async (filePath, VITE_PROJECT_TYPE) => {
	try {
		filePath = resolve(filePath);
		let content = await readHtmlTemplate(filePath);
		var reg1 = /<!--#ifdef (.*?)-->([\S\s\t]*?)<!--#endif-->/g
		var reg2 = /\/\/#ifdef (.*?)([\S\s\t]*?)\/\/#endif/g
		var arr1 = reg1.exec(content)
		if (arr1) {
			if (arr1[1] === VITE_PROJECT_TYPE) {
				content = content.replace(reg1, '$2')
			} else {
				content = content.replace(reg1, '')
			}
		}
		var arr2 = reg2.exec(content)
		if (arr2) {
			if (arr2[1] === VITE_PROJECT_TYPE) {
				content = content.replace(reg2, '$2')
			} else {
				content = content.replace(reg2, '')
			}
		}
		return content
	} catch (error) {
		console.error(error);
	}
};

module.exports = function conditionalCompile(VITE_PROJECT_TYPE) {
	let _env;
	return {
		name: 'vite-ifdef',
		config(_, env) {
			_env = env;
		},
		load(id) {
			if (path.extname(id) === '.vue') {
				return getHtmlContent(id, VITE_PROJECT_TYPE);
			}
			return null;
		}
	};
}