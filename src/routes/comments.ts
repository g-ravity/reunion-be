import { addComment } from '../api/comments/v1.addComment';
import { IRequest, IResponse } from '../types/General';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.postAsync('/comment/:id', async (req: IRequest, res: IResponse) => {
	const data = await addComment(req.user.id, { postId: +req.params.id, comment: req.body });
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
