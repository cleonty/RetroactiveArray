
function workerFunc() {
  var i = 0;
  timedCount();
  function timedCount() {
    postMessage(i++);
    setTimeout(timedCount, 300);
  }
}
function createWorker(callback) {
  var blobURL = URL.createObjectURL(new Blob([
    "(" + callback.toString() + ")();"
  ], {type: 'application/javascript'}));
  var worker = new Worker(blobURL);
  worker.onmessage = function onmessage (event) {
    console.log("worker said: " + event.data);
    document.body.innerHTML = event.data;
  };
}

createWorker(workerFunc);

