import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;