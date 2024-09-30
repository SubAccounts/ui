import React from "react";

export type PinCodeFormProps = {
  onChange: (value: string) => void;
};

export const PinCodeForm: React.FC<PinCodeFormProps> = ({ onChange }) => {
  return (
    <div className="flex flex-col w-full items-start justify-start">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="pincode"
      >
        Pin code
      </label>
      <input
        required
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="pincode"
        placeholder="Enter your pin code"
        type="password"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
