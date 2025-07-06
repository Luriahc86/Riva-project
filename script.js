// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu category hover effect
const menuCategories = document.querySelectorAll('.menu-category');
menuCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(1000px) rotateY(10deg) translateY(-10px)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0deg) translateY(0px)';
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Order Form Functions
function increaseQuantity(btn) {
    const input = btn.parentElement.querySelector('.quantity-input');
    input.value = parseInt(input.value) + 1;
    updateTotal();
}

function decreaseQuantity(btn) {
    const input = btn.parentElement.querySelector('.quantity-input');
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let hasItems = false;
    
    const menuItems = document.querySelectorAll('.menu-item-order');
    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const price = parseInt(item.getAttribute('data-price'));
        total += quantity * price;
        if (quantity > 0) hasItems = true;
    });

    document.getElementById('totalPrice').textContent = total.toLocaleString('id-ID');
    document.getElementById('submitBtn').disabled = !hasItems;
}

// Handle form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const notes = document.getElementById('notes').value;
    
    if (!name || !phone || !address) {
        alert('Mohon lengkapi data pribadi Anda!');
        return;
    }

    let orderDetails = '';
    let total = 0;
    
    const menuItems = document.querySelectorAll('.menu-item-order');
    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        if (quantity > 0) {
            const itemName = item.getAttribute('data-name');
            const price = parseInt(item.getAttribute('data-price'));
            const subtotal = quantity * price;
            total += subtotal;
            
            orderDetails += `• ${itemName} x${quantity} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
        }
    });

    // Add toppings if any
    const selectedToppings = [];
    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]:checked');
    toppingCheckboxes.forEach(checkbox => {
        selectedToppings.push(checkbox.value);
    });

    if (selectedToppings.length > 0) {
        orderDetails += `\n🧁 Topping yang dipilih:\n${selectedToppings.map(t => `• ${t}`).join('\n')}\n`;
    }

    // Create WhatsApp message
    const message = `🍜 *PESANAN RIVA STREETFOOD* 🍜

👤 *Data Pelanggan:*
Nama: ${name}
No. HP: ${phone}
Alamat: ${address}

📋 *Detail Pesanan:*
${orderDetails}
💰 *Total: Rp ${total.toLocaleString('id-ID')}*

${notes ? `📝 *Catatan:* ${notes}` : ''}

Mohon konfirmasi pesanan ini. Terima kasih! 🙏`;

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/6287779515854?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});