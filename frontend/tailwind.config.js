/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",     // Bright Orange
        secondary: "#FFD600",   // Turmeric Yellow
        accent: "#E63946",      // Red Alert
        cream: "#FFF8F0",       // Warm Cream background
        dark: "#1A1A2E",        // Deep Space Navy
        success: "#06D6A0"      // Fresh Mint green
      },
      fontFamily: {
        display: ["'Baloo 2'", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        roast: ["'Comic Neue'", "cursive", "sans-serif"]
      },
      animation: {
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
