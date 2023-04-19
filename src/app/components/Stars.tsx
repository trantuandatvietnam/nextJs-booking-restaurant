import React from "react";
import fullStar from "../../../public/icons/full-star.png";
import emptyStar from "../../../public/icons/empty-star.png";
import halfStar from "../../../public/icons/half-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calcReviewRating } from "../utils/caculateRatingAverage";

function Stars({
  reviews,
  rating: userRating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const rating = userRating || calcReviewRating(reviews);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference >= 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, index) => (
      <Image key={index} src={star} alt="" className="w-4 h-4 mr-1" />
    ));
  };

  return <div className="flex items-center">{renderStars()}</div>;
}

export default Stars;
