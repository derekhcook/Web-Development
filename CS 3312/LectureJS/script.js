/*jslint browser */

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict'; // Enforce stricter JavaScript rules.

   // Declare this function's local variables (if any) here.

   // Save the output box in a constant.
   const outputElement = document.querySelector('#output');

   // Do JavaScript things below, sending output to outputElement like this:
   outputElement.value += 'Howdy!\n';

   const createPlayer = function (args) {
      const newPlayer = {
         firstName: 'Matt',
         lastName: 'Chapman',
         unniformNumber: 26,
         position: 5,
         onBaseAverage: 0.356
      };

      Object.keys(newPlayer).forEach(function (prop) {
         if (Object.hasOwn(args, prop)) {
            newPlayer[prop] = args[prop];
         }
      });
      return Object.freeze(newPlayer);
   };

   player = createPlayer({
      lastName: 'Carpenter',
      uniformNumber: 13,
      onBaseAverage: 0.374,
      garbage: 'whatever'
   });

   

});
