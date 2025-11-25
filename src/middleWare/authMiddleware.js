import jwt from 'jsonwebtoken';


// A single middleware for authentication and authorization
export const protect = (roles = []) => {
  return (req, res, next) => {
    // 1. Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // 2. Verify the token
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      console.log(payload);

      // Attach user to the request
      req.user = payload.user;
      req.user=payload;

      // 3. Check for roles (Authorization)
      // If roles are provided, check if the user has one of them
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Forbidden: You do not have the required permissions.' });
      }

      // 4. If all checks pass, proceed
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};