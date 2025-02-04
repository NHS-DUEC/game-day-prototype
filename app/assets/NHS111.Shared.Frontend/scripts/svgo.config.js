module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          removeUselessDefs: false,
          cleanupIDs: false,
        },
      },
    },
  ],
};
