require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apicache = require('apicache');
const  app  = express();
const https = require('https');
const path = require('path');
const fs = require('fs');
const limiter = require('./helper/rateLimiter');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');


const port = process.env.PORT || 6262;
const https_port = process.env.HTTPS_PORT || 6600;
connectDB();
let cache = apicache.middleware;
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
const options = {
    key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
  };
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cache('1 minutes'));

app.get('/', (req, res) => res.send('HOME PAGE'));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.all("*", (req, res) => {
    return res.status(404).json({ message: "Oops page not found" });
  });
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
https.createServer(options, app).listen(https_port, () => {
    console.log(`HTTP/2 listening on port https://localhost:${https_port}`);
  });
