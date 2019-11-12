import { Router } from 'express';

const routes = new Router();

// test
routes.get('/test', (req, res) => {
    return res.json({ test: true });
});

export default routes;
