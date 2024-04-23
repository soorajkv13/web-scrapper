//../controllers/webScrapperController

const {webScrapper} =  require('../utils/scrapTheSite'); 
const webScrapperService = require('../services/webScrapperService');
const retry = require('async-retry');
const logger = require('../utils/logger');

exports.webScrapper = async (req, res) => {

    try{
        
        // set number of retries 
        const retry_count = process.env.WEB_SCRAP_RETRY_COUNT;
        const WEB_SCRAP_URL = process.env.WEB_SCRAP_URL;
        logger.log({level: 'info',message: 'webscrapping '+WEB_SCRAP_URL});
        await retry(
            async (bail) => {
                // scrap the URL 
                const result = await webScrapper(WEB_SCRAP_URL);
                
                // store the data 
                const Products = await webScrapperService.saveWebScrapProducts(result); 
                res.json({Products})
                
            },
            { 
                retries: retry_count, 
                onRetry: (err, number) => { 
                    logger.log({
                        level: 'info',
                        message: err+' | webscrapper retrying, Number of attempts '+number
                    });
                    if (number === retry_count) {
                        res.status(500).json({ message: err+', Failed after '+number+ ' attempts' });
                    }
                },
            }, 
                
            );
    } catch (err) {
        logger.log({level: 'error',message: err.message});
        res.status(500).json({ message : err.message } );
    }
}