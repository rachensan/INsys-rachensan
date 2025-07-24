import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/*

  const user = { school_id: '2023123', role: 'student' };

  // Login successful — return token:
  const token = generateToken(user);
  res.json({ token });

*/

