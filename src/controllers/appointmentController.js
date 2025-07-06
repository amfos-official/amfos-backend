import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const MAX_APPOINTMENTS = 5;
const appointments = [];

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'support@amfos.in',
    pass: 'Niwaz@649' // Replace with your actual email password or app password
  }
});

/**
 * Send appointment confirmation email to user and notification to support
 */
const sendAppointmentEmails = async (appointment) => {
  const { name, email, date, time } = appointment;

  const userMailOptions = {
    from: '"AMFOS Support" <support@amfos.in>',
    to: email,
    subject: 'Appointment Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Dear ${name},</h2>
        <p>Thank you for choosing <strong>AMFOS</strong> for your tax consultation needs.</p>
        <p>We are pleased to confirm your appointment scheduled on:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Please ensure to be available at the scheduled time. If you have any questions or need to reschedule, feel free to contact us at +91 90643 63937, 033 6618 3035.</p>
        <p>We look forward to assisting you!</p>
        <br/>
        <p>Best regards,<br/><strong>AMFOS Team</strong></p>
      </div>
    `
  };

  const supportMailOptions = {
    from: '"AMFOS Support" <support@amfos.in>',
    to: 'support@amfos.in',
    subject: 'New Appointment Booked',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">New Appointment Booked</h2>
        <p>A new appointment has been booked with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Please ensure to follow up accordingly.</p>
      </div>
    `
  };

  await transporter.sendMail(userMailOptions);
  await transporter.sendMail(supportMailOptions);
};

/**
 * Save appointment details
 * Expects JSON body with: name, email, date, time
 */
export const saveAppointment = async (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const appointment = {
    id: uuidv4(),
    name,
    email,
    date,
    time,
    createdAt: new Date()
  };

  // Keep only the latest MAX_APPOINTMENTS appointments
  if (appointments.length >= MAX_APPOINTMENTS) {
    appointments.shift();
  }
  appointments.push(appointment);

  // ✅ Respond immediately
  res.status(201).json({ success: true, message: 'Appointment saved', appointment });

  // 📤 Then send emails in background
  sendAppointmentEmails(appointment).catch(error => {
    console.error('Email sending failed:', error);
  });
};


/**
 * Get all appointments (for testing)
 */
export const getAppointments = (req, res) => {
  return res.status(200).json({ success: true, appointments });
};
