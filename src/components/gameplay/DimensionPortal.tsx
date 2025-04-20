
import { useState, useEffect } from 'react';
import { useNepalUnlocked } from '@/contexts/NepalUnlockedContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import AIGuide from './AIGuide';

const DimensionPortal = () => {
  const { state, dispatch, getAIGuideResponse } = useNepalUnlocked();
  const [portalEvent, setPortalEvent] = useState<{name: string, description: string} | null>(null);
  const [showingEvent, setShowingEvent] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  
  const { currentPortal, karma } = state;
  
  // No portal safety check
  if (!currentPortal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-chaos-dark">
        <div className="text-white text-xl">Portal malfunction... returning to normal reality</div>
      </div>
    );
  }
  
  // Trigger random portal events
  useEffect(() => {
    if (!currentPortal || showingEvent) return;
    
    // Random chance of special event based on event probabilities
    const randomNum = Math.random();
    let cumulativeProbability = 0;
    
    for (const event of currentPortal.specialEvents) {
      cumulativeProbability += event.probability;
      
      if (randomNum <= cumulativeProbability) {
        // Found our event
        setPortalEvent({
          name: event.name,
          description: event.description
        });
        setShowingEvent(true);
        
        // Get AI response to event
        setAiResponse(state.isAIGuideActive ? getAIGuideResponse(event.id) : '');
        
        // Auto-dismiss event after 10 seconds
        setTimeout(() => {
          setShowingEvent(false);
        }, 10000);
        
        break;
      }
    }
  }, [currentPortal, showingEvent]);
  
  // Apply visual effects based on portal type
  const getPortalClass = () => {
    switch (currentPortal.id) {
      case 'loadshedding-realm':
        return 'brightness-[0.3] contrast-[1.2]';
      case 'pancha-rath-universe':
        return 'sepia-[0.6] contrast-[0.9]';
      case 'balen-bot-3020':
        return 'hue-rotate-[30deg] brightness-[1.2] contrast-[1.1]';
      case 'parallel-monarchy':
        return 'brightness-[1.1] saturate-[1.4] hue-rotate-[-10deg]';
      default:
        return '';
    }
  };
  
  const leavePortal = () => {
    // Apply karma changes based on portal effects
    const karmaChange = Math.floor(Math.random() * 10) * (currentPortal.effects.karmaMultiplier || 1);
    
    dispatch({ 
      type: 'MAKE_DECISION', 
      payload: {
        optionId: 'exit-portal',
        outcomeText: `You've returned from the ${currentPortal.name}.`,
        karmaChange: karmaChange
      }
    });
    
    dispatch({ type: 'EXIT_PORTAL' });
    dispatch({ type: 'ADVANCE_DAY' });
  };

  return (
    <div className={`min-h-screen flex flex-col p-4 bg-black transition-all duration-1000 ${getPortalClass()}`}>
      {/* Portal header */}
      <motion.div 
        className="text-center mb-8 mt-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-white animation-glitch">
          {currentPortal.name}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto mt-2">
          {currentPortal.description}
        </p>
      </motion.div>
      
      {/* Portal visuals and effects */}
      <div className="flex-grow flex flex-col items-center justify-center relative">
        {/* Background effect specific to portal */}
        <div className="absolute inset-0 z-0">
          {currentPortal.id === 'loadshedding-realm' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-yellow-300/30 blur-xl animation-pulse-nepal"></div>
            </div>
          )}
          
          {currentPortal.id === 'pancha-rath-universe' && (
            <div className="absolute inset-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-16 h-8 bg-karma-neutral/30 blur-sm"
                  style={{
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                    animationDelay: `${i * 0.5}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: 'float 15s infinite ease-in-out'
                  }}
                />
              ))}
            </div>
          )}
          
          {currentPortal.id === 'balen-bot-3020' && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[800px] h-[800px] border-[4px] border-chaos-primary/20 rounded-full animation-chaos-spin"></div>
                <div className="absolute w-[600px] h-[600px] border-[3px] border-chaos-primary/30 rounded-full animation-chaos-spin" style={{animationDuration: '15s'}}></div>
                <div className="absolute w-[400px] h-[400px] border-[2px] border-chaos-primary/40 rounded-full animation-chaos-spin" style={{animationDuration: '10s'}}></div>
              </div>
            </div>
          )}
          
          {currentPortal.id === 'parallel-monarchy' && (
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-3 bg-karma-neutral rounded-full opacity-70"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animation: 'pulse-nepal 3s infinite ease-in-out'
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Portal content */}
        <div className="z-10 w-full max-w-2xl">
          <AnimatePresence>
            {portalEvent && showingEvent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="mb-6"
              >
                <Card className="p-6 bg-black/70 backdrop-blur border-chaos-primary">
                  <h3 className="text-xl font-bold text-white mb-2">{portalEvent.name}</h3>
                  <p className="text-white/90">{portalEvent.description}</p>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-6 p-4"
              >
                <p className="text-white text-lg">
                  You are exploring the {currentPortal.name}...
                </p>
                <p className="text-chaos-light mt-2">
                  {currentPortal.effects.gameplay}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-center mt-8">
            <Button
              onClick={leavePortal}
              className="bg-chaos-primary hover:bg-chaos-primary/80 text-white"
            >
              Return to Normal Reality
            </Button>
          </div>
        </div>
      </div>
      
      {/* AI Guide response */}
      {state.isAIGuideActive && aiResponse && (
        <AIGuide message={aiResponse} />
      )}
    </div>
  );
};

export default DimensionPortal;
