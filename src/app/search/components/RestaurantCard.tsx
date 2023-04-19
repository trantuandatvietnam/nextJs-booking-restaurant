import { Cuisine, Location, PRICE, Restaurant, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Price from "~/app/components/Price";
import Stars from "~/app/components/Stars";
import { calcReviewRating } from "~/app/utils/caculateRatingAverage";

interface RestaurantCardI {
  name: string;
  id: number;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  reviews: Review[];
}

const renderRatingText = (ratingAverage: number) => {
  if (ratingAverage > 4) return "Awesome";
  else if (ratingAverage <= 4 && ratingAverage > 3) return "Good";
  else if (ratingAverage <= 3 && ratingAverage > 2) return "Average";
  else return "";
};

export const RestaurantCard = ({
  restaurant,
}: {
  restaurant: RestaurantCardI;
}) => {
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded h-36" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">
            {renderRatingText(calcReviewRating(restaurant.reviews))}
          </p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};
