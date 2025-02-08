/*jslint browser */

// CS 3312, spring 2024
// Examples for Studio 5

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Create an anonymous function and call it immediately.
   // This is called an immediately invoked function expression (IIFE).
   // It's a handy way to create a scope that hides variables from the rest of the code.
   // Each little web app can be hidden from the others using an IIFE.
   (function () {

      // In JavaScript, a function is just a value and can be assigned to a variable.
      const rollDie = function (numSides) {
         // Use a default number if numSides is not a valid number of sides.
         if (!Number.isInteger(numSides) || numSides < 2) {
            numSides = 6;
         }
         // Return a random integer between 1 and numSides.
         return Math.floor(Math.random() * numSides) + 1;
      };

      // Do things when the user clicks the "Roll the die" button.
      document.querySelector('#roll-die').addEventListener('click', function () {
         // Grab the user's input as an integer.
         const numberOfSides = parseInt(document.querySelector('#number-of-sides').value, 10);
         // Call the rollDie function to get the result and output it.
         document.querySelector('#die-output').textContent = rollDie(numberOfSides).toString();
      });
   }());

   document.querySelector('#calculate-factorial').addEventListener('click', function () {

      const inputNumber = parseInt(document.querySelector('#factorial-input').value, 10);
      // If the input is not a nonnegative integer . . .
      if (!Number.isInteger(inputNumber) || inputNumber < 0) {
         // . . . output an error message . . .
         document.querySelector('#factorial-output').value += 'I need a nonnegative integer.\n';
         // . . . and return immediately from this event handler function.
         return;
      }

      // Calculate a factorial using iteration.
      const factorialIt = function (num) {
         let factor; // The next factor to multiply into the result.
         let result; // Holds the result of the multiplications.
         if (!Number.isInteger(num) || num <= 1) {
            return 1;
         }
         result = 1;
         // Multiply together all the integers between 1 and num.
         for (factor = 1; factor <= num; factor += 1) {
            result *= factor;
         }
         return result;
      };
      const outputNumber = factorialIt(inputNumber);

      // Calculate a factorial using recursion.
      const factorialRec = function factorial(num) {
         if (!Number.isInteger(num) || num <= 1) {
            return 1;
         }
         // Use the factorial of a smaller number to calculate the current factorial.
         return num * factorial(num - 1);
      };
      // Make sure both results agree.
      if (factorialRec(inputNumber) === outputNumber) {
         document.querySelector('#factorial-output').value += inputNumber.toString() + '! = ' + outputNumber.toString() + '\n';
      } else {
         document.querySelector('#factorial-output').value += 'Uh oh--the functions disagree!\n';
      }
   });

   (function () {

      // Recursively construct the ROT13ed version of a plaintext string.
      const rot13 = function rot13(plaintext) {
         let charCode; // The integer character code for the first character.
         // If it's not a string or has no characters, just return the empty string.
         if (typeof plaintext !== 'string' || plaintext.length === 0) {
            return '';
         }
         // Get the character code for the first character (example: 'A' gives 65).
         charCode = plaintext.charCodeAt(0);
         // If it's an uppercase letter, ROT13 it.
         if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
            // Add 13 if the alphabet has room; subtract 13 otherwise.
            if (charCode + 13 <= 'Z'.charCodeAt(0)) {
               charCode += 13;
            } else {
               charCode -= 13;
            }
         }
         // If it's not an uppercase letter, leave it alone.
         // Return the ROT13ed first character concatenated to the ROT13ed rest of the string.
         return String.fromCharCode(charCode) + rot13(plaintext.slice(1));
      };

      // Do things when the user clicks the "Encipher it with ROT13!" button.
      document.querySelector('#encipher').addEventListener('click', function () {
         // Get the input message changed to all uppercase.
         const oldMessage = document.querySelector('#cipher-message').value.toUpperCase();
         // Encipher it with ROT13.
         const newMessage = rot13(oldMessage);
         // Output the enciphered message.
         document.querySelector('#cipher-message').value = newMessage;
      });
   }());

   (function () {
      let blue;  // The current blue level of the "somber colors" square's color.
      let green; // The current green level of the "somber colors" square's color.
      let red;   // The current red level of the "somber colors" square's color.

      const updateSquare = function (r, g, b) {
         // Use RGB levels to update the square's background color.
         somberColorsElement.style.backgroundColor = (
            'rgb(' + r.toString() + ', '
            + g.toString() + ', '
            + b.toString() + ')'
         );
      };

      const somberColorsElement = document.querySelector('#somber-colors');

      // Make the initial color completely random.
      red = Math.floor(Math.random() * 256);
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);
      updateSquare(red, green, blue);

      // Do things when the user moves the mouse inside the "somber colors" square.
      somberColorsElement.addEventListener('mousemove', function () {
         // Randomly and slightly adjust red, green and blue.
         // The higher the current value, the more likely it will go down.
         if (Math.random() * 255 < red) {
            red -= 1;
         } else {
            red += 1;
         }
         if (Math.random() * 255 < green) {
            green -= 1;
         } else {
            green += 1;
         }
         if (Math.random() * 255 < blue) {
            blue -= 1;
         } else {
            blue += 1;
         }
         // Use the updated RGB levels to update the square's background color.
         updateSquare(red, green, blue);
      });
   }());

   (function () {

      const randomizeColor = function () {
         // Randomize the square's background color.
         const red = Math.floor(Math.random() * 256);
         const green = Math.floor(Math.random() * 256);
         const blue = Math.floor(Math.random() * 256);
         crazyColorsElement.style.backgroundColor = (
            'rgb(' + red.toString() + ', '
            + green.toString() + ', '
            + blue.toString() + ')'
         );
      };

      const crazyColorsElement = document.querySelector('#crazy-colors');

      // Randomize the initial color.
      randomizeColor();

      // When the square is clicked down, make it so that moving the mouse anywhere changes the color.
      crazyColorsElement.addEventListener('mousedown', function () {
         document.addEventListener('mousemove', randomizeColor);
      });

      // When the mouse is released, make it so that moving the mouse does nothing again.
      document.addEventListener('mouseup', function () {
         document.removeEventListener('mousemove', randomizeColor);
      });
   }());

   (function () {
      // Use an IIFE to create a function.
      // The savedMessage variable becomes a private variable.
      // It can be accessed inside of rememberMessage but not outside of it.
      const rememberMessage = (function () {
         let savedMessage; // The message most recently saved by rememberMessage.
         savedMessage = 'No message saved yet.';
         // The following function gets returned and saved in the rememberMessage variable.
         return function (message) {
            if (typeof message === 'string') {
               savedMessage = message;
            }
            return savedMessage;
         };
      }());

      // Remember the user's message when the "Save message" button is clicked.
      document.querySelector('#set-message').addEventListener('click', function () {
         rememberMessage(document.querySelector('#message-to-remember').value);
         document.querySelector('#message-to-remember').value = '';
      });

      // Recall the user's message when the "Get remembered message" button is clicked.
      document.querySelector('#get-message').addEventListener('click', function () {
         document.querySelector('#message-to-remember').value = rememberMessage();
      });
   }());

   (function () {
      // Use an IIFE to create a function with a private variable.
      const rememberLargestNumber = (function () {
         let largestNum; // The largest number ever given to rememberLargestNumber.
         largestNum = Number.NEGATIVE_INFINITY; // Any number's larger than this one.
         return function (num) {
            if (Number.isFinite(num) && num > largestNum) {
               largestNum = num;
            }
            return largestNum;
         };
      }());

      // Do things when the number-input element changes value at all.
      document.querySelector('#number-input').addEventListener('input', function () {
         const newestNumber = parseFloat(document.querySelector('#number-input').value);
         const largestNumber = rememberLargestNumber(newestNumber);
         document.querySelector('#largest-number').textContent = largestNumber.toString();
      });
   }());

});
