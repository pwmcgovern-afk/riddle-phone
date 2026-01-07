import express, { Request, Response } from 'express';
import twilio from 'twilio';
import { getRandomRiddle, getRiddleByIndex, getRiddleIndex } from './riddles';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Riddle Phone is running. Call the number to hear your fate.');
});

// Initial call - plays riddle and waits for input
app.post('/voice', (_req: Request, res: Response) => {
  const riddle = getRandomRiddle();
  const riddleIndex = getRiddleIndex(riddle);
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
  twiml.pause({ length: 3 });

  // Gather input
  const gather = twiml.gather({
    numDigits: 1,
    action: `/gather?riddle=${riddleIndex}`,
    method: 'POST',
    timeout: 10
  });
  gather.say(
    { voice: 'Polly.Matthew' },
    'Press 1 for a hint. Press 2 for the answer. Choose wisely.'
  );

  // If no input, give the answer anyway
  twiml.say(
    { voice: 'Polly.Matthew' },
    'No response. Very well. The answer is...'
  );
  twiml.pause({ length: 2 });
  twiml.say(
    { voice: 'Polly.Matthew' },
    riddle.answer
  );
  twiml.pause({ length: 1 });
  twiml.say(
    { voice: 'Polly.Matthew' },
    'Until next time, caller.'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});

// Handle keypress
app.post('/gather', (req: Request, res: Response) => {
  const digit = req.body.Digits;
  const riddleIndex = parseInt(req.query.riddle as string, 10);
  const riddle = getRiddleByIndex(riddleIndex);
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  if (!riddle) {
    twiml.say({ voice: 'Polly.Matthew' }, 'Something went wrong. Goodbye.');
    twiml.hangup();
    res.type('text/xml');
    return res.send(twiml.toString());
  }

  if (digit === '1') {
    // Hint requested
    twiml.say(
      { voice: 'Polly.Matthew' },
      'A hint, you say? Very well.'
    );
    twiml.pause({ length: 1 });
    twiml.say(
      { voice: 'Polly.Matthew' },
      riddle.hint
    );
    twiml.pause({ length: 2 });

    // Gather again for the answer
    const gather = twiml.gather({
      numDigits: 1,
      action: `/answer?riddle=${riddleIndex}`,
      method: 'POST',
      timeout: 10
    });
    gather.say(
      { voice: 'Polly.Matthew' },
      'Press any key when you are ready for the answer.'
    );

    // If no input, give answer anyway
    twiml.say(
      { voice: 'Polly.Matthew' },
      'Time is up. The answer is...'
    );
    twiml.pause({ length: 2 });
    twiml.say(
      { voice: 'Polly.Matthew' },
      riddle.answer
    );
    twiml.pause({ length: 1 });
    twiml.say(
      { voice: 'Polly.Matthew' },
      'Until next time, caller. If there is a next time.'
    );
  } else {
    // Answer requested (or any other key)
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
    twiml.say(
      { voice: 'Polly.Matthew' },
      'Until next time, caller. If there is a next time.'
    );
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Handle answer after hint
app.post('/answer', (req: Request, res: Response) => {
  const riddleIndex = parseInt(req.query.riddle as string, 10);
  const riddle = getRiddleByIndex(riddleIndex);
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  if (!riddle) {
    twiml.say({ voice: 'Polly.Matthew' }, 'Something went wrong. Goodbye.');
    twiml.hangup();
    res.type('text/xml');
    return res.send(twiml.toString());
  }

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
  twiml.say(
    { voice: 'Polly.Matthew' },
    'Until next time, caller. If there is a next time.'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Riddle Phone listening on port ${port}`);
});
