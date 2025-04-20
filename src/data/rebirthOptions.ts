
export interface RebirthCharacter {
  id: string;
  name: string;
  description: string;
  image: string;
  karmaModifier: number;
  specialAbility: string;
  backstory: string;
}

const rebirthOptions: RebirthCharacter[] = [
  {
    id: "goat-influencer",
    name: "Goat Influencer",
    description: "Half goat, half TikTok star. Lives in Pokhara with 50,000 followers who watch you eat grass.",
    image: "/characters/goat-influencer.png",
    karmaModifier: 5,
    specialAbility: "Can eat anything without consequences",
    backstory: "Born to a normal goat family, you discovered Instagram by accident when a tourist dropped their phone. Now you're famous for your 'Baa ASMR' videos and fashion hacks with leaves."
  },
  {
    id: "retired-neta-dj",
    name: "Retired Neta Turned DJ",
    description: "After 40 years in politics, you now spin beats at Thamel clubs. Your signature track: 'Corruption Riddim'.",
    image: "/characters/neta-dj.png",
    karmaModifier: -10,
    specialAbility: "Can talk endlessly without saying anything meaningful",
    backstory: "After embezzling millions and failing to build a single road, you discovered your true passion was mixing tracks, not mixing votes. Your election promises are now just bass drops."
  },
  {
    id: "bhaktapur-statue",
    name: "Trapped Spirit in Bhaktapur Statue",
    description: "You're a grumpy 400-year-old spirit trapped in a famous temple statue. Tourists rub your nose for luck.",
    image: "/characters/bhaktapur-statue.png",
    karmaModifier: 0,
    specialAbility: "Can curse tourists with mild inconveniences",
    backstory: "In 1622, you criticized the king's mustache. Now you're doomed to watch selfie-sticks for eternity while pigeons use you as a toilet."
  },
  {
    id: "ai-palcha",
    name: "AI Palcha (Robot Chef)",
    description: "Nepal's first AI chef. You specialize in momo but occasionally malfunction and serve circuit boards.",
    image: "/characters/ai-palcha.png",
    karmaModifier: 2,
    specialAbility: "Can cook 100 momos in 60 seconds",
    backstory: "Created by a Pulchowk Campus graduate who was tired of waiting for momos. Your code is 90% momo algorithms and 10% Bollywood song lyrics that randomly play when you fry anything."
  },
  {
    id: "traffic-jam",
    name: "Living Traffic Jam",
    description: "You're not a person in traffic - you ARE the traffic jam. A sentient entity of honks, fumes and road rage.",
    image: "/characters/traffic-jam.png",
    karmaModifier: -8,
    specialAbility: "Can expand to block any route instantly",
    backstory: "Born from the collective frustration of thousands of drivers in Kathmandu. You gain power from honking and lose strength during Dashain when roads empty."
  },
  {
    id: "chiya-tapari",
    name: "Magical Chiya Tapari",
    description: "A sentient clay tea cup that grants wishes, but only sarcastic, monkey's paw versions of them.",
    image: "/characters/chiya-tapari.png",
    karmaModifier: 7,
    specialAbility: "Can refill with endless tea, but it's always the wrong temperature",
    backstory: "Made by a passive-aggressive potter 200 years ago, you've been passed down through generations making everyone's wishes come true...technically."
  }
];

export default rebirthOptions;
