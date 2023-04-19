import React from "react";

const Description = ({ desciption }: { desciption: string }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{desciption}</p>
    </div>
  );
};

export default Description;
