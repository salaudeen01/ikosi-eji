import Link from "next/link";
import React from "react";

interface UserData {
  user?: {
    username?: string;
    email?: string;
  };
}

interface DropdownProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: UserData;
  onLogout: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ open, setOpen, user, onLogout }) => {
  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-600 cursor-pointer"
      >
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {open && (
        <div
          id="dropdownAvatar"
          className="absolute right-5 mt-1 z-10 rounded-lg shadow-sm w-44 bg-gray-700 divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-white">
            <div>{user?.user?.username}</div>
            <div className="font-medium truncate">{user?.user?.email}</div>
          </div>

          <ul
            className="py-2 text-sm text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
                href="/admin/pricing"
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          <div onClick={onLogout} className="py-2 cursor-pointer">
            <Link
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
