// Create a callback function and invoke the function to test your work.
// You have been provided an example of a problem and a solution to see how this
// works with our items array.  Study both the problem and the solution to figure
// out the rest of the problems.

const items = ["Pencil", "Notebook", "yo-yo", "Gum"];
function callback(param) {
  console.log(param);
}
getLength(items, callback); // 4
last(items, callback); // Gum
sumNums(4, 5, callback); // 9
multiplyNums(4, 5, callback); // 20
contains("Pencil", items, callback); // true
contains("Pen", items, callback); // false
/*

  //Given this problem:

  function firstItem(arr, cb) {
    // firstItem passes the first item of the given array to the callback function.
  }

  // Potential Solution:
  function firstItem(arr, cb) {
    return cb(arr[0]);
  }

  firstItem(items, function(first) {
    console.log(first)
  });

*/

// With the callback I wrote, none of these need to be returned.  But it's just
// a sample callback to test my code.  So I left them in in case they're used
// with a callback that returns a value
function getLength(arr, cb) {
  // getLength passes the length of the array into the callback.
  return cb(arr.length);
}

function last(arr, cb) {
  // last passes the last item of the array into the callback.
  return cb(arr[arr.length - 1]);
}

function sumNums(x, y, cb) {
  // sumNums adds two numbers (x, y) and passes the result to the callback.
  return cb(x + y);
}

function multiplyNums(x, y, cb) {
  // multiplyNums multiplies two numbers and passes the result to the callback.
  return cb(x * y);
}

function contains(item, list, cb) {
  // contains checks if an item is present inside of the given array/list.
  // Pass true to the callback if it is, otherwise pass false.
  return cb(list.indexOf(item) > -1);
}

/* STRETCH PROBLEM */
// Creating a duplicate item so I can test if it was removed later
items.push("Gum");

removeDuplicates(items, callback); // [ 'Pencil', 'Notebook', 'yo-yo', 'Gum' ]

function removeDuplicates(arr, cb) {
  // removeDuplicates removes all duplicate values from the given array.
  // Pass the duplicate free array to the callback function.
  // Do not mutate the original array.
  let noDupes = [];
  for (let i = 0; i < arr.length; i++) {
    if (noDupes.indexOf(arr[i]) === -1) {
      noDupes.push(arr[i]);
    }
  }
  return cb(noDupes);
}
