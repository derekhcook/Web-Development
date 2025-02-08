/*jslint browser */

// CS 3312, spring 2024
// Examples for Studio 8

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   const clickCounterWebStorageKey = 'CS 3312 Studio 8 click counter';
   const colorQuizWebStorageKey = 'CS 3312 Studio 8 color quiz';
   const toDoListWebStorageKey = 'CS 3312 Studio 8 to-do list';

   // Here's a very simple example of a model/view/controller design.
   (function () {

      // Create a factory that makes a simple counter object.
      const createCounter = function () {

         // The state is an object that keeps track of all the data.
         const state = {
            count: 0
         };

         // The self object contains public methods.
         const self = {
            getCount: function () {
               return state.count;
            },
            increment: function () {
               state.count += 1;
            }
         };
         // Normally it's best to freeze the self object to keep it from being modified later.
         return Object.freeze(self);
      };

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let clickCounter; // Used to keep track of the model.

         // Create a function that updates everything that needs updating whenever the model changes.
         const updateClickCounter = function () {

            // If we needed to save the new model state in web storage, we would do it here.

            // Update the view.
            document.querySelector('#unsaved-click-count').textContent = clickCounter.getCount();

            // If we needed to update the controller, we would do it here.
         };

         // Create a click handler for the entire document.
         document.addEventListener('click', function () {
            // Update the model.
            clickCounter.increment();
            // Update everything else based on the new model state.
            updateClickCounter();
         });

         // Create a fresh new model.
         clickCounter = createCounter();
         // Update everything else based on the new model state.
         updateClickCounter();
      }());
   }());

   // This MVC design is identical to the one above except that it uses web storage to remember the model.
   (function () {

      // Create a factory that makes a simple counter object.
      const createCounter = function (oldState) {
         let state; // Used to keep track of an object with a count.

         // Create a default starting state.
         state = {
            count: 0
         };
         // If there's a valid previous state, use it instead.
         if (typeof oldState === 'string') {
            try {
               state = JSON.parse(oldState);
            } catch (ignore) {
            }
         }

         // The self object contains public methods.
         const self = {
            getCount: function () {
               return state.count;
            },
            getState: function () {
               // Return a string representation of the state object, to be used for web storage.
               return JSON.stringify(state);
            },
            increment: function () {
               state.count += 1;
            }
         };
         // Normally it's best to freeze the self object to keep it from being modified later.
         return Object.freeze(self);
      };

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let clickCounter; // Used to keep track of the model.

         // Create a function that updates everything that needs updating whenever the model changes.
         const updateClickCounter = function () {

            // Save the new state in web storage.
            localStorage.setItem(clickCounterWebStorageKey, clickCounter.getState());

            // Update the view.
            document.querySelector('#saved-click-count').textContent = clickCounter.getCount();

            // If we needed to update the controller, we would do it here.
         };

         // Create a click handler for the entire document.
         document.addEventListener('click', function () {
            // Update the model.
            clickCounter.increment();
            // Update everything else based on the new model state.
            updateClickCounter();
         });

         // When the page is loaded, get any saved state from web storage and use it to create a new model.
         clickCounter = createCounter(localStorage.getItem(clickCounterWebStorageKey));
         // Update everything else based on the new model state.
         updateClickCounter();
      }());
   }());

   (function () {

      // Create a factory that makes an object to keep track of a color-quiz game.
      const createColorQuiz = function (oldState) {
         let state; // Used to keep track of an object with current color stats.

         // The two squares' colors will need to be randomized at various times.
         const randomizeColors = function () {
            state.colorLeft.red = Math.floor(Math.random() * 256);
            state.colorLeft.green = Math.floor(Math.random() * 256);
            state.colorLeft.blue = Math.floor(Math.random() * 256);
            state.colorRight.red = Math.floor(Math.random() * 256);
            state.colorRight.green = Math.floor(Math.random() * 256);
            // Make sure the blue levels of the two colors are at least a little different.
            do {
               state.colorRight.blue = Math.floor(Math.random() * 256);
            } while (state.colorLeft.blue === state.colorRight.blue);
         };

         // Create a default starting state with no guesses yet.
         state = {
            colorLeft: {},
            colorRight: {},
            numCorrectGuesses: 0,
            numGuesses: 0
         };
         randomizeColors();
         // If there's a valid previous state, use it instead.
         if (typeof oldState === 'string') {
            try {
               state = JSON.parse(oldState);
            } catch (ignore) {
            }
         }

         // The self object contains public methods.
         const self = {
            getAccuracy: function () {
               // Return a string that describes the guesser's accuracy so far.
               if (state.numGuesses > 0) {
                  return (state.numCorrectGuesses / state.numGuesses * 100).toFixed(2) + '%';
               }
               return 'TBD';
            },
            getLeftColor: function () {
               // Return the color of the left square for use in changing CSS.
               return (
                  'rgb(' + state.colorLeft.red + ', '
                  + state.colorLeft.green + ', '
                  + state.colorLeft.blue + ')'
               );
            },
            getRightColor: function () {
               // Return the color of the right square for use in changing CSS.
               return (
                  'rgb(' + state.colorRight.red + ', '
                  + state.colorRight.green + ', '
                  + state.colorRight.blue + ')'
               );
            },
            getState: function () {
               // Return a string representation of the state object, to be used for web storage.
               return JSON.stringify(state);
            },
            guessLeft: function () {
               // Process a guess that the left square has more blue in it.
               state.numGuesses += 1;
               if (state.colorLeft.blue > state.colorRight.blue) {
                  state.numCorrectGuesses += 1;
               }
               randomizeColors();
            },
            guessRight: function () {
               // Process a guess that the right square has more blue in it.
               state.numGuesses += 1;
               if (state.colorLeft.blue < state.colorRight.blue) {
                  state.numCorrectGuesses += 1;
               }
               randomizeColors();
            }
         };
         // Normally it's best to freeze the self object to keep it from being modified later.
         return Object.freeze(self);
      };

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let colorQuiz; // Used to keep track of the model.

         const quizColorLeftElement = document.querySelector('#quiz-color-left');
         const quizColorRightElement = document.querySelector('#quiz-color-right');

         // Create a function that updates everything that needs updating whenever the model changes.
         const updateColorQuiz = function () {

            // Save the new state in web storage.
            localStorage.setItem(colorQuizWebStorageKey, colorQuiz.getState());

            // Update the view.
            quizColorLeftElement.style.backgroundColor = colorQuiz.getLeftColor();
            quizColorRightElement.style.backgroundColor = colorQuiz.getRightColor();
            document.querySelector('#color-quiz-accuracy').textContent = colorQuiz.getAccuracy();

            // If we needed to update the controller, we would do it here.
         };

         // Handle a guess that the left square has more blue in it.
         quizColorLeftElement.addEventListener('click', function () {
            // Update the model.
            colorQuiz.guessLeft();
            // Update everything else based on the new model state.
            updateColorQuiz();
         });

         // Handle a guess that the right square has more blue in it.
         quizColorRightElement.addEventListener('click', function () {
            // Update the model.
            colorQuiz.guessRight();
            // Update everything else based on the new model state.
            updateColorQuiz();
         });

         // When the page is loaded, get any saved state from web storage and use it to create a new model.
         colorQuiz = createColorQuiz(localStorage.getItem(colorQuizWebStorageKey));
         // Update everything else based on the new model state.
         updateColorQuiz();
      }());
   }());

   (function () {

      // Create a factory that makes an object to keep track of a to-do list.
      const createToDoList = function (oldState) {
         let state; // Used to keep track of an object with a to-do list.

         // Create a default starting state with an empty to-do list.
         state = {
            list: []
         };
         // If there's a valid previous state, use it instead.
         if (typeof oldState === 'string') {
            try {
               state = JSON.parse(oldState);
            } catch (ignore) {
            }
         }

         // The self object contains public methods.
         const self = {
            addItem: function (item) {
               // Add a new item to the end of the list.
               state.list = [...state.list, item];
            },
            getItem: function (whichItem) {
               // Return the desired item from the list.
               return state.list[whichItem];
            },
            getNumItems: function () {
               // Return the number of items in the list.
               return state.list.length;
            },
            getState: function () {
               // Return a string representation of the state object, to be used for web storage.
               return JSON.stringify(state);
            },
            removeItem: function (whichItem) {
               // Remove an item from anywhere in the list.
               state.list = [
                  ...state.list.slice(0, whichItem),
                  ...state.list.slice(whichItem + 1)
               ];
            }
         };
         // Normally it's best to freeze the self object to keep it from being modified later.
         return Object.freeze(self);
      };

      // Create a new closure to hide the view and controller from the model code above.
      (function () {
         let toDoList; // Used to keep track of the model.

         // Create a function that updates everything that needs updating whenever the model changes.
         const updateToDoList = function () {

            // Save the new state in web storage.
            localStorage.setItem(toDoListWebStorageKey, toDoList.getState());

            // Update the view.
            const toDoListOutputElement = document.querySelector('#to-do-list-output');
            // Create the list items as an array of new li elements one by one.
            const newListItems = Array.from(
               {length: toDoList.getNumItems()},
               // Create each new li element in HTML.
               function () {
                  return document.createElement('li');
               }
            );
            newListItems.forEach(function (liElement, whichItem) {
               // Give each element its to-do-list item.
               liElement.textContent = toDoList.getItem(whichItem);
            });
            // In the page, replace the old list items with the new ones.
            toDoListOutputElement.replaceChildren(...newListItems);

            // Update the controller:  Add a click handler to each new li element.
            newListItems.forEach(function (liElement, whichItem) {
               liElement.addEventListener('click', function () {
                  // Update the model.
                  toDoList.removeItem(whichItem);
                  // Update everything else based on the new model state.
                  updateToDoList();
               });
            });
         };

         // Set up the controller:  Handle adding a new to-do-list item.
         document.querySelector('#add-to-do-list-item').addEventListener('click', function () {
            // Update the model.
            const itemToAdd = document.querySelector('#to-do-list-item-to-add').value;
            if (itemToAdd.length > 0) {
               toDoList.addItem(itemToAdd);
            }
            // Update everything else based on the new model state.
            updateToDoList();
         });

         // When the page is loaded, get any saved state from web storage and use it to create a new model.
         toDoList = createToDoList(localStorage.getItem(toDoListWebStorageKey));
         // Update everything else based on the new model state.
         updateToDoList();
      }());
   }());

   // Give the user a convenient way to make this web app forget everything it's put into local storage.
   document.querySelector('#forget-everything').addEventListener('click', function (ev) {
      // Remove each item from web storage.
      localStorage.removeItem(clickCounterWebStorageKey);
      localStorage.removeItem(colorQuizWebStorageKey);
      localStorage.removeItem(toDoListWebStorageKey);
      // Keep this click event from being handled as a click on the page as a whole.
      ev.stopPropagation();
      // Now the click counter won't count this click.
   });

});
