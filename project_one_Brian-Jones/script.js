function unHide() {
    // let x = document.getElementById("grading-element-three");

    // if (x.style.display === "none") {
    //     x.style.display = "block"
    // } else {
    //     x.style.display = "none"
    // }

    let x = document.getElementById('grading-element-three-consquence')
    
    if(x.hasAttribute('hidden')){
        x.removeAttribute('hidden');
    } else {
        x.setAttribute('hidden', '');
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
