import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import rebirthOptions, { RebirthCharacter } from '@/data/rebirthOptions';
import lifeDecisions, { LifeDecision } from '@/data/lifeDecisions';
import dimensionPortals, { DimensionPortal } from '@/data/dimensionPortals';
import badgesAndUnlocks, { Badge } from '@/data/badgesAndUnlocks';

// Define types for our game state
export interface GameState {
  // Player info
  playerName: string;
  character: RebirthCharacter | null;
  karma: number;
  days: number;
  
  // Game progression
  currentDecision: LifeDecision | null;
  currentPortal: DimensionPortal | null;
  unlockedBadges: Badge[];
  gameHistory: GameEvent[];
  lifeSummary: LifeSummary | null;
  
  // Data
  characters: RebirthCharacter[];
  
  // UI states
  gamePhase: 'intro' | 'character-select' | 'gameplay' | 'portal' | 'summary';
  isAIGuideActive: boolean;
  isFirstTime: boolean;
  clickCount: Record<string, number>;
  easterEggsFound: string[];
}

export interface GameEvent {
  day: number;
  type: 'rebirth' | 'decision' | 'portal' | 'badge' | 'special';
  description: string;
  karmaChange: number;
  timestamp: number;
}

export interface LifeSummary {
  character: string;
  daysLived: number;
  finalKarma: number;
  badgesUnlocked: string[];
  specialAchievements: string[];
  causeOfEnd: string;
}

// Initial game state
const initialState: GameState = {
  playerName: '',
  character: null,
  karma: 0,
  days: 0,
  currentDecision: null,
  currentPortal: null,
  unlockedBadges: [],
  gameHistory: [],
  lifeSummary: null,
  characters: rebirthOptions,
  gamePhase: 'intro',
  isAIGuideActive: true,
  isFirstTime: true,
  clickCount: {},
  easterEggsFound: []
};

// Define action types
type ActionType = 
  | { type: 'SET_PLAYER_NAME', payload: string }
  | { type: 'SELECT_CHARACTER', payload: RebirthCharacter }
  | { type: 'SET_DECISION', payload: LifeDecision | null }
  | { type: 'MAKE_DECISION', payload: { optionId: string, outcomeText: string, karmaChange: number, specialUnlocks?: string[] } }
  | { type: 'ENTER_PORTAL', payload: DimensionPortal }
  | { type: 'EXIT_PORTAL' }
  | { type: 'UNLOCK_BADGE', payload: Badge }
  | { type: 'ADVANCE_DAY' }
  | { type: 'TRACK_CLICK', payload: string }
  | { type: 'FIND_EASTER_EGG', payload: string }
  | { type: 'GENERATE_LIFE_SUMMARY', payload: { causeOfEnd: string } }
  | { type: 'RESET_GAME' }
  | { type: 'TOGGLE_AI_GUIDE' };

// Game reducer function
const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
        gamePhase: 'character-select'
      };
      
    case 'SELECT_CHARACTER':
      return {
        ...state,
        character: action.payload,
        karma: action.payload.karmaModifier,
        gamePhase: 'gameplay',
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'rebirth',
            description: `You were reborn as ${action.payload.name}`,
            karmaChange: action.payload.karmaModifier,
            timestamp: Date.now()
          }
        ]
      };
      
    case 'SET_DECISION':
      return {
        ...state,
        currentDecision: action.payload
      };
      
    case 'MAKE_DECISION':
      const { optionId, outcomeText, karmaChange, specialUnlocks } = action.payload;
      
      // Check if any badges should be unlocked based on this decision
      const newBadges = badgesAndUnlocks.filter(badge => 
        badge.requirements.some(req => 
          req.type === 'decision' && req.value === optionId &&
          !state.unlockedBadges.some(b => b.id === badge.id)
        )
      );
      
      return {
        ...state,
        karma: state.karma + karmaChange,
        currentDecision: null,
        unlockedBadges: [...state.unlockedBadges, ...newBadges],
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'decision',
            description: outcomeText,
            karmaChange: karmaChange,
            timestamp: Date.now()
          },
          ...(newBadges.map(badge => ({
            day: state.days,
            type: 'badge' as const,
            description: `Unlocked: ${badge.name}`,
            karmaChange: 0,
            timestamp: Date.now() + 1
          })))
        ]
      };
      
    case 'ENTER_PORTAL':
      return {
        ...state,
        currentPortal: action.payload,
        gamePhase: 'portal',
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'portal',
            description: `Entered the ${action.payload.name} dimension`,
            karmaChange: 0,
            timestamp: Date.now()
          }
        ]
      };
      
    case 'EXIT_PORTAL':
      return {
        ...state,
        currentPortal: null,
        gamePhase: 'gameplay',
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'portal',
            description: `Returned from the portal dimension`,
            karmaChange: 0,
            timestamp: Date.now()
          }
        ]
      };
      
    case 'UNLOCK_BADGE':
      if (state.unlockedBadges.some(badge => badge.id === action.payload.id)) {
        return state;
      }
      
      return {
        ...state,
        unlockedBadges: [...state.unlockedBadges, action.payload],
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'badge',
            description: `Unlocked: ${action.payload.name}`,
            karmaChange: 0,
            timestamp: Date.now()
          }
        ]
      };
      
    case 'ADVANCE_DAY':
      return {
        ...state,
        days: state.days + 1
      };
      
    case 'TRACK_CLICK':
      const newClickCount = { ...state.clickCount };
      newClickCount[action.payload] = (newClickCount[action.payload] || 0) + 1;
      
      // Check for easter eggs based on click count
      let newEasterEggs = [...state.easterEggsFound];
      
      if (action.payload === 'nepal-flag' && newClickCount[action.payload] === 7 &&
          !state.easterEggsFound.includes('flag-secret')) {
        newEasterEggs.push('flag-secret');
      }
      
      return {
        ...state,
        clickCount: newClickCount,
        easterEggsFound: newEasterEggs
      };
      
    case 'FIND_EASTER_EGG':
      if (state.easterEggsFound.includes(action.payload)) {
        return state;
      }
      
      return {
        ...state,
        easterEggsFound: [...state.easterEggsFound, action.payload],
        karma: state.karma + 5, // Easter eggs give karma bonuses
        gameHistory: [
          ...state.gameHistory,
          {
            day: state.days,
            type: 'special',
            description: `Found a secret easter egg!`,
            karmaChange: 5,
            timestamp: Date.now()
          }
        ]
      };
      
    case 'GENERATE_LIFE_SUMMARY':
      const characterName = state.character?.name || "Unknown Entity";
      const daysLived = state.days;
      const finalKarma = state.karma;
      const badgesUnlocked = state.unlockedBadges.map(badge => badge.name);
      
      // Calculate special achievements based on game stats
      const specialAchievements: string[] = [];
      
      if (state.karma > 50) {
        specialAchievements.push("Nepali Saint");
      } else if (state.karma < -50) {
        specialAchievements.push("Certified Villain");
      }
      
      if (state.days > 30) {
        specialAchievements.push("Long-lived Legend");
      }
      
      if (state.easterEggsFound.length >= 3) {
        specialAchievements.push("Eagle-eyed Explorer");
      }
      
      const lifeSummary: LifeSummary = {
        character: characterName,
        daysLived,
        finalKarma,
        badgesUnlocked,
        specialAchievements,
        causeOfEnd: action.payload.causeOfEnd
      };
      
      return {
        ...state,
        lifeSummary,
        gamePhase: 'summary'
      };
      
    case 'RESET_GAME':
      return {
        ...initialState,
        isFirstTime: false
      };
      
    case 'TOGGLE_AI_GUIDE':
      return {
        ...state,
        isAIGuideActive: !state.isAIGuideActive
      };
      
    default:
      return state;
  }
};

// Create the context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
  getRandomDecision: () => LifeDecision;
  getRandomPortal: () => DimensionPortal;
  checkForBadgeUnlocks: () => void;
  getAIGuideResponse: (input: string) => string;
  generateShareableImage: () => Promise<string>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Get a random decision appropriate for the current character and karma
  const getRandomDecision = (): LifeDecision => {
    // Filter decisions that could be contextually appropriate
    const eligibleDecisions = lifeDecisions.filter(decision => {
      // If no contextual factors, it's always eligible
      if (!decision.contextualFactors) return true;
      
      // Check character type match if specified
      if (decision.contextualFactors.characterType && state.character) {
        if (!decision.contextualFactors.characterType.includes(state.character.id)) {
          return false;
        }
      }
      
      // Check karma level match if specified
      if (decision.contextualFactors.karmaLevel) {
        const karmaLevel = state.karma > 30 ? 'high' : (state.karma < -30 ? 'low' : 'medium');
        if (decision.contextualFactors.karmaLevel !== karmaLevel) {
          return false;
        }
      }
      
      // Check portal match if specified
      if (decision.contextualFactors.dimensionPortal && state.currentPortal) {
        if (decision.contextualFactors.dimensionPortal !== state.currentPortal.id) {
          return false;
        }
      }
      
      return true;
    });
    
    // If no eligible decisions, fall back to all decisions
    const decisionsPool = eligibleDecisions.length > 0 ? eligibleDecisions : lifeDecisions;
    
    // Get a random decision from the pool
    const randomIndex = Math.floor(Math.random() * decisionsPool.length);
    return decisionsPool[randomIndex];
  };

  // Get a random portal
  const getRandomPortal = (): DimensionPortal => {
    const randomIndex = Math.floor(Math.random() * dimensionPortals.length);
    return dimensionPortals[randomIndex];
  };

  // Check if any badges should be unlocked based on current game state
  const checkForBadgeUnlocks = () => {
    badgesAndUnlocks.forEach(badge => {
      // Skip if already unlocked
      if (state.unlockedBadges.some(b => b.id === badge.id)) return;
      
      // Check if all requirements are met
      const requirementsMet = badge.requirements.every(req => {
        switch(req.type) {
          case 'karma':
            const karmaValue = req.value as number;
            const operator = req.operator || '>';
            switch(operator) {
              case '>': return state.karma > karmaValue;
              case '<': return state.karma < karmaValue;
              case '=': return state.karma === karmaValue;
              case '>=': return state.karma >= karmaValue;
              default: return false;
            }
          
          case 'character':
            return state.character?.id === req.value;
            
          case 'portal':
            return state.currentPortal?.id === req.value || 
                   state.gameHistory.some(event => 
                     event.type === 'portal' && 
                     event.description.includes(req.value as string)
                   );
                   
          // Other requirements would be checked here
          
          default:
            return false;
        }
      });
      
      if (requirementsMet) {
        dispatch({ type: 'UNLOCK_BADGE', payload: badge });
      }
    });
  };

  // Simulate AI guide responses
  const getAIGuideResponse = (input: string): string => {
    // Simple response system - could be expanded into a more sophisticated AI
    const karmaLevel = state.karma > 30 ? 'high' : (state.karma < -30 ? 'low' : 'medium');
    const characterType = state.character?.id || 'unknown';
    
    const responses = [
      "Tyo kura bujhes ta ho! That decision was... interesting, hajur.",
      "Arrey babu, you think that's a good idea? Thik cha, your life!",
      "Ae hai! That's the spirit of Nepal you're channeling right there!",
      "Hijo ko bholi, tomorrow will be different because of what you just did.",
      "Khai, ke garnu, sometimes life in Nepal is just like this only.",
      "Buddha was born in Nepal, and even he would question your choices!",
      "Mero aama le yo dekhyo bhane... Your mother would be so proud. Or terrified.",
      "The mountains are watching you make these decisions, and they have long memories.",
      "Even Lord Pashupatinath can't save you from the karma of that choice!"
    ];
    
    // Add some character or karma based responses
    if (karmaLevel === 'high') {
      responses.push("Such good karma! The gods are smiling upon your noble heart.");
      responses.push("Namaste! Your soul shines brighter than the Himalayan snow!");
    } else if (karmaLevel === 'low') {
      responses.push("Hajur, with karma this bad, you might be reborn as a traffic jam in your next life.");
      responses.push("Are you trying to speedrun bad karma? Because you're winning, solti!");
    }
    
    if (characterType === 'goat-influencer') {
      responses.push("Your goat followers are going 'baaaa' over that decision!");
    } else if (characterType === 'traffic-jam') {
      responses.push("You're causing more chaos than a taxi driver during Dashain!");
    }
    
    // Return a random response
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  // Create a shareable image from the game state
  const generateShareableImage = async (): Promise<string> => {
    // In a real implementation, this would use canvas or a library to generate an image
    // For now, we'll just return a placeholder
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2Q4g14QAAAABJRU5ErkJggg==";
  };

  // Check for badge unlocks whenever the state changes
  useEffect(() => {
    checkForBadgeUnlocks();
  }, [state.karma, state.days, state.character, state.currentPortal]);

  // Generate a new decision when days advance and we don't have one
  useEffect(() => {
    if (state.gamePhase === 'gameplay' && !state.currentDecision) {
      // 20% chance of portal encounter instead of decision
      const portalChance = Math.random();
      if (portalChance < 0.2 && !state.currentPortal) {
        dispatch({ type: 'ENTER_PORTAL', payload: getRandomPortal() });
      } else {
        dispatch({ type: 'SET_DECISION', payload: getRandomDecision() });
      }
    }
  }, [state.days, state.currentDecision, state.gamePhase]);

  return (
    <GameContext.Provider value={{ 
      state, 
      dispatch, 
      getRandomDecision, 
      getRandomPortal, 
      checkForBadgeUnlocks,
      getAIGuideResponse,
      generateShareableImage
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useNepalUnlocked = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useNepalUnlocked must be used within a GameProvider');
  }
  return context;
};
