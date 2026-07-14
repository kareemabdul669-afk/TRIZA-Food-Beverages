let bill = [];
let total = 0;

function addItem() {
let itemText = document.getElementById("item").value;
let qty = document.getElementById("qty").value;

```
if (!qty || qty <= 0) {
    alert("Enter valid quantity");
    return;
}

let price = parseInt(itemText.split("-")[1]);
let name = itemText.split("-")[0];

let itemTotal = price * qty;

bill.push({name, qty, price, itemTotal});
total += itemTotal;

updateUI();
```

}

function updateUI() {
let list = document.getElementById("billList");
list.innerHTML = "";

```
bill.forEach(i => {
    let li = document.createElement("li");
    li.innerText = `${i.name} x ${i.qty} = ₹${i.itemTotal}`;
    list.appendChild(li);
});

document.getElementById("total").innerText = total;
```

}

function saveOrder() {
let orders = JSON.parse(localStorage.getItem("orders")) || [];

```
let order = {
    date: new Date().toLocaleString(),
    items: bill,
    total: total
};

orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

alert("Order Saved!");
bill = [];
total = 0;
updateUI();
```

}

function exportCSV() {
let orders = JSON.parse(localStorage.getItem("orders")) || [];

```
let csv = "Date,Item,Qty,Price,Total\n";

orders.forEach(order => {
    order.items.forEach(i => {
        csv += `${order.date},${i.name},${i.qty},${i.price},${i.itemTotal}\n`;
    });
});

let blob = new Blob([csv], { type: 'text/csv' });
let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "TRIZA_Sales_Report.csv";
a.click();
```

}
