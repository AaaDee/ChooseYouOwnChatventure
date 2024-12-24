import { vi } from 'vitest';

export function suppressErrorLogsFromTest() {
  vi.spyOn(global.console, 'error').mockImplementation(() => {});
}
