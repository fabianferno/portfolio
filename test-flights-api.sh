#!/bin/bash
# Test script for flights API endpoint

set -e

echo "🧪 Testing Flights API Endpoint"
echo "================================"
echo ""

# Start dev server in background
echo "Starting dev server..."
pnpm dev > /tmp/flights-test.log 2>&1 &
DEV_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
for i in {1..30}; do
  if curl -s http://localhost:3000/api/flights > /dev/null 2>&1; then
    echo "✅ Server is ready"
    break
  fi
  sleep 1
done

echo ""
echo "Test 1: Without GitHub token (should use fallback)"
echo "---------------------------------------------------"
RESPONSE=$(curl -s http://localhost:3000/api/flights)
GENERATED_AT=$(echo "$RESPONSE" | jq -r '.generatedAt')
TOTAL_SEGMENTS=$(echo "$RESPONSE" | jq -r '.stats.totalSegments')

echo "Generated At: $GENERATED_AT"
echo "Total Segments: $TOTAL_SEGMENTS"

if [ "$TOTAL_SEGMENTS" -eq 63 ]; then
  echo "✅ Fallback data loaded correctly"
else
  echo "❌ Expected 63 segments, got $TOTAL_SEGMENTS"
  kill $DEV_PID
  exit 1
fi

echo ""
echo "Test 2: Verify page renders"
echo "----------------------------"
PAGE_RESPONSE=$(curl -s http://localhost:3000/flights)
if echo "$PAGE_RESPONSE" | grep -q "Segments"; then
  echo "✅ Page renders successfully"
else
  echo "❌ Page does not contain expected content"
  kill $DEV_PID
  exit 1
fi

echo ""
echo "Test 3: Verify API caching headers"
echo "-----------------------------------"
CACHE_HEADER=$(curl -s -I http://localhost:3000/api/flights | grep -i cache-control)
echo "Cache-Control: $CACHE_HEADER"
if echo "$CACHE_HEADER" | grep -q "s-maxage"; then
  echo "✅ Caching headers present"
else
  echo "❌ Caching headers missing"
  kill $DEV_PID
  exit 1
fi

echo ""
echo "Cleaning up..."
kill $DEV_PID
wait $DEV_PID 2>/dev/null || true

echo ""
echo "✅ All tests passed!"
