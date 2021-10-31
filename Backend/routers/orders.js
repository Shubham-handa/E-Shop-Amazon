const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/orderItems');

router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

router.post(`/add`,async (req, res)=>{

    const OrderItemIds = Promise.all(req.body.orderItems.map(async (item)=>{
        let newOrderItem = new OrderItem({
            quantity:item.quantity,
            product:item.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }))
    const orderItemIdsResolved = await OrderItemIds;

    const totalPrices = await Promise.all(orderItemIdsResolved.map(async(orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product','price');
        const totalPrice = orderItem.product.price*orderItem.quantity;
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a,b)=>a+b,0);

    let order = new Order({
        OrderItems: orderItemIdsResolved,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        zip: req.body.zip,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();
    
    if(!order){
        return res.status(400).send('order cannot be placed');
    }
    res.send(order);

})

router.put(`/update/:id`,async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        },
        {
            new:true
        }
    )
    if(!order){
        return res.status(400).send('Order cannot be updated');
    }
    res.send(order);
})

router.delete(`/delete/:id`,(req,res)=>{
    Order.findByIdAndRemove(req.params.id)
    .then(order=>{
            if(order){
                
                return res.status(200).json({success:true,message:'Order is deleted'});
            }
            else{
                return res.status(404).json({success:false,message:'Order not Found'});
            }
        }).catch(err =>{
        return  res.status(500).json({success:false,error:err});
    })
})


module.exports =router;