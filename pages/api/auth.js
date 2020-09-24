import { findUser } from '../../lib/user';
import { validate } from '../../lib/password';

export default async (req, res) => {
  if (req.method === 'POST') {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await findUser(user.email);
    if (!result) {
      res.statusCode = 500;
      res.json({ error: 'User does not exist' });
      return;
    }
    const equality = await validate(user.password, result.hashedpassword);
    if (equality) {
      res.statusCode = 200;
      res.json({ message: 'success' });
      return;
    } else {
      res.statusCode = 500;
      res.json({ error: "Invalid password! Try again." });
    }
  }
}