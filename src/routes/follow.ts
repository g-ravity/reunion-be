import { followUser } from '../api/follow/v1.follow';
import { unfollowUser } from '../api/follow/v1.unfollow';
import { IRequest, IResponse } from '../types/General';
import { checkJWT } from '../utils/authHelpers';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/follow/:id', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await followUser(req.user.id, +req.params.id);
	res.create(data);
});

router.postAsync('/unfollow/:id', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await unfollowUser(req.user.id, +req.params.id);
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
