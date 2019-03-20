module.exports = (length) => {
    length < 2 ? length = 2 : 0;
    length > 35 ? length = 35 : 0;

    return Math.random().toString(36).substring(2, length) + Math.random().toString(36).substring(2, length);
};