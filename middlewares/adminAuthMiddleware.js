import jwt from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { JwtPayload } = pkg;

const adminProtect = async(req, res, next) =>{
  try {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY
        ) ;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized,invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized,no token");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};

export { adminProtect };
