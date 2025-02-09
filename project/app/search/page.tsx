"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, BookMarked } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const creations = [
  {
    id: 1,
    title: "Lámpara de Botellas Recicladas",
    author: "María González",
    image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=60",
    category: "Decoración",
    likes: 245,
    saves: 123
  },
  {
    id: 2,
    title: "Jardín Vertical de Pallets",
    author: "Carlos Ruiz",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&auto=format&fit=crop&q=60",
    category: "Jardín",
    likes: 189,
    saves: 87
  },
  // Añade más creaciones aquí
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explorar Creaciones</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Buscar creaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex gap-4">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="trending">Tendencias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['Todos', 'Decoración', 'Muebles', 'Arte', 'Jardín', 'Juguetes', 'Accesorios'].map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="cursor-pointer hover:bg-green-100"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {creations.map((creation) => (
          <Card key={creation.id} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={creation.image}
                  alt={creation.title}
                  className="w-full aspect-square object-cover group-hover:transition-transform pointer duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold mb-1">{creation.title}</h3>
                    <p className="text-white/80 text-sm">por {creation.author}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{creation.category} </Badge>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {creation.likes}
                    </span>
                    <span className="flex items-center">
                      <BookMarked className="h-4 w-4 mr-1" />
                      {creation.saves}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <Button variant="outline">Cargar más</Button>
      </div>
    </div>
  );
}