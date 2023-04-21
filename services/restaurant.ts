import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "~/data";

const prisma = new PrismaClient()

export const findAvailabileTables = async ({ time, day, restaurant }: {
    time: string; day: string; restaurant: {
        tables: Table[];
        open_time: string;
        close_time: string;
    }
}, res: NextApiResponse) => {
    // STEP 1: Determining the search time
    const searchTimes = times.find((i) => i.time === time)?.searchTimes;
    if (!searchTimes) {
        return res.status(400).json({
            errorMessage: "Invalid data provider"
        })
    }
    // STEP 2: Fetching the bookings
    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    })
    // STEP 3: Compressing the booking
    const bookingTablesObj: { [key: string]: { [key: number]: string } } = {}
    bookings.forEach((booking) => {
        bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true
            }
        }, {})
    })
    // STEP 4: Fetching the restaurant tables
    const tables = restaurant.tables
    // STEP 5: Reformating the search times
    const searchTimesWithTables = searchTimes.map((searchTime) => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables
        }
    })
    // STEP 6: Filter out the booked tables
    searchTimesWithTables.forEach((t) => {
        t.tables = t.tables.filter((table) => {
            const currentBookingTable = bookingTablesObj[t.date.toISOString()]
            if (currentBookingTable) {
                if (currentBookingTable[table.id]) return false;
            }
            return true
        })
    })

    return searchTimesWithTables
}