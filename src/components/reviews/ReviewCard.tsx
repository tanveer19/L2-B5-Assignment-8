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
import { Edit, Trash2, User, Calendar } from "lucide-react";

export default function ReviewCard({ review }: { review: IReview }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/${review.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete review");

      toast.success("Review deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleEdit = () => {
    router.push(`/user/reviews/edit/${review.id}`);
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
              {review.reviewer?.profileImage ? (
                <img
                  src={review.reviewer.profileImage}
                  alt={review.reviewer.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {review.reviewer?.fullName}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              title="Edit review"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              title="Delete review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {review.rating}/5
          </span>
        </div>

        {/* Comment */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {review.comment}
        </p>
      </div>
    </div>
  );
}
