import Express from 'express';
import timeout from 'connect-timeout';
import cors from 'cors';
import routes from './routes/routes';
import authRoutes from './routes/auth';
import commentRoutes from './routes/comments';
import likesRoutes from './routes/likes';
import followRoutes from './routes/follow';
import postsRoutes from './routes/posts';
import userRoutes from './routes/users';
import upgradeResponse from './utils/responseConstructor';
import { logger } from './utils/logger';
import postgresConnection from './utils/postgres';
import dotenv from 'dotenv-safe';
import { checkJWT } from './utils/authHelpers';

const port = process.env.PORT;

dotenv.config();

// Initialize the Express App
const app = Express();
postgresConnection();

app.use(timeout('60s'));
app.use(cors());

app.use(Express.json({ limit: '50mb' }));
app.use(Express.urlencoded({ limit: '50mb' }));

upgradeResponse(app).use(routes);
upgradeResponse(app).use(authRoutes);

app.use(checkJWT());

upgradeResponse(app).use(commentRoutes);
upgradeResponse(app).use(likesRoutes);
upgradeResponse(app).use(followRoutes);
upgradeResponse(app).use(postsRoutes);
upgradeResponse(app).use(userRoutes);

// Start App
app.listen(port, (error?: Error) => {
	if (error) {
		logger.log('Something Went Wrong while starting the server', error);
		return;
	}
	console.info(`Server running at ${port}`);
});

export default app;
