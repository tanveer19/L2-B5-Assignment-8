import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function updateUserProfile(userId: string, data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}`, {
    method: "PATCH",
    credentials: "include", // <-- THIS sends cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getUserProfile(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
    cache: "no-store",
    credentials: "include", // <-- THIS sends cookies
  });

  return res.json();
}
export async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
}
