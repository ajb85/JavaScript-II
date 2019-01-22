// A local community center is holding a fund rasising 5k fun run and has
// invited 50 small businesses to make a small donation on their behalf for
// some much needed updates to their facilities.  Each business has assigned a
// representative to attend the event along with a small donation.

// Scroll to the bottom of the list to use some advanced array methods to help the event director gather some information from the businesses.

const runners = require("./data/runners.json");

// ==== Challenge 1: Use .forEach() ====
// The event director needs both the first and last names of each runner for their running bibs.  Combine both the first and last names into a new array called fullName.
let fullName = [];
runners.forEach(runner =>
  fullName.push(`${runner.first_name} ${runner.last_name}`)
);
console.log(fullName);

// ==== Challenge 2: Use .map() ====
// The event director needs to have all the runner's first names converted to uppercase because the director BECAME DRUNK WITH POWER. Convert each first name into all caps and log the result
let allCaps = runners.map(runner => {
  // Objects are just references in memory so altering it can cause problems.
  // I create a new reference in memory and alter it so as not to cause
  // problems for myself later!
  let newRunnerRef = Object.assign({}, runner);
  newRunnerRef.first_name = newRunnerRef.first_name.toUpperCase();
  return newRunnerRef;
});
console.log(allCaps);

// ==== Challenge 3: Use .filter() ====
// The large shirts won't be available for the event due to an ordering issue.  Get a list of runners with large sized shirts so they can choose a different size. Return an array named largeShirts that contains information about the runners that have a shirt size of L and log the result
let largeShirts = runners.filter(runner => runner.shirt_size === "L");
console.log(largeShirts);

// ==== Challenge 4: Use .reduce() ====
// The donations need to be tallied up and reported for tax purposes. Add up all the donations into a ticketPriceTotal array and log the result
let ticketPriceTotal = runners.reduce(
  (sum, runner) => sum + runner.donation,
  0
);
console.log(`$${ticketPriceTotal}`); //$7043

// ==== Challenge 5: Be Creative ====
// Now that you have used .forEach(), .map(), .filter(), and .reduce().  I want
// you to think of potential problems you could solve given the data set and
// the 5k fun run theme.  Try to create and then solve 3 unique problems using
// one or many of the array methods listed above.

// Problem 1 - Big Brother would like to know the first and last name of
// each runner with a .gov email address
// Strategy - 1) Filter out all non-.gov emails.  2) Get the first+last name of
// who is left.  3) return them as an array
// Note: Good thing I created a new reference in memory earlier!!!!!!
const govEmails = runners
  .filter(runner => runner.email.indexOf(".gov") > -1)
  .map(runner => `${runner.last_name}, ${runner.first_name}`);
console.log(govEmails);

// Problem 2 - Top 3 donation generators get a prize.  Get their email so we can
// contact them!  Allow for more than 3 if there is a tie.
// Strategy: Bubble sort by Donation size and return the last three.
const sortedByDonation = bubbleSortArrayOfObjectsByNumberValue(
  runners,
  "donation"
);
// In the event of a tie for third place, more winners is allowed.
const topThree = findTopThree(sortedByDonation);
console.log(topThree.map(runner => runner.email));

function findTopThree(arr) {
  // Since I put the array in order from least to greatest, I have to start at
  // the end of the array and work my way backwards.  This function is only
  // necessary in the case where there is a tie.  Otherwise you could just
  // .slice the last three entries

  let winners = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (winners.length < 3 || arr[i].donation === arr[i + 1].donation) {
      winners.push(arr[i]);
    } else return winners;
  }
}

function bubbleSortArrayOfObjectsByNumberValue(arr, valueToSort) {
  // I can't .sort() an array of objects so this will sort by a supplied object of the array
  // assuming its a number
  let sortedArr = arr;
  // Tells the code if it should keep looping
  let cycle = true;
  // Count number of loops.  This is meant to prevent infinite loops & excessive runtimes
  let count = 1;

  // Cycle the loop until "cycle" is false
  while (cycle) {
    // "arrChanged" lets me know if the 'for' loop made any changes.  If no changes,
    // it is sorted
    let arrChanged = false;
    for (let i = 0; i < arr.length; i++) {
      // Variable shortcuts
      let num1, num2, obj1, obj2;
      if (i < arr.length - 1) {
        obj1 = sortedArr[i];
        obj2 = sortedArr[i + 1];
        num1 = obj1[valueToSort];
        num2 = obj2[valueToSort];
      }
      // If numbers are out of order, set 'arrChanged' and resort the objects
      if (num2 && num1 > num2) {
        arrChanged = true;
        sortedArr[i] = obj2;
        sortedArr[i + 1] = obj1;
      }
    }
    // If nothing was changed, the loop ends
    if (!arrChanged) {
      cycle = false;
      console.log("Cycles: ", count);
    }
    // To avoid an infinite loop or extremely
    // long runtimes, this failsafe exits the loop
    // after a certain number of tries
    if (count >= 1000) {
      cycle = false;
    }
    count++;
  }
  return sortedArr;
}

//I spent way too long on that last one so I'll have to make this
// one easier for time constraint reasons!
// Problem 3 - Find out how many people each company is sending so we know who
// are big supports are.
let companyCount = {};
runners.forEach(runner => {
  if (companyCount[runner.company_name]) {
    companyCount[runner.company_name] += 1;
  } else companyCount[runner.company_name] = 1;
});
console.log("Company Count: ", companyCount);
