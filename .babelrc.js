/**
 * Babel config — required for the StyleX compile-time transform.
 * Note: using Babel opts us out of SWC (and next/font), so fonts are
 * self-hosted via @fontsource instead.
 */
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        aliases: {
          "@/*": [require("path").join(__dirname, "src", "*")],
        },
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: __dirname,
        },
      },
    ],
  ],
};
