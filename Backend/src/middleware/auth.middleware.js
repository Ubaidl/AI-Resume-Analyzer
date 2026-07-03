import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({ message: 'Invalid token.' });
    }
    req.user = decoded;
    next();


}
export default authenticateToken;
