
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

	let element_three_id = document.getElementById("grading-element-three");

	let e_three_conseq = document.getElementById('grading-element-three-consequence');

	element_three_id.addEventListener("click", function(event) {

		

		if(e_three_conseq.style.visibility === "hidden"){
			e_three_conseq.style.visibility = "visible";
			//element_three_id.disabled = true; // disables the button
		}
		else{
			e_three_conseq.style.visibility = "hidden";
		}
		});

};



	



