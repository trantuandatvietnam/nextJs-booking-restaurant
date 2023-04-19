import { PRICE, PrismaClient } from "@prisma/client";
import { Header } from "./components/Header";
import { RestaurantCard } from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

interface SearchPramsI {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();
const fetchRestaurant = async (searchPrams: SearchPramsI) => {
  const select = {
    name: true,
    id: true,
    main_image: true,
    price: true,
    cuisine: true,
    slug: true,
    location: true,
    reviews: true,
  };
  const where: any = {};
  if (searchPrams.city) {
    const location = {
      name: {
        equals: searchPrams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchPrams.cuisine) {
    const cuisine = {
      name: {
        equals: searchPrams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchPrams.price) {
    const price = {
      equals: searchPrams.price,
    };
    where.price = price;
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    select,
  });
  return restaurants;
};

const fetchLcations = () => {
  return prisma.location.findMany({ select: { name: true, id: true } });
};
const fetchCuisines = () => {
  return prisma.cuisine.findMany({ select: { name: true, id: true } });
};

async function SearchPage({ searchParams }: { searchParams: SearchPramsI }) {
  const city = searchParams.city;
  const restaurants = await fetchRestaurant(searchParams);
  const locations = await fetchLcations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => {
              return <RestaurantCard restaurant={restaurant} />;
            })
          ) : (
            <p>Not found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
