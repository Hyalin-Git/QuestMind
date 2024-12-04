import path from "path";
import { writeFile, unlink } from "fs/promises";

const allowedMimeTypes = [
	"image/webp",
	"image/png",
	"image/jpg",
	"image/jpeg",
	"image/svg",
	"image/svg+xml",
];

export async function saveFile(file, fileName, folder) {
	if (!allowedMimeTypes.includes(file.type)) {
		throw new Error(
			"This image format is not supported. Please upload a valid image type."
		);
	} else {
		const buffer = Buffer.from(await file.arrayBuffer());
		const extension = file.type.includes("xml")
			? file.type.split("/")[1].split("+")[0]
			: file.type.split("/")[1];
		const filename = fileName.replaceAll(" ", "-") + "." + extension;

		await writeFile(
			path.join(process.cwd(), `public/images/${folder}/` + filename),
			buffer
		);

		return `/images/${folder}/` + filename;
	}
}

export async function deleteFile(filePath) {
	try {
		// Résoudre le chemin complet du fichier
		const fullPath = path.join(process.cwd(), filePath);

		// Supprimer le fichier
		await unlink(fullPath);
		return { success: true, message: "Image successfully deleted." };
	} catch (error) {
		// Gérer les erreurs
		return { success: false, message: "Failed to delete the image.", error };
	}
}
