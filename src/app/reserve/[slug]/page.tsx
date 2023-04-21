import { PrismaClient } from "@prisma/client";
import Form from "./components/Form";
import Header from "./components/Header";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Reserve",
  description: "Reserve",
};

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

async function Reserve({
  params: { slug },
  searchParams: { date, partySize },
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string; time: string };
}) {
  const restaurant = await fetchRestaurantBySlug(slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          date={date}
          partySize={partySize}
          image={restaurant.main_image}
          name={restaurant.name}
        />
        <Form slug={slug} date={date} partySize={partySize} />
      </div>
    </div>
  );
}

export default Reserve;
