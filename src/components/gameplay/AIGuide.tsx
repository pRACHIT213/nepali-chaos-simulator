
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

interface AIGuideProps {
  message: string;
}

const AIGuide = ({ message }: AIGuideProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState('');
  
  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;
    
    if (characterIndex < message.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedMessage(message.slice(0, characterIndex + 1));
        setCharacterIndex(characterIndex + 1);
      }, 30);
      
      return () => clearTimeout(timeoutId);
    }
  }, [characterIndex, isOpen, message]);
  
  // Reset when new message comes in
  useEffect(() => {
    setCharacterIndex(0);
    setDisplayedMessage('');
    setIsOpen(true);
  }, [message]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-4 left-4 right-4 bg-nepal-blue/90 backdrop-blur text-white p-4 rounded-lg shadow-lg max-w-lg mx-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-nepal-red flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">Nepali AI Guide</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-sm">{displayedMessage}</p>
              
              {/* Typing indicator when message is still being typed */}
              {characterIndex < message.length && (
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-100" />
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-200" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGuide;
