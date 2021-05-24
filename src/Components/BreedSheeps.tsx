import React from "react";
import { ISheep as Props } from "../Types/types";
import {
  getRandomIndex,
  getSuccesMessage,
  getFailureMessage,
  newSheepName,
  getMinimumRequiredSheepsMeesage,
  getAddMaleOrFemaleMeesage,
  getAddUnBrandedMeesage,
  uuid,
} from "../Utils/utils";
import { Gender, Constants } from "../Constants/constants";

interface IProps {
  sheeps: Array<Props>;
  setSheeps: React.Dispatch<React.SetStateAction<Props[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const BreedSheeps: React.FC<IProps> = ({
  sheeps,
  setSheeps,
  message,
  setMessage,
}) => {
  const handleBreedSheep = (): void => {
    const canBreed = conditionsForSuccesfulBreeding();

    if (canBreed) {
      const randomMaleForBreeding = getRandomSheep(Gender.MALE);
      const randomFemaleForBreeding = getRandomSheep(Gender.FEMALE);

      if (Math.random() > Constants.successRate) {
        setMessage(
          getSuccesMessage(
            randomMaleForBreeding,
            randomFemaleForBreeding,
            sheeps
          )
        );
        setSheeps([
          ...sheeps,
          {
            id: uuid(),
            name: newSheepName(sheeps),
            gender:
              Math.random() > Constants.genderProbability
                ? Gender.MALE
                : Gender.FEMALE,
            isBranded: false,
          },
        ]);
      } else {
        setMessage(
          getFailureMessage(randomMaleForBreeding, randomFemaleForBreeding)
        );
      }
    }
  };

  const conditionsForSuccesfulBreeding = (): boolean => {
    if (sheeps.length < 2) {
      setMessage(getMinimumRequiredSheepsMeesage(sheeps));
      return false;
    } else {
      const sheepsGroupedByGender = groupByGender(sheeps, Constants.gender);
      const maleSheepExists = isAtLeastOneSheep(sheeps, Gender.MALE);
      let isMaleAvailable = true;
      if (maleSheepExists)
        isMaleAvailable = isAtLeastOneSheepNotBranded(
          sheepsGroupedByGender.male
        );
      const femaleSheepExists = isAtLeastOneSheep(sheeps, Gender.FEMALE);
      let isFemaleAvailable = true;
      if (femaleSheepExists)
        isFemaleAvailable = isAtLeastOneSheepNotBranded(
          sheepsGroupedByGender.female
        );
      if (!maleSheepExists || !femaleSheepExists) {
        setMessage(getAddMaleOrFemaleMeesage(maleSheepExists));
        return false;
      }

      if (!isMaleAvailable || !isFemaleAvailable) {
        setMessage(getAddUnBrandedMeesage(isMaleAvailable));
        return false;
      }
    }
    return true;
  };

  const groupByGender = (
    sheeps: Props[],
    property: string
  ): { [key: string]: Props[] } => {
    const grouped: ({ [key: string]: Props[] }) = {};
    for (let i = 0; i < sheeps.length; i++) {
      let p = sheeps[i][property as keyof Props];
      if (!grouped[p as keyof Props]) {
        grouped[p as keyof Props] = [];
      }
      grouped[p as keyof Props].push(sheeps[i]);
    }
    return grouped;
  }

  function isAtLeastOneSheep(sheeps: Props[], value: string): boolean {
    return sheeps.some((sheep) => sheep.gender === value);
  }

  function isAtLeastOneSheepNotBranded(groupedSheeps: Props[]): boolean {
    return groupedSheeps.some((sheep) => !sheep.isBranded);
  }

  function getAvailableSheepsByGender(gender: string): Props[] {
    return sheeps.filter(
      (sheep) => !sheep.isBranded && sheep.gender === gender
    );
  }

  const getRandomSheep = (gender: string): Props => {
    const availableSheeps = getAvailableSheepsByGender(gender);
    const randomIndex = getRandomIndex(availableSheeps);
    return availableSheeps[randomIndex];
  };

  return (
    <div>
      <button onClick={handleBreedSheep}>Breed Sheeps</button>
      <div>{message}</div>
    </div>
  );
};

export default BreedSheeps;
