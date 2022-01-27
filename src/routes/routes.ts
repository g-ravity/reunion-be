import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/';

router.getAsync('/health-check', async (req: IRequest, res: IResponse) => {
	res.send('Service is Up!');
});

export default router.use(BASE_ROUTE, router);
