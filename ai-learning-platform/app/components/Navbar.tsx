import { Searchbar } from "./Searchbar";
import Link from 'next/link';

interface NavbarProps {
  onSearch: (term: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  return (
    <div className="flex items-center justify-between bg-transparent p-4 fixed z-20 w-full backdrop-blur-sm">
      <div className="flex items-center space-x-6">
        <div>
          <Link href="/" className="text-2xl md:text-3xl font-semibold dev-heading gold-gradient">Gyaan Guru</Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/courses" className="nav-link text-sm hover:underline">Courses</Link>
          <Link href="/shlokas" className="nav-link text-sm hover:underline">Shlokas</Link>
          <Link href="/dashboard" className="nav-link text-sm hover:underline">Dashboard</Link>
        </nav>
      </div>
    </div>
  );
}
