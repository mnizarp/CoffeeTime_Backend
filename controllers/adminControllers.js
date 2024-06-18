import {User} from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await User.findOne({ email, role: 'Admin' });
      if (admin && (await admin.matchPasswords(password))) {
        const token = generateToken(admin._id);
        res.status(200).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          token,
        });
      } else {
        res.status(402).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(400);
      console.log("admin login failed");
    }
  };