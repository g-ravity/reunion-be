import { loginUser } from '../api/auth/v1.login';
import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/authenticate', async (req: IRequest, res: IResponse) => {
	const data = await loginUser(req.body);
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
