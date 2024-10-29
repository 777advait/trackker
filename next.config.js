/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    /**
     * Disable type checking since eslint handles this for us.
     */
    ignoreBuildErrors: true,
  },
  eslint: {
    /**
     * Warnings are shown by default in the console. Errors are not.
     */
    ignoreDuringBuilds: true,
  },
};

export default config;
