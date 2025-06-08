# Financing Request Portal

A modern React-based web portal that enables representatives worldwide to submit financing requests with advanced validation, internationalization, and responsive design.

## 🚀 Project Overview

This application serves as a global financing request portal where representatives can submit detailed funding requests with the following key features:

### Core Features

- **Multi-year Validity Periods**: Requests can have validity periods between 1-3 years
- **Date Validation**: Requests must start at least 15 days from submission date
- **Global Support**: Integration with international country and currency data
- **OPEC Integration**: Automatic USD currency assignment for OPEC member countries
- **Project Code Validation**: Enforces XXXX-XXXX format (A-Z for first part, 1-9 for digits)
- **Responsive Design**: Optimized for both desktop and mobile browsers
- **Real-time Validation**: Form validation with immediate feedback

## 🛠️ Tech Stack

### Frontend Framework

- **Frontend Framework** - React, React Router
- **UI Framework & Styling** - HeroUI, Tailwind CSS
- **State Management** - TanStack Query, Context API
- **Form Handling & Validation** - Zod, React Hook Form
- **Date Handling** - @internationalized/date, date-fns
- **Development Tools** - Vite, ESLint, Prettier

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- Yarn or npm package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd noema-test
```

2. **Install dependencies**

```bash
yarn install
# or
npm install
```

3. **Start the development server**

```bash
yarn dev
# or
npm run dev
```

4. **Build for production**

```bash
yarn build
# or
npm run build
```

5. **Preview production build**

```bash
yarn preview
# or
npm run preview
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn check` - Run both linting and format checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── config/                         # Application constants & config
├── context/                         # React Context providers
├── hooks/                           # Custom React hooks
├── layouts/                         # Layout components
├── lib/                            # Utility functions and configurations
├── pages/                          # Page components
├── styles/                         # Global styles
├── types/                          # TypeScript type definitions

```

### Key Components

- **CreateRequestForm.tsx**: Main form with validation, OPEC logic, and submission handling
- **useCountries.ts**: Fetches and processes country data with OPEC identification
- **useCurrency.ts**: Manages currency options and caching
- **const.ts**: Contains OPEC member countries and validation constants

## 🔌 API Integrations

### External APIs

#### 1. Countries API

- **Endpoint**: `https://restcountries.com/v3.1/all`
- **Purpose**: Fetches comprehensive country data including flags and country codes
- **Data Processing**:
  - Filters for essential fields (name, flags, country codes)
  - Identifies OPEC member countries
  - Alphabetically sorts countries
- **Caching**: Managed by TanStack Query for optimal performance

#### 2. Currency API

- **Endpoint**: `https://openexchangerates.org/api/currencies.json`
- **Purpose**: Provides up-to-date currency codes and names
- **Features**:
  - Comprehensive currency list
  - Alphabetically sorted for easy selection
  - 1-hour cache duration for performance
  - Automatic USD selection for OPEC countries

#### 3. Financing Request Submission API

- **Endpoint**: `http://test-noema-api.azurewebsites.net/api/requests`
- **Method**: POST
- **Purpose**: Submits validated financing requests
- **Payload Structure**:

```typescript
{
  projectCode: string; // Format: XXXX-XXXX
  projectDescription: string; // Max 1000 characters
  currency: string; // Currency code
  countryCode: string; // ISO country code
  date: string; // Start date (YYYY-MM-DD)
  validityPeriod: number; // Years (1-3)
  fullName: string; // Combined first and last name
  amount: number; // Financing amount
}
```

### Data Flow

1. **Form Initialization**: Countries and currencies are loaded asynchronously
2. **Country Selection**: Triggers OPEC validation and automatic currency setting
3. **Form Validation**: Real-time validation using Zod schemas
4. **Submission**: Validated data is transformed and sent to the API
5. **Success Handling**: User sees confirmation and form is reset

### Error Handling

- Network errors are gracefully handled with user-friendly messages
- Form validation provides specific, actionable error messages
- API failures trigger toast notifications with retry suggestions
- Loading states prevent duplicate submissions

## 🔒 Validation Rules

### Project Code Format

- Pattern: `XXXX-XXXX`
- First 4 characters: A-Z (uppercase letters only)
- Last 4 characters: 1-9 (digits only, no zeros)

### Date Constraints

- Start date must be at least 15 days from submission
- Validity period: 1-3 years maximum

### OPEC Country Logic

- Automatic USD currency assignment
- OPEC countries list maintained in `src/config/const.ts`

### Form Limits

- Names: 50 characters maximum
- Description: 1000 characters maximum
- Amount: Up to 1 billion maximum

## 🌐 Internationalization

- **Date Handling**: Supports various date formats and timezones
- **Currency Display**: International currency codes and names
- **Country Data**: Complete list with flags and localized names
- **Responsive Design**: Works across different screen sizes and devices

## 🚀 Deployment

The application is configured for deployment on Vercel with:

- Automatic builds from repository
- Environment variable support
- Static site generation optimization
- CDN distribution for global performance

---

_Built with attention to detail and robust validation for a seamless global financing experience._
