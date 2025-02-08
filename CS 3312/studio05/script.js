/*jslint browser */

// CS 3312, spring 2024
// Studio 5
// YOUR NAME(S): Trey Fleming, Derek Cook

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Each little web app is hidden from the others using an IIFE.
   (function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR isPrime FUNCTION HERE
	  function isPrime(n){
		  if(!Number.isInteger(n) || n < 2){
			  return false;
		  }
		  for(let i = 2; i <= Math.sqrt(n); i++){
			  if(n % i === 0)
				  return false;
		  }
		  return true;
	  }

      // The report function is hidden from the isPrime function using an IIFE.
      (function () {
         // Do not declare any other variables here, but you may declare variables inside your function.

         // WRITE YOUR report FUNCTION HERE
		 document.querySelector('#primality-input').addEventListener('input', function report(){
			 let result;
          const n = parseInt(this.value,10);
			 if(!Number.isFinite(n)){
				 result = 'not a number';
			 } else if(isPrime(n)){
				 result = 'prime';
			 } else{
				 result = 'not prime';
			 }
			 document.querySelector('#prime-or-not').textContent = result;
       })

         // Call the report function even before there's a value to use.
         /*report();
         // When the number is changed at all, immediately . . .
         document.querySelector('#primality-input').addEventListener('input', function () {
            // . . . call the report function and pass it the user's value.
            report(parseInt(document.querySelector('#primality-input').value, 10));
         });*/
      }());
   }());

   (function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR fibonacci FUNCTION HERE
	  document.querySelector('#calculate-fibonacci').addEventListener('click', function fibonacci(){
      const n = parseInt(document.querySelector('#fibonacci-input').value,10);
      let fib = [0,1];
      for(let i = 2; i <= n; i++){
         fib[i] = fib[i-1] + fib[i-2];
      }
      let fibo = fib[n];
      document.querySelector('#which-fibonacci-number').textContent = n;
      document.querySelector('#fibonacci-number').textContent = fibo;
	  })
     /*
      // Do things when the "Calculate it" button is clicked.
      document.querySelector('#calculate-fibonacci').addEventListener('click', function () {
         // Get the user's number.
         const whichFibonacciNumber = parseInt(document.querySelector('#fibonacci-input').value, 10);
         // Use the fibonacci function to calculate the output.
         document.querySelector('#which-fibonacci-number').textContent = whichFibonacciNumber.toString();
         document.querySelector('#fibonacci-number').textContent = fibonacci(whichFibonacciNumber).toString();
      });*/
   }());

   (function () {
      // Do not declare any other variables here, but you may declare variables inside your function.

      // WRITE YOUR reverseString FUNCTION HERE
	  document.querySelector('#reversal-input').addEventListener('change',function reverseString(){
      let reversalInputElement = document.querySelector('#reversal-input');
      let getRev = reversalInputElement.value.split('').reverse().join('');
      reversalInputElement.value = getRev;
	  })

      /*(function () {
         const reversalInputElement = document.querySelector('#reversal-input');
         // When the user changes the string and focuses on another part of the page, reverse the new string.
         // Notice the difference between the 'change' event and the 'input' event.
         reversalInputElement.addEventListener('change', function () {
            reversalInputElement.value = reverseString(reversalInputElement.value);
         });
      }());*/
   }());

});