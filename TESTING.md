# Testing Setup with Vitest

This project includes a comprehensive testing setup using **Vitest** for both React components and API logic testing.

## 🧪 Testing Tools

- **Vitest**: Fast unit test framework
- **@testing-library/react**: Testing utilities for React components  
- **@testing-library/jest-dom**: Custom matchers for DOM elements
- **@vitejs/plugin-react**: React support for Vite/Vitest
- **node-mocks-http**: HTTP mocking for API tests

## 📁 Test Structure

```
src/
├── test/
│   ├── setup.ts          # Global test configuration
│   └── utils.tsx         # Test utilities and helpers
├── components/
│   └── __tests__/        # Component tests
│       └── SubscriptionCard.test.tsx
├── pages/api/
│   └── __tests__/        # API tests
│       ├── subscriptions.test.ts
│       └── api-logic.test.ts
└── utils/
    └── __tests__/        # Utility function tests
        └── utils.test.ts
```

## 🚀 Available Scripts

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests interactively
npm test
```

## ✅ Test Examples

### Component Testing
```typescript
import { render, screen } from '@/test/utils'
import SubscriptionCard from '../SubscriptionCard'

test('renders subscription information', () => {
  render(<SubscriptionCard subscription={mockSubscription} />)
  expect(screen.getByText('MacBook Pro 16"')).toBeInTheDocument()
})
```

### API Logic Testing
```typescript
test('calculates days remaining correctly', () => {
  const daysRemaining = calculateDaysRemaining('2024-12-31')
  expect(daysRemaining).toBeGreaterThan(0)
})
```

### Utility Function Testing
```typescript
test('formats price in euros correctly', () => {
  expect(formatPrice(19999)).toMatch(/199,99\s€/)
})
```

## 🛠️ Configuration

### Vitest Config (`vitest.config.ts`)
- React plugin support
- TypeScript path aliases
- Node environment for API tests
- Coverage reporting

### Test Setup (`src/test/setup.ts`)
- Global test utilities
- Next.js router mocking
- Image component mocking
- DOM API mocking (when needed)

## 📊 Coverage

The testing setup includes coverage reporting with:
- **Provider**: v8 (built into Node.js)
- **Formats**: text, JSON, HTML
- **Exclusions**: node_modules, test files, build files

View coverage report:
```bash
npm run test:coverage
```

## 🎯 Best Practices

1. **Component Tests**: Focus on user interactions and rendered output
2. **API Tests**: Test business logic separately from HTTP layer
3. **Utility Tests**: Test edge cases and error conditions
4. **Mocking**: Mock external dependencies and Next.js specifics
5. **Naming**: Use descriptive test names that explain behavior

## 🔧 Troubleshooting

- **DOM Issues**: Use node environment for non-DOM tests
- **Next.js Errors**: Ensure proper mocking in setup files
- **TypeScript**: Check path aliases in vitest.config.ts
- **Coverage**: Exclude test files and build artifacts

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)