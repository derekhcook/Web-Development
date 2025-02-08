/*jslint browser */

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict'; // Enforce stricter JavaScript rules.

   // Declare this function's local variables (if any) here.
   let a; // A VARIABLE TO HOLD EXAMPLE arrays.

   // Save the output box in a constant.
   const outputElement = document.querySelector('#output');

   //Create a new array using array literal notation.
   //An array can hold values of any type!
   a = ['ASU', 9, true, {prop: 'value'}, {}, 3.14];

   //go through each element of a and print it out.
   a.forEach(function (value, index) {
      outputElement.value += index + ': ' + value + '\n';
   });

   // the length property is automatically updated.
   outputElement.value += 'length' + a.length + '\n';
   outputElement.value += '---\n';

   //create a new empty array and add elements one by one.
   a = [];
   a[0] = 'ASU';
   a[1] = 9;
   a[2] = true;
   a[3] = {prop: 'value'};
   a[4] = {};
   a[5] = 3.14;
   a.forEach(function (value, index) {
      outputElement.value += index + ': ' + value + '\n';
   });
   outputElement.value += 'length' + a.length + '\n';
   outputElement.value += '---\n';
      //the inndex of the first element is 0, not 1

   //values in an array can be accessed and changed directly
   a[0] = 43;
   a.forEach(function (value, index) {
      outputElement.value += index + ': ' + value + '\n';
   });
   outputElement.value += 'length' + a.length + '\n';
   outputElement.value += '---\n';

   //you can use the push method to add an element to the end of the array.
   // the length property is automatically updated
   // Do JavaScript things below, sending output to outputElement like this:
   outputElement.value += 'Howdy!\n';

});
