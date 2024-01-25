const stripeService = require('../models/stripeService');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { products } = req.body;
    const clientSecret = await stripeService.createPaymentIntent(products);
    res.status(200).json({ clientSecret });
    console.log(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
