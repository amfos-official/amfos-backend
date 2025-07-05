import express from 'express';
import { saveAppointment, getAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/saveAppointment', saveAppointment);
router.get('/appointments', getAppointments);

export default router;
