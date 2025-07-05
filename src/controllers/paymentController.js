import { createRazorpayInstance } from "../config/razorpayConfig.js";
import crypto from "crypto";
import 'dotenv/config';

export const createOrder = async (req, res) => {
    const razorpayInstance = createRazorpayInstance();
    const { amount } = req.body;
    if (amount === undefined) {
        return res.status(400).json({
            success: false,
            message: "Amount is required",
        });
    }
    const options = {
        amount: amount * 100,
        currency: "INR",
    };
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error("Razorpay order creation error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error creating order: " + err.message,
                });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
};

export const verifyPayment = async (req, res) => {
    const { payment_id, order_id, signature } = req.body;
    const secret = process.env.RAZORPAY_SECRET_KEY;


    //create hmac object
    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id + '|' + payment_id);

    const generatedSignature = hmac.digest("hex");


    if (generatedSignature == signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }
};

