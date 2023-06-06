import asyncHandler from "express-async-handler"
import User from "../model/user.js"
import Order from "../model/order.js"
import { generateToken } from "../config/generateToken.js"

const register = asyncHandler(async(req,res) => {
    const { name, phone_number, password } = req.body;
    const user = await User.findOne({ phone_number })
    if(!user){
        const newUser = await User.create({
            name,
            phone_number,
            password
        })
        if(newUser){
            res.status(201).json({
                message:"User created"
            })
        }
        else{
            res.status(400).json({
                message:"User not created"
            })
        }
    }
    else{
        res.status(400).json({
            message:"User already exists"
        })
    }
})

const login = asyncHandler(async(req,res) => {
    const { phone_number, password } = req.body
    const user = await User.findOne({ phone_number })
    if(user){
        if(await user.matchPassword(password)){
            const resUser = await User.find({ phone_number }).select("-password")
            res.status(200).json({
                message:"Logged in",
                ...resUser,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(401).json({
                message:"Bad credentials"
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})

const addOrder = asyncHandler(async(req,res) => {
    const user = await User.findOne({ _id:req.user._id })
    const { sub_total } = req.body
    if(user){
        const order = await Order.create({
            user_id:user._id,
            phone_number:user.phone_number,
            sub_total
        })
        if(order){
            res.status(201).json({
                message:"Order created successfully"
            })
        }
        else{
            res.status(500).json({
                message:"Error creating order"
            })
        }
    }
    else{
        res.status(401).json({
            message:"not logged in"
        })
    }
})

const getOrders = asyncHandler(async(req,res) => {
    const user_id = req.query.user_id
    const orders = await Order.find({ user_id })
    if(orders){
        res.status(200).json({
            orders
        })
    }
    else{
        res.status(500).json({
            message:"error finding orders"
        })
    }
}) 

export { register, login, addOrder, getOrders }
