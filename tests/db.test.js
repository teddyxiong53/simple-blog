var dataModel = require('../models/data-models')

// dataModel.readTable('posts', function(data) {
//     console.log(data)
// })


// dataModel.insertRow('users', {
//     username: 'aa',
//     password: 'aa',
//     email: 'aa',
//     avatar: 'aa'
// }, function() {
//     console.log(arguments)
// })

dataModel.queryRow('users', {
    username: 'teddyxiong53'
}, function() {
    // console.log(this)
})