/**
 * The Referee - Main comparison engine
 * Analyzes options and provides detailed trade-off comparisons
 */

export class Referee {
  constructor() {
    this.comparisonStrategies = {
      'api': this.compareAPIs.bind(this),
      'cloud-service': this.compareCloudServices.bind(this),
      'tech-stack': this.compareTechStacks.bind(this),
      'framework': this.compareFrameworks.bind(this)
    };
  }

  /**
   * Main comparison method
   * @param {Object} options - Comparison configuration
   * @returns {Object} Detailed comparison results
   */
  async compare(options) {
    const { type, items, constraints = {}, weights = {} } = options;
    
    if (!this.comparisonStrategies[type]) {
      throw new Error(`Comparison type '${type}' not supported`);
    }

    const strategy = this.comparisonStrategies[type];
    const results = await strategy(items, constraints, weights);
    
    return {
      type,
      items,
      constraints,
      results,
      recommendation: this.generateRecommendation(results),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Compare different APIs
   */
  compareAPIs(apis, constraints, weights) {
    const criteria = ['performance', 'ease_of_use', 'documentation', 'cost', 'scalability', 'community'];
    
    return apis.map(api => {
      const scores = this.calculateAPIScores(api, constraints);
      return {
        name: api,
        scores,
        pros: this.getAPIPros(api),
        cons: this.getAPICons(api),
        bestFor: this.getAPIBestUseCase(api),
        overallScore: this.calculateWeightedScore(scores, weights)
      };
    });
  }

  /**
   * Compare cloud services
   */
  compareCloudServices(services, constraints, weights) {
    const criteria = ['cost', 'performance', 'reliability', 'features', 'support', 'integration'];
    
    return services.map(service => {
      const scores = this.calculateCloudScores(service, constraints);
      return {
        name: service,
        scores,
        pros: this.getCloudPros(service),
        cons: this.getCloudCons(service),
        bestFor: this.getCloudBestUseCase(service),
        overallScore: this.calculateWeightedScore(scores, weights)
      };
    });
  }

  /**
   * Compare tech stacks
   */
  compareTechStacks(stacks, constraints, weights) {
    const criteria = ['learning_curve', 'performance', 'ecosystem', 'job_market', 'maintenance', 'scalability'];
    
    return stacks.map(stack => {
      const scores = this.calculateTechStackScores(stack, constraints);
      return {
        name: stack,
        scores,
        pros: this.getTechStackPros(stack),
        cons: this.getTechStackCons(stack),
        bestFor: this.getTechStackBestUseCase(stack),
        overallScore: this.calculateWeightedScore(scores, weights)
      };
    });
  }

  /**
   * Compare frameworks
   */
  compareFrameworks(frameworks, constraints, weights) {
    const criteria = ['performance', 'bundle_size', 'learning_curve', 'community', 'job_opportunities', 'flexibility'];
    
    return frameworks.map(framework => {
      const scores = this.calculateFrameworkScores(framework, constraints);
      return {
        name: framework,
        scores,
        pros: this.getFrameworkPros(framework),
        cons: this.getFrameworkCons(framework),
        bestFor: this.getFrameworkBestUseCase(framework),
        overallScore: this.calculateWeightedScore(scores, weights)
      };
    });
  }

  /**
   * Generate final recommendation based on comparison results
   */
  generateRecommendation(results) {
    const sorted = results.sort((a, b) => b.overallScore - a.overallScore);
    const winner = sorted[0];
    const runnerUp = sorted[1];

    return {
      recommended: winner.name,
      confidence: this.calculateConfidence(winner, runnerUp),
      reasoning: this.generateReasoning(winner, runnerUp),
      alternatives: sorted.slice(1, 3).map(item => ({
        name: item.name,
        reason: `Consider if ${this.getAlternativeReason(item)}`
      }))
    };
  }

  /**
   * Calculate weighted score based on criteria weights
   */
  calculateWeightedScore(scores, weights) {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0) || 1;
    
    return Object.entries(scores).reduce((total, [criterion, score]) => {
      const weight = weights[criterion] || 1;
      return total + (score * weight / totalWeight);
    }, 0);
  }

  /**
   * Calculate confidence level in recommendation
   */
  calculateConfidence(winner, runnerUp) {
    if (!runnerUp) return 'high';
    
    const scoreDiff = winner.overallScore - runnerUp.overallScore;
    if (scoreDiff > 0.3) return 'high';
    if (scoreDiff > 0.15) return 'medium';
    return 'low';
  }

  /**
   * Generate reasoning for the recommendation
   */
  generateReasoning(winner, runnerUp) {
    const strengths = Object.entries(winner.scores)
      .filter(([_, score]) => score > 0.7)
      .map(([criterion, _]) => criterion);

    let reasoning = `${winner.name} is recommended because it excels in: ${strengths.join(', ')}.`;
    
    if (runnerUp && winner.overallScore - runnerUp.overallScore < 0.2) {
      reasoning += ` However, ${runnerUp.name} is a close second and might be better if your priorities change.`;
    }

    return reasoning;
  }

  // Scoring methods for different comparison types
  calculateAPIScores(api, constraints) {
    // Simplified scoring logic - in real implementation, this would use actual data
    const baseScores = {
      'REST': { performance: 0.7, ease_of_use: 0.9, documentation: 0.8, cost: 0.9, scalability: 0.6, community: 0.9 },
      'GraphQL': { performance: 0.8, ease_of_use: 0.6, documentation: 0.7, cost: 0.8, scalability: 0.8, community: 0.7 },
      'gRPC': { performance: 0.9, ease_of_use: 0.5, documentation: 0.6, cost: 0.7, scalability: 0.9, community: 0.6 }
    };
    
    return baseScores[api] || {};
  }

  calculateCloudScores(service, constraints) {
    const baseScores = {
      'AWS': { cost: 0.6, performance: 0.9, reliability: 0.9, features: 0.9, support: 0.8, integration: 0.9 },
      'Azure': { cost: 0.7, performance: 0.8, reliability: 0.8, features: 0.8, support: 0.9, integration: 0.8 },
      'GCP': { cost: 0.8, performance: 0.8, reliability: 0.8, features: 0.7, support: 0.7, integration: 0.7 }
    };
    
    return baseScores[service] || {};
  }

  calculateTechStackScores(stack, constraints) {
    const baseScores = {
      'MEAN': { learning_curve: 0.7, performance: 0.7, ecosystem: 0.8, job_market: 0.8, maintenance: 0.7, scalability: 0.8 },
      'MERN': { learning_curve: 0.8, performance: 0.8, ecosystem: 0.9, job_market: 0.9, maintenance: 0.8, scalability: 0.8 },
      'Django': { learning_curve: 0.6, performance: 0.7, ecosystem: 0.7, job_market: 0.7, maintenance: 0.8, scalability: 0.7 }
    };
    
    return baseScores[stack] || {};
  }

  calculateFrameworkScores(framework, constraints) {
    const baseScores = {
      'React': { performance: 0.8, bundle_size: 0.6, learning_curve: 0.7, community: 0.9, job_opportunities: 0.9, flexibility: 0.8 },
      'Vue': { performance: 0.8, bundle_size: 0.8, learning_curve: 0.9, community: 0.7, job_opportunities: 0.7, flexibility: 0.7 },
      'Angular': { performance: 0.7, bundle_size: 0.5, learning_curve: 0.5, community: 0.8, job_opportunities: 0.8, flexibility: 0.6 }
    };
    
    return baseScores[framework] || {};
  }

  // Helper methods for pros/cons/use cases
  getAPIPros(api) {
    const pros = {
      'REST': ['Simple and intuitive', 'Great caching support', 'Wide adoption', 'HTTP-based'],
      'GraphQL': ['Single endpoint', 'Flexible queries', 'Strong typing', 'Real-time subscriptions'],
      'gRPC': ['High performance', 'Binary protocol', 'Streaming support', 'Language agnostic']
    };
    return pros[api] || [];
  }

  getAPICons(api) {
    const cons = {
      'REST': ['Over-fetching data', 'Multiple endpoints', 'Versioning challenges'],
      'GraphQL': ['Learning curve', 'Caching complexity', 'Query complexity'],
      'gRPC': ['Limited browser support', 'Debugging difficulty', 'Steep learning curve']
    };
    return cons[api] || [];
  }

  getAPIBestUseCase(api) {
    const useCases = {
      'REST': 'Simple CRUD operations and public APIs',
      'GraphQL': 'Complex data relationships and mobile applications',
      'gRPC': 'Microservices and high-performance internal APIs'
    };
    return useCases[api] || 'General purpose applications';
  }

  getCloudPros(service) {
    const pros = {
      'AWS': ['Largest service portfolio', 'Global infrastructure', 'Mature ecosystem'],
      'Azure': ['Microsoft integration', 'Hybrid cloud support', 'Enterprise focus'],
      'GCP': ['Competitive pricing', 'Strong AI/ML services', 'Kubernetes native']
    };
    return pros[service] || [];
  }

  getCloudCons(service) {
    const cons = {
      'AWS': ['Complex pricing', 'Steep learning curve', 'Can be expensive'],
      'Azure': ['Inconsistent UI', 'Service gaps', 'Windows-centric'],
      'GCP': ['Smaller ecosystem', 'Limited enterprise features', 'Fewer regions']
    };
    return cons[service] || [];
  }

  getCloudBestUseCase(service) {
    const useCases = {
      'AWS': 'Large-scale applications with diverse requirements',
      'Azure': 'Enterprise applications with Microsoft stack',
      'GCP': 'Data analytics and machine learning workloads'
    };
    return useCases[service] || 'General cloud computing needs';
  }

  getTechStackPros(stack) {
    const pros = {
      'MEAN': ['JavaScript everywhere', 'JSON throughout', 'Active community'],
      'MERN': ['React popularity', 'Component reusability', 'Strong ecosystem'],
      'Django': ['Rapid development', 'Built-in admin', 'Security features']
    };
    return pros[stack] || [];
  }

  getTechStackCons(stack) {
    const cons = {
      'MEAN': ['Angular complexity', 'Frequent updates', 'Performance concerns'],
      'MERN': ['JSX learning curve', 'Rapid ecosystem changes', 'SEO challenges'],
      'Django': ['Monolithic structure', 'Python performance', 'Template limitations']
    };
    return cons[stack] || [];
  }

  getTechStackBestUseCase(stack) {
    const useCases = {
      'MEAN': 'Enterprise applications with complex requirements',
      'MERN': 'Modern web applications with rich UIs',
      'Django': 'Content-heavy websites and rapid prototyping'
    };
    return useCases[stack] || 'Web application development';
  }

  getFrameworkPros(framework) {
    const pros = {
      'React': ['Large ecosystem', 'Job market', 'Flexibility', 'Meta backing'],
      'Vue': ['Gentle learning curve', 'Great documentation', 'Progressive adoption'],
      'Angular': ['Full framework', 'TypeScript native', 'Enterprise ready']
    };
    return pros[framework] || [];
  }

  getFrameworkCons(framework) {
    const cons = {
      'React': ['Rapid changes', 'JSX complexity', 'Tooling overhead'],
      'Vue': ['Smaller ecosystem', 'Fewer job opportunities', 'Single maintainer risk'],
      'Angular': ['Steep learning curve', 'Verbose syntax', 'Large bundle size']
    };
    return cons[framework] || [];
  }

  getFrameworkBestUseCase(framework) {
    const useCases = {
      'React': 'Complex applications with dynamic UIs',
      'Vue': 'Progressive enhancement and small to medium apps',
      'Angular': 'Large enterprise applications'
    };
    return useCases[framework] || 'Frontend development';
  }

  getAlternativeReason(item) {
    // Generate contextual reasons for alternatives
    const topCriteria = Object.entries(item.scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([criterion, _]) => criterion);
    
    return `${topCriteria.join(' and ')} are your top priorities`;
  }
}

export default Referee;