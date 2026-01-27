# BFIT - Discipline Meets Transformation

BFIT is a full-stack fitness tracking application built with Next.js, Tailwind CSS, and MongoDB.

## Features

- **User Dashboard**: Track daily calories, workouts, and consistency.
- **Workout Tracking**: Log varied workouts (Cardio, Strength, etc.) with calorie calculations.
- **Diet Tracking**: Log meals and track macros (Proteins, Carbs, Fats).
- **NutriScan AI**: Mock AI feature to analyze food nutrition from text input.
- **Progress Visualization**: Chart your weight loss/gain journey over time.
- **Secure Authentication**: JWT-based auth with password hashing.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Custom JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB installed locally or a MongoDB Atlas connection string.

### Installation

1.  **Clone/Navigate** to the project directory:
    ```bash
    cd Bfit
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root if it doesn't exist, and add:
    ```env
    MONGODB_URI=mongodb://localhost:27017/bfit
    JWT_SECRET=your_super_secure_secret_key
    ```
    *Replace the URI with your MongoDB Atlas string if using cloud database.*

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access the App**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `(auth)/`: Login and Signup pages.
  - `(dashboard)/`: Protected user pages (Dashboard, Workouts, etc.).
  - `api/`: Backend endpoints.
- `components/`: Reusable UI components (Sidebar, NutriScan, etc.).
- `context/`: React Context (AuthState).
- `lib/`: Utilities (Database connection, Auth helpers).
- `models/`: Mongoose Database Models.

## NutriScan Usage

Go to the NutriScan page and type a food name (e.g., "Chicken Breast", "Pizza", "Apple"). The system will return Estimated Macro-nutrients which you can add to your daily diet log.

---
Built for the Future of Fitness.
