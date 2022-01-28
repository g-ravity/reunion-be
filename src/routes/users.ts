import { getUserDetails } from '../api/auth/v1.getUser';
import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/user', async (req: IRequest, res: IResponse) => {
	const data = await getUserDetails(req.user);
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
