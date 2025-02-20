"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const materialsList = [
  "Botellas de plástico",
  "Vidrio",
  "Metal",
  "Cartón",
  "Papel",
  "Madera",
  "Tela",
  "Cables",
  "Electrónicos",
  "Envases",
  "Baterías",
];

export default function CreacionesPersonalizadasPage() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [suggestion, setSuggestion] = useState("");

  const handleCheckboxChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials((prev) => [...prev, material]);
    } else {
      setSelectedMaterials((prev) => prev.filter((m) => m !== material));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulación: Creamos un par de creaciones dummy para probar.
    const dummyCreations = [
      {
        id: 1,
        title: "Lámpara Reciclada",
        materials: ["Botellas de plástico", "Metal"],
        image:
          "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=60",
        link: "/creations/1",
      },
      {
        id: 2,
        title: "Jardín Vertical",
        materials: ["Cartón", "Tela"],
        image:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&auto=format&fit=crop&q=60",
        link: "/creations/2",
      },
    ];

    // Filtramos las creaciones que tengan al menos un material seleccionado
    const foundCreations = dummyCreations.filter((creation) =>
      selectedMaterials.some((material) =>
        creation.materials.includes(material)
      )
    );

    if (foundCreations.length > 0) {
      setResults(foundCreations);
      setSuggestion("");
    } else {
      setResults([]);
      // Si no hay coincidencias, se simula una sugerencia
      setSuggestion(
        "No encontramos creaciones que coincidan con tus materiales. Sugerimos crear una Mesa de Centro Reciclada utilizando madera y vidrio. Puedes ver el proceso en el siguiente video."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Creaciones Personalizadas</h1>
      <p className="mb-4">
        Selecciona los materiales reciclables que tienes disponibles y encuentra
        creaciones inspiradoras, o recibe una sugerencia personalizada.
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {materialsList.map((material) => (
            <label
              key={material}
              className="flex items-center space-x-2 p-2 border rounded hover:bg-green-50 cursor-pointer"
            >
              <input
                type="checkbox"
                value={material}
                onChange={(e) =>
                  handleCheckboxChange(material, e.target.checked)
                }
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span>{material}</span>
            </label>
          ))}
        </div>
        <Button type="submit" className="mt-4">
          Buscar Creaciones
        </Button>
      </form>

      <div>
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Resultados Encontrados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((creation) => (
                <Card key={creation.id}>
                  <CardHeader>
                    <CardTitle>{creation.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={creation.image}
                      alt={creation.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  </CardContent>
                  <div className="p-4">
                    <Button variant="outline" asChild>
                      <Link href={creation.link}>Ver Detalle</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && suggestion && (
          <div className="mt-8 p-4 border rounded">
            <h2 className="text-2xl font-semibold mb-4">
              Sugerencia Personalizada
            </h2>
            <p>{suggestion}</p>
            <Button variant="outline" className="mt-4">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Video de la Creación
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
