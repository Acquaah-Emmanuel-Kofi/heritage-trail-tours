import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: 'image',
          folder: 'heritage-trail-tours',
          public_id: file.name.split('.')[0],
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Cloudinary upload returned undefined result'));
        }
      )
      .end(buffer);
  });
}

export async function deleteFromCloudinary(imageUrl: string) {
  const publicId = extractPublicId(imageUrl);

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    return result;
  } catch (error) {
    console.error('Failed to delete image from Cloudinary:', error);
    return null;
  }
}

const extractPublicId = (imageUrl: string) => {
  const parts = imageUrl.split('/');
  const folder = parts.at(-2);
  const filenameWithExt = parts.at(-1);
  const filename = filenameWithExt?.split('.')[0];
  return `${folder}/${filename}`;
};