import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

const Menu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length > 0 ? (
            menu.map((item) => {
              return <MenuCard key={item.id} item={item} />;
            })
          ) : (
            <span>This restaurant doest not has menu</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default Menu;
