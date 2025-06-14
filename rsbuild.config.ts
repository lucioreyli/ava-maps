import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  html: { title: 'Avalon Maps' },
  output: { assetPrefix: 'ava-maps' },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          autoCodeSplitting: true,
          target: 'react',
          verboseFileRoutes: false,
        }),
      ],
    },
  },
});
