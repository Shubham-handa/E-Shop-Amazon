const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    orderItems:[{ 
        type:mongoose.Schema.Types.ObjectID,
        ref:'OrderItem',
        required:true,
    }],
    shippingAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'Pending',
    },
    totalPrice:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User',
    },
    dateOrdered:{
        type:Date,
        default:Date.now,
    },

})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
})


//Enable the virtuals to be true
orderSchema.set('toJSON',{
    virtuals:true,
})

exports.Order = mongoose.model('Order', orderSchema);
