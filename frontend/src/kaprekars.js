function toFourDigitString(num) {
	return String(num).padStart(4, "0");
}

// Function to sort the digits of a number in ascending or descending order
function sortDigits(num, reverse = false) {
	let numStrList = toFourDigitString(num).split("");
	numStrList.sort((a, b) => a - b);

	if (reverse) {
		numStrList.reverse();
	}

	return Number(numStrList.join(""));
}

// Function to check if the input number is valid for Kaprekar's routine
function checkValidInput(num) {
	// Check if the input is a number
	if (isNaN(num)) {
		return false;
	}

	// Check if the number is a 4-digit number
	if (num < 1000 || num > 9999) {
		return false;
	}

	// Check if all digits are the same
	if (new Set(toFourDigitString(num)).size === 1) {
		return false;
	}

	return true;
}

// Function to perform Kaprekar's routine on a number and return the sequence of numbers generated until it reaches 6174
function kaprekarsRoutine(num) {
	let steps = [];

	if (!checkValidInput(num)) {
		throw new Error(
			"Input must be a 4-digit number with at least two different digits."
		);
		return steps;
	}

	let numList = [num];
	let iteration = 1;

	while (numList[numList.length - 1] !== 6174) {
		let sortedNum = sortDigits(numList[numList.length - 1]);
		let reversedNum = sortDigits(numList[numList.length - 1], true);
		let nextNum = reversedNum - sortedNum;
		numList.push(nextNum);
		steps.push({
			iteration: iteration,
			sortedNum: toFourDigitString(sortedNum),
			reversedNum: toFourDigitString(reversedNum),
			nextNum: toFourDigitString(nextNum),
		});
		iteration++;
	}

	return steps;
}

export default kaprekarsRoutine;
