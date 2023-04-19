import NavBar from "~/app/components/NavBar";
import Header from "../components/Header";
import Menu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Menu",
  description: "Menu restaurant",
};

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { items: true },
  });
  if (!restaurant) notFound();
  return restaurant.items;
};

async function RestaurantPageDetailMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
}

export default RestaurantPageDetailMenu;
