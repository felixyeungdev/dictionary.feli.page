module.exports = {
    presets: [require("@felipage/tailwind-feli")],
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/\\@felipage/react-ui/**/*.{js,ts,jsx,tsx}",
    ],
};
