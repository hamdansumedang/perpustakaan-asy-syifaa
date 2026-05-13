/* tailwind.config.js */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Islamic Green Jambrud Palette
        'islamic': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Primary Jambrud Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
          950: '#0c2818',
        },
        'jade': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',  // Emerald variant
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      spacing: {
        'islamic-sm': '1rem',
        'islamic-md': '2rem',
        'islamic-lg': '3rem',
      },
      borderRadius: {
        'islamic': '12px',
        'islamic-lg': '16px',
      },
      boxShadow: {
        'islamic': '0 10px 25px rgba(16, 185, 129, 0.1)',
        'islamic-lg': '0 20px 40px rgba(16, 185, 129, 0.15)',
      },
      backgroundImage: {
        'islamic-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 5L61 35L92 35L67 57L78 87L50 65L22 87L33 57L8 35L39 35Z' fill='%2310b98120'/%3E%3C/svg%3E")`,
        'islamic-gradient': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

/* src/styles/theme.js */
export const theme = {
  colors: {
    primary: '#10b981',      // Hijau Jambrud
    primaryDark: '#047857',
    secondary: '#059669',
    light: '#d1fae5',
    dark: '#0f172a',
    background: '#f8fafc',
    text: '#1e293b',
    textLight: '#64748b',
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(16, 185, 129, 0.05)',
    md: '0 4px 6px -1px rgba(16, 185, 129, 0.1)',
    lg: '0 10px 15px -3px rgba(16, 185, 129, 0.1)',
    xl: '0 20px 25px -5px rgba(16, 185, 129, 0.1)',
  }
};

/* src/styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');

:root {
  --color-primary: #10b981;
  --color-primary-dark: #047857;
  --color-secondary: #059669;
  --color-light: #d1fae5;
  --color-dark: #0f172a;
  --color-background: #f8fafc;
  --color-text: #1e293b;
  --color-border: #e2e8f0;
  
  --font-family: 'Roboto', sans-serif;
  
  --shadow-md: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(16, 185, 129, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary-dark);
}

/* Islamic pattern background */
.pattern-bg {
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(16, 185, 129, .05) 35px, rgba(16, 185, 129, .05) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(16, 185, 129, .03) 35px, rgba(16, 185, 129, .03) 70px);
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse-islamic {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.3s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-pulse-islamic {
  animation: pulse-islamic 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
