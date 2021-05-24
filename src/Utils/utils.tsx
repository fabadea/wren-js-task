import { ISheep } from "../Types/types";
import { Gender } from "../Constants/constants";

export const getRandomIndex = (list: ISheep[]): number => {
  return Math.floor(Math.random() * list.length);
};

export const uuid = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const getSuccesMessage = (
  maleSheep: ISheep,
  femaleSheep: ISheep,
  sheeps: ISheep[]
): string => {
  return `Yay, ${maleSheep.name} and ${femaleSheep.name} are parents and this is Sheep ${sheeps.length}`;
};

export const newSheepName = (sheeps: ISheep[]): string => {
  return `Sheep ${sheeps.length}`;
};

export const getFailureMessage = (
  maleSheep: ISheep,
  femaleSheep: ISheep
): string => {
  return `This time, ${maleSheep.name} and ${femaleSheep.name}, weren't successful, please try again`;
};

export const getMinimumRequiredSheepsMeesage = (sheeps: ISheep[]): string => {
  return `you need at least ${2 - sheeps.length} sheep(s) to start breeding`;
};

export const getAddMaleOrFemaleMeesage = (isMaleSheep: boolean): string => {
  return `please start adding at least one ${
    !isMaleSheep ? Gender.MALE : Gender.FEMALE
  }`;
};

export const getAddUnBrandedMeesage = (isMaleUnBranded: boolean): string => {
  return `there is no unbranded ${
    !isMaleUnBranded ? Gender.MALE : Gender.FEMALE
  }, please add at least one`;
};
