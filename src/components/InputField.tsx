import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, min }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default InputField;