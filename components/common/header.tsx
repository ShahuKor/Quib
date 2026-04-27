"use client";
import { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ClientOnly from "../client";
import UserButtonCustom from "./UserButtonCustom";

export default function Header({ planBadge }: { planBadge?: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="relative w-full px-4 py-4 lg:px-8 flex items-center justify-between">
      {/* Logo */}
      <NavLink href="/" className="flex items-center gap-2 ">
        <FileText className="h-6 w-6 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
        <span className="text-xl font-semibold tracking-widest text-gray-900">
          QUIB
        </span>
      </NavLink>

      {/* Desktop Nav */}
      <ClientOnly>
        <SignedOut>
          <div className="hidden md:flex items-center justify-center gap-6 md:mr-8">
            <NavLink href="/#pricing">Pricing</NavLink>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="hidden md:flex items-center justify-center gap-6 lg:pl-40">
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/dashboard">You Summaries</NavLink>
          </div>
        </SignedIn>
      </ClientOnly>

      <ClientOnly>
        <div className="hidden md:flex items-center gap-2 ">
          <SignedIn>
            <NavLink href="/upload">Upload a PDF</NavLink>
          </SignedIn>
          {planBadge}
          <SignedIn>
            <UserButtonCustom />
          </SignedIn>
          <SignedOut>
            <NavLink href="/sign-in">Sign In</NavLink>
          </SignedOut>
        </div>
      </ClientOnly>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <Menu className="h-6 w-6 text-gray-900" />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 z-50 h-screen w-full bg-white flex flex-col items-center justify-center gap-6 text-xl">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          <NavLink href="/#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>

          <ClientOnly>
            <SignedIn>
              <>
                <NavLink href="/dashboard" onClick={() => setMenuOpen(false)}>
                  You Summaries
                </NavLink>
                <NavLink href="/upload" onClick={() => setMenuOpen(false)}>
                  Upload a PDF
                </NavLink>
                <span>Pro</span>
                <UserButtonCustom />
              </>
            </SignedIn>

            <SignedOut>
              <NavLink href="/sign-in" onClick={() => setMenuOpen(false)}>
                Sign In
              </NavLink>
            </SignedOut>
          </ClientOnly>
        </div>
      )}
    </nav>
  );
}
