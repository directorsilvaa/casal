"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, BookmarkPlus, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

const dateIdeas = {
  "Passeios ao Ar Livre": [
    "Piquenique no Parque da Cidade com vinho e petiscos",
    "Caminhada matinal na Avenida Nóide Cerqueira seguida de um café da manhã especial",
    "Assistir ao pôr do sol no Parque Radialista Erivaldo Cerqueira",
    "Passeio pelo Horto Florestal e tomar um açaí na região",
    "Explorar o Centro Histórico e visitar igrejas e monumentos",
    "Tomar um café no Empório Joaquim após um passeio pelo centro",
    "Passear pelo Feiraguay e comprar presentes engraçados um para o outro",
    "Fazer um tour gastronômico na Praça da Alimentação do Ville Gourmet",
    "Visitar o Observatório Astronômico Antares para uma noite diferente",
    "Passeio pela Praça da Matriz seguido de um sorvete na Sorveteria Oásis",
    "Noite de hambúrguer e batata frita no Bulls Biergarten ao ar livre",
    "Explorar feiras de artesanato e produtos locais em eventos na cidade",
    "Ir à Feira do Livro e escolher um para ler juntos",
    "Fazer um ensaio fotográfico ao ar livre nos principais pontos da cidade",
    "Andar de patins ou bicicleta na pista da Avenida Nóide Cerqueira",
    "Fazer um tour por cafeterias charmosas da cidade",
    "Experimentar as barraquinhas de comida na Feiraguay e escolher a melhor",
    "Fazer uma caminhada noturna na Avenida Getúlio Vargas e parar para um drink",
    "Visitar o Mercado de Arte Popular e ver as opções culturais e musicais",
    "Passar uma tarde tomando um café no Instituto Cultural Egberto Costa"
  ],
  "Bares e Vida Noturna": [
    "Vitrô Gastrobar – drinks autorais e ambiente aconchegante",
    "Bulls Biergarten – hambúrguer artesanal e cervejas especiais",
    "Seu Zé Lounge Bar – ambiente sofisticado com música ao vivo",
    "Boteco do Vital – ótima opção para um happy hour descontraído",
    "La Dulce Café & Lounge Bar – mistura de cafeteria e drinks sofisticados",
    "Bar do Pinga – boteco raiz com cerveja gelada e bons petiscos",
    "Casa Noise – local alternativo com rock ao vivo",
    "Boteco do Jhow – petiscos e drinks com música ao vivo",
    "Estação Cervejeira – chopp artesanal e ambiente descontraído",
    "Noite de chopp e petiscos no Outback do Boulevard Shopping",
    "Experimentar drinks autorais no Buteco 90 Graus",
    "Noite de petiscos e cervejas artesanais no Bruzz Cervejaria",
    "Assistir a um show de MPB ou samba em um dos bares locais",
    "Explorar os rooftops e bares escondidos da cidade",
    "Tomar um drink exótico no Brooklyn Lounge Bar",
    "Provar um rodízio de petiscos no Seu Zé Lounge Bar",
    "Noite de tacos e margaritas no Taco Pepe Mexicano",
    "Visitar o Happy Hour do Botequim da Praça",
    "Noite de vinhos e queijos no Wine Bar Vinum",
    "Tomar um chopp artesanal e assistir futebol no Jack Bar"
  ],
  "Experiências Gastronômicas": [
    "Jantar romântico no Casarão Fróes com área externa charmosa",
    "Churrasco ao ar livre em um dos espaços para eventos da cidade",
    "Rodízio de sushi na varanda do Matsu Sushi Bar",
    "Jantar ao ar livre no Boteco do Vital com clima descontraído",
    "Experimentar as feirinhas gastronômicas de comida de rua",
    "Tomar um café especial no Oásis Coffee Lounge",
    "Comer um crepe e tomar vinho no Chez Patrício Bistrô",
    "Noite de hambúrguer artesanal no Bulls Biergarten",
    "Provar pratos diferentes no Festival Gastronômico de Feira de Santana",
    "Tomar um café especial no Villa's Café em um ambiente acolhedor"
  ]
};

interface SavedIdea {
  category: string;
  idea: string;
  savedAt: string;
}

export function OutdoorDateIdeas() {
  const [currentIdea, setCurrentIdea] = useState<{category: string; idea: string} | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedOutdoorDateIdeas');
    if (saved) {
      setSavedIdeas(JSON.parse(saved));
    }
  }, []);

  const generateRandomIdea = () => {
    const categories = Object.keys(dateIdeas);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const ideasInCategory = dateIdeas[randomCategory as keyof typeof dateIdeas];
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
      localStorage.setItem('savedOutdoorDateIdeas', JSON.stringify(updatedSavedIdeas));
      
      toast.success("Ideia salva com sucesso!", {
        description: "Você pode encontrá-la na sua lista de ideias salvas."
      });
    }
  };

  const deleteSavedIdea = (index: number) => {
    const updatedSavedIdeas = savedIdeas.filter((_, i) => i !== index);
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedOutdoorDateIdeas', JSON.stringify(updatedSavedIdeas));
    
    toast.success("Ideia removida com sucesso!");
  };

  const isCurrentIdeaSaved = currentIdea 
    ? savedIdeas.some(saved => saved.category === currentIdea.category && saved.idea === currentIdea.idea)
    : false;

  return (
    <div className="text-center">
      <div className="flex justify-center gap-3 mb-8">
        <Button
          onClick={generateRandomIdea}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          size="lg"
        >
          {currentIdea ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5" />
              Gerar Nova Ideia
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Ideia de Date
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowSaved(!showSaved)}
          className="border-blue-200 hover:bg-blue-50"
        >
          {showSaved ? "Voltar" : `Ideias Salvas (${savedIdeas.length})`}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!showSaved && currentIdea && (
          <motion.div
            key={currentIdea.idea}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <motion.div
              className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 shadow-lg"
              layout
            >
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                {currentIdea.category}
              </h3>
              <p className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                {currentIdea.idea}
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
                    Salvar Ideia
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
              <p className="text-gray-500 italic">Nenhuma ideia salva ainda</p>
            ) : (
              savedIdeas.map((saved, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md relative group"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    {saved.category}
                  </h3>
                  <p className="text-xl text-gray-800 mb-2">{saved.idea}</p>
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