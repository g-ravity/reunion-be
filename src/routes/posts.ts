import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.getAsync('/all_posts', async (req: IRequest, res: IResponse) => {
	res.send('Get All My Post');
});

router.getAsync('/posts/:id', async (req: IRequest, res: IResponse) => {
	res.send('Get Post');
});

router.postAsync('/posts', async (req: IRequest, res: IResponse) => {
	res.send('Create Post');
});

router.deleteAsync('/posts/:id', async (req: IRequest, res: IResponse) => {
	res.send('Delete Post');
});

export default router.use(BASE_ROUTE, router);
