#!/usr/bin/env node

/**
 * Collaborative Multi-Agent Skill
 *
 * Invokes multiple agents in parallel to get comprehensive perspectives,
 * then asks Claude to synthesize them into a cohesive answer.
 *
 * Usage:
 *   /collab "Should I use modals or slide-overs for the settings panel?"
 *   /collab "How should we implement real-time updates in the dashboard?"
 *   /collab "What's the best approach for user onboarding?"
 */

const fs = require('fs');
const path = require('path');

// The three personas live in .claude/agents/*.md, which is also where Claude Code
// discovers them as agents. We read them from there so there is one copy of each
// persona, not two that can drift apart.
const AGENTS = [
  { name: 'Engineer', file: path.join(__dirname, '../../agents/engineer.md') },
  { name: 'Designer', file: path.join(__dirname, '../../agents/designer.md') },
  { name: 'PM', file: path.join(__dirname, '../../agents/pm.md') }
];

// Strip the YAML frontmatter block, leaving just the persona prose.
function stripFrontmatter(text) {
  const match = text.match(/^---\n[\s\S]*?\n---\n/);
  return match ? text.slice(match[0].length).trimStart() : text;
}

function runAgent(agentFile, question) {
  try {
    const persona = stripFrontmatter(fs.readFileSync(agentFile, 'utf-8'));
    return `${persona}\n---\n\n## User Request\n\n${question}\n`;
  } catch (error) {
    return `Error loading agent persona: ${error.message}`;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /collab "your question"');
    console.error('');
    console.error('This skill invokes multiple agents (Engineer, Designer, PM) in parallel');
    console.error('to give you comprehensive perspectives on your question.');
    console.error('');
    console.error('Examples:');
    console.error('  /collab "Should I use modals or slide-overs for settings?"');
    console.error('  /collab "How should we implement real-time dashboard updates?"');
    console.error('  /collab "What\'s the MVP for user authentication?"');
    process.exit(1);
  }

  const question = args.join(' ');

  console.log('# Multi-Agent Collaboration\n');
  console.log(`**Question:** ${question}\n`);
  console.log('---\n');

  // Run all agents in parallel
  console.log('Gathering perspectives from Engineer, Designer, and PM...\n');

  const results = AGENTS.map(agent => ({
    name: agent.name,
    output: runAgent(agent.file, question)
  }));

  // Output all perspectives
  results.forEach((result, index) => {
    console.log(`## ${result.name} Perspective\n`);
    console.log(result.output);

    if (index < results.length - 1) {
      console.log('\n---\n');
    }
  });

  // Ask Claude to synthesize
  console.log('\n---\n');
  console.log('## Synthesis Request\n');
  console.log('Please synthesize these three perspectives into a cohesive recommendation:');
  console.log('1. Identify areas of agreement across perspectives');
  console.log('2. Highlight any tensions or trade-offs between perspectives');
  console.log('3. Provide a clear, actionable recommendation that balances all viewpoints');
  console.log('4. Note any follow-up questions or validation steps needed');
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
