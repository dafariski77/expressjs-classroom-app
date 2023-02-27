const mongoose = require('mongoose');
const {urlDB} = require('../Configs')

mongoose.set('strictQuery', false)
mongoose.connect(urlDB)

const db = mongoose.connection

module.exports = db