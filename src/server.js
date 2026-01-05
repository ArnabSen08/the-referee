/**
 * Express server for The Referee API
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Referee } from './index.js';

const app = express();
const port = process.env.PORT || 3000;
const referee = new Referee();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({
    name: 'The Referee API',
    version: '1.0.0',
    description: 'Smart comparison tool for making informed decisions',
    endpoints: {
      '/compare': 'POST - Compare options with trade-off analysis',
      '/health': 'GET - Health check endpoint'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/compare', async (req, res) => {
  try {
    const { type, items, constraints, weights } = req.body;
    
    if (!type || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error: 'Invalid request. Required: type (string), items (array)'
      });
    }

    const result = await referee.compare({
      type,
      items,
      constraints: constraints || {},
      weights: weights || {}
    });

    res.json(result);
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({
      error: 'Comparison failed',
      message: error.message
    });
  }
});

// Example endpoints for quick testing
app.get('/examples/api-comparison', async (req, res) => {
  try {
    const result = await referee.compare({
      type: 'api',
      items: ['REST', 'GraphQL', 'gRPC'],
      constraints: {
        performance: 'high',
        complexity: 'medium'
      },
      weights: {
        performance: 3,
        ease_of_use: 2,
        documentation: 1
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/examples/cloud-comparison', async (req, res) => {
  try {
    const result = await referee.compare({
      type: 'cloud-service',
      items: ['AWS', 'Azure', 'GCP'],
      constraints: {
        budget: 'medium',
        scale: 'enterprise'
      },
      weights: {
        cost: 2,
        performance: 3,
        reliability: 3,
        support: 2
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/examples/framework-comparison', async (req, res) => {
  try {
    const result = await referee.compare({
      type: 'framework',
      items: ['React', 'Vue', 'Angular'],
      constraints: {
        team_size: 'small',
        project_complexity: 'medium'
      },
      weights: {
        learning_curve: 3,
        performance: 2,
        job_opportunities: 2,
        community: 1
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: ['/', '/compare', '/health', '/examples/*']
  });
});

app.listen(port, () => {
  console.log(`🏆 The Referee API is running on port ${port}`);
  console.log(`📊 Ready to help you make informed decisions!`);
  console.log(`🔗 Visit http://localhost:${port} to get started`);
});

export default app;