import express, { Request, Response } from 'express';
import twilio from 'twilio';
import { getRandomRiddle } from './riddles';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Riddle Phone is running. Call the number to hear your fate.');
});

app.post('/voice', (_req: Request, res: Response) => {
  const riddle = getRandomRiddle();
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  // Eerie greeting
  twiml.say(
    { voice: 'Polly.Matthew' },
    'Welcome, caller. You have reached the Riddle Line.'
  );

  twiml.pause({ length: 1 });

  twiml.say(
    { voice: 'Polly.Matthew' },
    'Listen carefully. I will only say this once.'
  );

  twiml.pause({ length: 2 });

  // The riddle
  twiml.say(
    { voice: 'Polly.Matthew' },
    riddle.question
  );

  // Suspenseful pause
  twiml.pause({ length: 6 });

  // The answer
  twiml.say(
    { voice: 'Polly.Matthew' },
    'The answer is...'
  );

  twiml.pause({ length: 2 });

  twiml.say(
    { voice: 'Polly.Matthew' },
    riddle.answer
  );

  twiml.pause({ length: 2 });

  // Unsettling goodbye
  twiml.say(
    { voice: 'Polly.Matthew' },
    'Until next time, caller. If there is a next time.'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Riddle Phone listening on port ${port}`);
  console.log(`Webhook URL: POST /voice`);
});
