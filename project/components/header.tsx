"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, Leaf, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Decoración', icon: '🎨' },
    { name: 'Muebles', icon: '🪑' },
    { name: 'Arte', icon: '🖼️' },
    { name: 'Jardín', icon: '🌿' },
    { name: 'Juguetes', icon: '🧸' },
    { name: 'Accesorios', icon: '👜' }
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-green-800/95 backdrop-blur-md shadow-lg' : 'bg-green-800'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline text-white">GreenCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="relative max-w-md w-full">
              <Input
                type="search"
                placeholder="Buscar creaciones..."
                className="w-full transition-all duration-300 bg-green-700/50 border-green-600 text-white placeholder:text-green-300 focus:bg-green-700/70"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-green-300" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="bg-green-700/50 text-white hover:bg-green-700/70">
                  Categorías
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 grid grid-cols-1 gap-1">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="text-white hover:bg-green-700/50">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700/50"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-green-700/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold mb-4">Menú</h2>
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant="ghost"
                      className="justify-start"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                  <hr className="my-4" />
                  <Button variant="outline" className="justify-start">
                    <User className="mr-2 h-5 w-5" />
                    Mi Cuenta
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isSearchExpanded ? 'h-14 opacity-100 mb-2' : 'h-0 opacity-0'
          )}
        >
          <div className="py-2">
            <Input
              type="search"
              placeholder="Buscar creaciones..."
              className="w-full bg-green-700/50 border-green-600 text-white placeholder:text-green-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}