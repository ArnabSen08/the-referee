/**
 * Tests for The Referee comparison engine
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Referee } from '../src/index.js';

describe('The Referee', () => {
  const referee = new Referee();

  test('should create a new Referee instance', () => {
    assert.ok(referee instanceof Referee);
    assert.ok(typeof referee.compare === 'function');
  });

  test('should compare APIs successfully', async () => {
    const result = await referee.compare({
      type: 'api',
      items: ['REST', 'GraphQL'],
      constraints: { performance: 'high' },
      weights: { performance: 3, ease_of_use: 1 }
    });

    assert.ok(result);
    assert.strictEqual(result.type, 'api');
    assert.strictEqual(result.items.length, 2);
    assert.ok(result.results);
    assert.ok(result.recommendation);
    assert.ok(result.timestamp);
  });

  test('should compare cloud services successfully', async () => {
    const result = await referee.compare({
      type: 'cloud-service',
      items: ['AWS', 'Azure', 'GCP'],
      constraints: { budget: 'medium' }
    });

    assert.ok(result);
    assert.strictEqual(result.type, 'cloud-service');
    assert.strictEqual(result.items.length, 3);
    assert.ok(Array.isArray(result.results));
    assert.ok(result.recommendation.recommended);
  });

  test('should compare tech stacks successfully', async () => {
    const result = await referee.compare({
      type: 'tech-stack',
      items: ['MEAN', 'MERN', 'Django']
    });

    assert.ok(result);
    assert.strictEqual(result.type, 'tech-stack');
    assert.ok(result.results.every(item => 
      item.name && item.scores && item.pros && item.cons && item.bestFor
    ));
  });

  test('should compare frameworks successfully', async () => {
    const result = await referee.compare({
      type: 'framework',
      items: ['React', 'Vue', 'Angular'],
      weights: { learning_curve: 3, performance: 2 }
    });

    assert.ok(result);
    assert.strictEqual(result.type, 'framework');
    assert.ok(result.results.every(item => 
      typeof item.overallScore === 'number'
    ));
  });

  test('should throw error for unsupported comparison type', async () => {
    await assert.rejects(
      async () => {
        await referee.compare({
          type: 'unsupported-type',
          items: ['item1', 'item2']
        });
      },
      {
        message: "Comparison type 'unsupported-type' not supported"
      }
    );
  });

  test('should generate meaningful recommendations', async () => {
    const result = await referee.compare({
      type: 'api',
      items: ['REST', 'GraphQL', 'gRPC'],
      weights: { performance: 5, ease_of_use: 1 }
    });

    assert.ok(result.recommendation.recommended);
    assert.ok(['high', 'medium', 'low'].includes(result.recommendation.confidence));
    assert.ok(result.recommendation.reasoning);
    assert.ok(Array.isArray(result.recommendation.alternatives));
  });

  test('should calculate weighted scores correctly', () => {
    const scores = { performance: 0.8, ease_of_use: 0.6, cost: 0.9 };
    const weights = { performance: 3, ease_of_use: 1, cost: 2 };
    
    const weightedScore = referee.calculateWeightedScore(scores, weights);
    
    // Expected: (0.8*3 + 0.6*1 + 0.9*2) / (3+1+2) = 4.8/6 = 0.8
    assert.ok(Math.abs(weightedScore - 0.8) < 0.01);
  });

  test('should handle empty weights gracefully', () => {
    const scores = { performance: 0.8, ease_of_use: 0.6 };
    const weights = {};
    
    const weightedScore = referee.calculateWeightedScore(scores, weights);
    
    // Should use equal weights when none provided
    assert.ok(typeof weightedScore === 'number');
    assert.ok(weightedScore >= 0 && weightedScore <= 1);
  });

  test('should provide pros and cons for each option', async () => {
    const result = await referee.compare({
      type: 'api',
      items: ['REST', 'GraphQL']
    });

    result.results.forEach(item => {
      assert.ok(Array.isArray(item.pros));
      assert.ok(Array.isArray(item.cons));
      assert.ok(item.pros.length > 0);
      assert.ok(item.cons.length > 0);
      assert.ok(typeof item.bestFor === 'string');
    });
  });

  test('should calculate confidence levels correctly', () => {
    const winner = { overallScore: 0.8 };
    const runnerUp = { overallScore: 0.4 };
    
    const confidence = referee.calculateConfidence(winner, runnerUp);
    assert.strictEqual(confidence, 'high');
    
    const closeRunnerUp = { overallScore: 0.75 };
    const closeConfidence = referee.calculateConfidence(winner, closeRunnerUp);
    assert.strictEqual(closeConfidence, 'low');
  });
});