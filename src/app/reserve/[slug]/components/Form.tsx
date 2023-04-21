"use client";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import useReservation from "~/app/hooks/useReservation";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split("T");
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccassion: "",
    bookerRequest: "",
  });
  const { loading, createReservation, error } = useReservation();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [didBook, setDidBook] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickComplete = async () => {
    const {
      bookerFirstName,
      bookerLastName,
      bookerPhone,
      bookerEmail,
      bookerOccassion,
      bookerRequest,
    } = inputs;
    await createReservation(
      {
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccassion,
        bookerRequest,
      },
      setDidBook
    );
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      setDisabled(false);
    }
  }, [inputs]);

  return (
    <>
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerPhone"
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOccassion"
            onChange={handleChangeInput}
            value={inputs.bookerOccassion}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequest"
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
          />
          <button
            onClick={handleClickComplete}
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 t ext-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </div>
      )}
    </>
  );
};

export default Form;
