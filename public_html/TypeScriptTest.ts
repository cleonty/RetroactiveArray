class Person {
  age: number = 33;
  
  constructor(age: number) {
    this.age = age;
  }
};

class Car {
  engine: string;
  stop: () => string;
  constructor (engine: string) {
    this.engine = engine;
    this.stop = () => "Stopped " + this.engine;
  }
  
  start() {
    return "Started " + this.engine;
  }
}