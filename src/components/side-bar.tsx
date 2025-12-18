"use client";

import { useState } from "react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isMobileMenuOpen, onClose }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[250px] transform bg-muted-foreground/9 transition-transform duration-300 border-r border-border/80 dark:shadow-[4px_0_16px_-4px_rgba(0,0,0,0.20)] dark:border-slate-700 dark:bg-slate-800 lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0 bg-white backdrop-blur-md z-50" : "-translate-x-full"
        } font-sans`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 lg:hidden border border-border rounded-[6px]"
        >
        <svg
          className="h-4 w-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Logo */}
      <div className="flex h-[88px] items-center justify-between px-6 dark:border-slate-700">
        <div className="flex gap-[12px] ">
        

          <div>
            <h1 className="text-lg font-medium text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground font-sans  ">Finance & Banking</p>
          </div>
        </div>

        <div className="cursor-pointer hover:bg-muted/80 transition-all duration-300 rounded-[6px] p-[2px] border border-border">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3106 7.94656L10.0001 3.63607L5.68966 7.94656L6.67175 8.92868L10.0001 5.60025L13.3285 8.92868L14.3106 7.94656ZM5.68956 12.0538L10.0001 16.3643L14.3106 12.0538L13.3285 11.0717L10.0001 14.4001L6.67165 11.0717L5.68956 12.0538Z"
              fill="#525866"
            />
          </svg>
        </div>
      </div>
      <div className="w-full px-[16px]">
        <div className="border-t border-primary/20"></div>
      </div>
      {/* Navigation */}
      <nav className="relative flex-1 overflow-y-auto p-[16px] ">
        {/* Main Menu */}
        <div className="mb-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#99A0AE]">
            MENU
          </p>
          <div className="space-y-1">
            <NavLink
              href="#"
              icon={<HomeIcon />}
              active={activeNav === "Dashboard"}
              onClick={() => setActiveNav("Dashboard")}
            >
              Dashboard
            </NavLink>
            <NavItemWithSubs
              title="Payments"
              icon={<PaymentIcon />}
              active={activeNav === "Payments" || activeNav.startsWith("Payments-")}
              isExpanded={expandedItems.has("Payments")}
              onToggle={() => toggleExpand("Payments")}
              onSubClick={(sub) => setActiveNav(`Payments-${sub}`)}
              subItems={[
                { label: "All Transactions", value: "All" },
                { label: "Pending", value: "Pending" },
                { label: "Completed", value: "Completed" },
                { label: "Failed", value: "Failed" },
              ]}
              parentKey="Payments"
              activeNav={activeNav}
            />
            <NavLink
              href="#"
              icon={<WalletIcon />}
              active={activeNav === "Transfer"}
              onClick={() => setActiveNav("Transfer")}
            >
              Transfer
            </NavLink>
            <NavItemWithSubs
              title="Transactions"
              icon={<InvoiceIcon />}
              active={activeNav === "Transactions" || activeNav.startsWith("Transactions-")}
              isExpanded={expandedItems.has("Transactions")}
              onToggle={() => toggleExpand("Transactions")}
              onSubClick={(sub) => setActiveNav(`Transactions-${sub}`)}
              subItems={[
                { label: "All Transactions", value: "All" },
                { label: "Recent", value: "Recent" },
                { label: "By Date", value: "ByDate" },
                { label: "By Amount", value: "ByAmount" },
              ]}
              parentKey="Transactions"
              activeNav={activeNav}
            />
        
            <NavItemWithSubs
              title="Exchange"
              icon={<AnalyticsIcon />}
              active={activeNav === "Exchange" || activeNav.startsWith("Exchange-")}
              isExpanded={expandedItems.has("Exchange")}
              onToggle={() => toggleExpand("Exchange")}
              onSubClick={(sub) => setActiveNav(`Exchange-${sub}`)}
              subItems={[
                { label: "Rates", value: "Rates" },
                { label: "History", value: "History" },
                { label: "Convert", value: "Convert" },
              ]}
              parentKey="Exchange"
              activeNav={activeNav}
            />
          </div>
        </div>

        {/* Settings Menu */}
        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Others
          </p>
          <div className="space-y-1">
            <NavItemWithSubs
              title="Settings"
              icon={<SettingsIcon />}
              active={activeNav === "Settings" || activeNav.startsWith("Settings-")}
              isExpanded={expandedItems.has("Settings")}
              onToggle={() => toggleExpand("Settings")}
              onSubClick={(sub) => setActiveNav(`Settings-${sub}`)}
              subItems={[
                { label: "General", value: "General" },
                { label: "Security", value: "Security" },
                { label: "Notifications", value: "Notifications" },
                { label: "Privacy", value: "Privacy" },
              ]}
              parentKey="Settings"
              activeNav={activeNav}
            />
            <NavLink
              href="#"
              icon={<SupportIcon />}
              active={activeNav === "Support"}
              onClick={() => setActiveNav("Support")}
            >
              Support
            </NavLink>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="w-full px-[16px] absolute bottom-1">
        <div className="border-t border-primary/20"></div>
      </div>
      <div className=" p-4 absolute bottom-0 ">
        <div className="flex items-center justify-between gap-8 ">
          <div className="flex items-center gap-[12px]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                fill="#C0D5FF"
              />
              <rect
                width="40"
                height="40"
                rx="20"
                fill="url(#pattern0_2012_907)"
              />
              <defs>
                <pattern
                  id="pattern0_2012_907"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_2012_907"
                    transform="scale(0.003125)"
                  />
                </pattern>
                <image
                  id="image0_2012_907"
                  width="320"
                  height="320"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <div className="flex-1 min-w-0 bottom-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white flex items-center gap-[2px]">
                Arthur Taylor{" "}
                <span className="pt-[2px]">
                  {" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75437 3.81498C7.8784 3.53141 6.92613 3.92585 6.50722 4.74578L6.00361 5.73151C5.94377 5.84864 5.84852 5.9439 5.73139 6.00373L4.74566 6.50735C3.92572 6.92625 3.53129 7.87852 3.81485 8.7545L4.15577 9.80762C4.19627 9.93275 4.19627 10.0675 4.15577 10.1926L3.81485 11.2457C3.53129 12.1217 3.92572 13.074 4.74566 13.4929L5.73139 13.9965C5.84852 14.0564 5.94377 14.1516 6.00361 14.2687L6.50722 15.2545C6.92613 16.0744 7.8784 16.4689 8.75437 16.1853L9.8075 15.8444C9.93262 15.8039 10.0674 15.8039 10.1925 15.8444L11.2456 16.1853C12.1216 16.4689 13.0739 16.0744 13.4928 15.2545L13.9964 14.2687C14.0562 14.1516 14.1515 14.0564 14.2686 13.9965L15.2544 13.4929C16.0743 13.074 16.4687 12.1217 16.1852 11.2457L15.8442 10.1926C15.8037 10.0675 15.8037 9.93275 15.8442 9.80762L16.1852 8.7545C16.4687 7.87852 16.0743 6.92625 15.2544 6.50735L14.2686 6.00373C14.1515 5.9439 14.0562 5.84864 13.9964 5.73151L13.4928 4.74578C13.0739 3.92585 12.1216 3.53141 11.2456 3.81498L10.1925 4.15589C10.0674 4.19639 9.93262 4.1964 9.8075 4.15589L8.75437 3.81498ZM6.72485 9.84843L7.60874 8.9645L9.3765 10.7323L12.9121 7.19678L13.7959 8.08066L9.3765 12.5001L6.72485 9.84843Z"
                      fill="#47C2FF"
                    />
                  </svg>
                </span>
              </p>
             
            </div>
          </div>

          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7958 11.9993L9.08333 8.28676L10.1438 7.22626L14.9168 11.9993L10.1438 16.7723L9.08333 15.7118L12.7958 11.9993Z"
                fill="#525866"
              />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  </>
  );
}

// Navigation Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, icon, active, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`relative flex items-center font-sans  justify-between px-[12px] py-[8px] rounded-[6px] cursor-pointer transition-all duration-300 ${
        active ? " shadow-sm border bg-white" : "hover:bg-white/80"
      }`}
    >
      <span className="flex items-center gap-[8px]">
        <span className="pt-[2px]">{icon}</span>
        {active && (
          <span className="absolute -left-[16px] top-0 bottom-0 flex items-center">
            <svg
              width="4"
              height="20"
              viewBox="0 0 4 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z"
                fill="#525866"
              />
            </svg>
          </span>
        )}
        <span
          className={`text-sm  ${
            active ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {children}
        </span>
      </span>
      <span className="flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7958 9.99924L7.08333 6.28674L8.14383 5.22624L12.9168 9.99924L8.14383 14.7722L7.08333 13.7117L10.7958 9.99924Z"
            fill="#525866"
          />
        </svg>
      </span>
    </a>
  );
}

// Navigation Item with Sub-navigation
interface NavItemWithSubsProps {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSubClick: (value: string) => void;
  subItems: { label: string; value: string }[];
  parentKey: string;
  activeNav: string;
}

function NavItemWithSubs({
  title,
  icon,
  active,
  isExpanded,
  onToggle,
  onSubClick,
  subItems,
  parentKey,
  activeNav,
}: NavItemWithSubsProps) {
  return (
    <div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
        className={`relative flex items-center font-sans justify-between px-[12px] py-[8px] rounded-[8px] cursor-pointer transition-all duration-300 ${
          active ? "bg-white border border-border shadow-sm" : "hover:bg-white/80"
        }`}
      >
        <span className="flex items-center gap-[8px]">
          <span className="pt-[2px]">{icon}</span>
          {active && (
            <span className="absolute -left-[16px] top-0 bottom-0 flex items-center">
              <svg
                width="4"
                height="20"
                viewBox="0 0 4 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z"
                  fill="#525866"
                />
              </svg>
            </span>
          )}
          <span
            className={`text-sm font-medium ${
              active ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {title}
          </span>
        </span>
        <span className="flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
          >
            <path
              d="M10.7958 9.99924L7.08333 6.28674L8.14383 5.22624L12.9168 9.99924L8.14383 14.7722L7.08333 13.7117L10.7958 9.99924Z"
              fill="#525866"
            />
          </svg>
        </span>
      </a>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative ml-[32px] mt-1">
          {subItems.map((subItem, index) => {
            const isSubActive = activeNav === `${parentKey}-${subItem.value}`;
            const isLast = index === subItems.length - 1;
            return (
              <div key={subItem.value} className="relative flex items-center">
                {/* Curved L-shaped connector */}
                <div className="absolute left-0 flex">
                  {/* Vertical line going up */}
                  <div 
                    className={`absolute left-0 bottom-1/2 w-[0.5px] bg-[#d1d5db] dark:bg-slate-600 ${
                      index === 0 ? "h-[1px]" : "h-full"
                    }`}
                    style={{ height: index === 0 ? '1px' : 'calc(100% + 4px)', bottom: '50%' }}
                  ></div>
                  {/* Curved corner + horizontal line */}
                  <div 
                    className="w-[16px] h-[16px] border-l-[0.5px] border-b-[0.5px] border-[#d1d5db] dark:border-slate-600 rounded-bl-[8px]"
                  ></div>
                </div>
                {/* Vertical line extending down for non-last items */}
                {!isLast && (
                  <div 
                    className="absolute left-0 top-1/2 w-[0.5px] h-[calc(100%+4px)] bg-[#d1d5db] dark:bg-slate-600"
                  ></div>
                )}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubClick(subItem.value);
                  }}
                  className={`relative block ml-[20px] px-[8px] py-[10px]  text-sm transition-all duration-200 ${
                    isSubActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {subItem.label}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Icon Components
function HomeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.75 3.25C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H16.75ZM9.25 10.75H4V15.25H9.25V10.75ZM16 10.75H10.75V15.25H16V10.75ZM9.25 4.75H4V9.25H9.25V4.75ZM16 4.75H10.75V9.25H16V4.75Z"
        fill="#525866"
      />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.25 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25ZM16 9.25H4V15.25H16V9.25ZM16 7.75V4.75H4V7.75H16ZM11.5 12.25H14.5V13.75H11.5V12.25Z"
        fill="#525866"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0375 10.0375L16.75 13.75L13.0375 17.4625L11.977 16.402L13.879 14.4993L4 14.5V13H13.879L11.977 11.098L13.0375 10.0375ZM6.9625 2.53751L8.023 3.59801L6.121 5.50001H16V7.00001H6.121L8.023 8.90201L6.9625 9.96251L3.25 6.25001L6.9625 2.53751Z"
        fill="#525866"
      />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5C5.85775 17.5 2.5 14.1423 2.5 10H4C4 13.3135 6.6865 16 10 16C13.3135 16 16 13.3135 16 10C16 6.6865 13.3135 4 10 4C7.9375 4 6.118 5.04025 5.03875 6.625H7V8.125H2.5V3.625H4V5.5C5.368 3.6775 7.54675 2.5 10 2.5ZM10.75 6.25V9.68875L13.1823 12.121L12.121 13.1823L9.25 10.3098V6.25H10.75Z"
        fill="#525866"
      />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V3.25C3.25 3.05109 3.32902 2.86032 3.46967 2.71967C3.61032 2.57902 3.80109 2.5 4 2.5H16C16.1989 2.5 16.3897 2.57902 16.5303 2.71967C16.671 2.86032 16.75 3.05109 16.75 3.25V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5ZM15.25 16V4H4.75V16H15.25ZM7 7.75H13V9.25H7V7.75ZM7 10.75H13V12.25H7V10.75Z"
        fill="#525866"
      />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM6.25 10.75H13V12.25H10V14.5L6.25 10.75ZM10 7.75V5.5L13.75 9.25H7V7.75H10Z"
        fill="#525866"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5145 4L9.46975 2.04475C9.6104 1.90415 9.80113 1.82516 10 1.82516C10.1989 1.82516 10.3896 1.90415 10.5303 2.04475L12.4855 4H15.25C15.4489 4 15.6397 4.07902 15.7803 4.21967C15.921 4.36033 16 4.55109 16 4.75V7.5145L17.9552 9.46975C18.0959 9.6104 18.1748 9.80113 18.1748 10C18.1748 10.1989 18.0959 10.3896 17.9552 10.5303L16 12.4855V15.25C16 15.4489 15.921 15.6397 15.7803 15.7803C15.6397 15.921 15.4489 16 15.25 16H12.4855L10.5303 17.9553C10.3896 18.0959 10.1989 18.1748 10 18.1748C9.80113 18.1748 9.6104 18.0959 9.46975 17.9553L7.5145 16H4.75C4.55109 16 4.36032 15.921 4.21967 15.7803C4.07902 15.6397 4 15.4489 4 15.25V12.4855L2.04475 10.5303C1.90415 10.3896 1.82516 10.1989 1.82516 10C1.82516 9.80113 1.90415 9.6104 2.04475 9.46975L4 7.5145V4.75C4 4.55109 4.07902 4.36033 4.21967 4.21967C4.36032 4.07902 4.55109 4 4.75 4H7.5145ZM5.5 5.5V8.13625L3.63625 10L5.5 11.8638V14.5H8.13625L10 16.3638L11.8638 14.5H14.5V11.8638L16.3637 10L14.5 8.13625V5.5H11.8638L10 3.63625L8.13625 5.5H5.5ZM10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7957 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7957 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13ZM10 11.5C10.3978 11.5 10.7794 11.342 11.0607 11.0607C11.342 10.7794 11.5 10.3978 11.5 10C11.5 9.60218 11.342 9.22065 11.0607 8.93934C10.7794 8.65804 10.3978 8.5 10 8.5C9.60218 8.5 9.22064 8.65804 8.93934 8.93934C8.65804 9.22065 8.5 9.60218 8.5 10C8.5 10.3978 8.65804 10.7794 8.93934 11.0607C9.22064 11.342 9.60218 11.5 10 11.5Z"
        fill="#525866"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10H6.25C6.64782 10 7.02936 10.158 7.31066 10.4393C7.59196 10.7206 7.75 11.1022 7.75 11.5V15.25C7.75 15.6478 7.59196 16.0294 7.31066 16.3107C7.02936 16.592 6.64782 16.75 6.25 16.75H4C3.60218 16.75 3.22064 16.592 2.93934 16.3107C2.65804 16.0294 2.5 15.6478 2.5 15.25V10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10V15.25C17.5 15.6478 17.342 16.0294 17.0607 16.3107C16.7794 16.592 16.3978 16.75 16 16.75H13.75C13.3522 16.75 12.9706 16.592 12.6893 16.3107C12.408 16.0294 12.25 15.6478 12.25 15.25V11.5C12.25 11.1022 12.408 10.7206 12.6893 10.4393C12.9706 10.158 13.3522 10 13.75 10H16C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4ZM4 11.5V15.25H6.25V11.5H4ZM13.75 11.5V15.25H16V11.5H13.75Z"
        fill="#525866"
      />
    </svg>
  );
}