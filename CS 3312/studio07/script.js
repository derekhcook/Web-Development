/*jslint browser */

// CS 3312, spring 2024
// Studio 7
// YOUR NAME(S): ___

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Do things when the "Calculate it" button is clicked.
   document.querySelector('#calculate-fibonacci').addEventListener('click', function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR fibonacci FUNCTION HERE

      (function () {
         // Get the user's number.
         const whichFibonacciNumber = parseInt(document.querySelector('#fibonacci-input').value, 10);
         // Use the fibonacci function to calculate the output.
         document.querySelector('#which-fibonacci-number').textContent = whichFibonacciNumber;
         document.querySelector('#fibonacci-number').textContent = fibonacci(whichFibonacciNumber);
      }());
   });

   (function () {

      // WRITE CODE HERE TO MAKE THE #dice ELEMENT WORK

   }());

   (function () {
      let cardValues; // An array to store the card values.

      // WRITE CODE HERE TO MAKE THE #cards ELEMENT WORK

   }());

   (function () {
      let nextToMove; // Tells which player moves next, 'X' or 'O'.
      let ticTacToeElements; // The two-dimensional array of elements in the page.
      let ticTacToeValues; // The two-dimensional array of strings: 'X', 'O' or ''.

      // WRITE CODE HERE TO MAKE THE #tic-tac-toe ELEMENT WORK

   }());

});
