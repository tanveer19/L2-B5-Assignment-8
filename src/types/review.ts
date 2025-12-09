export interface IReview {
  id: string;
  reviewerId: string;
  reviewedUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewer?: {
    id: string;
    fullName: string;
    profileImage?: string;
  };
}

export interface IUserRatingStats {
  userId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
}
