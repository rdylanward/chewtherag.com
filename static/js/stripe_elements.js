/* Core logic/payment flow for this comes from here:
   https://stripe.com/docs/payments/accept-a-payment
   CSS from here: https://stripe.com/docs/stripe-js */

let stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
let clientSecret = $('#id_client_secret').text().slice(1, -1);
let stripe = Stripe(stripePublicKey);
let elements = stripe.elements();
let style = {
    base: {
        color: '#000',
        fontFamily: '"Montserrat", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '1.6rem',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#bd362f',
        iconColor: '#bd362f'
    }
};
let card = elements.create('card', {style: style});
card.mount('#payment-card-element');

/* Handle realtime validation errors on the card element */
card.addEventListener('change', function (event) {
    let errorDiv = document.getElementById('payment-card-errors');
    if (event.error) {
        let html = `
            <span class="icon" role="alert">
                <i class="fas fa-times"></i>
            </span>
            <span>${event.error.message}</span>
        `;
        $(errorDiv).html(html);
    } else {
        errorDiv.textContent = '';
    }
});

/* Handle form submit */
let form = document.getElementById('checkout-info');

form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    card.update({ 'disabled': true});
    $('#submit-complete').attr('disabled', true);
    stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
        }
    }).then(function(result) {
        if (result.error) {
            let errorDiv = document.getElementById('payment-card-errors');
            let html = `
                <span class="icon" role="alert">
                <i class="fas fa-times"></i>
                </span>
                <span>${result.error.message}</span>`;
            $(errorDiv).html(html);
            card.update({ 'disabled': false});
            $('#submit-complete').attr('disabled', false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                form.submit();
            }
        }
    });
});
