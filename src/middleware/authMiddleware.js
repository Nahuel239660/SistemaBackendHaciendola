const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Asegúrate de que `decoded` contenga `userId`
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

module.exports = verifyToken;
