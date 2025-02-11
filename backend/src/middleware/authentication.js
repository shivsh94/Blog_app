import jwt from "jsonwebtoken";

export const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded);
        
        req.userID = decoded.id;

        next()
}
catch (error) {
    console.log(error);
    
    return res.status(400).json({message: "Invalid token"});
    }
    }