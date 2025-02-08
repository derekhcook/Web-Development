/*jslint browser */

// CS 3312, spring 2024
// Studio 8
// YOUR NAME(S): Trey Fleming, Derek Cook

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   (function () {

      // WRITE YOUR createTextKeeper FUNCTION HERE
      //Create Text Keeper
		 function createTextKeeper(oldState) {    //Create a fatory function named createTextKeeper
			let state;     //Declare the state variable using let
			 
			state = {      //create a new state object and give it
				numChangesMade: 0,      //a num changes property with a value of 0
				savedText: ''           //and a saved text property with a value of ''
			};
			
			if (typeof oldState === 'string') { //If oldstate is a string
            try {                            //try to parse as a JSON
				state = JSON.parse(oldState);
            } catch (ignore) {
				}
			}
			
			const self = {    //Create a self object with four methods
				getNumChangesMade: function() {
               return state.numChangesMade;
            },   //getNumChangesMade function should return the number of changes made
				getSavedText: function() {
               return state.savedText;
            },   //getSavedText should return a the saved text
				getState: function() {
               return JSON.stringify(state);
            },   //getState should return a JSON string desribing the state object
				saveNewText: function(newText) {
               state.savedText = newText;
               state.numChangesMade++;
            }   //saveNewText should have a parameter named newText, should save newText as the saved text and add 1 to the number of changes made
			};
         return Object.freeze(self);  //Return self frozen
		 }

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let textKeeper; // Do not declare more variables here.

         // Constants defined for your convenience.
         const webStorageKey = 'CS 3312 Studio 8 sticky text';
         const textInputElement = document.querySelector('#text-input');
         const textChangesMadeElement = document.querySelector('#text-changes-made');

		 // WRITE YOUR updateTextKeeper FUNCTION HERE
       function updateTextKeeper(textKeeper, webStorageKey) {    //Create a function named updateTextKeeper
         const textInput = document.querySelector('#text-input');    //variable to allow changes to text-input
         const textChangesMade = document.querySelector('#text-changes-made'); //variable to allow changes to text-changes-made

         textInput.addEventListener('input', function() {
            textKeeper.saveNewText(textInput.value); //Update the text with textInput value
            localStorage.setItem(webStorageKey, textKeeper.getState()); //Save to web storage
            updateView(); //Updates the view
         }); //Create an event handler so that ehen text-input is changed at all, the new text is saved in textKeeper

         function updateView() {
            textInput.value = textKeeper.getSavedText(); //Updates textInput with textKeeper
            textChangesMade.textContent = textKeeper.getNumChangesMade(); //Updates NumChangesMade with textKeeper
         };
      };

         // WRITE CODE FOR THE CONTROLLER HERE
         document.querySelector('#text-input').addEventListener('input', function () {
            // Update the model.
            const textToInput = document.querySelector('#text-input').value;
            textKeeper.numChangesMade += 1;
            // Update everything else based on the new model state.
            updateTextKeeper(textKeeper, webStorageKey);
         });

         // WRITE CODE TO GET THINGS STARTED HERE
         textKeeper = createTextKeeper(localStorage.getItem(webStorageKey));
         updateTextKeeper(textKeeper, webStorageKey);
         document.querySelector('#text-input').value = textKeeper.getSavedText();
         document.querySelector('#text-changes-made').textContent = textKeeper.getNumChangesMade();

      }());
   }());

   (function () {

      // WRITE YOUR createCounter FUNCTION HERE
      const createCounter = function (oldState) {

         //declare a state variable using let
         let state;

         // The state is an object that keeps track of all the data.
         state = {
            count: 1
         };

         if (typeof oldState === 'string') { //If oldstate is a string
            try {                            //try to parse as a JSON
				state = JSON.parse(oldState);
            } catch (ignore) {
				}
			}

         // The self object contains public methods.
         const self = {
            getCount: function () {
               return state.count;
            },
            getState: function() {
               return JSON.stringify(state);
            },
            increment: function (num) {
               state.count += num;
            }
         };
         // return the frozen self object
         return Object.freeze(self);
      };

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let cardCounter; // Do not declare more variables here.

         // Constants defined for your convenience.
         const webStorageKey = 'CS 3312 Studio 8 card clicker';
         const cardsElement = document.querySelector('#cards');
         const resetCardsElement = document.querySelector('#reset-cards');

         // WRITE YOUR updateCards FUNCTION HERE
         const updateCards = function (cardCounter, webStorageKey) {
            // Save the model state in an item in web storage using webStorageKey
            localStorage.setItem(webStorageKey, cardCounter.getState());
            // Update the view
            const cardsElement = document.querySelector('#cards');
            // Clear the current cards
            cardsElement.innerHTML = '';
            // Create new div elements numbered from 1 up to the current count
            for (let i = 1; i <= cardCounter.getCount(); i++) {
               const newCardDiv = document.createElement('div');
               newCardDiv.textContent = i;
               // Add click handler to each card
               newCardDiv.addEventListener('click', function () {
                   // Add the number of the clicked card to the count
                   cardCounter.increment(i);
                   // Update the view
                   updateCards(cardCounter, webStorageKey);
               });
               cardsElement.appendChild(newCardDiv);
            }
         };
         // WRITE CODE FOR THE CONTROLLER HERE
         // Create an event handler for the reset cards button
         resetCardsElement.addEventListener('click', function () {
            // Create new cardCounter object
            const cardCounter = createCounter();
            // update controller view
            updateCards(cardCounter, webStorageKey);
         });

         // WRITE CODE TO GET THINGS STARTED HERE
         document.addEventListener('DOMContentLoaded', function () {
            //save objects to the cardCounter variable
            const savedState = localStorage.getItem(webStorageKey);
            const cardCounter = createCounter(savedState);
            //call updateCards to save model and update the view and controller
            updateCards(cardCounter, webStorageKey);
         });

      }());
   }());

});
