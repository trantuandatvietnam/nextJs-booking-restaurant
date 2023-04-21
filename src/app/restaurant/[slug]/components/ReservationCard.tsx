"use client";

import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import useAvailabilities from "~/app/hooks/useAvailabilities";
import { Time, convertToDisplayTime } from "~/app/utils/convertToDisplayTime";
import { partySize, times } from "~/data";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabitities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [size, setSize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const day = date.toISOString().split("T")[0];
      setDay(day);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = () => {
    // openTime = 03:00:00.000Z
    // closeTime = 04:30:00.000Z
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;
    times.forEach((time) => {
      if (!isWithinWindow && time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return times;
  };

  const handleClick = () => {
    fetchAvailabitities({
      slug,
      time,
      partySize: size,
      day,
    });
  };
  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          onChange={(e) => setSize(e.target.value)}
          value={size}
          name=""
          className="py-3 border-b font-light"
          id=""
        >
          {partySize.map((size) => {
            return (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            className="py-3 border-b font-light w-28"
            dateFormat="MMMM d"
            wrapperClassName="w-[48]"
            onChange={handleChangeDate}
            selected={selectedDate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            value={time}
            className="py-3 border-b font-light"
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time, index) => (
              <option key={index} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          disabled={loading}
          onClick={handleClick}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  key={time.time}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${size}`}
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p
                  key={time.time}
                  className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"
                ></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
