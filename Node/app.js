const express = require('express');
const bodyParser = require('body-parser');// json mai data get krne ke liye othereise data  req.body mai ni milega 
const app = express();
const PORT = 3000; // You can use any other port number
const sequelize = require('./config/db');// condig db connection
const userRoutes = require('./routes/UserRoutes');
const yogiRoutes = require('./routes/YogiRoutes');
const loginRoutes = require('./routes/loginRoutes');

const cors = require('cors');

app.use(cors()); // Enable CORS for al



app.use(bodyParser.json());
// app.use('/', userRoutes); // Include user 

// Serving static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/yogi', yogiRoutes);
app.use('/', userRoutes);
app.use("/api", loginRoutes);

app.use('/yogi/uploads', express.static('uploads'));




// Sync Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error('Error syncing Sequelize:', err));
