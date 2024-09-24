import jwt from "jsonwebtoken";
export const isAunthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    
    if (!token) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "token not verified" });
    }
    
    
    req.id = decode.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};
