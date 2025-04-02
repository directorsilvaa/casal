"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, BookmarkPlus, Check, Trash2, Clock, Plane } from "lucide-react";
import { toast } from "sonner";

const travelIdeas = {
  "Destinos Próximos": [
    {
      name: "Praia do Forte",
      distance: "1h50 de carro",
      description: "Praias lindas e restaurantes sofisticados."
    },
    {
      name: "Imbassaí",
      distance: "2h de carro",
      description: "Cenário paradisíaco com rio e mar juntos."
    },
    {
      name: "Baixio",
      distance: "2h30 de carro",
      description: "Lagoa Azul e praias desertas para relaxar."
    },
    {
      name: "Cachoeira e São Félix",
      distance: "1h de carro",
      description: "Cidade histórica charmosa."
    },
    {
      name: "Guarajuba",
      distance: "2h de carro",
      description: "Mar azul cristalino e restaurantes de frutos do mar."
    },
    {
      name: "Ilha de Itaparica",
      distance: "2h30 de carro + ferry boat",
      description: "Praias tranquilas e natureza preservada."
    },
    {
      name: "Morro de São Paulo",
      distance: "3h30 de carro + barco",
      description: "Baladas, praias e pôr do sol inesquecível."
    },
    {
      name: "Boipeba",
      distance: "4h de carro + barco",
      description: "Paraíso tranquilo com praias desertas."
    },
    {
      name: "Costa do Sauípe",
      distance: "2h30 de carro",
      description: "Resorts de luxo e praias paradisíacas."
    },
    {
      name: "Rio Paraguaçu e Recôncavo Baiano",
      distance: "1h30 de carro",
      description: "Passeio de barco romântico."
    },
    {
      name: "Mangue Seco",
      distance: "4h de carro",
      description: "Dunas, buggy e praias isoladas."
    },
    {
      name: "Massarandupió",
      distance: "3h de carro",
      description: "Uma das melhores praias de nudismo do Brasil (opcional)."
    },
    {
      name: "Conde",
      distance: "3h de carro",
      description: "Praias paradisíacas e pousadas românticas."
    },
    {
      name: "Subaúma",
      distance: "3h de carro",
      description: "Lugar tranquilo com belas praias."
    },
    {
      name: "Praia de Santo Antônio",
      distance: "2h30 de carro",
      description: "Pequena vila com clima rústico e acolhedor."
    }
  ],
  "Destinos Especiais": [
    {
      name: "Fernando de Noronha",
      distance: "Voo de Salvador",
      description: "Mergulhos e cenários paradisíacos."
    },
    {
      name: "Alter do Chão",
      distance: "Voo para Santarém-PA",
      description: "Caribe amazônico com praias fluviais."
    },
    {
      name: "Jericoacoara",
      distance: "Voo para Fortaleza + 4h de carro",
      description: "Dunas, lagoas e pôr do sol cinematográfico."
    },
    {
      name: "Gramado e Canela",
      distance: "Voo para Porto Alegre + 2h de carro",
      description: "Friozinho e clima europeu no Brasil."
    },
    {
      name: "Campos do Jordão",
      distance: "Voo para São Paulo + 2h de carro",
      description: "Clima europeu e vinhos."
    },
    {
      name: "Bonito",
      distance: "Voo para Campo Grande + 4h de carro",
      description: "Para quem ama natureza e cachoeiras."
    },
    {
      name: "Lençóis Maranhenses",
      distance: "Voo para São Luís + 4h de carro",
      description: "Dunas e lagoas incríveis."
    },
    {
      name: "Santorini",
      distance: "Voo internacional",
      description: "A vista dos sonhos para casais."
    },
    {
      name: "Paris",
      distance: "Voo internacional",
      description: "A cidade mais romântica do mundo."
    },
    {
      name: "Veneza",
      distance: "Voo internacional",
      description: "Passeio de gôndola inesquecível."
    }
  ]
};

interface TravelIdea {
  name: string;
  distance: string;
  description: string;
}

interface SavedIdea {
  category: string;
  idea: TravelIdea;
  savedAt: string;
}

export function TravelIdeas() {
  const [currentIdea, setCurrentIdea] = useState<{category: string; idea: TravelIdea} | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedTravelIdeas');
    if (saved) {
      setSavedIdeas(JSON.parse(saved));
    }
  }, []);

  const generateRandomIdea = () => {
    const categories = Object.keys(travelIdeas);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const ideasInCategory = travelIdeas[randomCategory as keyof typeof travelIdeas];
    const randomIdea = ideasInCategory[Math.floor(Math.random() * ideasInCategory.length)];
    
    setCurrentIdea({
      category: randomCategory,
      idea: randomIdea
    });
  };

  const saveCurrentIdea = () => {
    if (currentIdea) {
      const newSavedIdea: SavedIdea = {
        ...currentIdea,
        savedAt: new Date().toISOString()
      };
      
      const updatedSavedIdeas = [...savedIdeas, newSavedIdea];
      setSavedIdeas(updatedSavedIdeas);
      localStorage.setItem('savedTravelIdeas', JSON.stringify(updatedSavedIdeas));
      
      toast.success("Destino salvo com sucesso!", {
        description: "Você pode encontrá-lo na sua lista de destinos salvos."
      });
    }
  };

  const deleteSavedIdea = (index: number) => {
    const updatedSavedIdeas = savedIdeas.filter((_, i) => i !== index);
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedTravelIdeas', JSON.stringify(updatedSavedIdeas));
    
    toast.success("Destino removido com sucesso!");
  };

  const isCurrentIdeaSaved = currentIdea 
    ? savedIdeas.some(saved => 
        saved.category === currentIdea.category && 
        saved.idea.name === currentIdea.idea.name
      )
    : false;

  return (
    <div className="text-center">
      <div className="flex justify-center gap-3 mb-8">
        <Button
          onClick={generateRandomIdea}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
          size="lg"
        >
          {currentIdea ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5" />
              Gerar Novo Destino
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Destino
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowSaved(!showSaved)}
          className="border-purple-200 hover:bg-purple-50"
        >
          {showSaved ? "Voltar" : `Destinos Salvos (${savedIdeas.length})`}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!showSaved && currentIdea && (
          <motion.div
            key={currentIdea.idea.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <motion.div
              className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 shadow-lg"
              layout
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {currentIdea.category === "Destinos Próximos" ? (
                  <Clock className="w-5 h-5 text-purple-600" />
                ) : (
                  <Plane className="w-5 h-5 text-purple-600" />
                )}
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                  {currentIdea.category}
                </h3>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {currentIdea.idea.name}
              </h4>
              <p className="text-purple-600 dark:text-purple-300 font-medium mb-2">
                {currentIdea.idea.distance}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentIdea.idea.description}
              </p>
              <Button
                onClick={saveCurrentIdea}
                variant="secondary"
                className="bg-white/50 hover:bg-white/80"
                disabled={isCurrentIdeaSaved}
              >
                {isCurrentIdeaSaved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvo
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Salvar Destino
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {savedIdeas.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum destino salvo ainda</p>
            ) : (
              savedIdeas.map((saved, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md relative group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {saved.category === "Destinos Próximos" ? (
                      <Clock className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Plane className="w-4 h-4 text-purple-600" />
                    )}
                    <h3 className="text-lg font-semibold text-purple-700">
                      {saved.category}
                    </h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                    {saved.idea.name}
                  </h4>
                  <p className="text-purple-600 font-medium text-sm mb-1">
                    {saved.idea.distance}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {saved.idea.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Salvo em: {new Date(saved.savedAt).toLocaleDateString('pt-BR')}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteSavedIdea(index)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </Button>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}