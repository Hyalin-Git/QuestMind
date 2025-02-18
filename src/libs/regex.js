export const userRegex = {
	email: /^\S+@\S+\.\S+$/,
	password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

export const playerRegex = {
	url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)?$/,
	name: /^[a-zA-ZÀ-ÖØ-öø-ÿĀ-žʼ\ -]+$/,
	username: /^[a-zA-Z0-9_-]+$/,
};
