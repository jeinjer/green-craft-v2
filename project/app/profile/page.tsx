"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Heart, BookMarked, Settings } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">Usuario Ejemplo</h1>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Pencil className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
          <p className="text-muted-foreground">
            Creador apasionado por el reciclaje y el arte sostenible
          </p>
          <div className="flex gap-4 mt-4">
            <div>
              <span className="font-semibold">120</span>
              <span className="text-muted-foreground ml-1">creaciones</span>
            </div>
            <div>
              <span className="font-semibold">1.5k</span>
              <span className="text-muted-foreground ml-1">seguidores</span>
            </div>
            <div>
              <span className="font-semibold">890</span>
              <span className="text-muted-foreground ml-1">siguiendo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="creations" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="creations">Mis Creaciones</TabsTrigger>
          <TabsTrigger value="likes">Me Gusta</TabsTrigger>
          <TabsTrigger value="saved">Guardados</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="creations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item}>
                <CardContent className="p-0">
                  <img
                    src={`https://picsum.photos/400/300?random=${item}`}
                    alt="Creation preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Creación #{item}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>hace 2 días</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" /> 24
                        </span>
                        <span className="flex items-center">
                          <BookMarked className="h-4 w-4 mr-1" /> 12
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de la Cuenta</CardTitle>
              <CardDescription>
                Administra tu información personal y preferencias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" defaultValue="Usuario Ejemplo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="usuario@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Input id="bio" defaultValue="Creador apasionado por el reciclaje y el arte sostenible" />
                </div>
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}