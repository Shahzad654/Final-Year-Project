import jwt from 'jsonwebtoken'
const jwtKey = "g_epco"; 

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export { verify as userVerify }; 
