// Declare variables for all the keys from document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {

		// Get the input and button values
		var input = document.querySelector('.input');
		var inputVal = input.innerHTML;
		var btnVal = this.getAttribute("data-value");

		// If clear key is pressed, erase everything
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}

		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			// Replace all instances of x and ÷ with * and / respectively.
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			// Check last character in equation, remove if its an operator
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');

			if(equation)
				input.innerHTML = eval(equation);

			decimalAdded = false;
		}

		// indexOf works only in IE9+
		else if(operators.indexOf(btnVal) > -1) {

			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];

			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1)
				input.innerHTML += btnVal;

			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-')
				input.innerHTML += btnVal;

			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {

				// Here, '.' matches any character while $ denotes the end of string
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = false;
		}

		// Prevent more decimals to be added once it's set. Reset when an operator, eval or clear key is pressed.
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}

		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}

		// prevent page jumps
		e.preventDefault();
	}
}