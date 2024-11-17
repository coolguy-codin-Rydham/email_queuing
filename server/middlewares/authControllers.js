import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserModel } from "../models/index.js";
config();


export const LoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "Email and Password are required"
    })
  }

  try {
    const user = loginController(email);

    if(!user){
      return res.status(404).json({
        message:"User not Found"
      })
    }

    const isPasswordValid = await bcrypt.verify(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({
        message:"Invalid Email or Password",
      })
    }

    const accessToken = createAccessToken(email);
    const refreshToken = createRefreshToken(email);

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

    return res.status(200).json({
      message:"Login Successful",
      user:user
    })

  }catch(e){
    console.error("Error During login", e.message);
    return res.status(500).json({
      message:"Internal Server error"
    })
  }
  
}



export const SignupController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const { email, password, name, phoneNumber, role, dob, gender } = req.body;

    if (!email || !password || !name || !phoneNumber || !dob || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const DateOfBirth = new Date(dob);
    if (isNaN(DateOfBirth.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const userData = {
      email,
      password,
      name,
      phoneNumber,
      role,
      dob: DateOfBirth,
      gender,
      profilePicture: imageUrl,
    };

    const user = await signupController(userData);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginController = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  }
  catch (e) {
    console.log("Error Finding User:",e)
    throw e;
  }

}



const signupController = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = await UserModel.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
}

const createAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const createRefreshToken = (data) => {
  return jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
