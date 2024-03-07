import express from 'express'
import { BookingRooms, allCustomer, bookedRoomDetails, createRoom, deleteRoomById } from '../Controller/roomcontroller.js'

const router = express.Router()

router.get('/roomapi', bookedRoomDetails)
router.get('/customer', allCustomer)
router.post('/create', createRoom)
router.delete('/delete/:id', deleteRoomById)
router.put('/put/:id',BookingRooms)
export default router