# AMFOS Backend Server

This is the backend server for the AMFOS application, built with Node.js and Express.

## Prerequisites

- Node.js (version 22 as specified in package.json engines)
- npm (Node package manager)

## Setup

1. Clone the repository and navigate to the `amfos-backend` directory.

2. Install the dependencies:

```bash
npm install
```

3. Set environment variables:

Create a `.env` file in the root directory and add necessary API keys and configuration, for example:

```
RAZORPAY_ID_KEY="id_key"
RAZORPAY_SECRET_KEY="secret_key"
```

## Starting the Server

To start the backend server, run:

```bash
npm start
```

This runs the command `node src/index.js` which starts the Express server.

## Testing the Server

Once the server is running, you can test it by navigating to:

```
http://localhost:4000/
```

You should see the message:

```
Basic server is running
```
