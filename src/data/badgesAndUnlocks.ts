
export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  requirements: {
    type: "karma" | "decision" | "character" | "portal" | "special";
    value: string | number;
    operator?: ">" | "<" | "=" | ">=";
  }[];
}

const badgesAndUnlocks: Badge[] = [
  {
    id: "kukhura-whisperer",
    name: "Kukhura Whisperer",
    description: "You've developed an uncanny ability to communicate with chickens. They tell you secrets about your neighbors.",
    image: "/badges/kukhura-whisperer.png",
    rarity: "uncommon",
    requirements: [
      {
        type: "decision",
        value: "kukhura-friend"
      }
    ]
  },
  {
    id: "momo-addict",
    name: "Momo Addict Lvl 99",
    description: "You've consumed so many momos that your blood is basically kothe ko sauce at this point.",
    image: "/badges/momo-addict.png",
    rarity: "common",
    requirements: [
      {
        type: "decision",
        value: "eat-momo"
      }
    ]
  },
  {
    id: "loadshedding-survivor",
    name: "Loadshedding Survivor",
    description: "You've mastered the art of living without electricity. You can shower in the dark and sense when power will return.",
    image: "/badges/loadshedding-survivor.png",
    rarity: "common",
    requirements: [
      {
        type: "portal",
        value: "loadshedding-realm"
      }
    ]
  },
  {
    id: "pressure-cooker-engineer",
    name: "Pressure Cooker Engineer",
    description: "You've modified a simple pressure cooker into a device that could either make perfect rice or launch a satellite.",
    image: "/badges/pressure-cooker.png",
    rarity: "rare",
    requirements: [
      {
        type: "special",
        value: "pressure-hack"
      }
    ]
  },
  {
    id: "bargain-master",
    name: "Bargain Master",
    description: "You negotiated 80% off an item that was already on sale. Shopkeepers fear you.",
    image: "/badges/bargain-master.png",
    rarity: "uncommon",
    requirements: [
      {
        type: "karma",
        value: 50,
        operator: ">"
      }
    ]
  },
  {
    id: "traffic-nemesis",
    name: "Traffic Nemesis",
    description: "You've spent so much time in traffic that traffic jams now part like the Red Sea when they sense you coming.",
    image: "/badges/traffic-nemesis.png",
    rarity: "rare",
    requirements: [
      {
        type: "character",
        value: "traffic-jam"
      }
    ]
  },
  {
    id: "titaura-connoisseur",
    name: "Titaura Connoisseur",
    description: "You can identify the precise region, season, and mood of the person who prepared any titaura by taste alone.",
    image: "/badges/titaura-connoisseur.png",
    rarity: "uncommon",
    requirements: [
      {
        type: "decision",
        value: "eat-it-all" 
      }
    ]
  },
  {
    id: "buddha-was-born",
    name: "Buddha Was Born in Nepal",
    description: "You've reminded at least 100 foreigners that Buddha was born in Nepal. Congratulations on your service.",
    image: "/badges/buddha-born.png",
    rarity: "common",
    requirements: [
      {
        type: "special",
        value: "buddha-reminder"
      }
    ]
  },
  {
    id: "load-bearer",
    name: "Ultimate Load Bearer",
    description: "You've carried impossible loads up mountain paths, putting even the strongest porters to shame.",
    image: "/badges/load-bearer.png",
    rarity: "legendary",
    requirements: [
      {
        type: "karma",
        value: 100,
        operator: ">"
      }
    ]
  },
  {
    id: "secret-spice-master",
    name: "Secret Spice Master",
    description: "You've unlocked the mythical masala combination that makes anything taste like the best street food in Kathmandu.",
    image: "/badges/spice-master.png",
    rarity: "legendary",
    requirements: [
      {
        type: "special",
        value: "masala-discovery"
      }
    ]
  }
];

export default badgesAndUnlocks;
