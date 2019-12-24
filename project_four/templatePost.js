fetch('/checkout', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productName: 'productName',
    quantity: 1,
    subtotal: 1,
    tax: 1,
    total: 3
  })
}).then(data => data.json())
.then(data => console.log(data));
