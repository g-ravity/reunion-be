export interface IRawUser {
	id: number;
	email: string;
	username: string;
}

export interface IUser extends IRawUser {
	followingCount: number;
	followersCount: number;
}

export type IUserDetails = Omit<IUser, 'email'>;
