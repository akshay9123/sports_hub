import express from 'express'
const router = express.Router()

import { loginUserRequest, logoutUserRequest, registerUserRequest } from '../controllers/User.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'


// Routes for registering the user 
router.post("/registeruser",protectRoute, registerUserRequest)

// Routes for login the user
router.post("/loginuser", loginUserRequest)

// Routes for logout of the user
router.get("/logout", logoutUserRequest)


export default router