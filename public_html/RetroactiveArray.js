function RetroactiveArray() {
  this.operations = [];
}

RetroactiveArray.prototype.push = function (value) {
  var operation = new Operation(Operation.INSERT, undefined, value);
  this.operations.push(operation);
};

RetroactiveArray.prototype.change = function (index, value) {
  var operation = new Operation(Operation.CHANGE, index, value);
  this.operations.push(operation);
};

RetroactiveArray.prototype.swap = function (index1, index2) {
  var operation = new Operation(Operation.SWAP, index1, index2);
  this.operations.push(operation);
};

RetroactiveArray.prototype.performOneOperation = function (array, operation) {
  if (operation.type === Operation.INSERT) {
    array.push(operation.op2);
  } else if (operation.type === Operation.CHANGE) {
    if (operation.op1 >= 0 && operation.op1 < array.length)
      array[operation.op1] = operation.op2;
  } else if (operation.type === Operation.SWAP) {
    var tmp = array[operation.op1];
    array[operation.op1] = array[operation.op2];
    array[operation.op2] = tmp;
  }
};

RetroactiveArray.prototype.performMultipleOperations = function (array, n) {
  n = Math.min(this.operations.length, n);
  for (var i = 0; i < n; i++) {
    this.performOneOperation(array, this.operations[i]);
  }
};

RetroactiveArray.prototype.performAllOperations = function (array) {
  this.performMultipleOperations(array, this.operations.length);
};

RetroactiveArray.prototype.operationCount = function () {
  return this.operations.length;
};

function Operation(type, op1, op2) {
  this.type = type;
  this.op1 = op1;
  this.op2 = op2;
}

Operation.INSERT = 1;
Operation.DELETE = 2;
Operation.CHANGE = 3;
Operation.SWAP = 4;

var moduleName = 'app';
angular.module(moduleName, []);
angular.module(moduleName).controller('AppController', AppController);

function AppController() {
  var array = [1, 3, 2, 1, 5, 2];
  this.array = angular.copy(array);
  this.retroactiveArray = SelectionSort.sortArray(angular.copy(array));

  this.updateArray = function updateArray() {
    var testArray = angular.copy(array);
    this.retroactiveArray.performMultipleOperations(testArray, this.time);
    this.array = testArray;
  };

  this.getArrayLifeTime = function getArrayLifeTime() {
    return this.retroactiveArray.operationCount();
  };

  this.time = 0;
}


function SelectionSort() {

}

SelectionSort.findIndexOfMinElement = function (array, startIndex) {
  var indexOMinfElement = startIndex;
  var minElement = array[indexOMinfElement];
  for (var i = startIndex + 1; i < array.length; i++) {
    if (array[i] < minElement) {
      indexOMinfElement = i;
      minElement = array[indexOMinfElement];
    }
  }
  return indexOMinfElement;
};

SelectionSort.swapElements = function (array, firstIndex, secondIndex) {
  var tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
};

SelectionSort.sortArray = function (array) {
  var ra = new RetroactiveArray();
  var length = array.length;
  for (var i = 0; i < length - 1; i++) {
    var indexOfMinElement = SelectionSort.findIndexOfMinElement(array, i);
    SelectionSort.swapElements(array, i, indexOfMinElement);
    ra.swap(i, indexOfMinElement);
  }
  return ra;
};

