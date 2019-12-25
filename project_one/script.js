var button1 = document.getElementById("grading-element-one");
var link = document.getElementById("grading-element-two");
var button2 = document.getElementById("grading-element-three");
var span = document.getElementById("grading-element-three-consequence");
var div = document.getElementById("uptop");





button1.addEventListener("click", function() {
	var ul = document.createElement("ul");
	ul.id = "grading-element-one-consequence";
	var li = document.createElement("li");
	li.appendChild(document.createTextNode("testing"));
	ul.appendChild(li);
	div.appendChild(ul);

	}, {once : true});


button2.addEventListener("click", function() {
	document.getElementById("grading-element-three-consequence").style.visibility = "visible";
})
