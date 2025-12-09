import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useReviews = (userId: string) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(`/reviews/user/${userId}`);
      setReviews(res.data.data);

      const statRes = await axiosInstance.get(
        `/reviews/user/${userId}/average`
      );
      setStats(statRes.data.data);
    })();
  }, [userId]);

  return { reviews, stats };
};
