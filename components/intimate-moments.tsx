"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, BookmarkPlus, Check, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";

const intimateMoments = {
  "Quarto": [
    "Jogo do 'só pode tocar com...'",
    "Striptease com desafio",
    "Roleta do Prazer",
    "O Jogo das Posições",
    "Sessão de massagem com óleo quente",
    "Role-playing (fantasias)",
    "Não toque",
    "Venda e brincadeira de gelo e fogo",
    "Noite da dominação",
    "Espelho do prazer"
  ],
  "Sala": [
    "Sessão de beijos no sofá",
    "Filme sensual + desafio",
    "Strip Poker ou Verdade ou Desafio Erótico",
    "Noite do toque proibido",
    "Dança sensual particular",
    "Se conseguir resistir, ganha um prêmio",
    "Sensação às cegas",
    "Sofá + posição diferente",
    "Joguinho do 'não pode falar'",
    "Noite do chocolate e morango"
  ],
  "Cozinha": [
    "Preparação sensual de comida",
    "Beijos e carícias na bancada",
    "Desafio dos olhos vendados",
    "Momento especial na mesa ou bancada",
    "Desafio das frutas sensuais"
  ],
  "Banheiro": [
    "Banho juntos com sabonete líquido sensual",
    "Box do chuveiro + espelho",
    "Sessão de massagem na banheira",
    "Jogo da espuma sensual",
    "Surpresa pós-banho"
  ],
  "Ar Livre": [
    "Noite das estrelas no quintal",
    "Piquenique sensual",
    "No carro parado com vista bonita",
    "Caminhada ao entardecer + beijos ousados",
    "Piscina ou praia à noite"
  ],
  "Motel ou Hotel": [
    "Suíte temática",
    "Banheira de espuma sensual",
    "Noite do 'proibido falar'",
    "Momento especial para recordação",
    "Joguinho de roupas trocadas"
  ],
  "Momentos Especiais": [
    "Primeiro encontro fake",
    "Noite sem toque direto",
    "Mensagens picantes o dia todo",
    "Pacto do prazer",
    "Fantasia de viagem",
    "Noite das surpresas",
    "Joguinho dos comandos secretos",
    "Hoje você decide tudo",
    "Sessão de fotos provocantes",
    "Não pode usar as mãos"
  ]
};

interface SavedIdea {
  category: string;
  idea: string;
  savedAt: string;
}

export function IntimateMoments() {
  const [currentIdea, setCurrentIdea] = useState<{category: string; idea: string} | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedIntimateMoments');
    if (saved) {
      setSavedIdeas(JSON.parse(saved));
    }
  }, []);

  const generateRandomIdea = () => {
    if (!isUnlocked) return;
    
    const categories = Object.keys(intimateMoments);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const ideasInCategory = intimateMoments[randomCategory as keyof typeof intimateMoments];
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
      localStorage.setItem('savedIntimateMoments', JSON.stringify(updatedSavedIdeas));
      
      toast.success("Ideia salva com sucesso!", {
        description: "Você pode encontrá-la na sua lista de ideias salvas."
      });
    }
  };

  const deleteSavedIdea = (index: number) => {
    const updatedSavedIdeas = savedIdeas.filter((_, i) => i !== index);
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedIntimateMoments', JSON.stringify(updatedSavedIdeas));
    
    toast.success("Ideia removida com sucesso!");
  };

  const isCurrentIdeaSaved = currentIdea 
    ? savedIdeas.some(saved => saved.category === currentIdea.category && saved.idea === currentIdea.idea)
    : false;

  if (!isUnlocked) {
    return (
      <div className="text-center">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-8">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            Conteúdo Sensível
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">
            Esta seção contém sugestões para momentos íntimos entre casais.
            Certifique-se de que você tem idade apropriada e deseja ver este conteúdo.
          </p>
          <Button
            onClick={() => setIsUnlocked(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Desbloquear Conteúdo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-center gap-3 mb-8">
        <Button
          onClick={generateRandomIdea}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300"
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
              Gerar Ideia
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowSaved(!showSaved)}
          className="border-red-200 hover:bg-red-50"
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
              className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-6 shadow-lg"
              layout
            >
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
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
                  <h3 className="text-lg font-semibold text-red-700 mb-2">
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