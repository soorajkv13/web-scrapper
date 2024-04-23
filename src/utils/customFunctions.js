let  removeAlphaCharacters = (str) => {
    return str.replace(/[a-zA-Z₹]/g, '').split(' ').join('');
}

module.exports = {
    removeAlphaCharacters
};
  