var button1 = document.getElementById("grading-element-one");
var link = document.getElementById("grading-element-two");
var button2 = document.getElementById("grading-element-three");
var span = document.getElementById("grading-element-three-consequence");
var paragraph = document.getElementById("grading-element-one-consequence")



button1.addEventListener("click", function() {
	paragraph.innerHTML = 'grading-element-one-consequence';
})

link.addEventListener("click", function(){
	paragraph.innerHTML = 'grading-element-one-consequence';
})

button2.addEventListener("click", function() {
	span.innerHTML = "hows it going?";
})
