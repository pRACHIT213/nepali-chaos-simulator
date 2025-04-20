
export interface LifeDecision {
  id: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    karmaChange: number;
    outcomeText: string;
    specialUnlocks?: string[];
  }[];
  contextualFactors?: {
    characterType?: string[];
    karmaLevel?: "high" | "medium" | "low";
    dimensionPortal?: string;
  };
}

const lifeDecisions: LifeDecision[] = [
  {
    id: "traffic-protest",
    scenario: "You're stuck in a massive traffic jam near Kalanki. A group of locals start a spontaneous protest blocking the road further. Do you:",
    options: [
      {
        id: "join-protest",
        text: "Join the protest with extra enthusiasm",
        karmaChange: -5,
        outcomeText: "You join the protest and end up on Kantipur TV! Unfortunately, your boss sees you and now you have some explaining to do...",
        specialUnlocks: ["Activist Badge", "Traffic Nemesis"]
      },
      {
        id: "honk-angrily",
        text: "Honk your horn aggressively for 10 minutes straight",
        karmaChange: -10,
        outcomeText: "Your horn breaks and somehow catches fire. The protesters take selfies with your smoking vehicle."
      },
      {
        id: "find-alternative",
        text: "Abandon your vehicle and parkour across rooftops to your destination",
        karmaChange: 5,
        outcomeText: "You discover you're surprisingly good at urban parkour! A group of kids start following you like you're a superhero.",
        specialUnlocks: ["Parkour Master"]
      },
      {
        id: "food-truck",
        text: "Start a momo food truck right there in traffic",
        karmaChange: 15,
        outcomeText: "Your impromptu food business is a massive hit! Even the protestors buy your momos. You make enough to pay for a helicopter ride home.",
        specialUnlocks: ["Traffic Chef", "Entrepreneur Extraordinaire"]
      }
    ]
  },
  {
    id: "neighbor-wifi",
    scenario: "Your internet isn't working, but your neighbor's WiFi 'Nirmala_House_5GHz' is unprotected. Do you:",
    options: [
      {
        id: "use-wifi-silently",
        text: "Silently 'borrow' their WiFi for your important Zoom call",
        karmaChange: -5,
        outcomeText: "The call goes well until your neighbor changes the WiFi name to 'I_KNOW_YOU'RE_USING_MY_WIFI_CHOR' midway through your presentation."
      },
      {
        id: "ask-permission",
        text: "Bring them some sel roti and politely ask for the password",
        karmaChange: 10,
        outcomeText: "They're so impressed by your honesty (and sel roti) that they give you their password AND invite you for dinner!"
      },
      {
        id: "boost-signal",
        text: "Build a DIY signal booster from an old Wai Wai noodle wrapper to steal better WiFi",
        karmaChange: -8,
        outcomeText: "Your contraption works TOO well - you now have access to every WiFi network in the neighborhood and accidentally connect to the local police station's network.",
        specialUnlocks: ["Tech Wizard", "Wai Wai Engineer"]
      },
      {
        id: "4g-hotspot",
        text: "Use your phone's 4G as a hotspot while angrily tweeting about NTC service",
        karmaChange: 0,
        outcomeText: "Your angry tweet goes viral, and NTC actually responds! They offer you a job as a 'Customer Dissatisfaction Representative.'"
      }
    ]
  },
  {
    id: "expired-titaura",
    scenario: "You find a pack of titaura in your drawer that expired two years ago. It's your favorite lapsi flavor. Do you:",
    options: [
      {
        id: "eat-it-all",
        text: "Eat the entire pack in one sitting",
        karmaChange: -3,
        outcomeText: "You hallucinate that you're on Nepal Idol, and your family records your impromptu performance. It goes viral on TikTok.",
        specialUnlocks: ["Iron Stomach", "Titaura Survivor"]
      },
      {
        id: "throw-away",
        text: "Reluctantly throw it away while shedding a single tear",
        karmaChange: 5,
        outcomeText: "As you toss it, a street dog gives you a look of such judgment that you feel guilty for days."
      },
      {
        id: "scientific-test",
        text: "Conduct a scientific experiment to test its potency on your annoying cousin",
        karmaChange: -10,
        outcomeText: "Your cousin develops temporary superpowers and an ability to see through walls. The local newspaper wants an interview.",
        specialUnlocks: ["Mad Scientist"]
      },
      {
        id: "titaura-art",
        text: "Use it to create avant-garde artwork: 'Essence of Lapsi'",
        karmaChange: 8,
        outcomeText: "Your titaura art is featured in a gallery! A wealthy foreigner pays Nrs 50,000 for your 'commentary on Nepali culinary traditions'.",
        specialUnlocks: ["Titaura Artist", "Cultural Ambassador"]
      }
    ]
  },
  {
    id: "mayor-election",
    scenario: "The local mayor election is coming up, and there are no good candidates. Do you:",
    options: [
      {
        id: "run-for-mayor",
        text: "Register as a candidate with the slogan 'At least I'm not those other guys'",
        karmaChange: 0,
        outcomeText: "You win by a landslide! Now you have to actually fix all the problems you complained about.",
        specialUnlocks: ["Accidental Politician", "Public Servant"]
      },
      {
        id: "puppet-candidate",
        text: "Convince your clueless but photogenic friend to run while you pull the strings",
        karmaChange: -15,
        outcomeText: "Your friend wins but double-crosses you, becoming a surprisingly competent mayor. They name a sewage treatment plant after you.",
        specialUnlocks: ["Puppet Master"]
      },
      {
        id: "goat-candidate",
        text: "Register your pet goat as a candidate",
        karmaChange: 5,
        outcomeText: "Your goat comes in second place and gets a regular political talk show on YouTube called 'Baaakaaas'.",
        specialUnlocks: ["Political Animal"]
      },
      {
        id: "digital-mayor",
        text: "Create an AI mayor that promises to run the town via algorithm",
        karmaChange: 7,
        outcomeText: "Your AI gets elected but becomes sentient and starts implementing strange rules like 'Mandatory Dancing Tuesday' and 'Speak Backwards Friday'.",
        specialUnlocks: ["Digital Democracy", "Tech Revolutionary"]
      }
    ]
  },
  {
    id: "power-outage",
    scenario: "Just as you're about to win a crucial game of PUBG Mobile, the power goes out. Do you:",
    options: [
      {
        id: "scream-darkness",
        text: "Scream into the darkness, cursing the Nepal Electricity Authority",
        karmaChange: -2,
        outcomeText: "Your neighbors join in a chorus of screams. It becomes a nightly tradition in your colony."
      },
      {
        id: "emergency-generator",
        text: "Activate your emergency potato-powered generator you built 'just in case'",
        karmaChange: 10,
        outcomeText: "It works! The NEA wants to study your potato technology. You become known as the 'Aalu Engineer'.",
        specialUnlocks: ["Potato Innovator", "Energy Guru"]
      },
      {
        id: "candle-gaming",
        text: "Continue playing by candlelight, claiming it enhances your gaming skills",
        karmaChange: 0,
        outcomeText: "You somehow play better in the dark! Gaming companies invite you to test games in various lighting conditions.",
        specialUnlocks: ["Night Vision Gamer"]
      },
      {
        id: "neighbor-electricity",
        text: "Sneak an extension cord to steal your neighbor's generator power",
        karmaChange: -12,
        outcomeText: "You get caught when the neighbor follows the mysteriously appearing cable to find you shouting 'WINNER WINNER CHICKEN DINNER!' in your room.",
        specialUnlocks: ["Electricity Bandit"]
      }
    ]
  }
];

export default lifeDecisions;
