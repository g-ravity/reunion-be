export interface IFollow {
	id: string;
	follower_id: number;
	following_id: number;
}

export type IFollowArgs = Pick<IFollow, 'follower_id' | 'following_id'>;
