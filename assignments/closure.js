// ==== Challenge 1: Write your own closure ====
// Write a simple closure of your own creation.  Keep it simple!

myClosureParent();
function myClosureParent() {
  let closureVar = "Aren't closures";
  myClosureChild();
  function myClosureChild() {
    console.log(`${closureVar} fun?`);
  }
}

// ==== Challenge 2: Create a counter function ====
// 'counter' invokes an anon function that will create the "count" variable then
// return a function that can increment "counts" value.  The fun thing is
// "counter" is assigned the nested function as its value, meaning it can see
// the self-invoking parent's scope where "count" is created!
const counter = (() => {
  let count = 0;
  return function() {
    // ++count so the value after the increment is returned
    return ++count;
  };
})();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

/* STRETCH PROBLEM, Do not attempt until you have completed all previous tasks for today's project files */

// ==== Challenge 3: Create a counter function with an object that can increment and decrement ====
const counterFactory = (() => {
  // Return an object that has two methods called `increment` and `decrement`.
  // `increment` should increment a counter variable in closure scope and return it.
  // `decrement` should decrement the counter variable and return it.
  let count = 0;
  return {
    increment: function() {
      return ++count;
    },
    decrement: function() {
      return --count;
    }
  };
})();

console.log("1: ", counterFactory.increment()); // 1
console.log("2: ", counterFactory.increment()); // 2
console.log("3: ", counterFactory.increment()); // 3
console.log("4: ", counterFactory.increment()); // 4
console.log("5: ", counterFactory.decrement()); // 3
console.log("6: ", counterFactory.decrement()); // 2
console.log("7: ", counterFactory.increment()); // 3
console.log("8: ", counterFactory.decrement()); // 2
