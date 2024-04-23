// repositories/webScrapperRepository.js
const Product = require("../models/Products");

// save extracted data 
exports.saveWebScrapProducts = async (data) => {
    return await Product.create(data);
  };