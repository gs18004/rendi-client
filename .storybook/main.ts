import { resolve, dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.publicDir = resolve(__dirname, '../public');
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': resolve(__dirname, '../src'),
    };
    return config;
  },
};
export default config;
