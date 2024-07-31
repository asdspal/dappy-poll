import { Frog } from 'frog';
import { Button, TextInput } from 'frog/jsx';
import { DappySDK } from '@dappykit/sdk';

// Initialize DappyKit SDK
const dappySDK = new DappySDK({
  apiKey: process.env.DAPPYKIT_API_KEY
});

// Initialize Frog
const app = new Frog({
  basePath: '/api',
});

// Sample poll data (in a real app, this would be stored in a database)
let currentPoll = {
  question: 'What is your favorite color?',
  options: ['Red', 'Blue', 'Green'],
  votes: [0, 0, 0]
};

// User session management
let userSession = null;

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c;

  if (status === 'response') {
    if (buttonValue) {
      const index = parseInt(buttonValue) - 1;
      if (userSession) {
        currentPoll.votes[index]++;
      } else {
        return c.res({ image: <p>Please log in to vote.</p> });
      }
    } else if (inputText) {
      // Validate input for creating a new poll
      if (inputText.trim() === '') {
        return c.res({ image: <p>Poll question cannot be empty.</p> });
      }
      currentPoll = {
        question: inputText,
        options: ['Option A', 'Option B', 'Option C'],
        votes: [0, 0, 0]
      };
    }
  }

  const totalVotes = currentPoll.votes.reduce((a, b) => a + b, 0);

  return c.res({
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>{currentPoll.question}</h1>
        {currentPoll.options.map((option, index) => (
          <div key={index} style={{ marginBottom: '10px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>{option}</span>
              <span>{currentPoll.votes[index]} votes ({totalVotes > 0 ? Math.round(currentPoll.votes[index] / totalVotes * 100) : 0}%)</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#ddd', height: '20px' }}>
              <div style={{ width: `${totalVotes > 0 ? currentPoll.votes[index] / totalVotes * 100 : 0}%`, backgroundColor: '#4CAF50', height: '100%' }}></div>
            </div>
          </div>
        ))}
      </div>
    ),
    intents: [
      <Button value="1">Vote {currentPoll.options[0]}</Button>,
      <Button value="2">Vote {currentPoll.options[1]}</Button>,
      <Button value="3">Vote {currentPoll.options[2]}</Button>,
      <TextInput placeholder="Create a new poll" />
    ]
  });
});

// DappyKit integration for user authentication
app.frame('/auth', async (c) => {
  const { buttonValue } = c;

  if (buttonValue === 'login') {
    try {
      const authUrl = await dappySDK.getAuthUrl();
      return c.res({
        image: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h1>Authenticate with DappyKit</h1>
            <p>Click the button below to authenticate</p>
          </div>
        ),
        intents: [
          <Button.Link href={authUrl}>Authenticate</Button.Link>
        ]
      });
    } catch (error) {
      console.error('Error getting auth URL:', error);
      return c.res({
        image: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h1>Authentication Error</h1>
            <p>There was an error initiating authentication. Please try again later.</p>
          </div>
        )
      });
    }
  }

  return c.res({
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h1>Welcome to DappyPoll</h1>
        <p>Authenticate to create and vote in polls</p>
      </div>
    ),
    intents: [
      <Button value="login">Login with DappyKit</Button>
    ]
  });
});

// Function to handle user session after authentication
app.frame('/session', async (c) => {
  const { userId } = c; // Assume userId is obtained after successful authentication

  if (userId) {
    userSession = userId; // Store user session
    return c.res({
      image: <p>Welcome back! You are now logged in.</p>
    });
  } else {
    return c.res({
      image: <p>Session management error. Please log in again.</p>
    });
  }
});

export const GET = app;
export const POST = app;
