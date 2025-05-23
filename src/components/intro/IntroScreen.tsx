
import { useState, useEffect } from 'react';
import { useNepalUnlocked } from '@/contexts/NepalUnlockedContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const IntroScreen = () => {
  const { state, dispatch } = useNepalUnlocked();
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [flagClicks, setFlagClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleFlagClick = () => {
    const newCount = flagClicks + 1;
    setFlagClicks(newCount);
    dispatch({ type: 'TRACK_CLICK', payload: 'nepal-flag' });
    
    if (newCount === 7) {
      setShowEasterEgg(true);
      dispatch({ type: 'FIND_EASTER_EGG', payload: 'flag-secret' });
    }
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      // Set the player name in the game state and immediately change to character select
      dispatch({ type: 'SET_PLAYER_NAME', payload: name });
      // No need for the complex sequence - the SET_PLAYER_NAME action already sets gamePhase to 'character-select'
    }
  };

  useEffect(() => {
    // Trigger name input after intro animation
    const timer = setTimeout(() => {
      setShowNameInput(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-nepal-blue to-black relative">
      
      {/* Decorative background image of Nepal mountains with subtle animation */}
      <motion.img 
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80" 
        alt="Nepal Mountains" 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-auto object-cover opacity-20 pointer-events-none select-none rounded-lg"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Nepal flag shape */}
        <div 
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110 mx-auto"
          onClick={handleFlagClick}
          aria-label="Nepal flag"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleFlagClick(); }}
        >
          <div className="w-24 h-32 bg-nepal-red border-2 border-white relative mb-8 overflow-hidden rounded-lg drop-shadow-lg">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[12rem] border-l-transparent border-b-[8rem] border-b-nepal-blue"></div>
            {/* Sun and moon */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Easter egg animation */}
        {showEasterEgg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-5 -right-5 text-yellow-300 text-lg font-bold z-20"
            aria-live="polite"
          >
            <Sparkles size={24} className="animate-spin" />
            <span className="ml-1">+5 Secret Karma!</span>
          </motion.div>
        )}
      </div>

      <motion.h1 
        className="relative z-10 text-6xl font-bold mb-6 text-white glitch-text"
        data-text="NEPAL UNLOCKED"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        NEPAL UNLOCKED
      </motion.h1>
      
      <motion.div
        className="relative z-10 text-xl text-white mb-8 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="nepali-gradient bg-clip-text text-transparent font-bold">THE INTERACTIVE CHAOSVERSE</span>
      </motion.div>
      
      {showNameInput ? (
        <motion.div 
          className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-lg w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Who dares enter the Chaosverse?</h2>
          <div className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-white/20 border-nepal-red text-white placeholder:text-gray-300"
            />
            <Button 
              onClick={handleNameSubmit}
              className="w-full bg-nepal-red hover:bg-nepal-red/80 text-white"
            >
              Begin Your Chaotic Journey
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.p 
          className="relative z-10 text-lg text-white max-w-md text-center italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Welcome to a surreal, unpredictable version of Nepal where every choice leads to chaos...
        </motion.p>
      )}
    </div>
  );
};

export default IntroScreen;

