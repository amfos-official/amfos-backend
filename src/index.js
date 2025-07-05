import express from "express";
import cors from "cors";
import paymentRouter from "./routes/paymentRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
const PORT = process.env.PORT || 4000;


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', paymentRouter);
app.use('/api', appointmentRouter);

app.get('/', (req, res) => {
    res.send('Basic server is running');
});


app.listen(PORT, () => console.log(`Server running on ${PORT}`));