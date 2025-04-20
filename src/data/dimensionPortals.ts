
export interface DimensionPortal {
  id: string;
  name: string;
  description: string;
  image: string;
  effects: {
    visual: string;
    gameplay: string;
    karmaMultiplier: number;
  };
  specialEvents: {
    id: string;
    name: string;
    description: string;
    probability: number;
  }[];
}

const dimensionPortals: DimensionPortal[] = [
  {
    id: "loadshedding-realm",
    name: "Loadshedding Realm",
    description: "Welcome to 2009! Electricity is just a beautiful memory here. Your screen occasionally goes dark, and tasks must be completed by candlelight.",
    image: "/portals/loadshedding.png",
    effects: {
      visual: "Screen dims to 20% brightness, random flickering, UI elements only visible when 'candle' is nearby",
      gameplay: "Limited visibility of options unless you use a virtual candle, time-limited decisions during 'power outages'",
      karmaMultiplier: 1.5
    },
    specialEvents: [
      {
        id: "inverter-luck",
        name: "Inverter Jackpot",
        description: "You stumble upon a fully charged inverter! Enjoy 5 minutes of full electricity.",
        probability: 0.2
      },
      {
        id: "neighborhood-generator",
        name: "Rich Neighbor's Generator",
        description: "The sound of your neighbor's generator fills you with both relief and intense jealousy.",
        probability: 0.3
      },
      {
        id: "candle-shortage",
        name: "Great Candle Shortage",
        description: "You must navigate by the light of your mobile phone with 2% battery remaining.",
        probability: 0.25
      }
    ]
  },
  {
    id: "pancha-rath-universe",
    name: "Paancha Rath Universe",
    description: "Modern technology is banned! All transportation is by bullock cart, even the internet packets travel by ox.",
    image: "/portals/pancha-rath.png",
    effects: {
      visual: "Everything moves in slow motion, UI elements arrive on screen via animated oxen",
      gameplay: "All actions take 3x longer but earn 2x karma, decisions must be made while riding a virtual bullock cart",
      karmaMultiplier: 2.0
    },
    specialEvents: [
      {
        id: "racing-bulls",
        name: "Formula 1 Racing Bulls",
        description: "You discover specially bred racing bulls that move slightly faster than regular ones. Premium transport!",
        probability: 0.15
      },
      {
        id: "cart-traffic",
        name: "Bullock Cart Traffic Jam",
        description: "The most polite and slow-motion traffic jam in history has blocked all roads for the next 3 days.",
        probability: 0.4
      },
      {
        id: "hay-shortage",
        name: "Critical Hay Shortage",
        description: "Without fuel for the bullocks, the entire universe slows to an even more excruciating pace.",
        probability: 0.2
      }
    ]
  },
  {
    id: "balen-bot-3020",
    name: "Balen Bot Era 3020",
    description: "Welcome to future Kathmandu, where Mayor Balen's robot clones have efficiently ruled for 1000 years. Everything is automated but oddly bureaucratic.",
    image: "/portals/balen-bot.png",
    effects: {
      visual: "Futuristic neon cyberpunk aesthetic with Nepali temple architecture elements, robot assistants pop up for each action",
      gameplay: "All decisions must go through an automated 'Civic Improvement Algorithm', random robot maintenance interruptions",
      karmaMultiplier: 0.8
    },
    specialEvents: [
      {
        id: "robot-rebellion",
        name: "Minor Robot Rebellion",
        description: "The Balen Bots are demanding better oil and more cultural heritage sites to protect. Proceed with caution.",
        probability: 0.25
      },
      {
        id: "system-upgrade",
        name: "Mandatory System Upgrade",
        description: "All citizens must pause while the city's operating system installs crucial updates.",
        probability: 0.35
      },
      {
        id: "ancient-momo",
        name: "Archaeological Momo Discovery",
        description: "Scientists have found a perfectly preserved momo from 2023! It's considered a precious artifact.",
        probability: 0.2
      }
    ]
  },
  {
    id: "parallel-monarchy",
    name: "Parallel Monarchy Universe",
    description: "In this dimension, Nepal never became a republic. The monarchy evolved into a bizarre royal reality TV show.",
    image: "/portals/parallel-monarchy.png",
    effects: {
      visual: "Everything has royal purple hues, crown icons, and unnecessarily ornate decorations",
      gameplay: "All decisions must consider 'royal approval ratings', random royal decrees change the rules",
      karmaMultiplier: 1.2
    },
    specialEvents: [
      {
        id: "royal-wedding",
        name: "Surprise Royal Wedding",
        description: "The king is getting married for the 7th time! Everyone must send elaborate gifts or face social shame.",
        probability: 0.3
      },
      {
        id: "crown-contest",
        name: "Crown Design Competition",
        description: "You've been randomly selected to participate in the annual royal crown redesign contest.",
        probability: 0.25
      },
      {
        id: "dynasty-drama",
        name: "Dynasty Drama Episode",
        description: "The royal family's reality TV ratings are dropping. They've staged a dramatic scandal and everyone must pretend to be shocked.",
        probability: 0.35
      }
    ]
  }
];

export default dimensionPortals;
