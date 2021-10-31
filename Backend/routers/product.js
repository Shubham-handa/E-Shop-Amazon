const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const mongoose = require("mongoose");
const multer = require('multer');
const {Category} = require('../models/category');

//list of extension are to be allowed
const FILE_TYPE_MAP = {
  'image/png':'png', //a mime type format
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
      if(isValid){
        uploadError=null;
      }
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      
      const fileName = file.originalname.split(' ').join('-'); //Replacing spaces with dash
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${file.fileName}-${Date.now()}.${extension}`);
    }
  })
  
  const uploadOptions = multer({ storage: storage })


 //Get api for getting all product 
router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

//getting products according to product id
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});


//post api for entring products
router.post(`/add`,uploadOptions.single('image'),(req, res) => {
  //const category = await Category.findById(req.body.category);

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`; //this will make http://localhost:3000/public/uploads/imagename

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  //here the save will return me promise
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        succes: false,
      });
    });
});


//put api for some changing in the particular product
router.put(`/updateProduct/:id`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  },{
      new:true
  })

  if(!product){
      return res.status(500).send('product cannot be updated');
  }
  res.send(product);

});

//delete the product by id
router.delete(`/delete/:id`,(req,res)=>{
    Product.findByIdAndRemove(req.params.id).
    then(product=>{
        if(product){
            return res.status(200).json({
                success:true,message:"product deleted"})
        }else{
            return res.status(404).json({
                success:false,message:"product not found"})
        }
    }).catch(err=>{
        return res.status(500).json({success:false,error:err})
    })
})

module.exports = router;
