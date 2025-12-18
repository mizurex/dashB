import { SearchIcon, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex min-h-[64px] w-full items-center justify-between dark:border-slate-700 dark:bg-slate-800 px-4 py-2 font-sans font-medium">
      {/* Left Side */}
      <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
        <button 
          className="lg:hidden p-2 -ml-2 flex-shrink-0" 
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        {/* Search Bar */}
        <div className="bg-[#f9f9f9] flex items-center gap-2 border border-border rounded-[6px] shadow-sm py-1 px-2 flex-1 max-w-[300px] min-w-0">
          <div className="flex-shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
                fill="#525866"
              />
            </svg>
          </div>
          <input
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full min-w-0"
          /> 
        </div>
      </div>
  
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
              fill="white"
            />
            <path
              d="M26 23.75H27.5V25.25H12.5V23.75H14V18.5C14 16.9087 14.6321 15.3826 15.7574 14.2574C16.8826 13.1321 18.4087 12.5 20 12.5C21.5913 12.5 23.1174 13.1321 24.2426 14.2574C25.3679 15.3826 26 16.9087 26 18.5V23.75ZM24.5 23.75V18.5C24.5 17.3065 24.0259 16.1619 23.182 15.318C22.3381 14.4741 21.1935 14 20 14C18.8065 14 17.6619 14.4741 16.818 15.318C15.9741 16.1619 15.5 17.3065 15.5 18.5V23.75H24.5ZM17.75 26.75H22.25V28.25H17.75V26.75Z"
              fill="#525866"
            />
            <g filter="url(#filter0_d_379_956)">
              <circle cx="26" cy="14" r="2" fill="#FB3748" />
              <circle cx="26" cy="14" r="3" stroke="white" strokeWidth="2" />
            </g>
            <defs>
              <filter
                id="filter0_d_379_956"
                x="20"
                y="9"
                width="12"
                height="12"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0784314 0 0 0 0.03 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_379_956"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_379_956"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-[6px] rounded-[6px] bg-[#423636] shadow-md hover:bg-[#524646] transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium text-white">Share</span>
          <span className="flex items-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.64156 2.60336L1.07825 9.16667L0 8.08842L6.56254 1.52511H0.778568V0H9.16667V8.3881H7.64156V2.60336V2.60336Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}