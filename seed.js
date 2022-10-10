const mongoose = require("mongoose");
// const { passwordHash, passwordCompare } = require("../src/helper/hashing");
const User = require("./models/user.models");
const bcrypt = require("bcrypt");

const connect = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Move_me",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
connect();

// const hashedPassword = passwordHash();
(async () => {
const data = {
  // {
  
  // },
  // {
    firstName: "Kemisola",
    lastName: "Doe",
    email: "dommy@gmail.com",
    password:  "1234567",
    phoneNumber: "09070195672",
  // },
  // {
    // firstName: "Sholla",
    // lastName: "ALlyson",
    // email: "sholla@gmail.com",
    // password:  "1234567",
    // phoneNumber: "09070795672",
  // },
  // {
  //   firstName: "Folu",
  //   lastName: "Bolu",
  //   email: "sodiq@gmail.com",
  //   password: "1234567",
  //   phoneNumber: "09090895672",
  // },

  
    // firstName: "Tolu",
    // lastName: "Makinwa",
    // email: "toluige@gmail.com",
    // password:"1234567",
    // phoneNumber: "09090995672",
  // },
};
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const hashedPassword = await bcrypt.hash(data.password, salt);
 data.password = hashedPassword;
console.log(data.password);
})();
(async () => {
  const data = {
    firstName: "John",
    lastName: "Doe",
    email: "doe@gmail.com",
    password: "1234567",
    phoneNumber: "09070895072",
    role: "admin",
  // },
};
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const hashedPassword = await bcrypt.hash(data.password, salt);
 data.password = hashedPassword;
console.log(data.password);

// seed
const seedDatabase = async () => {
  try {
    // await User.deleteMany({});
    await User.insertMany(data);
    console.log("Seeding success");
  } catch (error) {
    console.log(error);
  }
};

seedDatabase().then(() => {
  mongoose.connection.close();
});
})();
