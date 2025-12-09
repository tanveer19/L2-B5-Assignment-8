import ReviewCard from "./ReviewCard";
import { IReview } from "@/types/review";

export default function ReviewList({ reviews }: { reviews: IReview[] }) {
  if (reviews.length === 0)
    return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
