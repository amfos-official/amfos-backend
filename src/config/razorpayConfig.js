import razorpay from "razorpay";
import 'dotenv/config';

export function createRazorpayInstance() {
    return new razorpay({
        key_id: process.env.RAZORPAY_ID_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
}

