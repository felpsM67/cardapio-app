import React from 'react';

interface ValidatedInputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          errorMessage
            ? 'border-red-500'
            : value
              ? 'border-blue-500'
              : 'border-gray-300'
        }`}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default ValidatedInput;