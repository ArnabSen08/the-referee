/**
 * Usage examples for The Referee
 * Demonstrates different comparison scenarios
 */

import { Referee } from '../src/index.js';

const referee = new Referee();

// Example 1: API Comparison for a new project
async function compareAPIs() {
  console.log('🔍 Comparing APIs for a new e-commerce project...\n');
  
  const result = await referee.compare({
    type: 'api',
    items: ['REST', 'GraphQL', 'gRPC'],
    constraints: {
      team_experience: 'intermediate',
      performance_requirements: 'high',
      client_types: ['web', 'mobile']
    },
    weights: {
      performance: 3,
      ease_of_use: 2,
      documentation: 2,
      scalability: 3,
      community: 1
    }
  });

  console.log(`Recommended: ${result.recommendation.recommended}`);
  console.log(`Confidence: ${result.recommendation.confidence}`);
  console.log(`Reasoning: ${result.recommendation.reasoning}\n`);
  
  result.results.forEach(api => {
    console.log(`${api.name} (Score: ${api.overallScore.toFixed(2)})`);
    console.log(`  Pros: ${api.pros.join(', ')}`);
    console.log(`  Cons: ${api.cons.join(', ')}`);
    console.log(`  Best for: ${api.bestFor}\n`);
  });
}

// Example 2: Cloud Service Comparison for startup
async function compareCloudServices() {
  console.log('☁️ Comparing cloud services for a growing startup...\n');
  
  const result = await referee.compare({
    type: 'cloud-service',
    items: ['AWS', 'Azure', 'GCP'],
    constraints: {
      budget: 'limited',
      team_size: 'small',
      growth_stage: 'startup',
      compliance_needs: 'basic'
    },
    weights: {
      cost: 4,
      ease_of_use: 3,
      performance: 2,
      support: 2,
      features: 1
    }
  });

  console.log(`Recommended: ${result.recommendation.recommended}`);
  console.log(`Confidence: ${result.recommendation.confidence}`);
  console.log(`Reasoning: ${result.recommendation.reasoning}\n`);
  
  result.results.forEach(service => {
    console.log(`${service.name} (Score: ${service.overallScore.toFixed(2)})`);
    console.log(`  Pros: ${service.pros.join(', ')}`);
    console.log(`  Cons: ${service.cons.join(', ')}`);
    console.log(`  Best for: ${service.bestFor}\n`);
  });
}

// Example 3: Frontend Framework Comparison
async function compareFrameworks() {
  console.log('⚛️ Comparing frontend frameworks for a new team...\n');
  
  const result = await referee.compare({
    type: 'framework',
    items: ['React', 'Vue', 'Angular'],
    constraints: {
      team_experience: 'beginner',
      project_timeline: 'tight',
      long_term_maintenance: 'important'
    },
    weights: {
      learning_curve: 4,
      community: 3,
      job_opportunities: 2,
      performance: 2,
      flexibility: 1
    }
  });

  console.log(`Recommended: ${result.recommendation.recommended}`);
  console.log(`Confidence: ${result.recommendation.confidence}`);
  console.log(`Reasoning: ${result.recommendation.reasoning}\n`);
  
  result.results.forEach(framework => {
    console.log(`${framework.name} (Score: ${framework.overallScore.toFixed(2)})`);
    console.log(`  Pros: ${framework.pros.join(', ')}`);
    console.log(`  Cons: ${framework.cons.join(', ')}`);
    console.log(`  Best for: ${framework.bestFor}\n`);
  });
}

// Example 4: Tech Stack Comparison for enterprise project
async function compareTechStacks() {
  console.log('🏗️ Comparing tech stacks for enterprise application...\n');
  
  const result = await referee.compare({
    type: 'tech-stack',
    items: ['MEAN', 'MERN', 'Django'],
    constraints: {
      project_scale: 'enterprise',
      team_expertise: 'mixed',
      time_to_market: 'moderate',
      maintenance_priority: 'high'
    },
    weights: {
      scalability: 4,
      maintenance: 3,
      job_market: 3,
      performance: 2,
      learning_curve: 1
    }
  });

  console.log(`Recommended: ${result.recommendation.recommended}`);
  console.log(`Confidence: ${result.recommendation.confidence}`);
  console.log(`Reasoning: ${result.recommendation.reasoning}\n`);
  
  result.results.forEach(stack => {
    console.log(`${stack.name} (Score: ${stack.overallScore.toFixed(2)})`);
    console.log(`  Pros: ${stack.pros.join(', ')}`);
    console.log(`  Cons: ${stack.cons.join(', ')}`);
    console.log(`  Best for: ${stack.bestFor}\n`);
  });
}

// Run all examples
async function runAllExamples() {
  try {
    await compareAPIs();
    console.log('=' .repeat(60));
    
    await compareCloudServices();
    console.log('=' .repeat(60));
    
    await compareFrameworks();
    console.log('=' .repeat(60));
    
    await compareTechStacks();
    
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Export for use in other files
export {
  compareAPIs,
  compareCloudServices,
  compareFrameworks,
  compareTechStacks,
  runAllExamples
};

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}