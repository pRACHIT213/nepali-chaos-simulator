
import { useNepalUnlocked, GameProvider } from '@/contexts/NepalUnlockedContext';
import IntroScreen from '@/components/intro/IntroScreen';
import CharacterSelect from '@/components/rebirth/CharacterSelect';
import DecisionScreen from '@/components/gameplay/DecisionScreen';
import DimensionPortal from '@/components/gameplay/DimensionPortal';
import LifeSummary from '@/components/summary/LifeSummary';

// Component to handle the game flow
const GameContainer = () => {
  const { state } = useNepalUnlocked();
  
  // Render the appropriate screen based on game phase
  switch (state.gamePhase) {
    case 'intro':
      return <IntroScreen />;
    case 'character-select':
      return <CharacterSelect />;
    case 'gameplay':
      return <DecisionScreen />;
    case 'portal':
      return <DimensionPortal />;
    case 'summary':
      return <LifeSummary />;
    default:
      return <IntroScreen />;
  }
};

// Main component wrapper with provider
const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-nepal-blue to-black">
        <GameContainer />
      </div>
    </GameProvider>
  );
};

export default Index;
