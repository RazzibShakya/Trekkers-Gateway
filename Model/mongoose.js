const mongoose = require('mongoose');

//connecting with database using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/Trekkers_Gateway', {
 useNewUrlParser: true,
 useCreateIndex: true,
 useFindAndModify:false
})

