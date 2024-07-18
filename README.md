# WeaveTalk
---
This is a social media web application that . Submitted to UofTHacks X.This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

Frontend - primarily deal with the user interface and client-side interactions:

- Next.js <!-- While it is a full-stack framework capable of server-side rendering and static site generation, it is often leveraged for its frontend capabilities in building highly interactive user interfaces.-->
- React Hook Form <!-- A library to manage forms in React with minimal re-renders. -->
- TypeScript <!-- A superset of JavaScript offering static type definitions; used in both frontend and backend development, but listed here because it's essential for structuring robust backend services and APIs when used on the server-side. -->
- TailwindCSS <!-- A utility-first CSS framework for rapidly building custom user interfaces. --> 
- Shadcn UI  <!-- A UI framework or library, assuming it is similar to other design systems used to build UI components. -->
- Zod, for form validation <!-- A TypeScript-first schema validation library, used in the frontend for form validation. -->

Backend Technologies - used for server-side computing, data management, and backend services:

- MongoDB <!-- A NoSQL database used to store application data. -->
- Clerk, for authentication and user management <!--  Provides backend services for authentication and user management. -->
- Webhooks, used for sending real-time updates to application. 
- Serverless APIs  <!-- Functions that run in response to events on cloud platforms, eliminating the need to manage server infrastructure. -->
- Uploadthing, for user image upload.

## Getting Started 
**Prerequisites**

Make sure you have the following installed on your machine:

- Git
- Node.js
- npm (Node Package Manager)

To reproduce this project, first, clone the git repository in a directory of your choosing: 
```
https://github.com/Symorglass/WeaveTalk-App.git
```

Change the directory into the cloned repository:
```
cd WeaveTalk-App
```

Then, install all the dependencies that are necessary for this project from package.json
```
npm install
```

## Environment Variables Setup
Create a new file named `.env` in the root of your project and add the following content:

This project uses [Clerk](https://clerk.com/) to provide backend services on authentication and user management. For data management, this project uses a [MongoDB](https://www.mongodb.com/) NoSQL database to store application data. This project also uses uploadthing to handle user image upload.
   
Replace the placeholder values with your actual credentials obtained from [MongoDB](https://www.mongodb.com/), [Clerk](https://clerk.com/), and [Uploadthing](https://uploadthing.com/). 

```
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

MONGODB_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

Also, setup Clerk authentication route in the `.env` as follows. 

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the web application.

## Deploy on Vercel

To deploy this web application, use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## To be improved

