
import { useState } from 'react';
import { useNepalUnlocked } from '@/contexts/NepalUnlockedContext';
import { RebirthCharacter } from '@/data/rebirthOptions';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

const NEPAL_IMAGE_URL = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1050&q=80";

// Map character ids to Unsplash photo URLs for more fun visuals
const CHARACTER_IMAGES: Record<string, string> = {
  "goat-influencer": "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80", // sheep/goats in a field
  "retired-neta-dj": "https://images.unsplash.com/photo-1526178613658-3b642d4214a7?auto=format&fit=crop&w=600&q=80", // DJ set / night party
  "bhaktapur-statue": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", // statue in Nepal
  "ai-palcha": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", // kitchen/chef
  "traffic-jam": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80", // traffic in Kathmandu
  "chiya-tapari": "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80", // monkey (funny/chaotic!) holding a cup
};

const CharacterSelect = () => {
  const { state, dispatch } = useNepalUnlocked();
  const [selectedCharacter, setSelectedCharacter] = useState<RebirthCharacter | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCharacterSelect = (character: RebirthCharacter) => {
    setSelectedCharacter(character);
    setShowDetails(true);
  };

  const confirmCharacterSelection = () => {
    if (selectedCharacter) {
      dispatch({ type: 'SELECT_CHARACTER', payload: selectedCharacter });
    }
  };

  const randomize = () => {
    const randomIndex = Math.floor(Math.random() * state.characters.length);
    const randomCharacter = state.characters[randomIndex];
    setSelectedCharacter(randomCharacter);
    setShowDetails(true);
  };

  // Helper to get Unsplash or fallback image
  const getCharacterImage = (character: RebirthCharacter) => {
    // Prefer local image if exists AND not empty, else Unsplash
    if (character.image && !character.image.startsWith("/characters/placeholder")) {
      return character.image;
    }
    return CHARACTER_IMAGES[character.id] ?? "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-nepal-blue to-black relative overflow-x-hidden overflow-y-auto">
      {/* Nepal landscape image banner */}
      <div className="relative w-full max-w-5xl mx-auto mb-6">
        <img 
          src={NEPAL_IMAGE_URL}
          alt="Beautiful mountains landscape in Nepal"
          className="w-full h-60 object-cover rounded-lg shadow-lg"
        />
        {/* Overlay for subtle darkening */}
        <div className="absolute inset-0 bg-black/30 rounded-lg pointer-events-none" />
        <div className="absolute bottom-2 left-4 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded">Photo: Nepal / Unsplash</div>
      </div>

      <motion.h2 
        className="text-4xl font-bold mb-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Nepali Rebirth
      </motion.h2>

      <motion.p 
        className="text-lg text-white mb-8 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your soul is ready for a new chaotic life in Nepal. What form will you take?
      </motion.p>

      <Button
        onClick={randomize}
        className="mb-6 bg-nepal-red hover:bg-nepal-red/80 text-white"
      >
        Random Rebirth (I'm Feeling Lucky!)
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <AnimatePresence>
          {state.characters.map((character) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="flex"
            >
              <Card 
                className={`w-full overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedCharacter?.id === character.id 
                    ? 'ring-4 ring-chaos-tertiary' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleCharacterSelect(character)}
              >
                {/* Character image or Unsplash visual */}
                <div className="w-full h-40 overflow-hidden">
                  <img 
                    src={getCharacterImage(character)}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                  <p className="text-sm text-gray-600">{character.description}</p>
                  <div className="mt-2 text-xs">
                    <span className={`font-semibold ${
                      character.karmaModifier > 0 
                        ? 'text-green-500' 
                        : character.karmaModifier < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      Karma Modifier: {character.karmaModifier > 0 ? '+' : ''}{character.karmaModifier}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Details popup */}
      {showDetails && selectedCharacter && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg w-full max-w-lg overflow-hidden"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
          >
            {/* Large character image or Unsplash */}
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={getCharacterImage(selectedCharacter)}
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedCharacter.name}</h3>
              <p className="mb-4">{selectedCharacter.description}</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg">Special Ability</h4>
                <p>{selectedCharacter.specialAbility}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg">Backstory</h4>
                <p className="text-sm">{selectedCharacter.backstory}</p>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Choose Another
                </Button>
                <Button
                  onClick={confirmCharacterSelection}
                  className="flex-1 bg-chaos-primary hover:bg-chaos-primary/80"
                >
                  Begin This Life
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CharacterSelect;
