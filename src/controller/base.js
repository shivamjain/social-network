// External Deps
const _ = require("lodash");
const Promise = require("bluebird");

class Base {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.beforeMethods = {};
		this.afterMethods = {};
	}

	async __executeBefore(name) {
		if (_.size(this.beforeMethods) == 0 || !this.beforeMethods[name] || _.size(this.beforeMethods[name]) == 0) {
			return;
		}
		await Promise.each(this.beforeMethods[name], async (method) => {
			await this[method]();
		});
	}

	async __executeAfter(name) {
		if (_.size(this.afterMethods) == 0 || !this.afterMethods[name] || _.size(this.afterMethods[name]) == 0) {
			return;
		}
		await Promise.each(this.afterMethods[name], async (method) => {
			await this[method]();
		});
	}

	async executeMethod(name, ...args) {
		try {
			await this.__executeBefore(name);
			await this[name](...args);
			await this.__executeAfter(name);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Base;