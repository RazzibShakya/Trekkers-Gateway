const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({

    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:String
    },
    country:{
    type:String
    },
    address:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    })

userSchema.statics.Login = async (user22, pass) =>{

    const user1 = await User.findOne({username : user22, password : pass})
     return user1;
    }

    userSchema.methods.generateAuthToken = async function () {
        const user = this
         const token = jwt.sign({_id: user._id.toString() }, 'TOKEN')
         
          user.tokens = user.tokens.concat({ token :token })
          await user.save()
          return token
         } 
const User=mongoose.model('User',userSchema)
module.exports=User;