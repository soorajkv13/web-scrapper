const express = require("express");
const rateLimit = require('express-rate-limit');
const morgan = require("morgan");
const {connectToDB} = require('./db');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Set the server's time zone to UTC
process.env.TZ = 'UTC';

/* Limit the request or throttling */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: 'Too many requests, please try again later'
   }
});

app.use(limiter);
app.use(express.json());
app.use(morgan("dev")); 

const routes = require("./src/routes/webScrapperRoute");
app.use('/', routes);

/* connect mongo then start server */
const start = async () => { 
  try { 
      await connectToDB();
      app.listen(PORT, () => {
        console.log("Server started listening on port : ", PORT);
      });
  } catch (error) { 
      console.log(error); 
     
  } 
}; 

start();

/* Error handling */
// 404 
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
// all other errors 
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status : errorStatus
    }
  });
});