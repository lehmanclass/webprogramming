function main() {
	const SUBMIT_BUTTON = document.getElementById('grading-element-three');
	const PROVIDE_EXAMPLE = document.getElementById('grading-element-one');

	SUBMIT_BUTTON.onclick = e => {
		const INPUT_FIELD = document.getElementById('hex-input');
		const ERROR_RESULT_CONTAINER = document.getElementById('error-result-container');
		const userHexValue = cleanString(INPUT_FIELD.value);
		clear();
		if (validateInput(userHexValue)) {
			const binaryValue = hexToBinary(userHexValue);
			const ipClass = getIpClass(binaryValue);
			const networkId = getNetworkID(userHexValue, ipClass);
			const hostId = getHostID(userHexValue, ipClass);
			const decimalDottedNotation = hexToDottedDecimal(userHexValue);
			displayInfo(ipClass, networkId, hostId, decimalDottedNotation);
		} else {
			INPUT_FIELD.style['border-color'] = 'red';
			ERROR_RESULT_CONTAINER.style.display = 'block';
		}
	};

	PROVIDE_EXAMPLE.onclick = () => {
		const exampleContainer = document.getElementById('example-container');
		const examples = generateExamples();
		exampleContainer.appendChild(examples);
	};

	const element5 = document.getElementById('grading-element-five');
	element5.style.color = '#fff';
	element5.onmouseover = e => (e.target.style.color = '#000');
	element5.onmouseleave = e => (e.target.style.color = '#fff');
}

main();
