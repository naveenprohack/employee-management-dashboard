import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const demoUser = {
  id: 'admin-user',
  name: 'Admin User',
  email: 'admin@company.com',
  role: 'HR Manager',
};

const demoPasswordHash = bcrypt.hashSync('admin123', 10);

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email and password are required.');
      error.statusCode = 400;
      throw error;
    }

    const isDemoUser = email.toLowerCase() === demoUser.email;
    const isPasswordValid = await bcrypt.compare(password, demoPasswordHash);

    if (!isDemoUser || !isPasswordValid) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        sub: demoUser.id, 
        email: demoUser.email,
        role: demoUser.role,
      },
      process.env.JWT_SECRET || 'dev-only-secret',
      { expiresIn: '8h' },
    );

    res.json({
      token,
      user: demoUser,
    });
  } catch (error) {
    next(error);
  }
}
