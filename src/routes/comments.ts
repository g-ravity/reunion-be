import { addComment } from '../api/comments/v1.addComment';
import { IRequest, IResponse } from '../types/General';
import { checkJWT } from '../utils/authHelpers';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/comment/:id', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await addComment(req.user.id, { post_id: +req.params.id, ...req.body });
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
