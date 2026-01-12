import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: { title: 'Avalon Maps' },
  output: { assetPrefix: '/ava-maps/' },
  server: { base: '/ava-maps/' },
});
