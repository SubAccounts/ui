import React from "react";

export type PasswordsFormProps = {
  onAccountPasswordChange: (value: string) => void;
  onEncryptionPasswordChange: (value: string) => void;
};

export const PasswordsForm: React.FC<PasswordsFormProps> = ({
  onAccountPasswordChange,
  onEncryptionPasswordChange,
}) => {
  return (
    <>
      <div className="flex flex-col w-full items-start justify-start">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="account_password"
        >
          Account password
        </label>
        <input
          required
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="account_password"
          placeholder="......."
          type="password"
          onChange={(e) => onAccountPasswordChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="encryption_password"
        >
          Encryption password
        </label>
        <input
          required
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="encryption_password"
          placeholder="......."
          type="password"
          onChange={(e) => onEncryptionPasswordChange(e.target.value)}
        />
      </div>
    </>
  );
};
