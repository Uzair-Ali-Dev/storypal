# StoryPal - Where Stories Come Alive

StoryPal is a dynamic platform that empowers storytellers to create, share, and discover captivating stories. Built with Next.js, Firebase, and TipTap, it provides a seamless experience for writers to unleash their creativity and connect with a community of fellow storytellers.

## 🚀 Features

- **Stunning Landing Page**: Modern, responsive design with engaging animations
- **User Authentication**: Secure signup/login flow using Firebase Auth
- **Rich Text Editor**: Feature-rich TipTap integration for an optimal writing experience
- **User Profiles**: Customizable profiles with bio and personal information
- **Cloud Storage**: Reliable data persistence using Firebase Firestore

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication & NextAuth.js
- **Database**: Firebase Firestore
- **Editor**: TipTap Rich Text Editor

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account with a configured project
- Firebase Admin SDK credentials

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Uzair-Ali-Dev/storypal.git
cd storypal
```

2. Install dependencies:

```bash
# Due to package compatibility issues with the latest Next.js version
npm install --legacy-peer-deps
# or
yarn install --legacy-peer-deps
```

3. Environment Setup:
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Service Account)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 Firebase Setup

1. Create a new Firebase project:

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project" and follow the setup wizard

2. Enable Authentication:

   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password authentication
   - Configure any additional auth providers if needed

3. Set up Firestore:

   - Go to Firestore Database in Firebase Console
   - Create a new database in test mode
   - Choose a location for your database

4. Get Firebase Configuration:

   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click the web icon (</>)
   - Register your app and copy the configuration to your `.env.local`

5. Set up Firebase Admin SDK:
   - Go to Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file securely
   - Copy the required values to your `.env.local`:
     - `FIREBASE_PROJECT_ID`
     - `FIREBASE_CLIENT_EMAIL`
     - `FIREBASE_PRIVATE_KEY`

## 🚀 Deployment

Deploy to Vercel:

1. Push your code to GitHub

2. Connect your repository to Vercel:

   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Select the Next.js framework preset

3. Configure environment variables:

   - Add all variables from `.env.local` to Vercel's environment variables
   - Make sure to properly format `FIREBASE_PRIVATE_KEY` with proper line breaks
   - Set `NEXTAUTH_URL` to your production URL

4. Configure build settings:

   - Go to Build & Output Settings
   - In the "Install Command" field, enter: `npm install --legacy-peer-deps`
   - This is crucial to handle package compatibility issues during deployment

5. Deploy:
   - Vercel will automatically build and deploy your application
   - Each push to main will trigger a new deployment

## ⚠️ Common Issues

- If you encounter package compatibility issues, make sure to use `--legacy-peer-deps` when installing dependencies
- Ensure all environment variables are properly set before running the application
- For Firebase Admin SDK issues, verify that `FIREBASE_PRIVATE_KEY` is properly formatted with actual line breaks
- If authentication isn't working, check that both Firebase and NextAuth configurations are correct
