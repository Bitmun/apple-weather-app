const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@/": path.resolve(__dirname, "src"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
};
