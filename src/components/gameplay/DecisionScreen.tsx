
import { useState, useEffect } from 'react';
import { useNepalUnlocked } from '@/contexts/NepalUnlockedContext';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import KarmaIndicator from './KarmaIndicator';
import AIGuide from './AIGuide';

const DecisionScreen = () => {
  const { state, dispatch, getAIGuideResponse, getRandomPortal } = useNepalUnlocked();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<{text: string, karmaChange: number} | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');
  
  const { currentDecision, character, karma, days } = state;
  
  const handleOptionSelect = (optionId: string) => {
    if (!currentDecision) return;
    
    setSelectedOption(optionId);
    
    // Find the selected option
    const selectedOptionData = currentDecision.options.find(opt => opt.id === optionId);
    
    if (selectedOptionData) {
      // Set the outcome for display
      setOutcome({
        text: selectedOptionData.outcomeText,
        karmaChange: selectedOptionData.karmaChange
      });
      
      // Get AI response based on decision
      setAiResponse(state.isAIGuideActive ? getAIGuideResponse(optionId) : '');
      
      // Update game state after a short delay
      setTimeout(() => {
        dispatch({
          type: 'MAKE_DECISION',
          payload: {
            optionId,
            outcomeText: selectedOptionData.outcomeText,
            karmaChange: selectedOptionData.karmaChange,
            specialUnlocks: selectedOptionData.specialUnlocks
          }
        });
        
        // Advance day
        dispatch({ type: 'ADVANCE_DAY' });
        
        // Reset local state
        setSelectedOption(null);
        setOutcome(null);
      }, 5000);
    }
  };
  
  // For portals - random chance of entering a portal
  useEffect(() => {
    if (!currentDecision && state.gamePhase === 'gameplay') {
      // 10% chance of portal encounter
      const portalChance = Math.random();
      if (portalChance < 0.1 && !state.currentPortal) {
        const randomPortal = getRandomPortal();
        dispatch({ type: 'ENTER_PORTAL', payload: randomPortal });
      }
    }
  }, [currentDecision, state.gamePhase]);
  
  // For testing life end - around 20% chance after day 10
  useEffect(() => {
    if (days > 10 && state.gamePhase === 'gameplay') {
      const endChance = Math.random();
      if (endChance < 0.05) {
        const endReasons = [
          "You ate street panipuri from the wrong vendor.",
          "A confused yak mistook you for its long-lost child.",
          "You accidentally joined a monastery and took a vow of silence.",
          "You were recruited by aliens to represent Nepal in intergalactic talks.",
          "The simulation has crashed due to excessive chaos."
        ];
        
        const randomReason = endReasons[Math.floor(Math.random() * endReasons.length)];
        
        dispatch({
          type: 'GENERATE_LIFE_SUMMARY',
          payload: { causeOfEnd: randomReason }
        });
      }
    }
  }, [days]);

  // Show loading state if no decision
  if (!currentDecision) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-chaos-dark">
        <div className="text-white text-center">
          <p className="text-xl mb-4">The chaos of Nepal is unfolding...</p>
          <div className="w-16 h-16 border-4 border-chaos-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-chaos-dark to-black">
      {/* Status bar */}
      <div className="flex justify-between items-center mb-6 p-2 bg-black/50 rounded-lg">
        <div className="text-white">
          <p className="font-bold">Day {days} as {character?.name || 'Unknown'}</p>
        </div>
        
        <KarmaIndicator karma={karma} />
      </div>
      
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto"
        >
          {/* Scenario */}
          <Card className="mb-6 p-6 bg-white/10 backdrop-blur text-white border-chaos-primary">
            <h2 className="text-2xl font-bold mb-4">{currentDecision.scenario}</h2>
          </Card>
          
          {/* Decision options */}
          {!outcome && (
            <div className="space-y-4 mt-4">
              <AnimatePresence>
                {currentDecision.options.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Button
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={!!selectedOption}
                      className={`w-full p-4 text-left justify-start text-lg font-normal ${
                        selectedOption === option.id
                          ? 'bg-chaos-primary text-white'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {option.text}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {/* Outcome display */}
          {outcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur rounded-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Outcome:</h3>
              <p className="mb-4">{outcome.text}</p>
              
              <div className={`text-lg font-bold ${
                outcome.karmaChange > 0 
                  ? 'text-karma-good' 
                  : outcome.karmaChange < 0 
                    ? 'text-karma-bad' 
                    : 'text-karma-neutral'
              }`}>
                Karma: {outcome.karmaChange > 0 ? '+' : ''}{outcome.karmaChange}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* AI Guide */}
      {state.isAIGuideActive && aiResponse && (
        <AIGuide message={aiResponse} />
      )}
    </div>
  );
};

export default DecisionScreen;
