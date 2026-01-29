import jwt from 'jsonwebtoken';

/**
 * Optional authentication - attempts to decode token if present.
 * Does NOT fail on missing/invalid token - just continues without req.user.
 * Use for endpoints that work publicly but can enrich response for authenticated users.
 */
export const optionalProtect = () => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return next(); // No token, continue as guest
    }

    try {
      const token = authHeader.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
      }
    } catch (err) {
      // Invalid token, continue as guest (don't fail)
      console.log('[optionalProtect] Invalid token, continuing as guest');
    }
    next();
  };
};

export const protect = (roles = []) => {
  return (req, res, next) => {
    console.log('=== PROTECT MIDDLEWARE ===');
    console.log('Route:', req.originalUrl);
    console.log('Allowed Roles:', roles);
    // 1. Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // 2. Verify the token
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      console.log('Decoded Payload:', payload); // Debugging

      // FIX: Your token is flat (e.g., { id: '...', role: '...' })
      // So assign the whole payload directly to req.user
      req.user = payload;

      // 3. Check for roles (Authorization)
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        console.log('Forbidden: You do not have the required permissions.');
        console.log('User Role:', req.user.role);
        console.log('Required Roles:', roles);
        return res
          .status(403)
          .json({
            msg: 'Forbidden: You do not have the required permissions.',
          });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
