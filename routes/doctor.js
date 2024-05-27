import express from 'express'
import {updateDoctor,deleteDoctor,getSingleDoctor,getAllDoctor} from '../controllers/doctorController.js'
import { authenticate,restrict } from '../auth/verifyToken.js'
import reviewRoute from './review.js'
const router=express.Router()

//nested route
router.use('/:doctorId/reviews',reviewRoute)

router.get('/:id', authenticate,restrict(['doctor']),getSingleDoctor)
router.get('/', authenticate,restrict(['admin']),getAllDoctor)
router.put('/:id', authenticate,restrict(['doctor']),updateDoctor)
router.delete('/:id', authenticate,restrict(['doctor']),deleteDoctor)

export default router