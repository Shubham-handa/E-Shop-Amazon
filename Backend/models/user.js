const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    street:{
        type:String,
        default:'',
    },
    house:{
        type:String,
        default:'',
    },
    city:{
        type:String,
        default:'',
    },
    zip:{
        type:String,
        default:'',
    },
    state:{
        type:String,
        default:'',
    },
    country:{
        type:String,
        default:'',
    }

});


//We are getting user id like this {id} rather than {__id} so it can be more user friendly
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})


//Enable the virtuals to be true
userSchema.set('toJSON',{
    virtuals:true,
})


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
