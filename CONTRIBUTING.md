# Contributing to The Referee

Thank you for your interest in contributing to The Referee! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/the-referee.git`
3. Install dependencies: `npm install`
4. Run tests: `npm test`
5. Start development server: `npm run dev`

## Development Process

### Adding New Comparison Types

To add a new comparison type:

1. Add the comparison strategy to the `comparisonStrategies` object in `src/index.js`
2. Implement the comparison method following the existing pattern
3. Add scoring logic with appropriate criteria
4. Include pros/cons and use case methods
5. Add comprehensive tests
6. Update documentation

### Code Style

- Use ES6+ features and modern JavaScript
- Follow existing naming conventions
- Include JSDoc comments for public methods
- Write descriptive commit messages
- Ensure all tests pass before submitting

### Testing

- Write unit tests for new functionality
- Include integration tests for API endpoints
- Test edge cases and error conditions
- Maintain test coverage above 80%

### Documentation

- Update README.md for new features
- Add examples for new comparison types
- Include API documentation for new endpoints
- Update project guidelines if needed

## Submission Guidelines

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes and add tests
3. Ensure all tests pass: `npm test`
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Pull Request Requirements

- Clear description of changes
- Tests for new functionality
- Updated documentation
- No breaking changes without discussion
- Follows existing code style

## Comparison Type Guidelines

When adding new comparison types, consider:

### Scoring Criteria
- Choose 4-6 relevant criteria
- Use 0-1 scale for scores
- Consider both quantitative and qualitative factors
- Make criteria meaningful for decision-making

### Pros and Cons
- Provide 3-5 pros and cons per option
- Focus on practical implications
- Be objective and balanced
- Consider different use cases

### Use Cases
- Define clear "best for" scenarios
- Consider different user contexts
- Provide actionable guidance
- Avoid overly generic statements

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

## Questions?

If you have questions about contributing, please:
- Check existing issues and discussions
- Open a new issue for bugs or feature requests
- Reach out to maintainers for guidance

Thank you for helping make The Referee better!