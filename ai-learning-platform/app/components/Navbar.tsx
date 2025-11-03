"use client";

import { useState } from "react";
import { Searchbar } from "./Searchbar";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
    return (
      <Link
        href={href}
        className={text-sm px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? 'bg-slate-800/30 text-yellow-200' : 'text-amber-200 hover:bg-slate-800/10'}}
        onClick={() => setOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="backdrop-blur-sm bg-black/30 border-b border-slate-800/20">
        <div className="container-wide flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-md">
                <span className="font-semibold text-white">ॐ</span>
              </div>
              <span className="text-lg md:text-2xl font-semibold dev-heading gold-gradient">Gyaan Guru</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/shlokas">Shlokas</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block w-56">
              <Searchbar onSearch={onSearch} />
            </div>

            {/* mobile hamburger */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="md:hidden p-2 rounded-md text-slate-200 hover:bg-slate-800/20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200">
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      <div className={md:hidden fixed inset-x-4 top-16 z-40 transform transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}}>
        <div className="glass-card p-4">
          <div className="flex flex-col gap-2">
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/shlokas">Shlokas</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <div className="pt-2">
              <Searchbar onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
