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

export const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Refresh token missing" });

  const decoded = verifyToken(token, process.env.JWT_REFRESH_SECRET); // throws if invalid

  const newAccessToken = generateAccessToken(decoded);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.status(200).json({ accessToken: newAccessToken });
};

export const clearToken =  (req, res) => { //for idk yet, i have this logout logic in auth.js
    res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
  });

  res.status(200).json({ message: "Logged out" });
};




/* 
    // when verifying access token
    verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);

    // when verifying refresh token
    verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
*/