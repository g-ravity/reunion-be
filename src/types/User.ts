export interface IRawUser {
	id: number;
	email: string;
	password: string;
	username: string;
}
export type ICleanUser = Omit<IRawUser, 'password'>;

export interface IUser extends ICleanUser {
	followingCount: number;
	followersCount: number;
}

export type IUserDetails = Omit<IUser, 'email'>;
