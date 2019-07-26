export default {
    getTypes: function (instance) {
        return Object.prototype.toString.call(instance).slice(8, -1);
    }
};