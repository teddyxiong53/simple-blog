var dataModel = require('../models/data-models')

dataModel.readTable('posts', function(data) {
    console.log(data)
})