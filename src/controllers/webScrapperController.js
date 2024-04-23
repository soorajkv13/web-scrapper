//../controllers/webScrapperController

const {webScrapper} =  require('../utils/scrapTheSite'); 
const webScrapperService = require('../services/webScrapperService');
const retry = require('async-retry');
const logger = require('../utils/logger');

exports.webScrapper = async (req, res) => {

    try{
        // retry webscrapping if it fails 
        await retry(
            async (bail) => {
                
                // Scrap the URL 
                const scrappedProducts = await webScrapper(process.env.WEB_SCRAP_URL);

                if(scrappedProducts.length < 1 ){
                     bail(new Error('No products found'));
                     return;
                }

                // store the data 
                const Products = await webScrapperService.saveWebScrapProducts(scrappedProducts); 
                res.json({Products})
            },
            {
                onRetry: (err, number) => { 
                    logger.log({
                        level: 'info',
                        message: 'webscrapper retrying, Number of attempts'+number
                    });
                    if (number === 5) {
                        res.status(500).json({ message: err });
                    }
                },
                retries: process.env.WEB_SCRAP_RETRY_COUNT, // set number of retries 
            }
        );


    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        res.status(500).json({ message: err.message });
    }
}