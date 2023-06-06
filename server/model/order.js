import { Schema, model } from "mongoose"

const order = Schema({
    user_id:{
        type:Schema.Types.ObjectID,
        ref:"users"
    },
    phone_number:{
        type:String,
        required:true
    },
    sub_total:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Order = model("orders",order)

export default Order