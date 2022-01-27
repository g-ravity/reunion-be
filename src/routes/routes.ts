import { Request } from 'express';
import { loginUser } from '../api/auth/v1.login';
import { IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.getAsync('/health-check', async (req: Request, res: IResponse) => {
	res.send('Service is Up!');
});

router.postAsync('/authenticate', async (req: Request, res: IResponse) => {
	const data = await loginUser(req.body);
	res.create(data);	
});

router.postAsync('/follow/:id', async (req: Request, res: IResponse) => {
	res.send('Follow User');
});

router.postAsync('/unfollow/:id', async (req: Request, res: IResponse) => {
	res.send('Unfollow User');
});

router.getAsync('/user', async (req: Request, res: IResponse) => {
	res.send('My User Details');
});

router.getAsync('/all_posts', async (req: Request, res: IResponse) => {
	res.send('Get All My Post');
});

router.getAsync('/posts/:id', async (req: Request, res: IResponse) => {
	res.send('Get Post');
});

router.postAsync('/posts', async (req: Request, res: IResponse) => {
	res.send('Create Post');
});

router.deleteAsync('/posts/:id', async (req: Request, res: IResponse) => {
	res.send('Delete Post');
});

router.postAsync('/like/:id', async (req: Request, res: IResponse) => {
	res.send('Like Post');
});

router.postAsync('/unlike/:id', async (req: Request, res: IResponse) => {
	res.send('Unlike Post');
});

router.postAsync('/comment/:id', async (req: Request, res: IResponse) => {
	res.send('Comment on Post');
});

export default router.use(BASE_ROUTE, router);
