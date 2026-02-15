# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **refactoring kata** for a lift pass pricing API. The goal is NOT to add features immediately, but to refactor the existing code to make it testable and reusable before implementing new functionality.

**Current state**: The pricing logic is tightly coupled to the Express HTTP layer and MySQL database, making it untestable at the unit level.

**Kata objective**: Refactor toward hexagonal architecture by:
1. Adding high-level tests first (HTTP layer with real DB)
2. Extracting pure pricing logic into a separate class (e.g., `PricingLogic`)
3. Extracting database access into a DAO class (e.g., `PricingDao`)
4. Moving tests down to unit level with fakes/mocks
5. Keeping only 1-2 integration tests at the HTTP layer

## Commands

**Install dependencies:**
```bash
npm install
```

**Run tests:**
```bash
npm test
```

**Run a single test file:**
```bash
npm test -- test/prices.spec.ts
```

**Start the application:**
```bash
npm start
```

The server runs on port 5010. Example: `http://localhost:5010/prices?type=night&age=23&date=2019-02-18`

**Compile TypeScript:**
```bash
npm run compile
```

## Database Setup

The application requires a MySQL/MariaDB database:
- Host: localhost:3306
- User: `root`
- Password: `mysql`
- Database: `lift_pass`

Initialize using (from parent directory):
```bash
./runLocalDatabase.sh
mysql -u root -p mysql < ./database/initDatabase.sql
```

## Architecture

**Current structure** (all in one file `src/prices.ts`):
- Express routes (`GET /prices`, `PUT /prices`) contain all logic
- Direct MySQL queries embedded in route handlers
- Business rules (age-based pricing, holiday detection, Monday discounts) mixed with HTTP/SQL concerns

**Target structure** (hexagonal architecture):
- **HTTP layer** (Express): Extract request data, call business logic, format response
- **Business logic layer** (`PricingLogic`): Pure functions/class with pricing rules
- **Data access layer** (`PricingDao`): Database queries abstracted behind an interface

This separation enables:
- Unit testing business logic with fake DAOs (no database needed)
- Few focused integration tests for the DAO
- Minimal end-to-end tests at HTTP layer

## Testing Approach

Use **Mocha** + **Chai** + **SuperTest** for testing.

The test file `test/prices.spec.ts` has a skeleton test that needs to be completed.

When refactoring, follow the Testing Pyramid:
1. Start with high-level tests (HTTP → DB) to establish safety net
2. Refactor to extract layers
3. Push tests down to unit level as layers separate
4. Keep only 1-2 integration tests at the top

## Important Notes

- This is a **kata/exercise**, not production code - the existing code is intentionally poor
- The new feature request is: "get the price for several lift passes, not just one"
- Don't implement the new feature until the refactoring makes it easy
- Focus on making the code testable and reusable first
