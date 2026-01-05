# The Referee 🏆

A smart comparison tool that helps you make informed decisions by analyzing trade-offs between different options, instead of giving you a single answer.

## What is The Referee?

The Referee is an intelligent decision-making assistant that:
- Compares multiple options side-by-side
- Explains pros and cons for each choice
- Considers your specific constraints and requirements
- Helps you choose the best option for your situation

## Features

- **API Comparison**: Compare different APIs based on performance, cost, features
- **Cloud Service Analysis**: Evaluate cloud providers against your requirements
- **Tech Stack Recommendations**: Get detailed comparisons of frameworks, libraries, and tools
- **Interactive Decision Matrix**: Visual comparison with weighted criteria
- **Constraint-Based Filtering**: Filter options based on your specific needs

## Quick Start

### GitHub Pages Demo (Static)
Visit the live demo: **https://arnabsen08.github.io/the-referee/**

### Local Development (Full API)
```bash
# Clone the repository
git clone https://github.com/ArnabSen08/the-referee.git
cd the-referee

# Install dependencies
npm install

# Start the development server
npm run dev

# Visit http://localhost:3000
```

## Usage Examples

### Compare APIs
```javascript
const comparison = await referee.compare({
  type: 'api',
  options: ['REST', 'GraphQL', 'gRPC'],
  constraints: {
    performance: 'high',
    complexity: 'low',
    team_experience: 'beginner'
  }
});
```

### Tech Stack Decision
```javascript
const recommendation = await referee.analyze({
  type: 'tech-stack',
  project: 'e-commerce-platform',
  requirements: ['scalability', 'rapid-development', 'cost-effective']
});
```

## Built With Kiro

This project was accelerated using Kiro AI assistant, which helped with:
- Rapid prototyping and code generation
- Architecture decisions and best practices
- Testing strategy and implementation
- Documentation and README creation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.