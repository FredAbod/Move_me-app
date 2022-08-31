require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const  app  = express();
const limiter = require('./helper/rateLimiter');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');


const port = process.env.PORT || 6262;
connectDB();
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);


app.get('/', (req, res) => res.send('HOME PAGE'));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.all("*", (req, res) => {
    return res.status(404).json({ message: "Oops page not found" });
  });
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});

