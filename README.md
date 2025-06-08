# Financing Request Portal

A modern React-based web portal that enables representatives worldwide to submit financing requests.

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

### Requirements

- Node.js (version 18 or higher)
- Yarn or npm package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone git@github.com:Yawmiej/financing-request.git
cd financing-request
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

## 📁 Project Structure

```
public/
src/
├── components/                     # Reusable UI components
├── config/                         # Application constants & config
├── context/                        # React Context providers
├── hooks/                          # Custom React hooks
├── layouts/                        # Layout components
├── lib/                            # Utility functions and configurations
├── pages/                          # Page components
├── styles/                         # Global styles
├── types/                          # TypeScript type definitions

```

## 🔌 API Integrations

- Currency API: `https://openexchangerates.org/api/currencies.json`
- Countries API: `https://restcountries.com/v3.1/all?fields=name,flags,cca2`
- Request Submission API: `http://test-noema-api.azurewebsites.net/api/requests`

## Possibile improvements

- Show list of submitted requests
- Possibly split form into two stages
- Add Testing with Jest, Playwright
- Configure auto deployment with preview branches

## Feedback

Kindly reach out via mail at [yomlateef@yahoo.com](mailto:yomlateef@yahoo.com) if any feedback or suggestions.
