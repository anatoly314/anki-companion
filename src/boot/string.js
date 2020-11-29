String.prototype.helloWorld = function () {
  console.log('Hello World');
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
