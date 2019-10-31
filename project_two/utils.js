function isAuthorized(headers) {
  if (headers.authorization) {
    const token = headers.authorization.replace("Bearer ", "").toLowerCase();
    return token === "projecttwo";
  }
  return false;
}

function handleUpdateRequest(fruitOrCake, DB) {
  try {
    DB.create(fruitOrCake, 1);
  } catch {
    const oldFruitOrCake = DB.read(fruitOrCake);
    DB.update(fruitOrCake, oldFruitOrCake + 1);
  }
}

module.exports = {
  isAuthorized,
  handleUpdateRequest
};
