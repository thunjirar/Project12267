function saveProduct(name, price) {
    let products = JSON.parse(localStorage.getItem('myProducts')) || [];
    products.push({ name, price });
    localStorage.setItem('myProducts', JSON.stringify(products));
    alert('บันทึกข้อมูลแล้ว!');
}

function displayProducts() {
    let products = JSON.parse(localStorage.getItem('myProducts')) || [];
    const container = document.getElementById('menu-container');
    
    products.forEach(item => {
        container.innerHTML += `<div>${item.name} - ${item.price} บาท</div>`;
    });
}
window.onload = displayProducts;