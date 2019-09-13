function getElement (id) {
    return document.getElementById(id)
}

const HEXINPUT = getElement("hex-input");
const HEXSUBMIT = getElement("hex-submit");

module.exports.constants = {
  HEXINPUT,
  HEXSUBMIT
}