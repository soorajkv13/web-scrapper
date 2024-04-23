const axios = require('axios');
const cheerio = require('cheerio');
const {removeAlphaCharacters} =  require('../utils/customFunctions'); 
/**
 * 
 * @param {*} url - target website url 
 * @returns - scrapped products as array 
 */
async function webScrapper(url) {

    const data = await axios.get(url);
    const $ = cheerio.load(data.data);
    let results = [];
    $(`.eSUhOk`).each((index, element) => {

        const productName = $(element).find('p:first').text();
        const productPrice = removeAlphaCharacters($(element).find('.jeYrwf').text());
        const userRating = Number($(element).find('.kuvnkX').text());
        const numberOfReviews = Number(removeAlphaCharacters($(element).find('.jZyLzI').text()));

        results.push(
            {
                productName,
                productPrice, 
                userRating,
                numberOfReviews
            });
      });

   
    if(results.length < 1){
        throw new Error("No products found");
    }

    return results;
}

module.exports = {
    webScrapper
}