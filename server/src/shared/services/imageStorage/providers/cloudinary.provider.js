import cloudinary from "../../../../app/config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

function uploadStream(options, buffer) {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			options,
			(error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			},
		);

		stream.on("error", reject);

		stream.end(buffer);
	});
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function upload({ buffer, folder, filename, resourceType = "image" }) {
	return uploadStream(
		{
			folder,
			public_id: filename,
			resource_type: resourceType,
			overwrite: false,
		},
		buffer,
	);
}

async function destroy(storageKey) {
	const result = await cloudinary.uploader.destroy(storageKey);

	/*
	|--------------------------------------------------------------------------
	| Idempotent Delete
	|--------------------------------------------------------------------------
	|
	| Cloudinary returns:
	|
	|   { result: "ok" }
	|   { result: "not found" }
	|
	| Both are considered successful because the asset no longer exists.
	|
	*/

	if (result.result !== "ok" && result.result !== "not found") {
		throw new Error(
			`Failed to delete image from Cloudinary. Result: ${result.result}`,
		);
	}

	return result;
}

export default {
	upload,
	destroy,
};
