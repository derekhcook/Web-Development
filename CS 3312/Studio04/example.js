/*jslint browser */

// CS 3312, spring 2024
// Optional examples for Studio 4 using a more functional programming style

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {

   'use strict'; // Enforce stricter JavaScript rules.

   // Do things when the user clicks the "Write a poem" button.
   document.querySelector('#write-poem').addEventListener('click', function () {

      // Empty the output elements.
      document.querySelector('#poem-output').value = '';
      document.querySelector('#poem-error').textContent = '';

      // Get all three input strings.
      const noun = document.querySelector('#noun-input').value;
      const verb = document.querySelector('#verb-input').value.toLowerCase();
      const adjective = document.querySelector('#adjective-input').value.toLowerCase();
      // You can declare variables with const or let.
      // It's best to use const if the value will never change.

      // Check the lengths of the three input strings.
      if (noun.length > 0 && verb.length > 0 && adjective.length > 0) {
         // If we got three words, build a poem from scratch out of them.
         // Use + to concatenate strings together.
         const poemString = (
            noun + ' ' + verb + '\n' // \n gives a newline character.
            + adjective + ' ' + noun + ' ' + verb + '\n'
            + adjective + ' ' + noun + ' ' + verb + ' ' + noun + '\n'
            + adjective + ' ' + noun + ' ' + verb + ' ' + adjective + ' ' + noun + '\n'
            + verb + ' ' + noun + ' ' + verb.toUpperCase()
         );
         // Output the poem we built.
         document.querySelector('#poem-output').value = poemString;
      } else {
         // If any of the textboxes was empty, ask for more input.
         document.querySelector('#poem-error').textContent = 'Give me all three words if you want a poem!';
      }
   });

   // Do things when the user clicks the "Roll the dice" button.
   document.querySelector('#roll-dice').addEventListener('click', function () {
      // Declare this function's local variables.
      // You have to use let instead of const to allow a variable to change its value.

      // Empty the output elements.
      document.querySelector('#dice-output').textContent = '';
      document.querySelector('#dice-error').textContent = '';

      // Use the parseInt function to convert the input to a base-10 integer.
      const numberOfDice = parseInt(document.querySelector('#number-of-dice').value, 10);

      // Make sure the input number is a real number between 1 and 10.
      if (Number.isFinite(numberOfDice) && numberOfDice >= 1 && numberOfDice <= 10) {
         // Create a new array full of the correct number of random dice rolls.
         const diceRolls = Array.from(
            {length: numberOfDice},
            // Generate one random number between 1 and 6.
            () => Math.floor(Math.random() * 6) + 1
         );
         // Compute the total of all dice rolled from the array.
         const diceTotal = diceRolls.reduce(
            // Update the dice total using the next value in the array.
            (totalSoFar, nextDieRoll) => totalSoFar + nextDieRoll,
            // Start the total at 0.
            0
         );
         // Create a string to describe the result of the dice rolls.
         const diceString = diceRolls.map(
            // Update the output string using the next value in the array.
            (dieRoll) => dieRoll.toString()
         ).join(' + ') + (
            // For multiple dice, use the dice total to finish the output string.
            numberOfDice > 1
            ? ' = ' + diceTotal.toString()
            : ''
         );
         // Output the result of the dice rolls.
         document.querySelector('#dice-output').textContent = diceString;
      } else {
         // Ask for an acceptable number of dice.
         document.querySelector('#dice-error').textContent = 'I need a number of dice between 1 and 10.';
      }
   });

   // Do things when the user clicks the "Print those powers" button.
   document.querySelector('#show-powers').addEventListener('click', function () {

      // You can change these values to get different lists of powers.
      const base = 3;
      const limit = 1000000000;

      // Create an array full of powers.
      const powerSequence = (function powerSequenceStartingWith(startNum) {
         return (
            (!Number.isFinite(startNum) || startNum <= 0 || startNum >= limit)
            ? []
            // Keep on going if still under the limit.
            : [
               startNum,
               ...powerSequenceStartingWith(
                  startNum * base
               )
            ]
         );
      }(1)); // Start at 1, the zeroth power of anything.

      // Format the output from the array of powers.
      document.querySelector('#powers-output').value = powerSequence.map(
         (nextNumber, whichPower) => (
            base.toString() + '^'
            + whichPower.toString() + ' = '
            + nextNumber.toString()
         )
      ).join('\n');
   });

   // Do things when the user clicks the "Draw a random map" button.
   document.querySelector('#draw-random-map').addEventListener('click', function () {

      // Use the parseInt function to convert the input to a base-10 integer.
      const sizeOfMap = parseInt(document.querySelector('#size-of-map').value, 10);

      const mapString = (
         // Make sure the input number is a real positive number.
         (Number.isFinite(sizeOfMap) && sizeOfMap > 0)
         // Go through each row and column and build mapString from scratch.
         ? Array.from(
            // Create the rows.
            {length: sizeOfMap},
            () => Array.from(
               // Create the columns.
               {length: sizeOfMap},
               () => (
                  // Math.random() will give a random real number between 0 and 1.
                  Math.random() < 0.4
                  // 40% of the time, draw a mountain.
                  ? '^'
                  // 60% of the time, draw a flat plain.
                  : '-'
               )
            ).join('')
         ).join('\n')
         : 'I need a positive number to draw a map.'
      );

      // Output the beautiful result.
      document.querySelector('#random-map-output').value = mapString;
   });

   // Create a function and call it immediately.
   // This is a handy way to hide variables from the rest of the code.
   (function () {
      let goalNumber;  // The number the user is trying to make.
      let numberSoFar; // The number the user currently has.

      do {
         // Generate a random integer between 23 and 99 . . .
         goalNumber = Math.floor(Math.random() * 77) + 23;
      } while (goalNumber % 5 === 0);
      // . . . but make sure it's not a multiple of 5, because those are unsolvable.

      // Set up the math game for the player.
      document.querySelector('#goal-number').textContent = goalNumber.toString();
      numberSoFar = 1;
      document.querySelector('#number-so-far').textContent = numberSoFar.toString();
      document.querySelector('#math-game-message').textContent = 'Good luck!';

      // Allow the player to multiply the current number by 3.
      document.querySelector('#mult-3').addEventListener('click', function () {
         // Update the player's number.
         numberSoFar *= 3;
         // Output the new number and the game status.
         document.querySelector('#number-so-far').textContent = numberSoFar.toString();
         document.querySelector('#math-game-message').textContent = (
            numberSoFar === goalNumber
            ? 'You win!'
            : numberSoFar > goalNumber
            ? 'Too high.  Try restarting.'
            : 'Keep going . . .'
         );
      });

      // Allow the player to add 5 to the current number.
      document.querySelector('#add-5').addEventListener('click', function () {
         // Update the player's number.
         numberSoFar += 5;
         // Output the new number and the game status.
         document.querySelector('#number-so-far').textContent = numberSoFar.toString();
         document.querySelector('#math-game-message').textContent = (
            numberSoFar === goalNumber
            ? 'You win!'
            : numberSoFar > goalNumber
            ? 'Too high.  Try restarting.'
            : 'Keep going . . .'
         );
      });

      // Allow the player to restart the math game.
      document.querySelector('#restart-math-game').addEventListener('click', function () {
         do {
            // Generate a new random starting number.
            goalNumber = Math.floor(Math.random() * 77) + 23;
         } while (goalNumber % 5 === 0);
         document.querySelector('#goal-number').textContent = goalNumber.toString();
         numberSoFar = 1;
         document.querySelector('#number-so-far').textContent = numberSoFar.toString();
         document.querySelector('#math-game-message').textContent = 'Good luck!';
      });
   }());
});
