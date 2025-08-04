// routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db/mysql';
import { generateToken } from '../utils/jwt';
import { verifyToken } from '../middleware/auth';

const router = Router();

// POST /api/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [empRows]: any = await pool.query(
      'SELECT id FROM emprecords WHERE email = ?',
      [email]
    );
    if (empRows.length === 0) {
      return res.status(404).json({ message: 'Email not in company records' });
    }

    const emp_id = empRows[0].id;

    const [existing]: any = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password, emp_id) VALUES (?, ?, ?)',
      [email, hashedPassword, emp_id]
    );

    return res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.query(
      'SELECT u.*, e.FirstName, e.LastName, e.Designation FROM users u JOIN emprecords e ON u.emp_id = e.id WHERE u.email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not registered' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ emp_id: user.emp_id, email: user.email });

    return res.status(200).json({
      token,
      user: {
        id: user.emp_id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Designation: user.Designation,
        email: user.email,
        token
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/me
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const { email } = req.user as { email: string };

  try {
    const [rows]: any = await pool.query(
      'SELECT u.*, e.FirstName, e.LastName, e.Designation FROM users u JOIN emprecords e ON u.emp_id = e.id WHERE u.email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];

    return res.status(200).json({
      user: {
        id: user.emp_id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Designation: user.Designation,
        email: user.email,
        token: req.headers.authorization?.split(' ')[1] || ''
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
