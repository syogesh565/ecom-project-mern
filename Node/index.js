const express = require('express');
const bodyParser = require('body-parser');// json mai data get krne ke liye othereise data  req.body mai ni milega 
const app = express();
const axios = require('axios');
const nodemailer = require('nodemailer');
const PORT =  process.env.port ||3000; // You can use any other port number
const sequelize = require('./config/db');// condig db connection
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/UserRoutes');
const yogiRoutes = require('./routes/YogiRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import your new order routes
const stripe = require("stripe")("sk_test_51OWeBESCz0YwIkJA133Wd5o0GYN2kgm1DQn6Yaq1mGE6F8CWGZtRpdHEGfgF70SEbkIdecREDfpsqzrd4MyizXQ900BggDjuvd")
const twilioRoutes = require('./routes/twilioRoutes'); // Import your Twilio routes



const cors = require('cors');
// app.use(express.static('public'));          

app.use(express.json());
//app.use(cors())
app.use(cors({
  origin : "*",
  methods : ["GET","POST","PUT","PATCH","DELETE"],
  credentials : true
})); // Enable CORS for al


app.use(express.json())
app.use(bodyParser.json());

app.use('/api/twilio', twilioRoutes); // Prefix the Twilio routes with '/api/twilio'
app.use('/yogi', yogiRoutes);
app.use('/', userRoutes);
app.use("/api", loginRoutes);
// app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);
app.use('/yogi/uploads', express.static('uploads'));
app.use('/api', emailRoutes);


app.get("/",(req,res)=>{
  res.send('Hello Backend hiiiiiii');
})

//checkout api

app.post("/api/create-payment-intent",async(req,res)=>{
  try {
  const products = req.body.products;
 


 
  // const customerAddress = "bhilwara";
  const currency = "inr"; // Default currency
  const lineItems = products.map((product)=>({
    
    price_data: {
      currency: currency,
      product_data: {
        name: product.name
      },
      unit_amount: product.price * 100,

    },
    quantity: product.quantity
  }));
 


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3001/successs',
    cancel_url: 'http://localhost:3001/cancel',

    // Include billing address collection
    billing_address_collection: 'required',

    // Pass customer address information
    shipping_address_collection: {
      allowed_countries: ['IN'], // Specify the allowed countries for shipping
    },

    // customer_email: "yogesh123@yopmail.com", // Include customer email if available
  });
  
  
 
    res.json({ id: session.id });
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      // Handle the case where there is no internet connection
      res.status(500).json({ error: 'No internet connection. Payment cannot proceed.' });
    } else {
      console.error('Error creating Payment Intent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.error('Error creating Payment Intent:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.post('/success', async (req, res) => {
  try {
    // Your cancellation logic here

    // Respond with success
    res.json({ status: 'Payment canceled successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error canceling payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/cancel', async (req, res) => {
  try {
    // Your cancellation logic here

    // Respond with success
    res.json({ status: 'Payment canceled successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error canceling payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//     // Start your server here
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server is running on port ${process.env.PORT || 3000}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


 // If running in development, start the server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}