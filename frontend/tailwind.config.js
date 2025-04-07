// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Add other paths if necessary
    ],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 1s ease-in-out', // Define fadeIn animation duration
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }, // Corrected opacity value to 1 instead of 2
          },
        },
      },
    },
    plugins: [require('@tailwindcss/forms')],
  }
  