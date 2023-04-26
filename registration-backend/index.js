import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import multer from "multer"


// import passport from "passport"
// import cookieSession from "cookie-session"
// import ("dotenv").config()
// const passportSetup = require("./passport");
// import passportSetup from "./passport"
// const authRoute = require("./routes/auth");
// import authRoute from "./routes/auth"

// app.use(
//     cookieSession({
//         name:"session",
//         keys:["cyberwolve"],
//         maxAge:24*60*60*100,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         methods: "GET,POST,PUT,DELETE",
//         credentials:true,
//     })
// );

// app.use("/auth",authRoute);

// const port = process.env.PORT || 9000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));



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





  

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import passport from "passport";
// import path from "path";
// import cookieSession from "cookie-session";
// import dotenv from "dotenv";

// import authRoute from "./routes/auth.js";

// const { passportSetup } = require("./passport.js");

// dotenv.config();
 
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Session Configuration
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [process.env.SESSION_KEY],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

// // Passport Configuration
// app.use(passport.initialize());
// app.use(passport.session());
// passportSetup(passport);

// // Routes
// app.use("/auth", authRoute);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("DB-connection-successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // User schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   reEnterPassword: {
//     type: String,
//     required: true,
//   },
//   googleId: {
//     type: String,
//   },
// });

// // User model
// const User = mongoose.model("User", userSchema);

// // Registration route
// app.post("/register", (req, res) => {
//   const { name, email, password, reEnterPassword } = req.body;
//   if (!name || !email || !password || !reEnterPassword) {
//     return res
//       .status(422)
//       .json({ error: "Please fill all the fields!" });
//   }
//   if (password !== reEnterPassword) {
//     return res.status(422).json({ error: "Passwords do not match!" });
//   }
//   User.findOne({ email: email })
//     .then((userExists) => {
//       if (userExists) {
//         return res
//           .status(422)
//           .json({ error: "User already exists with that email!" });
//       }
//       const user = new User({
//         name,
//         email,
//         password,
//         reEnterPassword,
//       });
//       user
//         .save()
//         .then(() => {
//           res.json({ message: "Registration successful!" });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ error: "Internal server error!" });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: "Internal server error!" });
//     });
// });

// // Login route
// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials!" });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.json({ message: "Login successful!" });
//     });
//   })(req, res, next);
// });

// Google login routes
// app.get(
 

//   "/auth/google",
//   passport.authenticate
// )


