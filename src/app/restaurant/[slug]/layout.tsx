import React, { ReactNode } from "react";
import Header from "./components/Header";

const RestaurantLayout = ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  return (
    <main>
      <Header name={slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantLayout;
