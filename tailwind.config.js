/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        dark: '#121212', // Very dark (almost black) background
        midnight: '#1F1F1F', // Dark gray for surfaces

        // Accent colors
        primary: '#BB86FC', // A soft purple
        secondary: '#03DAC6', // A teal-like color
        accent: '#CF6679', // A muted pink

        // Neutral colors
        gray: {
          100: '#232323', // Dark gray
          200: '#333333', // Medium dark gray
          300: '#444444', // Medium gray
          400: '#B3B3B3', // Light gray for text
          500: '#E0E0E0', // Very light gray for headings and bold text
        },

        // Functional colors for UI elements like alerts and buttons
        success: '#4CAF50', // Green for success states
        info: '#2196F3', // Blue for informational messages
        warning: '#FFC107', // Amber for warnings
        danger: '#F44336', // Red for errors and danger actions
      },
    },
  },
  plugins: [],
}
