"use client";

import { UserCircle2Icon } from "lucide-react";
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

        <div className="cursor-pointer bg-muted hover:bg-white/80 transition-all duration-300 rounded-[6px] p-[2px] border border-gray-200 shadow-sm ">
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
              icon={<HomeIcon active={activeNav === "Dashboard"} />}
              active={activeNav === "Dashboard"}
              onClick={() => setActiveNav("Dashboard")}
            >
              Dashboard
            </NavLink>
            <NavItemWithSubs
              title="Payments"
              icon={<PaymentIcon active={activeNav === "Payments"} />}
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
              icon={<WalletIcon active={activeNav === "Transfer"} />}
              active={activeNav === "Transfer"}
              onClick={() => setActiveNav("Transfer")}
            >
              Transfer
            </NavLink>
            <NavItemWithSubs
              title="Transactions"
              icon={<InvoiceIcon active={activeNav === "Transactions"} />}
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
              icon={<AnalyticsIcon active={activeNav === "Exchange"} />}
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
              icon={<SettingsIcon active={activeNav === "Settings"}   />}
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
              icon={<SupportIcon active={activeNav === "Support"} />}
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
           <UserCircle2Icon className="size-6 text-neutral-500" />
            <div className="flex-1 min-w-0 bottom-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white flex items-center gap-[2px]">
                Potato Turf{" "}
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
        active ? " shadow-sm border bg-[#423636] text-white" : "hover:bg-white/80"
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
                fill="#423636"
              />
            </svg>
          </span>
        )}
        <span
          className={`text-sm  ${
            active ? "text-white" : "text-muted-foreground"
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
            fill={active ? "#FFFFFF" : "#525866"}
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
          active ? " bg-white text-foreground shadow-sm" : "hover:bg-white/80"
        }`}
      >
        <span className="flex items-center gap-[8px]">
          <span className="pt-[2px] ">{icon}</span>
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
                  fill="#423636"
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
              fill= {active ? "#FFFFFF" : "#525866"}
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
                <div className="absolute left-0 border-l-[0.5px] border-black dark:border-slate-600">
                  {/* Vertical line going up */}
                
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
function HomeIcon({active}: {active: boolean}) {
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
        fill= {active ? "#FFFFFF" : "#525866"} 
      />
    </svg>
  );
}

function PaymentIcon({active}: {active: boolean}) {
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
        fill={active ? "#FFFFFF" : "#525866"}
      />
    </svg>
  );
}

function WalletIcon({active}: {active: boolean}) {

  
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
        fill= {active ? "#FFFFFF" : "#525866"} 
      />
    </svg>
  );
}

function InvoiceIcon({active}: {active: boolean}) {
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
        fill={active ? "#FFFFFF" : "#525866"}
      />
    </svg>
  );
}

  function CustomersIcon({active}: {active: boolean}) {
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
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AnalyticsIcon({active}: {active: boolean}) {
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
        fill={active ? "#FFFFFF" : "#525866"}
      />
    </svg>
  );
}

function SettingsIcon({active}: {active: boolean}) {
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
          fill={active ? "#FFFFFF" : "#525866"}
      />
    </svg>
  );
}

function SupportIcon({active}: {active: boolean}) {
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
        fill={active ? "#FFFFFF" : "#525866"}
      />
    </svg>
  );
}