import express, { Request, Response } from 'express';

import addStore from '../controllers/addStore';
import getStore from '../controllers/getStore';
import getSingleStore from '../controllers/getSingleStore';
import bookSlot from '../controllers/bookSlot';
import { extractUserRole } from '../middleware/roleMiddleware';
import getAllUsers from '../controllers/getAllUsers';
import updateRole from '../controllers/updateRole';
import fetchEmployee from '../controllers/fetchEmployee';
import sendEmails from '../controllers/sendEmails';

const router = express.Router();


//authRoutes
router.post("/addstore",addStore)
router.get("/addstore",getStore)
router.get("/getstore/:id",getSingleStore)
router.post("/appointments/book",bookSlot)
router.get("/getusers",extractUserRole,getAllUsers)
router.patch("/addstore/:id",updateRole)
router.get("/fetchemployee",fetchEmployee)
router.post("/sendemails/:id",sendEmails)









export default router