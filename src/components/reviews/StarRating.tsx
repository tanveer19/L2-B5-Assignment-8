"use client";

interface StarRatingProps {
  rating: number;
  setRating?: (val: number) => void;
  editable?: boolean;
}

export default function StarRating({
  rating,
  setRating,
  editable,
}: StarRatingProps) {
  return (
    <div className="flex space-x-1 text-yellow-400 text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={editable ? "cursor-pointer" : ""}
          onClick={() => editable && setRating?.(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
