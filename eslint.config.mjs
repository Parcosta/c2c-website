import nextPlugin from "eslint-config-next";

const eslintConfig = [
  { ignores: ["e2e/**", "infra/**"] },
  ...nextPlugin,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];

export default eslintConfig;
