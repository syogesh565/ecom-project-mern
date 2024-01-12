const stripe = require('stripe')('sk_test_51OWeBESCz0YwIkJA133Wd5o0GYN2kgm1DQn6Yaq1mGE6F8CWGZtRpdHEGfgF70SEbkIdecREDfpsqzrd4MyizXQ900BggDjuvd');

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
    });
    return paymentIntent.client_secret;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = { createPaymentIntent };
