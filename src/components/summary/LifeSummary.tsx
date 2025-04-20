
import { useState, useEffect } from 'react';
import { useNepalUnlocked } from '@/contexts/NepalUnlockedContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Share, Camera, Heart } from 'lucide-react';

const LifeSummary = () => {
  const { state, dispatch, generateShareableImage } = useNepalUnlocked();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareableImage, setShareableImage] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const { lifeSummary, karma, days, unlockedBadges, character } = state;
  
  // Safety check
  if (!lifeSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chaos-dark">
        <p className="text-white text-xl">Loading your life summary...</p>
      </div>
    );
  }
  
  // Generate the sharable image
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateShareableImage();
      setShareableImage(imageUrl);
      setShowShareOptions(true);
    } catch (error) {
      console.error('Failed to generate image', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  // Share options
  const handleShare = async (platform: 'twitter' | 'facebook' | 'copy') => {
    // In a real implementation, this would use the Web Share API or open a share dialog
    const text = `I survived ${lifeSummary.daysLived} days as a ${lifeSummary.character} in Nepal Unlocked! 
Final karma: ${lifeSummary.finalKarma}
Badges: ${lifeSummary.badgesUnlocked.join(', ')}
Cause of end: ${lifeSummary.causeOfEnd}
#NepalUnlocked #ChaosSimulator`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
        break;
    }
  };
  
  const startNewLife = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-chaos-dark to-black">
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <Card className="p-6 bg-white/10 backdrop-blur border-chaos-primary text-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-1">{lifeSummary.character}</h2>
              <p className="text-chaos-light">Life Summary</p>
              
              <div className="w-32 h-32 mx-auto my-4 rounded-full bg-chaos-primary/20 border-4 border-nepal-red flex items-center justify-center">
                {character?.image ? (
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-4xl">🇳🇵</span>
                )}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between p-2 border-b border-white/20">
                <span>Days Survived:</span>
                <span className="font-bold">{lifeSummary.daysLived}</span>
              </div>
              
              <div className="flex justify-between p-2 border-b border-white/20">
                <span>Final Karma:</span>
                <span className={`font-bold ${
                  lifeSummary.finalKarma > 0 
                    ? 'text-karma-good' 
                    : lifeSummary.finalKarma < 0 
                      ? 'text-karma-bad' 
                      : 'text-karma-neutral'
                }`}>
                  {lifeSummary.finalKarma}
                </span>
              </div>
              
              <div className="p-2 border-b border-white/20">
                <p className="mb-1">Badges Unlocked:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lifeSummary.badgesUnlocked.length > 0 ? (
                    lifeSummary.badgesUnlocked.map((badge, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-chaos-primary/30 px-2 py-1 rounded text-sm"
                      >
                        {badge}
                      </span>
                    ))
                  ) : (
                    <span className="text-white/60 text-sm italic">No badges unlocked</span>
                  )}
                </div>
              </div>
              
              {lifeSummary.specialAchievements.length > 0 && (
                <div className="p-2 border-b border-white/20">
                  <p className="mb-1">Special Achievements:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lifeSummary.specialAchievements.map((achievement, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-chaos-tertiary/30 px-2 py-1 rounded text-sm"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-2 border-b border-white/20">
                <p className="font-bold mb-1">Cause of End:</p>
                <p className="italic text-karma-bad">{lifeSummary.causeOfEnd}</p>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="space-y-4">
              {!shareableImage ? (
                <Button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full bg-chaos-tertiary hover:bg-chaos-tertiary/80 text-black"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {isGeneratingImage ? 'Generating...' : 'Screenshot This Life'}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="text-center text-sm font-bold">
                    Share your Nepal Unlocked experience!
                  </div>
                  <div className="flex justify-center space-x-3">
                    <Button
                      onClick={() => handleShare('twitter')}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare('facebook')}
                      className="bg-blue-800 hover:bg-blue-900"
                    >
                      Facebook
                    </Button>
                    <Button
                      onClick={() => handleShare('copy')}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Copy Text
                    </Button>
                  </div>
                </div>
              )}
              
              <Button
                onClick={startNewLife}
                className="w-full bg-nepal-red hover:bg-nepal-red/80"
              >
                <Heart className="mr-2 h-4 w-4" />
                Begin a New Chaotic Life
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LifeSummary;
