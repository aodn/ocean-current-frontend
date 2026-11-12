// Vite embeds these values at build time. Enabling a flag requires a new build.
export const featureFlags = {
  gliders: import.meta.env.VITE_ENABLE_GLIDERS === 'true',
};
