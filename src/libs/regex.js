export const userRegex = {
	email: /^\S+@\S+\.\S+$/,
	password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

export const playerRegex = {
	url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)?$/,
	xUrl: /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_.-]+$/,
	tiktokUrl: /^(https?:\/\/)?(www\.)?tiktok\.com\/@?[a-zA-Z0-9_.-]+$/,
	instagramUrl: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+$/,
	youtubeUrl:
		/^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?[a-zA-Z0-9_-]+|youtu\.be\/[a-zA-Z0-9_-]+)$/,
	twitchUrl: /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_.-]+$/,
	name: /^[a-zA-ZÀ-ÖØ-öø-ÿ \'-]+$/,
	username: /^[a-zA-Z0-9_-]+$/,
};
