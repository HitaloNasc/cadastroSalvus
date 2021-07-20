const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataShema = new mongoose.Schema({
    username: String,
    email: String,
    userType: {
        type: Number,
        default: 2
    },
    password: String,
    tel: String,
    gender: String,
    cpf: String,
    address: String,
    cep: String,
    profession: String,
    registration: String,
    primaryOccupation: String,
    secondaryOccupation: String,
    birth: Date
}, {
    timestamps: true
})

DataShema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

DataShema.pre('findOneAndUpdate', function (next) {
    var passWord = this.getUpdate().password + ''
    if (passWord.length < 55) {
        this.getUpdate().password = bcrypt.hashSync(passWord, 10)
    }
    next()
})

DataShema.methods.isCorrectPassword = function (passwordTest, callback) {
    bcrypt.compare(passwordTest, this.password, function (err, same) {
        if (err) {
            callback(err)
        } else {
            callback(err, same)
        }
    })
}

const users = mongoose.model('Users', DataShema)
module.exports = users