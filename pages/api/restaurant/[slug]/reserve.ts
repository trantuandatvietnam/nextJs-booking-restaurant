import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { findAvailabileTables } from "../../../../services/restaurant";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const { bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOccasion, bookerRequest } = req.body

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true
      }
    })

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Invalid data provider"
      })
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }
    const searchTimesWithTables = await findAvailabileTables({ time, day, restaurant }, res)
    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: "Invalid data provider"
      })
    }

    const searchTimeWithTables = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
    })

    if (!searchTimeWithTables) {
      return res.status(400).json({
        errorMessage: "No availablity, canot boook"
      })
    }
    const tableCount = searchTimeWithTables.tables.reduce((obj: { [key: number]: number[] }, curr) => {
      return {
        ...obj,
        [curr.seats]: obj?.[curr.seats] ? [...obj?.[curr.seats], curr.id] : [curr.id]
      }
    }, {})
    const tablesToBooks: number[] = []
    let seatsRemaining = parseInt(partySize)

    while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
        if (tableCount[4]?.length) {
          tablesToBooks.push(tableCount[4]?.[0])
          tableCount[4]?.shift()
          seatsRemaining -= 4
        } else {
          tablesToBooks.push(tableCount[2]?.[0])
          tableCount[2]?.shift()
          seatsRemaining -= 2
        }
      } else {
        if (tableCount[2]?.length) {
          tablesToBooks.push(tableCount[2]?.[0])
          tableCount[2]?.shift()
          seatsRemaining -= 2
        } else {
          tablesToBooks.push(tableCount[4][0])
          tableCount[4].shift()
          seatsRemaining -= 4
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occassion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      }
    })

    const bookingOnTablesData = tablesToBooks.map((table_id) => {
      return {
        table_id,
        booking_id: booking.id
      }
    })

    await prisma.bookingsOnTables.createMany({
      data: bookingOnTablesData
    })
    return res.json({ booking });
  }
  return res.status(404).json({ errorMessage: "Not found" })
}
