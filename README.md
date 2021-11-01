# ECommerce-App Using MEAN STACK    

[![](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![](https://img.shields.io/badge/Angular-Frontend-red)](https://angular.io/) [![](https://img.shields.io/badge/NodeJs-Backend-green)](https://nodejs.org/en/)



# Heroku Link

Users
-----

1. https://nodejs-eshop-dep.herokuapp.com/api/v1/users/login (POST)

Json data Example:
-----------------
{
    "email":"shubham.h001@gmail.com",
    "password":"123455"
}

2. https://nodejs-eshop-dep.herokuapp.com/api/v1/users/addUser (POST)

Json data Example:
-----------------
{
    "name":"Shubham Handa",
    "email":"shubham.h001@gmail.com",
    "password":"123455",
    "phone":"7889237674",
}

Product List 
------------

First Login it will return token after that in authorization choose bearer token and enter the token then hit api

https://nodejs-eshop-dep.herokuapp.com/api/v1/products (GET)


Login
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/login.png)

Sign Up
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/signup.png)

Home
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/home.png)


Search
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/search.png)


Orders
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/order.png)


Order Confirmed
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/orderconfirmed.png)


Profile
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/user.png)


About
-----

![alt text](https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/Screenshots/about.png)

# BackEnd Details

BaseURL:
-------

http://localhost:3000/api/v1/

For Run the Backend Steps are:

1. Run npm start command in cmd
2. Then it will show that Database is ready and server is starting
3. Now you can check your working of backend in postman

Product API's:
-------------

1. For getting product list ->
   baseurl/products (GET Method)

2. For adding products ->
   baseurl/products/add (POST Method)
   

2. For update product information by product id ->
   baseurl/products/updateProduct/:id (POST Method)

Users API's:
-------------

1. For Sign up or Adding user ->
   baseurl/users/addUser (POST Method)
   
2. For Login ->
   baseurl/users/login (POST Method)



Orders API's:
-------------

For Placing Order ->
baseurl/users/add (POST Method)

Data Dumps
----------

https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/products.json

https://github.com/Shubham-handa/E-Shop-Amazon/blob/master/users.json








