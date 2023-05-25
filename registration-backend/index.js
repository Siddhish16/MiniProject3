// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
// import bodyParser from "body-parser"
// import multer from "multer"

 
// const app = express()
// const upload = multer();
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

// mongoose
//   .connect("mongodb+srv://siddhihagawane16:siddhi2002@cluster0.mkhmzaz.mongodb.net/reactRegistration?retryWrites=true&w=majority")
//   .then(() => {
//     console.log("DB-connection-successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });







// // User Schema
//   const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     reEnterPassword: {
//         type: String,
//         required: true
//     }
//   })

//   const User = new mongoose.model("User", userSchema)



// //vendor schema
//   const vendorSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     reEnterPassword: {
//         type: String,
//         required: true
//     }
//   })
  
//   const Vendor = new mongoose.model("Vendor", vendorSchema)




// //user Registration
//   app.post("/register", async(req,res)  =>  {
//     try{
//         const {name, email, password,reEnterPassword} = req.body
//         const user = new User({
//                         name, 
//                         email, 
//                         password,
//                         reEnterPassword
//                     }) 
//         const register = await user.save()
//         res.send({message: "Successful"})
//     } catch(e){
//         res.send({message:"already registered"})
//     }
//   })


//   //vendor Registration
//   app.post("/registervendor", async(req,res)  =>  {
//     try{
//         const {name, email, password,reEnterPassword} = req.body
//         const vendor = new Vendor({
//                         name, 
//                         email, 
//                         password,
//                         reEnterPassword
//                     }) 
//         const register = await vendor.save()
//         res.send({message: "Successful"})
//     } catch(e){
//         res.send({message:"already registered"})
//     }
//   })


//   //user login
// app.post("/login", async(req,res) => {
//     try{
//         const {email, password} = req.body
//         const usermail = await User.findOne({email:email});

//         if(usermail.password === password){
//             res.send({message: "Successful", usermail});
//         }else{
//             res.send({message: "User Not Found"});
//         }
//     }catch(e){
//         res.send({message: "User Not Found"});
//     }
// })



// //vendor login
// app.post("/loginvendor", async(req,res) => {
//   try{
//       const {email, password} = req.body
//       const usermail = await Vendor.findOne({email:email});

//       if(usermail.password === password){
//           res.send({message: "Successful", usermail});
//       }else{
//           res.send({message: "User Not Found"});
//       }
//   }catch(e){
//       res.send({message: "User Not Found"});
//   }
// })






// app.listen(9000,() => {
//     console.log("Be started at port 9000")
// })





import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("mongodb+srv://siddhihagawane16:siddhi2002@cluster0.mkhmzaz.mongodb.net/reactRegistration?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reEnterPassword: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reEnterPassword: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

vendorSchema.index({ location: "2dsphere" }); // Index for geospatial queries

const Vendor = new mongoose.model("Vendor", vendorSchema);

// User Registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, reEnterPassword } = req.body;
    const user = new User({
      name,
      email,
      password,
      reEnterPassword,
    });
    const register = await user.save();
    res.send({ message: "Registration successful" });
  } catch (e) {
    res.send({ message: "Already registered" });
  }
});

// Vendor Registration
app.post("/registervendor", async (req, res) => {
  try {
    const { name, email, password, reEnterPassword, latitude, longitude } = req.body;
    const vendor = new Vendor({
      name,
      email,
      password,
      reEnterPassword,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    const register = await vendor.save();
    res.send({ message: "Registration successful" });
  } catch (e) {
    res.send({ message: "Already registered" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && user.password === password) {
      res.send({ message: "Login successful", user });
    } else {
      res.send({ message: "User not found" });
    }
  } catch (e) {
    res.send({ message: "User not found" });
  }
});

// Vendor Login
app.post("/loginvendor", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email: email });

    if (vendor && vendor.password === password) {
      res.send({ message: "Login successful", vendor });
    } else {
      res.send({ message: "Vendor not found" });
    }
  } catch (e) {
    res.send({ message: "Vendor not found" });
  }
});

// Find Nearby Shops
app.get("/nearby-shops", async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const nearbyShops = await Vendor.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 2000000,
        },
      },
    });
    res.status(200).json({ shops: nearbyShops });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nearby shops" });
  }
});


app.listen(9000, () => {
  console.log("Server started at port 9000");
});
