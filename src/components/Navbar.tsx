
'use client';

import Link from 'next/link';
import { Newspaper, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-accent transition-colors">
                <Newspaper className="h-6 w-6" />
              </div>
              <span className="text-xl font-headline font-bold text-primary tracking-tight">
                Berita<span className="text-accent">Kita</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {['Politik', 'Ekonomi', 'Olahraga', 'Teknologi'].map((cat) => (
                <Link 
                  key={cat} 
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {['Politik', 'Ekonomi', 'Olahraga', 'Teknologi'].map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${cat.toLowerCase()}`}
              className="text-lg font-medium text-foreground py-2 border-b border-muted last:border-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full bg-primary text-white">Admin Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
