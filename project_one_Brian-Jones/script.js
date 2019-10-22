function unHide() {
    var x = document.getElementById('grading-element-three-consequence');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
  }

const baddie = () => {
    let x = document.createElement('p');
    x.setAttribute("id", "grading-element-one-consequence");
    x.appendChild(document.createTextNode("This was consequential"));
    document.body.appendChild(x);
    
    console.log(x);
}

const keys = () => {
    let x = document.getElementById('T1');
    let y = document.getElementById('T2');
    let z = document.getElementById('T3');

    x.value = "testOne";
    y.value = "testTwo";
    z.value = "testThree";
}
