import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import multer from "multer"


const app = express()
const upload = multer();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose
  .connect("mongodb+srv://siddhihagawane16:siddhi2002@cluster0.mkhmzaz.mongodb.net/reactRegistration?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB-connection-successful");
  })
  .catch((err) => {
    console.log(err);
  });









  const dataSchema = new mongoose.Schema({
    text: String,
    image: Buffer,
  });
  
  const Data = mongoose.model("Data", dataSchema);

  app.post("/homePage", upload.single("image"), async (req, res) => {
    // create a new data object with the text and image data
    const newData = new Data({
      text: req.body.text,
      image: req.file.buffer,
    });
  
    try {
      // save the data object to the database
      await newData.save();
      res.status(201).send("Data saved successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error saving data to the database.");
    }
  });







  const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    reEnterPassword: {
        type: String,
        required: true
    }
  })

  const User = new mongoose.model("User", userSchema)




app.post("/login", async(req,res) => {
    try{
        const {email, password} = req.body
        const usermail = await User.findOne({email:email});

        if(usermail.password === password){
            res.send({message: "Successful", usermail});
        }else{
            res.send({message: "User Not Found"});
        }
    }catch(e){
        res.send({message: "User Not Found"});
    }
})

app.post("/register", async(req,res)  =>  {
    try{
        const {name, email, password,reEnterPassword} = req.body
        const user = new User({
                        name, 
                        email, 
                        password,
                        reEnterPassword
                    }) 
        const register = await user.save()
        res.send({message: "Successful"})
    } catch(e){
        res.send({message:"already registered"})
    }
})

app.listen(9000,() => {
    console.log("Be started at port 9000")
})


