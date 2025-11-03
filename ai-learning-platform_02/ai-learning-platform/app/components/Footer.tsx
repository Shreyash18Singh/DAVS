"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-slate-800/40">
      <div className="container-wide mx-auto text-center">
  <div className="text-sm italic text-slate-200/90 gold-gradient">“From Om arises all knowledge. Let your mind be its reflection.”</div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-300">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/api-docs" className="hover:underline">API Docs</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
        <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} Gyaan Guru — Built with reverence and AI.</div>
      </div>
    </footer>
  );
}
