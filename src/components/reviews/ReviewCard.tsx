// import StarRating from "./StarRating";
// import { IReview } from "@/types/review";

// export default function ReviewCard({ review }: { review: IReview }) {
//   return (
//     <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
//       <div className="flex items-center space-x-3">
//         <img
//           src={review.reviewer?.profileImage || "/default.png"}
//           className="w-10 h-10 rounded-full"
//         />
//         <p className="font-semibold">{review.reviewer?.fullName}</p>
//       </div>

//       <StarRating rating={review.rating} />

//       <p className="text-gray-600">{review.comment}</p>

//       <small className="text-gray-400">
//         {new Date(review.createdAt).toLocaleString()}
//       </small>
//     </div>
//   );
// }
"use client";

import StarRating from "./StarRating";
import { IReview } from "@/types/review";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ReviewCard({ review }: { review: IReview }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/${review.id}`,
        {
          method: "DELETE",
          credentials: "include", // send cookies if using Next.js cookie auth
        }
      );

      if (!res.ok) throw new Error("Failed to delete review");

      toast.success("Review deleted successfully");
      router.refresh(); // refresh the page to update list
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleEdit = () => {
    router.push(`/user/reviews/edit/${review.id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={review.reviewer?.profileImage || "/default.png"}
            className="w-10 h-10 rounded-full"
          />
          <p className="font-semibold">{review.reviewer?.fullName}</p>
        </div>

        {/* Edit/Delete buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-gray-600">{review.comment}</p>

      <small className="text-gray-400">
        {new Date(review.createdAt).toLocaleString()}
      </small>
    </div>
  );
}
