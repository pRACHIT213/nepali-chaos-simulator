
import { motion } from 'framer-motion';

interface KarmaIndicatorProps {
  karma: number;
}

const KarmaIndicator = ({ karma }: KarmaIndicatorProps) => {
  // Determine color based on karma level
  let karmaColor = 'bg-karma-neutral';
  let karmaText = 'Neutral';
  
  if (karma > 50) {
    karmaColor = 'bg-karma-good';
    karmaText = 'Excellent';
  } else if (karma > 25) {
    karmaColor = 'bg-karma-good/70';
    karmaText = 'Good';
  } else if (karma > 0) {
    karmaColor = 'bg-karma-good/40';
    karmaText = 'Positive';
  } else if (karma < -50) {
    karmaColor = 'bg-karma-bad';
    karmaText = 'Terrible';
  } else if (karma < -25) {
    karmaColor = 'bg-karma-bad/70';
    karmaText = 'Bad';
  } else if (karma < 0) {
    karmaColor = 'bg-karma-bad/40';
    karmaText = 'Negative';
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-white text-sm">{karmaText} Karma: {karma}</div>
      <motion.div 
        className="h-4 w-20 bg-white/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={`h-full ${karmaColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.abs(karma), 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default KarmaIndicator;
