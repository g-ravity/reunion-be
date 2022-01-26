import Express, { NextFunction, Response } from 'express';
import timeout from 'connect-timeout';
import cors from 'cors';
import routes from './routes/routes';
import upgradeResponse from './utils/responseConstructor';
import { logger } from './utils/logger';
import postgresConnection from './utils/postgres';

const port = process.env.PORT;

// Initialize the Express App
const app = Express();
postgresConnection();

app.use(timeout('60s'));
app.use(cors());

app.use(Express.json({ limit: '50mb' }));
app.use(Express.urlencoded({ limit: '50mb' }));

upgradeResponse(app).use(routes);

// Start App
app.listen(port, (error?: Error) => {
	if (error) {
		logger.log('Something Went Wrong while starting the server', error);
		return;
	}
	console.info(`Server running at ${port}`);
});

export default app;
