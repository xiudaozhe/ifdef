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
		var regList = [
			{ reg: /<!--#ifdef (.*?)-->([\S\s\t]*?)<!--#endif-->/, match: true },
			{ reg: /\/\/#ifdef (.*?)\s([\S\s\t]*?)\/\/#endif/, match: true },
			{ reg: /<!--#ifndef (.*?)-->([\S\s\t]*?)<!--#endif-->/, match: false },
			{ reg: /\/\/#ifndef (.*?)\s([\S\s\t]*?)\/\/#endif/, match: false },
		]
		regList.forEach((regItem) => {
			let arr;
			while (arr = regItem['reg'].exec(content)) {
				if (arr) {
					if ((arr[1] === VITE_PROJECT_TYPE || arr[1] === VITE_PROJECT_TYPE.split('-')[0]) ^ regItem['match']) {
						content = content.replace(regItem['reg'], '')
					} else {
						content = content.replace(regItem['reg'], '$2')
					}
				}
			}
		})
		return content
	} catch (error) {
		console.error(error);
		console.error(filePath)
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
			if (path.extname(id) === '.vue' || path.extname(id) === '.js') {
				return getHtmlContent(id, VITE_PROJECT_TYPE);
			}
			return null;
		}
	};
}