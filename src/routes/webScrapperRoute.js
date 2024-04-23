// routes/webScrapperRoute.js
const express = require("express");
const router = express.Router();
const scrapperController = require("../controllers/webScrapperController");


/*** define the routes **/
router.get("/web-scrapper",scrapperController.webScrapper);


// check server is available 
router.get("/ping",(req, res) => {  
    return res.send({
      status: "Healthy",
    });
  });

module.exports = router;