/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1e3a5f', 
          DEFAULT: '#2c5282',
        },
        risk: {
          low: '#48bb78',    
          medium: '#ed8936', 
          high: '#e53e3e',   
        },
        background: {
          DEFAULT: '#f7fafc',
          card: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}