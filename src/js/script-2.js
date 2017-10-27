'use strict'

class TestClass {
  constructor (msg) {
    this.msg = msg
  }
  getMsg () {
    return this.msg
  }
}

let test = new TestClass('This is another test')

console.log(test.getMsg())
