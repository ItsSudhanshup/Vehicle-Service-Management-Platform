document.addEventListener('DOMContentLoaded', function () {
   
    const urlParams = new URLSearchParams(window.location.search);
    const totalPrice = urlParams.get('total');

   
    const totalSpan = document.getElementById('totalprice');
    if (totalSpan) {
        totalSpan.textContent = `Rs${totalPrice}`;
    }

    // Event listener for form submission
    document.getElementById('paymentForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        processPayment(totalPrice); // Pass totalPrice to the processPayment function
    });

    // Function to process payment
    function processPayment(totalPrice) {
        var cardNumber = document.getElementById('cardNumber').value;
        var expiryDate = document.getElementById('expiryDate').value;
        var cvv = document.getElementById('cvv').value;
        var name = document.getElementById('name').value;

        if (cardNumber.trim() === '' || expiryDate.trim() === '' || cvv.trim() === '' || name.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        setTimeout(function() {
    
            // Store data in local storage
            localStorage.setItem('totalPrice', totalPrice);
    
            // Redirect to mybooking.html after successful payment processing
            window.location.href = 'mybooking.html';
        }, 1000);
       
    }
});
