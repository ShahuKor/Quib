"use client";
import { cn } from "@/lib/utils";
import Link from "next/link"; // ✅ Use from "next/link", not "next/dist/client/link"
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // ✅ Allow onClick
};

export default function NavLink({
  href,
  children,
  className,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick} // ✅ Forward it to the <Link>
      className={cn(
        "transition-colors duration-200 hover:text-neutral-600/50 text-gray-900",
        className,
        isActive && "text-neutral-600/50"
      )}
    >
      {children}
    </Link>
  );
}
