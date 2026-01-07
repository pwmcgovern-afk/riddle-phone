export interface Riddle {
  question: string;
  answer: string;
}

export const riddles: Riddle[] = [
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?",
    answer: "A map. But you already knew that, didn't you?"
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps. Each one marking where you've been... and where you can never return."
  },
  {
    question: "I am not alive, but I grow. I don't have lungs, but I need air. I don't have a mouth, but water kills me. What am I?",
    answer: "Fire. It consumes everything it touches, and leaves nothing but ash."
  },
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "An echo. A voice that isn't yours, repeating in the darkness."
  },
  {
    question: "I can be cracked, made, told, and played. What am I?",
    answer: "A joke. But not everyone is laughing."
  },
  {
    question: "I follow you all day long, but when the night comes, I am gone. What am I?",
    answer: "Your shadow. Or perhaps... something else that follows you in the light."
  },
  {
    question: "The one who makes me doesn't want me. The one who buys me doesn't use me. The one who uses me doesn't know it. What am I?",
    answer: "A coffin. We all meet one eventually."
  },
  {
    question: "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?",
    answer: "A keyboard. Your fingers dance across me, but do you control what they type?"
  },
  {
    question: "What has a head and a tail, but no body?",
    answer: "A coin. Flip it. Heads you win. Tails... well, let's not think about tails."
  },
  {
    question: "I am always hungry and must always be fed. The finger I touch will soon turn red. What am I?",
    answer: "Fire. And it's always... hungry."
  },
  {
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "A river. Flowing endlessly toward somewhere you cannot follow."
  },
  {
    question: "I have no life, but I can die. What am I?",
    answer: "A battery. Or perhaps... a memory."
  }
];

export function getRandomRiddle(): Riddle {
  return riddles[Math.floor(Math.random() * riddles.length)];
}
