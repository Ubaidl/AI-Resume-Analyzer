import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);

        return res.status(401).json({
            message: "Invalid token."
        });
    }
};

export default authenticateToken;