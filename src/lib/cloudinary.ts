import { config } from 'dotenv';

config({ path: '.env.local' });

export async function uploadImageToCloudinary(file: File) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_UPLOAD_PRESET) {
    return null;
  }

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { secure_url?: string };
  return data.secure_url ?? null;
}
