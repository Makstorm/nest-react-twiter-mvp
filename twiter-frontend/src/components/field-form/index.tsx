import React, { FC, useState } from "react";
import "./index.css";

interface IFieldForm {
  button: string;
  placeholder: string;
  onSubmit: (value: string) => Promise<void>;
}

const FieldForm: FC<IFieldForm> = ({ placeholder, button, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleCange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setValue(e.target.value);

  const handleSubmit = () => {
    if (value.length === 0) return null;

    onSubmit(value);

    setValue("");
  };

  const isDisabled = value.length === 0;

  return (
    <div className="field-form">
      <textarea
        onChange={handleCange}
        value={value}
        className="field-form__field"
        rows={2}
        placeholder={placeholder}
      ></textarea>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
};

export default FieldForm;
