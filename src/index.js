import express from "express";
import cors from "cors";
import http from "http";
import paymentRouter from "./routes/paymentRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', paymentRouter);
app.use('/api', appointmentRouter);

app.get('/', (req, res) => {
    res.send('Ok');
});

// Create server with custom timeout settings
const server = http.createServer(app);
server.keepAliveTimeout = 120000;    // 120s
server.headersTimeout = 120000;      // 120s

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});
