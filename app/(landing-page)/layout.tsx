import { INavLink } from "@/types/links";
import { FloatingNavbar } from "./sections/FloatingNavbar";
import Footer from "./sections/Footer";
import FloatingNavbarMobile from "./sections/FloatingNavbarMobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems: INavLink[] = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "How It Works",
      link: "#howItWorks",
    },
    {
      name: "Showcase",
      link: "#showcase",
    },
    {
      name: "Login",
      link: "#",
      showOnMobile: true,
    },
  ];

  return (
    <>
      <FloatingNavbar navItems={navItems} />
      <FloatingNavbarMobile navItems={navItems} />
      {children}
      <Footer />
    </>
  );
}
