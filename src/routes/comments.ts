import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/comment/:id', async (req: IRequest, res: IResponse) => {
	res.send('Comment on Post');
});

export default router.use(BASE_ROUTE, router);
