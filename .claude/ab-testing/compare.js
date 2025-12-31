#!/usr/bin/env node

/**
 * A/B Testing Framework for Workspace Templates
 *
 * Compares different workspace template configurations to determine
 * which setup produces better outcomes.
 *
 * Usage:
 *   node compare.js --scenario <file> --variants <variant1,variant2>
 *   node compare.js --suite all --variants <variant1,variant2>
 *   node compare.js --report <results-file>
 */

const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

// Simple YAML parser (or install js-yaml: npm install js-yaml)
function loadYaml(file) {
  const fullPath = path.resolve(file);
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Simple YAML parser for basic files
  // For production, use: const yaml = require('js-yaml'); return yaml.load(content);
  try {
    // Try to parse as JSON first (YAML is a superset of JSON)
    return JSON.parse(content);
  } catch {
    // Basic YAML parsing (very limited - install js-yaml for real use)
    console.warn(`Warning: Using basic YAML parser. Install js-yaml for full support.`);
    console.warn(`  npm install js-yaml`);
    return parseBasicYaml(content);
  }
}

function parseBasicYaml(content) {
  // Very basic YAML parser - only handles simple key: value pairs
  const obj = {};
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      obj[key] = value.replace(/^["'](.*)["']$/, '$1');
    }
  }

  return obj;
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = parseArgs(args);

// Main execution
async function main() {
  if (options.report) {
    generateReport(options.report);
    return;
  }

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.variants || options.variants.length < 2) {
    console.error('Error: Must specify at least 2 variants to compare');
    console.error('Usage: node compare.js --variants baseline.yml,variant-b.yml');
    process.exit(1);
  }

  if (options.suite) {
    await runSuite(options.suite, options.variants);
  } else if (options.scenario) {
    await runScenario(options.scenario, options.variants);
  } else {
    console.error('Error: Must specify --scenario or --suite');
    process.exit(1);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const options = {
    scenario: null,
    variants: [],
    suite: null,
    report: null,
    output: null,
    iterations: 1,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--scenario' || arg === '-s') {
      options.scenario = args[++i];
    } else if (arg === '--variants' || arg === '-v') {
      options.variants = args[++i].split(',');
    } else if (arg === '--suite') {
      options.suite = args[++i];
    } else if (arg === '--report' || arg === '-r') {
      options.report = args[++i];
    } else if (arg === '--output' || arg === '-o') {
      options.output = args[++i];
    } else if (arg === '--iterations' || arg === '-i') {
      options.iterations = parseInt(args[++i]);
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
A/B Testing Framework for Workspace Templates

Usage:
  node compare.js --scenario <file> --variants <variant1,variant2> [options]
  node compare.js --suite <suite-name> --variants <variant1,variant2> [options]
  node compare.js --report <results-file>

Options:
  -s, --scenario <file>        Scenario file to run
  -v, --variants <list>        Comma-separated list of variant files
  --suite <name>               Run test suite (all, critical, quick)
  -r, --report <file>          Generate report from results file
  -o, --output <file>          Output file for results
  -i, --iterations <n>         Number of iterations per test (default: 1)
  -h, --help                   Show this help message

Examples:
  # Run single scenario
  node compare.js -s scenarios/component-gen.yml -v baseline.yml,variant-b.yml

  # Run full suite
  node compare.js --suite all -v baseline.yml,variant-b.yml

  # Generate report
  node compare.js --report results/2025-01-15-component-gen.json

Installation:
  npm install js-yaml  # For full YAML support
  `);
}

/**
 * Run a single scenario against multiple variants
 */
async function runScenario(scenarioFile, variantFiles) {
  console.log(`\n🧪 Running A/B Test\n`);
  console.log(`Scenario: ${scenarioFile}`);
  console.log(`Variants: ${variantFiles.join(', ')}\n`);

  // Load scenario
  const scenario = loadYaml(scenarioFile);
  console.log(`📋 Scenario: ${scenario.name || 'Unnamed'}`);
  console.log(`   ${scenario.description || 'No description'}\n`);

  // Load variants
  const variants = variantFiles.map(file => ({
    file,
    config: loadYaml(file)
  }));

  // Results container
  const results = {
    timestamp: new Date().toISOString(),
    scenario: scenario.name,
    scenario_file: scenarioFile,
    variants: {}
  };

  // Run test for each variant
  for (const variant of variants) {
    console.log(`\n🔬 Testing: ${variant.config.name}`);
    console.log(`   ${variant.config.description}`);

    const result = await testVariant(scenario, variant.config);
    results.variants[variant.file] = result;

    // Print summary
    console.log(`\n   Score: ${result.score.toFixed(2)}/10`);
    console.log(`   Time: ${result.time_seconds}s`);
    console.log(`   Status: ${result.pass ? '✅ PASS' : '❌ FAIL'}`);
  }

  // Calculate winner
  const winner = determineWinner(results);
  results.winner = winner.variant;
  results.improvement = winner.improvement;

  // Print final comparison
  printComparison(results);

  // Save results
  if (options.output) {
    saveResults(results, options.output);
  }

  return results;
}

/**
 * Run a test suite (multiple scenarios)
 */
async function runSuite(suiteName, variantFiles) {
  console.log(`\n🧪 Running Test Suite: ${suiteName}\n`);

  const scenarios = getSuiteScenarios(suiteName);
  const allResults = [];

  for (const scenarioFile of scenarios) {
    const result = await runScenario(scenarioFile, variantFiles);
    allResults.push(result);
  }

  // Print suite summary
  printSuiteSummary(allResults);

  // Save results
  if (options.output) {
    saveResults(allResults, options.output);
  }
}

/**
 * Test a variant against a scenario
 */
async function testVariant(scenario, variantConfig) {
  const startTime = Date.now();

  // Apply variant configuration
  await applyVariantConfig(variantConfig);

  // Execute the scenario (stub implementation)
  const output = await executeScenario(scenario);

  // Evaluate results
  const metrics = await evaluateMetrics(scenario, output);
  const score = calculateScore(metrics, scenario.evaluation || { metrics: [] });
  const pass = checkPassCriteria(metrics, scenario.pass_criteria);

  const endTime = Date.now();

  return {
    variant: variantConfig.name,
    score,
    metrics,
    time_seconds: Math.round((endTime - startTime) / 1000),
    pass,
    output_length: output ? output.length : 0
  };
}

/**
 * Execute scenario (stub - to be implemented based on actual needs)
 */
async function executeScenario(scenario) {
  console.log(`   Executing scenario...`);

  // This is a stub implementation
  // In real usage, you would:
  // 1. For code_generation: Run Claude Code to generate code
  // 2. For agent_response: Run the agent skill
  // 3. Capture the output

  // For now, return mock output
  console.log(`   ⚠️  Using stub implementation - integrate with Claude Code for real tests`);

  return "Mock output for testing";
}

/**
 * Evaluate metrics for a scenario result
 */
async function evaluateMetrics(scenario, output) {
  const metrics = {};

  if (!scenario.evaluation || !scenario.evaluation.metrics) {
    console.log(`   No metrics defined for scenario`);
    return metrics;
  }

  for (const metric of scenario.evaluation.metrics) {
    console.log(`   Evaluating: ${metric.name}...`);

    let value = 0;

    try {
      if (metric.command) {
        // Parse command to extract executable and args
        value = await runMetricCommand(metric.command);
      } else if (metric.script) {
        value = await runMetricScript(metric.script);
      } else if (metric.method === 'checklist') {
        value = evaluateChecklist(metric.checklist, output);
      } else if (metric.method === 'keyword_analysis') {
        value = evaluateKeywords(metric.keywords, output);
      }
    } catch (error) {
      console.error(`   ❌ Metric evaluation failed: ${error.message}`);
      value = 0;
    }

    metrics[metric.name] = value;
  }

  return metrics;
}

/**
 * Run metric command safely
 */
async function runMetricCommand(command) {
  // Parse command into executable and arguments
  const parts = command.split(/\s+/);
  const executable = parts[0];
  const args = parts.slice(1);

  try {
    // Use execFileSync instead of exec for safety
    const result = execFileSync(executable, args, {
      encoding: 'utf-8',
      timeout: 30000,
      maxBuffer: 1024 * 1024
    });

    const trimmed = result.trim();
    return parseFloat(trimmed) || 0;
  } catch (error) {
    // Command failed or file doesn't exist yet
    return 0;
  }
}

/**
 * Run metric script safely
 */
async function runMetricScript(script) {
  // Write script to temp file and execute
  const scriptFile = `/tmp/ab-test-metric-${Date.now()}.sh`;

  try {
    fs.writeFileSync(scriptFile, script);
    fs.chmodSync(scriptFile, '755');

    const result = execFileSync('/bin/bash', [scriptFile], {
      encoding: 'utf-8',
      timeout: 30000
    });

    return parseFloat(result.trim()) || 0;
  } catch (error) {
    return 0;
  } finally {
    // Cleanup
    if (fs.existsSync(scriptFile)) {
      fs.unlinkSync(scriptFile);
    }
  }
}

/**
 * Evaluate checklist (for agent response quality)
 */
function evaluateChecklist(checklist, output) {
  if (!output || !checklist) return 0;

  let matchCount = 0;
  for (const item of checklist) {
    // Simple keyword matching (could be more sophisticated)
    const keywords = item.toLowerCase().split(' ').filter(w => w.length > 3);
    const matches = keywords.some(keyword =>
      output.toLowerCase().includes(keyword)
    );
    if (matches) matchCount++;
  }

  return (matchCount / checklist.length) * 10;
}

/**
 * Evaluate based on keyword analysis
 */
function evaluateKeywords(keywords, output) {
  if (!output) return 0;

  const lowerOutput = output.toLowerCase();
  let score = 5; // Base score

  if (keywords.positive) {
    const positiveCount = keywords.positive.filter(kw =>
      lowerOutput.includes(kw.toLowerCase())
    ).length;
    score += positiveCount * 0.5;
  }

  if (keywords.negative) {
    const negativeCount = keywords.negative.filter(kw =>
      lowerOutput.includes(kw.toLowerCase())
    ).length;
    score -= negativeCount * 0.5;
  }

  if (keywords.technical_terms) {
    const techCount = keywords.technical_terms.filter(kw =>
      lowerOutput.includes(kw.toLowerCase())
    ).length;
    score += Math.min(techCount * 0.3, 3);
  }

  return Math.max(0, Math.min(10, score));
}

/**
 * Calculate overall score from metrics
 */
function calculateScore(metrics, evaluation) {
  let totalScore = 0;
  let totalWeight = 0;

  if (!evaluation.metrics || evaluation.metrics.length === 0) {
    return 0;
  }

  for (const metric of evaluation.metrics) {
    const value = metrics[metric.name] || 0;
    const weight = metric.weight || 1;

    // Normalize if inverse (lower is better)
    const normalizedValue = metric.inverse ? (10 - Math.min(value, 10)) : value;

    totalScore += normalizedValue * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? (totalScore / totalWeight) : 0;
}

/**
 * Check if result meets pass criteria
 */
function checkPassCriteria(metrics, criteria) {
  if (!criteria) return true;

  for (const [metricName, condition] of Object.entries(criteria)) {
    const value = metrics[metricName];

    if (typeof condition === 'number') {
      if (value !== condition) return false;
    } else if (typeof condition === 'string') {
      // Parse condition like ">= 7"
      const match = condition.match(/(>=|<=|>|<|=)\s*(\d+)/);
      if (!match) continue;

      const [, operator, threshold] = match;
      const numThreshold = parseFloat(threshold);

      switch (operator) {
        case '>=': if (value < numThreshold) return false; break;
        case '<=': if (value > numThreshold) return false; break;
        case '>': if (value <= numThreshold) return false; break;
        case '<': if (value >= numThreshold) return false; break;
        case '=': if (value !== numThreshold) return false; break;
      }
    }
  }

  return true;
}

/**
 * Determine winner from results
 */
function determineWinner(results) {
  const variants = Object.entries(results.variants);

  if (variants.length === 0) {
    return { variant: 'none', improvement: '0%' };
  }

  variants.sort((a, b) => b[1].score - a[1].score);

  const [winnerName, winnerResult] = variants[0];

  if (variants.length < 2) {
    return { variant: winnerName, improvement: '0%' };
  }

  const [, runnerUpResult] = variants[1];

  const improvement = runnerUpResult.score > 0
    ? ((winnerResult.score - runnerUpResult.score) / runnerUpResult.score) * 100
    : 0;

  return {
    variant: winnerName,
    improvement: `${improvement >= 0 ? '+' : ''}${improvement.toFixed(1)}%`
  };
}

/**
 * Print comparison results
 */
function printComparison(results) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 COMPARISON RESULTS`);
  console.log(`${'='.repeat(60)}\n`);

  console.log(`Scenario: ${results.scenario}`);
  console.log(`Winner: ${results.winner} (${results.improvement})\n`);

  // Print metrics table
  const variants = Object.entries(results.variants);

  if (variants.length === 0) {
    console.log(`No variants tested.`);
    return;
  }

  const metricNames = Object.keys(variants[0][1].metrics);

  console.log(`Metrics Comparison:`);
  for (const metricName of metricNames) {
    const values = variants.map(([name, result]) => ({
      name,
      value: result.metrics[metricName]
    }));

    const [best] = values.sort((a, b) => b.value - a.value);

    console.log(`  ${metricName}:`);
    values.forEach(v => {
      const indicator = v.value === best.value ? '🏆' : '  ';
      console.log(`    ${indicator} ${v.name}: ${v.value.toFixed(2)}`);
    });
  }

  console.log(`\n${'='.repeat(60)}\n`);
}

/**
 * Print suite summary
 */
function printSuiteSummary(results) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 TEST SUITE SUMMARY`);
  console.log(`${'='.repeat(60)}\n`);

  const variantWins = {};

  results.forEach(result => {
    const winner = result.winner;
    variantWins[winner] = (variantWins[winner] || 0) + 1;
  });

  console.log(`Overall Winner:`);
  Object.entries(variantWins)
    .sort((a, b) => b[1] - a[1])
    .forEach(([variant, wins]) => {
      console.log(`  ${variant}: ${wins}/${results.length} scenarios`);
    });

  console.log(`\n${'='.repeat(60)}\n`);
}

/**
 * Generate report from results file
 */
function generateReport(resultsFile) {
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));

  if (Array.isArray(results)) {
    printSuiteSummary(results);
  } else {
    printComparison(results);
  }
}

/**
 * Save results to file
 */
function saveResults(results, outputFile) {
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputFile}`);
}

/**
 * Apply variant configuration (stub - implement based on your needs)
 */
async function applyVariantConfig(config) {
  console.log(`   Applying configuration: ${config.name}`);

  // This is a stub implementation
  // In a real implementation:
  // 1. Backup current config
  // 2. Copy variant files to workspace
  // 3. Update .claude/claude.json
  // 4. Update .cursor/rules
  // 5. Restart any necessary services

  // For now, just log
  console.log(`   ⚠️  Stub: Would apply variant configuration here`);
}

/**
 * Get scenarios for a test suite
 */
function getSuiteScenarios(suiteName) {
  const scenariosDir = path.join(__dirname, 'scenarios');

  if (suiteName === 'all') {
    return fs.readdirSync(scenariosDir)
      .filter(f => f.endsWith('.yml'))
      .map(f => path.join(scenariosDir, f));
  }

  // Define custom suites
  const suites = {
    critical: [
      'component-gen.yml',
      'api-route-quality.yml'
    ],
    quick: [
      'component-gen.yml'
    ]
  };

  const suite = suites[suiteName];
  if (!suite) {
    throw new Error(`Unknown suite: ${suiteName}`);
  }

  return suite.map(f => path.join(scenariosDir, f));
}

// Run main
main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
