const toggleCart = async (variantId, button) => {
    if (button.textContent === '+ Add') {
        await addToCart(variantId, button);
    } else {
        await removeFromCart(variantId, button);
    }
};

const addToCart = async (variantId, button) => {
    try {
        const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ id: variantId, quantity: 1 })
        });

        if (!response.ok) {
            console.error('Failed to add to cart:', response.statusText);
            return;
        }

        const data = await response.json();
        if (data.status === 422) {
            console.error('Unprocessable Content', data);
        } else {
            button.textContent = 'Added';
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const removeFromCart = async (variantId, button) => {
    try {
        const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ id: variantId, quantity: 0 })
        });

        if (!response.ok) {
            console.error('Failed to remove from cart:', response.statusText);
            return;
        }

        const data = await response.json();
        if (data.status === 422) {
            console.error('Unprocessable Content', data);
        } else {
            button.textContent = '+ Add';
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
