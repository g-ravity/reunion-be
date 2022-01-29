import { createPost } from '../api/posts/v1.createPost';
import { deletePost } from '../api/posts/v1.deletePost';
import { getMyPosts } from '../api/posts/v1.getMyPosts';
import { getPost } from '../api/posts/v1.getPost';
import { IRequest, IResponse } from '../types/General';
import { checkJWT } from '../utils/authHelpers';
import { decoratedRouter as router } from '../utils/router';

const BASE_ROUTE = '/api';

router.getAsync('/all_posts', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await getMyPosts(req.user.id);
	res.create(data);
});

router.getAsync('/posts/:id', async (req: IRequest, res: IResponse) => {
	const data = await getPost({ id: +req.params.id });
	res.create(data);
});

router.postAsync('/posts', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await createPost(req.user.id, req.body);
	res.create(data);
});

router.deleteAsync('/posts/:id', checkJWT, async (req: IRequest, res: IResponse) => {
	const data = await deletePost(req.user.id, { post_id: +req.params.id });
	res.create(data);
});

export default router.use(BASE_ROUTE, router);
