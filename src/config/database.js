const mongoose = require('mongoose');

const connectDB = async () => {
        await mongoose.connect(
            "mongodb+srv://noobProject:YjLCvcPx4YXXSPDw@firstcluster.i4zrw5o.mongodb.net/userDB"
        );
    }


module.exports = connectDB;