import { Router } from 'express';

// Routes here

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'hello world' });
});

export default routes;
