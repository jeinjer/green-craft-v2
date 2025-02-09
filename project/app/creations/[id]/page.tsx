"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BookMarked, Share2, MessageSquare } from 'lucide-react';

export default function CreationDetailPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const creation = {
    title: "Lámpara de Botellas Recicladas",
    description: "Una hermosa lámpara creada a partir de botellas de vidrio recicladas. Este proyecto demuestra cómo podemos transformar residuos en piezas de arte funcionales para nuestro hogar.",
    author: {
      name: "María González",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      initials: "MG"
    },
    category: "Decoración",
    materials: [
      "Botellas de vidrio recicladas",
      "Cable eléctrico",
      "Bombilla LED",
      "Soporte de metal reciclado"
    ],
    images: [
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&auto=format&fit=crop&q=60"
    ],
    stats: {
      likes: 245,
      saves: 123,
      comments: 45
    },
    createdAt: "2024-03-15"
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square">
              <img
                src={creation.images[currentImage]}
                alt={creation.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {creation.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {creation.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${creation.title} ${index + 1}`}
                    className={`w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                      currentImage === index ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Creation Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{creation.category}</Badge>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-red-500' : ''}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSaved(!isSaved)}
                    className={isSaved ? 'text-green-500' : ''}
                  >
                    <BookMarked className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-2">{creation.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src={creation.author.avatar} />
                  <AvatarFallback>{creation.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{creation.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(creation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="materials">Materiales</TabsTrigger>
                <TabsTrigger value="comments">
                  Comentarios ({creation.stats.comments})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">{creation.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="materials" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="list-disc list-inside space-y-2">
                      {creation.materials.map((material, index) => (
                        <li key={index} className="text-gray-700">{material}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarFallback>TU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-2 border rounded-lg resize-none"
                          placeholder="Añade un comentario..."
                          rows={3}
                        />
                        <Button className="mt-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Comentar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {creation.stats.likes} me gusta
              </span>
              <span className="flex items-center gap-1">
                <BookMarked className="h-4 w-4" /> {creation.stats.saves} guardados
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {creation.stats.comments} comentarios
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}