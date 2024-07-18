# WeaveTalk

WeaveTalk is a community platform designed to foster connections and discussions among users across topics and interests. Inspired by popular social media dynamics, WeaveTalk integrates MERN stack technologies to deliver a engaging user experience. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Feature Highlights

Dynamic Threads: Create and engage with threads that capture diverse discussions.
Real-Time Interactions: Responses and updates to keep the conversation flowing.
Community Building: Join or create communities to gather individuals with shared interests.
Find Users and Communities: Recommend popular users and communities.

## Tech Stack

Frontend - primarily deal with the user interface and client-side interactions:

- Next.js <!-- While it is a full-stack framework capable of server-side rendering and static site generation, it is often leveraged for its frontend capabilities in building highly interactive user interfaces.-->
- React Hook Form <!-- A library to manage forms in React with minimal re-renders. -->
- TypeScript <!-- A superset of JavaScript offering static type definitions; used in both frontend and backend development, but listed here because it's essential for structuring robust backend services and APIs when used on the server-side. -->
- TailwindCSS <!-- A utility-first CSS framework for rapidly building custom user interfaces. --> 
- Shadcn UI  <!-- A UI framework or library, it is similar to other design systems used to build UI components. I used the form component in this project. -->
- Zod, for form validation <!-- A TypeScript-first schema validation library, used in the frontend for form validation. -->

Backend - used for server-side computing, user authentication, data management, and backend services:

- MongoDB <!-- A NoSQL database used to store application data. -->
- Clerk, for authentication and user management <!--  Provides backend services for authentication and user management. -->
- Webhooks, used for sending real-time updates to applications. 
- Serverless APIs  <!-- Functions that run in response to events on cloud platforms, eliminating the need to manage server infrastructure. -->
- Uploadthing, for user image upload.

## Getting Started 
**Prerequisites**

Make sure you have the following installed on your machine:

- Git
- Node.js
- npm (Node Package Manager)

First, clone the git repository in a directory of your choosing: 
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

This project uses [Clerk](https://clerk.com/) to provide backend services on authentication and user management. For data management, this project uses a [MongoDB](https://www.mongodb.com/) NoSQL database to store application data. This project also uses [Uploadthing](https://uploadthing.com/) to handle user image upload.
   
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

## Run the Project on Development Server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the web application.

## Deploy on Vercel

To deploy this web application, use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## How to improve?

- Optimize Next.js server-side rendering performance by improving serverless functions to offload tasks from the application server.
- Utilize MongoDB’s replication and sharding features to distribute data across multiple servers, enhancing both data availability and load distribution.
- Enhance the indexing strategy for more efficient data retrieval methods to reduce latency.
- Employ caching at both the server and client levels to reduce database reads and API calls. In-memory data stores like Redis could be used for session management and data fetching operations.

<!-- 
Microservices Architecture:
Break down the application into smaller, independently scalable microservices. This allows different parts of your system to scale based on demand without affecting the entire application.
Containerize the services using Docker and orchestrate with Kubernetes to manage the lifecycle of containers and scale efficiently.
Load Testing and Monitoring:
Regularly perform load testing to understand how your application behaves under stress and identify bottlenecks.
Use monitoring tools to track application performance and server health in real-time, enabling proactive scaling and management. 
API Optimization: Optimize API responses with better caching strategies and more efficient data retrieval methods to reduce latency.
Database Operations: Enhance database indexing and queries to speed up data access, especially for heavily trafficked features.
Recommendation Engine: Develop sophisticated algorithms for user and community recommendations based on interests and interactions to enhance user engagement.
Security Enhancements: Regularly update security practices to protect user data and prevent unauthorized access.
-->

## Resources

**shadcn/ui**

- [Installation and start shadcn/ui](https://ui.shadcn.com/docs/installation/next).
- Building form components with [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/).
- [Zod](https://zod.dev/) for form validation.

## Special Mention

I built this project referring to the amazing lesson provided by @adrianhajdin. Thank you so much for offering the full stack MERN Next.js course for completely free.
