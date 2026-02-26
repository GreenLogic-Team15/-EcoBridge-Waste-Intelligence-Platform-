import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  return ctx || { marginClass: "ml-0", isMobileOpen: false, setMobileOpen: () => {}, isCollapsed: false, setCollapsed: () => {}, isMobile: true };
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = () => setMatches(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function SidebarProvider({ children }) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const marginClass = isMobile ? "ml-0" : isCollapsed ? "ml-14" : "ml-56";

  return (
    <SidebarContext.Provider
      value={{
        marginClass,
        isMobileOpen,
        setMobileOpen,
        isCollapsed,
        setCollapsed,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
