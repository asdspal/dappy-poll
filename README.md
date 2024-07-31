# DappyPoll

DappyPoll is a fun and interactive polling application built using Farcaster Frames and integrated with DappyKit. Users can create polls, vote on their favorite options, and authenticate using DappyKit for a seamless experience.

## Features

- Create and participate in polls directly within Farcaster.
- User authentication via DappyKit.
- Real-time voting results displayed dynamically.
- Simple and intuitive user interface.

## Technologies Used

- [Farcaster](https://farcaster.xyz): A decentralized social network protocol.
- [DappyKit](https://github.com/DappyKit/sdk): SDK for integrating DappyKit functionalities.
- [Frames.js](https://framesjs.org): A library for building interactive Farcaster Frames.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A Vercel account
- DappyKit API key

### Installation

1. Clone the repository:
bash
git clone https://github.com/asdspal/dappypoll.git
cd dappypoll


2. Install dependencies:

bash
npm install


3. Create a `.env` file in the root directory and add your DappyKit API key:

plaintext
DAPPYKIT_API_KEY=your_dappykit_api_key


### Running Locally

To run the application locally, use the following command:

bash
npm run dev


You can access the application at `http://localhost:3000`.

### Deploying to Vercel

1. Install the Vercel CLI globally if you haven't already:

bash
npm install -g vercel


2. Deploy the application:

bash
vercel


3. Follow the prompts to link your project to your Vercel account.

4. Set the environment variable on Vercel:

   - Go to your Vercel dashboard, select your project, and navigate to the "Settings" tab.
   - Under "Environment Variables," add `DAPPYKIT_API_KEY` with the value from your `.env` file.

5. Access your deployed application at the provided Vercel URL.

## Usage

- **Login**: Click the "Login with DappyKit" button to authenticate.
- **Create Poll**: Enter a question in the input field to create a new poll.
- **Vote**: Click on the options to cast your vote. The results will update in real-time.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the DappyKit team for their SDK and support.
- Thanks to the Farcaster community for their contributions to decentralized social networking.


