const mongoose = require('mongoose')

mongoose.set('strictQuery', 'true') //strict query

const connection =  async (uri) => {
    await mongoose.connect(uri);

}

module.exports = connection