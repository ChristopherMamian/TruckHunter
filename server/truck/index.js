// var Truck = function () {
// 	this.data = {
// 		truckName: null,
// 		currentAddress: null,
// 		foodType: null,
// 		active: false
// 	};

// 	this.fill = function (info) {
// 		for(var prop in this.data) {
// 			if(this.data[prop] !== 'undefined') {
// 				this.data[prop] = info[prop];
// 			}
// 		}
// 	};

// 	this.getInformation = function () {
// 		return this.data;
// 	};
// };

// module.exports = function (info) {
// 	var instance = new Truck();

// 	instance.fill(info);

// 	return instance;
// };