import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/follow/:id', async (req: IRequest, res: IResponse) => {
	res.send('Follow User');
});

router.postAsync('/unfollow/:id', async (req: IRequest, res: IResponse) => {
	res.send('Unfollow User');
});

export default router.use(BASE_ROUTE, router);
