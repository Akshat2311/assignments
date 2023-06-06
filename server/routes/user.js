import { Router } from 'express'
import { getOrders, register, login, addOrder } from "../controller/user.js"
import { authenticate } from "../config/auth.js"

const router = Router()

router.post("/add-user",register)
router.post("/login-user",login)
router.post("/add-order",authenticate,addOrder)
router.get("/get-order",authenticate,getOrders)

export default router