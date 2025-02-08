/*jslint browser */

// CS 3312, spring 2024
// Examples for Studio 7

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Do things when the user clicks the "Experiment with arrays" button.
   document.querySelector('#run-experiments').addEventListener('click', function () {
      let array; // A variable to hold example arrays.
      let outputString; // The string built for output.

      outputString = '';

      // A function to print the contents of an array.
      const getArrayInfoString = function (a) {
         let infoString; // The string to build and return.
         infoString = ''; // Start with an empty string.

         // Use the forEach method to go through all the elements in an array.
         a.forEach(function (value, index) {
            // Inside this little function, value is the value of the current element
            // and index is its index, starting at 0.
            infoString += index + ': ' + value + '\n';
         });
         infoString += 'length = ' + a.length + '\n';
         infoString += '---\n';
         return infoString;
      };

      // Create a new array using array literal notation.
      array = [3, 'howdy', true, {prop: 'value'}, 3.14];
      // Most often, an array's values are all of the same type, but an
      // array can hold values of any type.
      outputString += getArrayInfoString(array);

      // Create a new empty array and add elements one by one.
      array = [];
      array[0] = 3; // The index of the first element is 0, not 1.
      array[1] = 'howdy';
      array[2] = true;
      array[3] = {prop: 'value'};
      array[4] = 3.14;
      outputString += getArrayInfoString(array);

      // Values in an array can be accessed and changed directly.
      array[0] = 43;
      outputString += getArrayInfoString(array);

      // Use the push method to add an element to the end of an array.
      array.push(76);
      outputString += getArrayInfoString(array);

      // Use the pop method to take an element off the end of an array.
      const poppedValue = array.pop();
      outputString += 'value popped off: ' + poppedValue + '\n';
      outputString += getArrayInfoString(array);
      // The push and pop methods let you use an array like a stack.

      // Use the shift method to take an element off the beginning of an array.
      const shiftedValue = array.shift();
      outputString += 'value shifted off: ' + shiftedValue + '\n';
      outputString += getArrayInfoString(array);
      // The push and shift methods let you use an array like a queue.

      // A string's split method can be used to create an array of strings.
      const inputString = 'this is a sentence of words';
      array = inputString.split(' '); // Separate by space characters.
      outputString += getArrayInfoString(array);

      // The join method can create a string out of an array's elements.
      outputString += array.join(' / ') + '\n';
      outputString += array.join() + '\n'; // A comma is used by default.
      outputString += array.join('') + '\n';
      outputString += '---\n';

      // The slice method returns a subarray of an array.
      array = array.slice(1, 5); // Start at index 1 and end before index 5.
      outputString += getArrayInfoString(array);

      // You can use spread syntax to create a new bigger array out of smaller ones.
      const newElements = [12, 34, 56];
      array = [...array, ...newElements];
      // The spread operator (...) expands an array into its elements.
      outputString += getArrayInfoString(array);

      // Using slice and spread together can help you delete elements from an array.
      array = [
         ...array.slice(0, 3), // elements 0, 1 and 2
         ...array.slice(4)     // elements 4, 5 and 6
      ];
      // Now the array is the same as before but with element 3 deleted.
      outputString += getArrayInfoString(array);

      // You can also use spread syntax to add an element to the end of an array.
      array = [...array, 78];
      outputString += getArrayInfoString(array);

      // You can also use slice and spread together to add elements inside an array.
      array = [
         ...array.slice(0, 3), // elements 0, 1 and 2
         'howdy',
         ...array.slice(3)     // elements 3, 4, 5 and 6
      ];
      outputString += getArrayInfoString(array);

      // Create a new array of numbers.
      array = [43, 98, 9, 3, 76, 12];
      outputString += 'before reversing:\n';
      outputString += getArrayInfoString(array);

      // The reverse method reverses the entire array in place.
      // It's best to make a copy of the array, reverse the copy and then save it.
      array = [...array].reverse();
      // The [...] notation makes a copy of an array, leaving the original alone.
      outputString += 'after reversing:\n';
      outputString += getArrayInfoString(array);

      // By default, the sort method assumes all elements are strings.
      array = [...array].sort();
      outputString += 'after default sort:\n';
      outputString += getArrayInfoString(array);

      // Give the sort method a compare function to sort numerically.
      array = [...array].sort(
         // Whether the return value is positive or negative tells whether
         // two elements should be swapped.
         function (a, b) {
            return a - b; // Returns a positive value if two elements are out of order.
         }
      );
      outputString += 'after numerical sort:\n';
      outputString += getArrayInfoString(array);

      // A while loop can be used to initialize an array to have a particular size.
      // Make a new empty array.
      array = [];
      // While it still has fewer elements than you want, . . .
      while (array.length < 10) {
         // . . . add another element to it.
         array.push(0);
      }
      // Now the array is full of 10 zeros.
      outputString += getArrayInfoString(array);

      // But a better way to initialize an array is to use the Array.from function.
      array = Array.from(
         {length: 10}, // The length of the array you want.
         function () { // A function that returns the value of each element.
            return 0;
         }
      );
      // Now the array is full of 10 zeros.
      outputString += getArrayInfoString(array);

      // To create a multidimensional array, use an array of arrays.
      array = [
         ['X', 'X', 'O'],
         ['O', 'O', 'X'],
         ['X', 'O', 'X']
      ];
      outputString += getArrayInfoString(array);

      // Since each element is an array, you can use nested forEach loops.
      array.forEach(function (row, whichRow) {
         row.forEach(function (cell, whichColumn) {
            outputString += (
               'row ' + whichRow
               + ', column ' + whichColumn
               + ': ' + cell + '\n'
            );
         });
      });
      outputString += '---\n';

      // Another way to format that output:
      array.forEach(function (row, whichRow) {
         outputString += 'row ' + whichRow + ':\n';
         row.forEach(function (cell, whichColumn) {
            outputString += '   column ' + whichColumn + ': ' + cell + '\n';
         });
      });
      outputString += '---\n';

      // You can also initialize multiple dimensions using the Array.from function.
      array = Array.from(
         {length: 5}, // The number of rows you want.
         function () { // A function that returns each row.
            return Array.from(
               {length: 5}, // The number of elements you want in each row.
               function () { // A function that returns the value of each element.
                  return 0;
               }
            );
         }
      );
      // Then the 5x5 array is full of zeros.
      outputString += getArrayInfoString(array);

      // Let's see all that output.
      document.querySelector('#experiment-output').value = outputString;

   });

   // Do things when the "Calculate its factorial" button is clicked.
   document.querySelector('#calculate-factorial').addEventListener('click', function () {

      // Use an IIFE to create a memoized factorial function that saves results in an array as it finds them.
      const factorial = (function () {

         // Initialize the array so that factorial(0) is 1.
         const factorialResults = [1];

         // A function has access to variables in the function in which it is created.
         return function f(n) {
            // n needs to be a nonnegative integer to calculate a factorial.
            if (Number.isInteger(n) && n >= 0) {
               // If the result has never been calculated before, . . .
               if (!Object.hasOwn(factorialResults, n)) {
                  // . . . calculate the new result recursively and save it in the array.
                  factorialResults[n] = n * f(n - 1);
               }
               // Either way, return the saved result.
               return factorialResults[n];
            }
            // If the input was bad, return the value undefined.
            return undefined;
         };
      }());

      // Get the user's number.
      const inputNumber = parseInt(document.querySelector('#factorial-input').value, 10);
      // Use the factorial function to calculate the output.
      const outputNumber = factorial(inputNumber);
      if (Number.isFinite(outputNumber)) {
         document.querySelector('#factorial-output').value += inputNumber.toString() + '! = ' + outputNumber.toString() + '\n';
      } else {
         document.querySelector('#factorial-output').value += 'I need a nonnegative integer (not too big!).\n';
      }
   });

   (function () {

      // Get an array of all div elements inside the #dice element.
      const dieElements = [...document.querySelectorAll('#dice div')];
      // The [...] notation turns what is technically not an array (it's
      // actually a NodeList) into a real JavaScript array we can use more
      // easily.

      // Go through each of those div elements one by one.
      dieElements.forEach(function (dieElement, whichDie) {
         // Inside this function, dieElement is the current element and whichDie is its index.

         // Set the value of the current die when the page loads.
         dieElement.textContent = whichDie + 1;

         // Create an event handler that rerolls the die randomly whenever it is clicked.
         dieElement.addEventListener('click', function () {
            dieElement.textContent = Math.floor(Math.random() * 6) + 1;
         });
      });
   }());

   (function () {
      let numberBuilt; // The number built by the user's clicking on digits.

      // Get an array of all div elements inside the #numerical-input element.
      const digitElements = [...document.querySelectorAll('#numerical-input div')];

      // Starting at 0 will allow the user to build any nonnegative integer.
      numberBuilt = 0;

      // Go through each of those div elements one by one.
      digitElements.forEach(function (digitElement, whichDigit) {
         // Inside this function, digitElement is the current element and whichDigit is its index.

         // Set the value of the current digit when the page loads.
         digitElement.textContent = whichDigit;

         // Create an event handler that adds the digit to the end whenever it is clicked.
         digitElement.addEventListener('click', function () {
            numberBuilt *= 10; // Make room for the new digit.
            numberBuilt += whichDigit; // Add the new digit to the end of the number.
            document.querySelector('#numerical-output').textContent = (
               numberBuilt.toString() + ' base 10 = '
               + numberBuilt.toString(2) + ' base 2'
            );
         });
      });
   }());

   (function () {
      let matrixElements; // The two-dimensional array of elements in the page.
      let matrixValues; // The two-dimensional array of values to output to the page.
      matrixElements = [];
      matrixValues = [];

      // Get an array of all the tr elements in the matrix and iterate through them.
      [...document.querySelectorAll('#lights tr')].forEach(function (row) {

         // Get an array of all the td elements in the current row.
         const rowElements = [...row.querySelectorAll('td')];

         // Build an array of 0 values the same size as the current row.
         const rowValues = Array.from(
            {length: rowElements.length},
            function () {
               return 0;
            }
         );

         // Build the arrays of elements and values row by row.
         matrixElements = [...matrixElements, rowElements];
         matrixValues = [...matrixValues, rowValues];
      });

      // Go through each td element in the matrix, row by row.
      matrixElements.forEach(function (row, whichRow) {
         row.forEach(function (element, whichColumn) {
            // Inside this function, we have a td element and we know which row and which column it's in.

            // Output the initial value to the element.
            element.textContent = matrixValues[whichRow][whichColumn];

            // Create an event handler for the current element.
            element.addEventListener('keydown', function () {
               // Flip the element's green light on or off.
               element.classList.toggle('on');
               // Add 1 to the value of the element.
               matrixValues[whichRow][whichColumn] += 1;
               // Output the new value to the element.
               element.textContent = matrixValues[whichRow][whichColumn];
            });
         });
      });
   }());

});
