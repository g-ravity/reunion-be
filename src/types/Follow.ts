export interface IFollow {
	id: string;
	followerId: number;
	followingId: number;
}

export type IFollowArgs = Pick<IFollow, 'followerId' | 'followingId'>;
