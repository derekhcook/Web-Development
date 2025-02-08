/*jslint browser */

// CS 3312, spring 2024
// Studio 4
// YOUR NAME(S): Derek Cook

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Add event listener for Convert from F to C button
   document.getElementById('convert-f-to-c').addEventListener('click', function() {
       var fahrenheitInput = document.getElementById('fahrenheit').value;
       var celsiusOutput = document.getElementById('celsius');

       if (!isNaN(parseFloat(fahrenheitInput)) && isFinite(fahrenheitInput)) {
           var celsiusValue = (parseFloat(fahrenheitInput) - 32) * (5/9);
           celsiusOutput.value = celsiusValue.toFixed(3);
       } else {
           celsiusOutput.value = 'Bad input.';
       }
   });

   // Add event listener for Convert from C to F button
   document.getElementById('convert-c-to-f').addEventListener('click', function() {
       var celsiusInput = document.getElementById('celsius').value;
       var fahrenheitOutput = document.getElementById('fahrenheit');

       if (!isNaN(parseFloat(celsiusInput)) && isFinite(celsiusInput)) {
           var fahrenheitValue = (parseFloat(celsiusInput) * (9/5)) + 32;
           fahrenheitOutput.value = fahrenheitValue.toFixed(3);
       } else {
           fahrenheitOutput.value = 'Bad input.';
       }
   });

   // Add event listener for Draw the box button
   document.getElementById('draw-star-box').addEventListener('click', function() {
       var size = document.getElementById('size-of-box').value;
       var output = document.getElementById('star-box-output');

       if (!isNaN(parseInt(size)) && parseInt(size) >= 0) {
           output.value = drawBox(parseInt(size));
       } else {
           output.value = 'I need a number to draw a box.';
       }
   });

   // Function to draw a box of stars
   function drawBox(size) {
       var box = '';
       for (var i = 0; i < size; i++) {
           for (var j = 0; j < size; j++) {
               if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
                   box += '*';
               } else {
                   box += ' ';
               }
           }
           box += '\n';
       }
       return box;
   }

   // Add event listener for Hailstone it button
   document.getElementById('print-hailstone').addEventListener('click', function() {
       var startingNumber = document.getElementById('starting-number').value;
       var output = document.getElementById('hailstone-output');

       if (!isNaN(parseInt(startingNumber)) && parseInt(startingNumber) > 0) {
           output.value = printHailstoneSequence(parseInt(startingNumber));
       } else {
           output.value = 'I need a number to start with.';
       }
   });

   // Function to print hailstone sequence
   function printHailstoneSequence(startingNumber) {
       var sequence = '';
       var count = 0;
       while (startingNumber !== 1) {
           sequence += startingNumber + '\n';
           if (startingNumber % 2 === 0) {
               startingNumber /= 2;
           } else {
               startingNumber = startingNumber * 3 + 1;
           }
           count++;
       }
       sequence += '1\nLength = ' + (count + 1);
       return sequence;
   }
});

