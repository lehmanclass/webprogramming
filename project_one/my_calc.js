function insert(num) {
  document.getElementById("answer").value += value = num;
}

function equalTo() {
  let x = document.getElementById("answer").value;
  let y = eval(x);
  document.getElementById("answer").value = y;
}

function clr() {
  document.getElementById("answer").value = "";
}

function backSpace() {
  let num = document.getElementById("answer").value;
  document.getElementById("answer").value = num.substring(0, num.length - 1);
}

function sqrt() {
  let num = Math.sqrt(document.getElementById("answer").value);
  document.getElementById("answer").value = num;
}

function exp() {
  let num = document.getElementById("answer").value;
  document.getElementById("answer").value = Math.pow(num, 2);
}
