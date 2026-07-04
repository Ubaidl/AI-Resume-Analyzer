import user from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const isuserexist = await user.findOne({
        $or: [{ name }, { email }]
    });

    if (isuserexist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await user.create({
        name,
        email,
        password: hashedPassword

    })

    res.status(201).json({
        message: "User registered successfully",
        user: newuser,
    });




}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

    return res.status(200).json({
      message: "Login successful",
      existingUser: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}  


const getcurrentUser = async (req, res) => {
  const currentUser = await user.findById(req.user.id).select("-password");

  res.status(200).json({ user: currentUser });
};


const getallusers = async (req, res) => {
    const users = await user.find().select("-password");
    res.status(200).json({ users });
}


export { registerUser, loginUser ,logoutUser,getcurrentUser,getallusers};

