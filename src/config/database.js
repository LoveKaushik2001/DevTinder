const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lovekaushik2001:jGS7hmlHq0TucoBp@cluster0.he7mrkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

module.exports = connectDB;