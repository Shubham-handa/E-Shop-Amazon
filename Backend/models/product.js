const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{ //Product name
        type:String,
        required:true,//As product name always required
    },
    description:{ //Short Description of product
        type:String,
        required:true,
    },
    richDescription:{ 
        type:String,
        default:'',
    },
    image:{ //Image of Product
        type:String,
        default:'',
    },
    images:[{
        type:String,
    }],
    brand:{ //Brand name of Product
        type:String,
        default:'',
    },
    price:{ //Price of Product
        type:String,
        default:0,
    },
    category:{ //Category of Product
        // type:mongoose.Schema.Types.ObjectID,
        // ref:'Categories',
        type:String,
        required:true,
    },
    countInStock:{ //How much quantity available
        type:Number,
        required:true,
        min:0,
        max:500,
    },
    rating:{ //Rating of the product
        type:Number,
        default:0,
    },
    numReviews:{ //How many reviews on  product
        type:Number,
        default:0,
    },
    isFeatured:{ //product featured or not
        type:Boolean, 
        default:false,
    },
    dateCreated:{ //When the product created
        type:Date,
        default:Date.now,
    },
});

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
})


//Enable the virtuals to be true
productSchema.set('toJSON',{
    virtuals:true,
})

exports.Product = mongoose.model('Product',productSchema);
