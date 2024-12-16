"use client";

import { usePathname } from "next/navigation"; // Import the hook
import NavBar from "../ui/navigation/navbar";
import SideNavXL from "../ui/navigation/SideNav-XL";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  // Define routes where the Header should be hidden
  const hideHeaderRoutes = ["/login", "/signup", "/test", "/"];
  const hideSideNavRoutes = ["/post/make"];
  // lg:basis-1/5 2xl:basis-1/6
  return (
    <div>
  <link rel="icon" href="/logo.svg" />
  {/* Conditionally render Header only on routes not listed in hideHeaderRoutes */}
  {!hideHeaderRoutes.includes(pathname) && <NavBar />}
  <div className="flex">
    {/* Conditionally apply styles and render SideNavXL */}
    {!hideHeaderRoutes.includes(pathname) ? (
      <div className="lg:basis-1/5 2xl:basis-1/6">
        <SideNavXL />
      </div>
    ) : (
      <div></div> // If needed, leave empty or style as desired
    )}
    <div className="flex-grow">
      {children}
    </div>
  </div>
</div>

  );
}
