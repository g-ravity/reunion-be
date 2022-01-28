export interface IRawUser {
	id: number;
	username: string;
}

export interface IUser extends IRawUser {
	followingCount: number;
	followersCount: number;
}
