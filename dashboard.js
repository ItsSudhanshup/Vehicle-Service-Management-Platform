document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const usernameSpan = document.getElementById('username');
    if (usernameSpan) {
        usernameSpan.textContent = username || "Username"; 
    } else {
        console.error('Username span element not found.');
    }

    const profileBtn = document.querySelector('#sidebar .profile-btn');
    const profileSection = document.querySelector('.profile-section'); 

    
    if (profileBtn && profileSection) {
        
        profileBtn.addEventListener('click', function () {
            profileSection.classList.toggle('active');
        });

        
        const closeBtn = document.querySelector('.profile-section .close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                profileSection.classList.remove('active');
            });
        } else {
            console.error("Close button not found.");
        }
    } else {
        console.error('Profile button or profile section not found.');
    }

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    const switchMode = document.getElementById('switch-mode');

    allSideMenu.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    menuBar.addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
    });


    switchMode.addEventListener('change', function () {
        document.body.classList.toggle('dark', this.checked);
    });

    const cartSection = document.querySelector('.cart-section');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const bookButtons = document.querySelectorAll('.table-data .order table tbody tr button');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function toggleCartSection() {
        cartSection.classList.toggle('active');
    }

    // Event listener for opening/closing cart
    document.querySelector('#sidebar .bx.bxs-doughnut-chart').addEventListener('click', toggleCartSection);
    closeCartBtn.addEventListener('click', toggleCartSection);

    // Function to add item to cart
    function addItemToCart(itemName, itemPrice) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${itemName}</span>
            <span>Rs${itemPrice}</span>
        `;
        cartItems.appendChild(itemElement);
    }

    // Event listener for book buttons
    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceName = this.parentElement.parentElement.querySelector('td:first-child p').textContent.trim();
            const servicePrice = parseFloat(this.parentElement.parentElement.querySelector('td:nth-child(2)').textContent);
            addItemToCart(serviceName, servicePrice);
            updateTotalAmount();
        });
    });

    // Function to update total amount
    function updateTotalAmount() {
        let total = 0;
        cartItems.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('span:last-child').textContent.slice(2)); 
            total += price;
        });
        totalAmount.textContent = `Rs${total.toFixed(2)}`;
    }

    // Event listener for checkout button
    checkoutBtn.addEventListener('click', function () {

        const totalPrice = parseFloat(totalAmount.textContent.slice(2)); 
        window.location.href = `payment.html?total=${totalPrice}`;
    });

});
