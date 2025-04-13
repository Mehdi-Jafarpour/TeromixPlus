# WoodCraft Millworks E-commerce Website

A feature-rich e-commerce platform for selling wooden millworks with a warm, wood-themed design.

## Project Overview

This project is a full-stack React-based e-commerce application specialized for selling handcrafted wooden millworks, furniture, and home decor items. It features a responsive design with a warm color palette of white, cream, and dark brown to create an inviting atmosphere that complements the wooden products.

## Features

- **Product Catalog**: Browse products by categories with detailed product pages
- **Shopping Cart**: Add items to cart, adjust quantities, and checkout
- **User Accounts**: User registration and authentication
- **Custom Orders**: Request custom woodwork through a detailed form
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Product Search**: Find products by name, type, or features

## Tech Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Express.js
- **State Management**: React Context API, TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/woodcraft-millworks.git
   cd woodcraft-millworks
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/contexts` - React context for global state
  - `/src/hooks` - Custom React hooks
  - `/src/pages` - Page components for routing
- `/server` - Backend Express application
  - `/routes.ts` - API route definitions
  - `/storage.ts` - Data storage interface
- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Data schemas and types

## License

[MIT](LICENSE)