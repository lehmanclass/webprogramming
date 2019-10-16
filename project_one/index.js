
const elementOne = () => {
	let element_id = document.getElementById("First_Part");

	let new_element = document.createElement("P");
	new_element.setAttribute("id", "grading-element-one-consequence");

	element_id.addEventListener("click", function(event) {


	new_element.innerHTML = " I AM SOOO TIRED !! SAVE ME ";
	element_id.appendChild(new_element);
	


	});

	



};


const elementThree = () => {

	let targ = document.getElementById("Third_Part");

	let element_three_id = document.getElementById("grading-element-three");

	let changes = document.createElement("P");

	changes.setAttribute("id", "grading-element-three-consequence");

	

	targ.addEventListener("click", function(event) {
		changes.innerHTML = " PEEKABOO !! HA I CAUGHT YOU !";
		targ.appendChild(changes);

		element_three_id.disabled = true;


		
		});

};

	



