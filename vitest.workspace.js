import { defineWorkspace } from 'vitest/config'

// Minimal config to enable vitest in the IDE
export default defineWorkspace([
  './frontend/vitest.config.ts',
  './backend/vitest.config.ts',
])