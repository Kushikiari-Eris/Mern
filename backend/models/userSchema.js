const mongoose = require('mongoose')

//ito yung mga kailangan input sa form natin
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//yung userchema which is yung nasa taas lang nitong command nato is ipapasok lang natin sya dito mismo sa line of code nato
const User = mongoose.model('User', userSchema)


//exports para maging accessible sya sa kahit saan
module.exports = User 