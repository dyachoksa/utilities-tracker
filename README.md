# Utilities Tracker

A comprehensive, free web application for tracking and managing household utilities. Monitor meter readings, manage tariffs,
track payments, and gain insights into your utility costs across multiple properties.

## Features

### 🏠 Multiple Properties Management

- Add and manage multiple households or properties
- Organize utilities by location
- Track different utility types per property

### 📊 Utility Types Support

- Electricity
- Gas
- Water
- Heating
- Maintenance fees
- And more

### 📏 Meter Readings Tracking

- Record meter readings with timestamps
- Automatic consumption calculations
- Historical data tracking

### 💰 Smart Tariff Management

- Counter-based tariffs
- Fixed-rate tariffs
- Area-based tariffs
- Custom tariff configurations

### 💳 Payment Tracking

- Record all utility payments
- Payment history and analytics
- Cost tracking over time

### 📈 Visual Analytics

- Interactive charts and graphs
- Cost trends and insights
- Usage patterns analysis

### 🔒 Privacy-Focused

- User data protection
- Transparent data practices
- GDPR-compliant

### 🌍 Multi-Language Support

- English
- Ukrainian

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: Hono framework with OpenAPI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Zustand, TanStack Query
- **Internationalization**: next-intl
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd utilities-tracker
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/utilities_tracker
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
LOG_LEVEL=info
NODE_ENV=development
```

4. Set up the database:

```bash
# Generate and run migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm format` - Format code with Prettier

## Project Structure

```
src/
├── api/                 # API routes and handlers
│   ├── handlers/        # Route handlers
│   ├── mappers/         # Data mappers
│   ├── middlewares/     # API middlewares
│   └── routes/          # Route definitions
├── app/                 # Next.js app router pages
│   ├── (auth)/          # Authentication pages
│   ├── (public)/        # Public pages (landing, about, etc.)
│   └── api/             # API route handlers
├── components/          # React components
│   ├── blocks/          # Page-specific component blocks
│   ├── forms/           # Form components
│   ├── ui/              # Reusable UI components
│   └── ...
├── db/                  # Database schemas and migrations
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── services/            # Business logic services
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
└── ...
```

## API Documentation

The API is built with Hono and includes OpenAPI documentation. Available endpoints:

- **Households**: `/api/households` - Manage properties
- **Providers**: `/api/providers` - Utility service providers
- **Tariffs**: `/api/tariffs` - Tariff configurations
- **Payments**: `/api/payments` - Payment records
- **Stats**: `/api/stats` - Analytics and statistics

## Authentication

Uses Better Auth for secure authentication with support for:

- Email/password registration
- GitHub OAuth
- Session management

## Database Schema

The application uses PostgreSQL with the following main entities:

- Users (via Better Auth)
- Households/Properties
- Providers
- Tariffs
- Payments
- Meter Readings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and run tests
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a pull request

## Code Quality

- **Linting**: ESLint with Next.js and React rules
- **Formatting**: Prettier with import sorting
- **TypeScript**: Strict mode enabled
- **Code Style**: 120 character width, 2-space indentation

## Deployment

The application can be deployed to any platform supporting Next.js:

1. Build the application: `pnpm build`
2. Set up production environment variables
3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue on GitHub.

---

**Utilities Tracker** - Track your utilities, save on costs, stay organized. 100% Free, forever.
