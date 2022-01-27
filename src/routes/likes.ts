import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/like/:id', async (req: IRequest, res: IResponse) => {
	res.send('Like Post');
});

router.postAsync('/unlike/:id', async (req: IRequest, res: IResponse) => {
	res.send('Unlike Post');
});

export default router.use(BASE_ROUTE, router);
