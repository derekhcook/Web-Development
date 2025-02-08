/*jslint browser */

// CS 3312, spring 2024
// Studio 6
// YOUR NAME(S): ___

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   (function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR createToDoList FUNCTION HERE
	  const createToDoList = function () {
		  const priv = {
			  toDoList: {}
		  };

         // The self object can hold all public data and code.
         const self = {
			 addItem: function(item) {
				 priv.toDoList[item.toLowerCase()] = item.toString();
			 },
			 removeItem: function(item) {
				 delete priv.toDoList[item.toLowerCase()];
			 },
			 toString: function() {
				 let toDoListString = '';
             for(const i in priv.toDoList){
               toDoListString += priv.toDoList[i] + '\n';
             }
             return toDoListString;
			 }
		 };
		 
		 return Object.freeze(self);
	  };

      (function () {

         // Create a new object that keeps track of a to-do list.
         const toDoList = createToDoList();

         document.querySelector('#add-to-do-list-item').addEventListener('click', function () {
            // Add a new to-do list item and output the new to-do list.
            toDoList.addItem(document.querySelector('#to-do-list-item-to-add').value);
            document.querySelector('#to-do-list-output').value = toDoList.toString();
         });

         document.querySelector('#remove-to-do-list-item').addEventListener('click', function () {
            // Remove a to-do list item and output the new to-do list.
            toDoList.removeItem(document.querySelector('#to-do-list-item-to-remove').value);
            document.querySelector('#to-do-list-output').value = toDoList.toString();
         });
      }());
   }());

   (function() {
      // Do not declare any other variables here, but you may declare variables inside your function.
    
      // WRITE YOUR findUniqueLetters FUNCTION HERE
      const findUniqueLetters = function(inputString) {
        //make input string uppercase
        inputString = inputString.toUpperCase();
    
        //create unique letters
        const uniqueLetters = {};
    
        //add each letter of inputString to uniqueLetters as true
        [...inputString].forEach(function(charVal) {
          //make sure it is a letter
          if (/^[A-Z]$/.test(charVal)) {
            // add char with value of true to uniqueLetters
            if (!uniqueLetters.hasOwnProperty(charVal)) {
              uniqueLetters[charVal] = true;
            }
          }
        });
    
        //create result string
        let result = '';
    
        // store the uniqueLetters in result
        for (let letter in uniqueLetters) {
          //make sure it is a letter
          if (/^[A-Z]$/.test(letter)) {
            result += letter;
          }
        }
    
        // return result
        return result;
      };
    
      document.querySelector('#find-unique-letters').addEventListener('click', function() {
        // Filter the characters in the textbox, leaving only the first of each letter found.
        const wordElement = document.querySelector('#unique-letters-word');
        wordElement.value = findUniqueLetters(wordElement.value);
      });
   }());

   (function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR createCodeBook FUNCTION HERE

      (function () {
         let codebook;

         // Create a new object that keeps track of a codebook.
         codebook = createCodeBook();

         document.querySelector('#save-codeword').addEventListener('click', function () {
            // Add a new codeword/meaning pair to the codebook.
            codebook.add(
               document.querySelector('#codeword-input').value,
               document.querySelector('#meaning-input').value
            );
         });

         document.querySelector('#get-meaning').addEventListener('click', function () {
            // Output a codeword's meaning.
            document.querySelector('#codebook-output').value = codebook.retrieve(
               document.querySelector('#codeword-input').value
            );
         });

         document.querySelector('#print-codebook').addEventListener('click', function () {
            // Output all codeword/meaning pairs already in the codebook.
            document.querySelector('#codebook-output').value = codebook;
            // The codebook's toString method is automatically called.
         });

         document.querySelector('#clear-codebook').addEventListener('click', function () {
            // Create a new, empty codebook object.
            codebook = createCodeBook();
            // Empty the output textbox.
            document.querySelector('#codebook-output').value = '';
         });
      }());
   }());

});
