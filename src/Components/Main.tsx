import React, { useState } from "react";
import Form from "./Form";
import SheepCard from "./SheepCard";
import BrandSheep from "./BrandSheep";
import BreedSheeps from "./BreedSheeps";
import { ISheep } from "../Types/types";

const Main: React.FC = () => {
  const [sheeps, setSheeps] = useState<ISheep[]>([]);
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <Form sheeps={sheeps} setSheeps={setSheeps} setMessage={setMessage} />
      <SheepCard sheeps={sheeps} />
      <BrandSheep
        sheeps={sheeps}
        setSheeps={setSheeps}
        setMessage={setMessage}
      />
      <BreedSheeps
        sheeps={sheeps}
        setSheeps={setSheeps}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Main;
