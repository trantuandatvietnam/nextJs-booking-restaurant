import React, { ChangeEvent } from "react";

interface AuthModalInputProps {
    inputs: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        city: string;
        password: string;
    } ,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isSignIn: boolean
}


export default function AuthModalInput({inputs, onChange, isSignIn}: AuthModalInputProps) {
  return (
    <>
      {isSignIn? null: <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="First name"
          name="firstName"
          value={inputs.firstName}
          onChange={onChange}
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Last name"
          value={inputs.lastName}
          name="lastName"
          onChange={onChange}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={onChange}
        />
      </div>
      {isSignIn? null: <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Phone"
          value={inputs.phone}
          name="phone"
          onChange={onChange}
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="City"
          value={inputs.city}
          name="city"
          onChange={onChange}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={onChange}
        />
      </div>
    </>
  );
}
