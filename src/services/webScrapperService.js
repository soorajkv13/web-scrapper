// services/webScrapperService.js

const webScrapperRepository = require("../repositories/webScrapperRepository.js");

// store the products
exports.saveWebScrapProducts = async (data) => {
    return await webScrapperRepository.saveWebScrapProducts(data);
};