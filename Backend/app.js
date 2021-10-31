//Importing libraries and store into constant variable
const express = require('express'); //It will automatically call from node modules
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./guard/jwt');
const errorHandler = require('./guard/errorHandler');


//For reading the content of .env file
require('dotenv/config');

//Assign the api url from env file into api variable
const api = process.env.API_URL;

//importing routes
const productsRoutes = require('./routers/product');
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');

//Cors configuration
app.use(cors());
app.options('*',cors);


//Middleware { this method will make our data to be understand by express which are going to be sent from front end}
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads",express.static(__dirname + "/public/uploads"));

//Router
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//http://localhost:3000/api/v1/products

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{
    console.log('server is running');
})

