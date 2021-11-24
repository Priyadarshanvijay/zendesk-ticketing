import Express from 'express';
import tickets from './tickets.js';
// import user from './routes/user';

const { Router } = Express;

export default () => {
	const app = Router();
	tickets(app);
	// user(app);

	return app
}