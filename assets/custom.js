// Product Addon

function toggleCart(variantId, button) {
    if (button.textContent === '+ Add') {
        addToCart(variantId, button);
    } else {
        removeFromCart(variantId, button);
    }
}

function addToCart(variantId, button) {
    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ id: variantId, quantity: 1 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 422) {
            console.error('Unprocessable Content', data);
        } else {
            button.textContent = 'Added';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeFromCart(variantId, button) {
    fetch('/cart/change.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ id: variantId, quantity: 0 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 422) {
            console.error('Unprocessable Content', data);
        } else {
            button.textContent = '+ Add';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Footer Country Selector

document.addEventListener('DOMContentLoaded', function() {
    var usFlagLink = document.getElementById('flag-us');
    if (usFlagLink) {
      usFlagLink.addEventListener('click', function(event) {
        event.preventDefault();
      });
    }
  });