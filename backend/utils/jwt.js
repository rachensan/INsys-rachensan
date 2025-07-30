import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign( { school_id: user.school_id, role: user.role }, process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Access denied. No token.' });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
};




/* 
    // when verifying access token
    verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);

    // when verifying refresh token
    verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
*/