import cloudinary from "@/app/api/config/cloudinary";

export async function uploadFile(file) {
	try {
		return await new Promise((resolve, reject) => {
			cloudinary?.uploader
				?.upload_stream(
					{
						folder: "questmind",
						format: "webp",
					},
					async (err, result) => {
						if (err) return reject(err);
						resolve(result);
					}
				)
				.end(file);
		});
	} catch (err) {
		throw err;
	}
}

export async function destroyFile(path) {
	try {
		const publicId = path?.split("/")[8]?.split(".")[0]; // Retrives the public id of the img
		return await cloudinary?.uploader?.destroy(`questmind/${publicId}`);
	} catch (err) {
		console.log(err);
		throw err;
	}
}
