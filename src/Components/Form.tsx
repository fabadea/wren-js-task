import React, { useState } from "react";
import { ISheep as Props } from "../Types/types";
import { uuid } from "../Utils/utils";


interface IProps {
  sheeps: Array<Props>;
  setSheeps: React.Dispatch<React.SetStateAction<Props[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AddToList: React.FC<IProps> = ({ sheeps, setSheeps, setMessage }) => {
  const [input, setInput] = useState({
    name: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!input.name || !input.gender) return;

    setSheeps([
      ...sheeps,
      {
        id: uuid(),
        name: input.name,
        gender: input.gender,
        isBranded: false,
      },
    ]);
    setInput({
      name: "",
      gender: "",
    });

    setMessage("");
  };

  return (
    <div className="AddToList">
      <input
        type="text"
        onChange={handleChange}
        className="AddToList-input"
        name="name"
        value={input.name}
        placeholder="Name"
      />
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        className="AddToList-input"
        onChange={handleChange}
        value={input.gender}
      >
        <option value="empty"></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={handleClick} className="AddToList-btn">
        Add to List
      </button>
    </div>
  );
};

export default AddToList;
