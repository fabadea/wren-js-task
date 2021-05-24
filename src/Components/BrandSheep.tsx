import React from "react";
import { ISheep as Props } from "../Types/types";
import { getRandomIndex } from "../Utils/utils";
import { StaticMessages } from "../Constants/constants";

interface IProps {
  sheeps: Array<Props>;
  setSheeps: React.Dispatch<React.SetStateAction<Props[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const BrandSheep: React.FC<IProps> = ({ sheeps, setSheeps, setMessage }) => {
  const handleBrandSheep = (): void => {
    if (sheeps.length < 1) {
      setMessage(StaticMessages.NO_SHEEP_TO_BRAND);
      return;
    }
    brandSheep();
  };

  const brandSheep = (): void => {
    const unBrandedSheeps = getUnbrandedSheeps();
    if (unBrandedSheeps.length < 1) {
      setMessage(StaticMessages.NO_MORE_SHEEPS_FOR_BRANDING);
      return;
    }
    const randomIndex = getRandomIndex(unBrandedSheeps);
    return updateBrandStatus(unBrandedSheeps, randomIndex);
  };

  const getUnbrandedSheeps = (): Props[] => {
    return sheeps.filter((sheep) => !sheep.isBranded);
  };

  const updateBrandStatus = (unBrandedSheeps: Props[], index: number): void => {
    const sheepToBrand = unBrandedSheeps[index];
    const indexForSheepToBrand: number = sheeps.findIndex(
      (sheep) => sheep.id === sheepToBrand.id
    );
    sheeps[indexForSheepToBrand].isBranded = true;
    setSheeps([...sheeps]);
  };

  return (
    <div>
      <button onClick={handleBrandSheep}>Brand Sheep</button>
    </div>
  );
};

export default BrandSheep;
