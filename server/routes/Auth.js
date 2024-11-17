import express from "express";
import bcrypt from "bcrypt";
import upload from "../utils/multer.js";
import { UserModel } from "../models/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", upload.single("image"), async (req, res) => {
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

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const imageUrl = `/uploads/${req.file.filename}`;

        const user = await UserModel.create({
            email,
            password: hash,
            name,
            phoneNumber,
            role,
            dob: DateOfBirth,
            gender,
            profilePicture: imageUrl,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            },
        });
    } catch (e) {
        console.error("Error during signup:", e);

        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation error",
                errors: e.errors,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
