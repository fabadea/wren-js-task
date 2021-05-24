import React from "react";
import { ISheep as Props } from "../Types/types";

interface IProps {
  sheeps: Array<Props>;
}

const SheepCard: React.FC<IProps> = ({ sheeps }) => {
  const renderSheepsList = (): JSX.Element[] => {
    return sheeps.map((sheep, index) => {
      return (
        <li key={index}>
          <div style={sheep.isBranded ? { color: "green" } : { color: "grey" }}>
            <h2>{sheep.name}</h2>
            <div>{sheep.gender}</div>
          </div>
        </li>
      );
    });
  };

  return <ul>{renderSheepsList()}</ul>;
};

export default SheepCard;
