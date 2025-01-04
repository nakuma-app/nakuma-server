require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

async function initiatePayment(item) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name
                },
                unit_amount: item.priceInCents
            },
            quantity: item.quantity
        }],
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/packs`
    });
    return session.url;
}

module.exports = {
    initiatePayment
};
