# Flights Page Implementation

## Overview

The flights page loads current flight data from the private `fabianferno/flights` repository at request time, instead of using a frozen build-time snapshot.

## Architecture

### API Route: `/api/flights`

Located at `src/pages/api/flights.ts`, this server-side endpoint:

1. **Authenticates with GitHub** using the `GITHUB_TOKEN` environment variable
2. **Fetches** `fabian-flight-history.json` from the private `fabianferno/flights` repository
3. **Decodes** Base64 content from the GitHub API
4. **Returns** parsed JSON to the client
5. **Falls back** to bundled static snapshot (`src/data/flights.json`) when:
   - Token is not configured
   - GitHub API request fails
   - Network errors occur

### Flights Page: `/flights`

Located at `src/pages/flights.tsx`, this page:

1. Uses **Server-Side Rendering** (SSR) via `getServerSideProps`
2. Fetches data from `/api/flights` at request time
3. Preserves existing UI and functionality
4. The static JSON file is kept only for fallback in the API route

## Environment Setup

### Required Environment Variable

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Token Requirements:**
- Must have read access to the private `fabianferno/flights` repository
- Can use a personal access token (classic) with `repo` scope, or
- Fine-grained token with read-only access to the flights repository

### Deployment

1. **Vercel/Netlify**: Add `GITHUB_TOKEN` to environment variables in the dashboard
2. **Docker**: Pass as environment variable in `docker run` or `docker-compose.yml`
3. **Local Development**: Add to `.env.local` (not committed to git)

## Caching Strategy

- **With GitHub token**: 
  - `s-maxage=600` (10 minutes CDN cache)
  - `stale-while-revalidate=3600` (1 hour stale-while-revalidate)
  
- **Without token or on error**:
  - `s-maxage=3600` (1 hour CDN cache)
  - `stale-while-revalidate=86400` (24 hours stale-while-revalidate)

## Testing

### Without Token
```bash
# Start dev server
pnpm dev

# Test API (should return fallback data from Sept 17, 2026)
curl http://localhost:3000/api/flights | jq '.generatedAt'

# Test page rendering
curl http://localhost:3000/flights
```

### With Token
```bash
# Set token
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Start dev server
pnpm dev

# Test API (should return latest data from Oct 1, 2026)
curl http://localhost:3000/api/flights | jq '.generatedAt'
```

## Data Source

- **Repository**: `fabianferno/flights` (private)
- **File**: `fabian-flight-history.json`
- **Update Frequency**: Monthly (via Mailman automation)
- **Latest Update**: Oct 1, 2026
- **Current Segments**: 63 flights

## Graceful Degradation

The implementation prioritizes availability over freshness:

1. **No token**: Serves bundled snapshot with warning log
2. **API error**: Serves bundled snapshot with error log
3. **Network timeout**: Serves bundled snapshot with error log
4. **Invalid JSON**: Serves bundled snapshot with error log

This ensures the flights page always renders, even if:
- The GitHub token expires
- The flights repository is temporarily unavailable
- GitHub API rate limits are hit
- Network connectivity issues occur

## Files Changed

- ✅ `src/pages/api/flights.ts` - New API route
- ✅ `src/pages/flights.tsx` - Converted to SSR
- 📄 `src/data/flights.json` - Kept as fallback (unchanged)
