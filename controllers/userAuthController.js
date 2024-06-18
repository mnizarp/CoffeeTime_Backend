import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export const create_user = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userExists = await User.findOne({ email });
  
      if (!userExists) {
        const newuser = new User({
          username,
          email,
          password,
          role:'User'
        });
  
        await newuser.save();
        
        res.status(200).json({
          _id: newuser._id,
          username: newuser.username,
          email: newuser.email,
        });
      } else {
        res.status(401).json({ message: "user already exists" });
      }

    } catch (error) {
      console.log(error);
      res.status(400);
    }
  };
  

  export const login_user = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email,role:'User' });
      if (user && (await user.matchPasswords(password))) {

          const token = generateToken(user._id);
          res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
          });    
      } else {
        res.status(401).json({ message: "invalid email or password" });
      }
    } catch (error) {
      res.status(400);
    }
  };
  