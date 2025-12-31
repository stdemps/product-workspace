#!/bin/bash

###
# Pre-commit Quality Gate Hook
#
# This hook runs before commits to enforce:
# 1. Linting standards
# 2. Mobile-first pattern validation (if UI files changed)
# 3. Type checking
#
# Prototype Mode: Set PROTOTYPE_MODE=1 to run checks without failing commit
# Usage: PROTOTYPE_MODE=1 git commit -m "message"
###

set -e

# Check for prototype mode
PROTOTYPE_MODE=${PROTOTYPE_MODE:-0}

if [ "$PROTOTYPE_MODE" = "1" ]; then
  echo "⚡ PROTOTYPE MODE: Running checks without failing commit"
  echo ""
fi

echo "Running pre-commit quality gate..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track if we should fail the commit
SHOULD_FAIL=0

# 1. Run ESLint
echo -e "\n${YELLOW}[1/3] Running ESLint...${NC}"
if npm run lint --silent; then
  echo -e "${GREEN}✓ ESLint passed${NC}"
else
  echo -e "${RED}✗ ESLint failed${NC}"
  if [ "$PROTOTYPE_MODE" = "0" ]; then
    SHOULD_FAIL=1
  else
    echo -e "${BLUE}  (Prototype mode: continuing anyway)${NC}"
  fi
fi

# 2. Check for mobile-first patterns in staged UI files
echo -e "\n${YELLOW}[2/3] Checking mobile-first patterns...${NC}"

# Get list of staged TypeScript/TSX files in components or app directories
STAGED_UI_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(tsx|ts)$' | grep -E '(components/|app/)' || true)

if [ -n "$STAGED_UI_FILES" ]; then
  MOBILE_FIRST_VIOLATIONS=0

  for file in $STAGED_UI_FILES; do
    # Check for desktop-first breakpoint usage (lg: or md: without corresponding mobile-first base)
    # This is a simplified check - you may want to enhance this
    if git diff --cached "$file" | grep -E '^\+.*className.*=.*"[^"]*\b(lg:|md:)[^"]*"' > /dev/null; then
      # Check if the same line has mobile-first base classes
      if ! git diff --cached "$file" | grep -E '^\+.*className.*=.*"[^"]*(w-|h-|p-|m-|text-|flex|grid|block|hidden)[^"]*\b(lg:|md:)[^"]*"' > /dev/null; then
        echo -e "${YELLOW}  ⚠ Potential desktop-first pattern in: $file${NC}"
        echo -e "    Review: Does this component have mobile-first base classes?"
        MOBILE_FIRST_VIOLATIONS=$((MOBILE_FIRST_VIOLATIONS + 1))
      fi
    fi
  done

  if [ $MOBILE_FIRST_VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✓ Mobile-first patterns look good${NC}"
  else
    echo -e "${YELLOW}⚠ Found $MOBILE_FIRST_VIOLATIONS potential mobile-first pattern issues${NC}"
    echo -e "${YELLOW}  This is a warning only - review your responsive patterns${NC}"
  fi
else
  echo -e "${GREEN}✓ No UI files to check${NC}"
fi

# 3. Run TypeScript type checking
echo -e "\n${YELLOW}[3/3] Running TypeScript type check...${NC}"
if npx tsc --noEmit; then
  echo -e "${GREEN}✓ Type check passed${NC}"
else
  echo -e "${RED}✗ Type check failed${NC}"
  if [ "$PROTOTYPE_MODE" = "0" ]; then
    SHOULD_FAIL=1
  else
    echo -e "${BLUE}  (Prototype mode: continuing anyway)${NC}"
  fi
fi

# Summary
echo -e "\n${YELLOW}========================================${NC}"
if [ $SHOULD_FAIL -eq 1 ]; then
  echo -e "${RED}✗ Quality gate FAILED${NC}"
  echo -e "${RED}Please fix the errors above before committing${NC}"
  echo -e "\n${BLUE}Tip: Use PROTOTYPE_MODE=1 git commit to bypass during prototyping${NC}"
  exit 1
else
  if [ "$PROTOTYPE_MODE" = "1" ]; then
    echo -e "${BLUE}⚡ Quality gate completed (PROTOTYPE MODE)${NC}"
    echo -e "${YELLOW}⚠ Some checks failed but commit allowed${NC}"
  else
    echo -e "${GREEN}✓ Quality gate PASSED${NC}"
  fi
  exit 0
fi
