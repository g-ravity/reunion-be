import { likePost } from '../api/likes/v1.likePost';
import { unlikePost } from '../api/likes/v1.unlikePost';
import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/like/:id', async (req: IRequest, res: IResponse) => {
	const data = await likePost(req.user.id, +req.params.id);
	res.create(data);
});

router.postAsync('/unlike/:id', async (req: IRequest, res: IResponse) => {
	const data = await unlikePost(req.user.id, +req.params.id);
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
