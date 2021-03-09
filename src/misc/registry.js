//Registry -> Singleton Object (Acts like a global variable for this app)
class Registry {
    constructor() {
        this.data = {};
    }

    set(key, value = null) {
        this.data[key] = value;
    }

    get(key, defaultValue = null) {
        return this.data[key] || defaultValue;
    }

    delete(key) {
        delete this.data[key];
    }
}

module.exports = new Registry();