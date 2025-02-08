/*jslint browser */

// All the code below will be run once the page content finishes loading

document.addEventListener('DOMContentLoaded', function () {
   'use strict'; //Makes browser enforce strict Java script rules

   // Declare this functions local variables
   let helloElement;

   // Find a particular element and save it in a variable.
   helloElement = document.querySelector('#hello');

   // Make things happen when a user clicks on the paragraph
   helloElement.addEventListener('click', function () {
      //switch the green effect on or off
      helloElement.classList.toggle('green');
   });

});