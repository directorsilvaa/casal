"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, BookmarkPlus, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

const dateIdeas = {
  "Românticos e Relaxantes": [
    "Jantar à luz de velas na sala com música suave",
    "Criar um spa caseiro com massagens e óleos essenciais",
    "Preparar um café da manhã na cama surpresa",
    "Fazer um banho de espuma com pétalas e velas",
    "Escrever cartas de amor e ler um para o outro",
    "Dormir na sala com um acampamento de cobertores",
    "Fazer uma playlist especial e dançar juntinhos na sala",
    "Criar um 'menu de restaurante' e servir um ao outro",
    "Assistir o pôr do sol na varanda com vinho",
    "Dormir sob as estrelas (montando um cantinho aconchegante no quintal)"
  ],
  "Gastronômicos e Divertidos": [
    "Fazer um rodízio de pizza caseira",
    "Noite de fondue doce e salgado",
    "Competição de quem faz o melhor hambúrguer",
    "Experimentar receitas de drinks e coquetéis diferentes",
    "Fazer uma noite do sushi e preparar tudo juntos",
    "Criar um desafio: cada um cozinha um prato sem o outro ver",
    "Noite de tapas espanholas ou petiscos gourmet",
    "Cozinhar uma receita surpresa e provar juntos",
    "Montar uma tábua de frios chique e degustar com vinho",
    "Fazer um jantar temático (comida mexicana, italiana, japonesa...)"
  ],
  "Criativos e Diferentes": [
    "Criar uma sessão de fotos só de vocês dois",
    "Fazer um desafio de pintura um do outro",
    "Criar um drink especial que represente o casal",
    "Fazer um DIY de decoração romântica para a casa",
    "Criar um álbum de memórias com fotos antigas",
    "Customizar camisetas ou canecas com frases engraçadas",
    "Gravar um vídeo contando a história do relacionamento de vocês",
    "Criar um mural de sonhos e metas para o futuro",
    "Fazer um vídeo de casal no TikTok ou Instagram",
    "Escrever um conto ou uma história sobre vocês"
  ],
  "Divertidos e Competitivos": [
    "Noite de jogos de tabuleiro ou cartas",
    "Competição de karaokê em casa",
    "Apostar em uma batalha de dança",
    "Criar um quiz de casal para ver quem sabe mais sobre o outro",
    "Competição de quem faz o melhor brigadeiro gourmet",
    "Jogar um videogame cooperativo juntos",
    "Noite de charadas ou adivinhação",
    "Tentar desafios virais do TikTok",
    "Fazer um escape room caseiro com enigmas criados por vocês",
    "Criar uma roleta com atividades surpresa para a noite"
  ],
  "Maratonas e Sessões Especiais": [
    "Maratona de filmes clássicos românticos",
    "Assistir a todos os episódios da série favorita de vocês",
    "Noite de filmes de terror com luzes apagadas e pipoca",
    "Criar um cinema em casa com ingressos e snacks especiais",
    "Fazer uma maratona de desenhos animados nostálgicos",
    "Criar um 'Netflix Surpresa': cada um escolhe um filme para o outro sem revelar antes",
    "Assistir um documentário interessante e debater depois",
    "Fazer uma 'viagem cinematográfica': assistir filmes de um país específico e cozinhar algo de lá",
    "Assistir vídeos antigos do casal e relembrar momentos",
    "Gravar um podcast caseiro sobre o que vocês mais gostam no relacionamento"
  ]
};

interface SavedIdea {
  category: string;
  idea: string;
  savedAt: string;
}

export function IndoorDateIdeas() {
  const [currentIdea, setCurrentIdea] = useState<{category: string; idea: string} | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedDateIdeas');
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
      localStorage.setItem('savedDateIdeas', JSON.stringify(updatedSavedIdeas));
      
      toast.success("Ideia salva com sucesso!", {
        description: "Você pode encontrá-la na sua lista de ideias salvas."
      });
    }
  };

  const deleteSavedIdea = (index: number) => {
    const updatedSavedIdeas = savedIdeas.filter((_, i) => i !== index);
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedDateIdeas', JSON.stringify(updatedSavedIdeas));
    
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
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
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
          className="border-pink-200 hover:bg-pink-50"
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
              className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-6 shadow-lg"
              layout
            >
              <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-2">
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
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">
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