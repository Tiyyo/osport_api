import { UserConfig } from 'vitest';

const config: UserConfig | any = {
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)'],
  extensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
