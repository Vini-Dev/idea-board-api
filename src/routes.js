import { Router } from 'express';

import IdeaController from './App/Controller/IdeaController';

const routes = new Router();

// Test
routes.get('/test', (req, res) => {
  return res.json({ test: true });
});

// Idea
routes.get('/idea/:id', IdeaController.index);
routes.get('/idea', IdeaController.list);
routes.post('/idea', IdeaController.store);
routes.put('/idea', IdeaController.update);
routes.delete('/idea/:id', IdeaController.delete);

export default routes;
