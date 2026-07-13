/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 深海蓝 - 主色
        ocean: {
          50: '#eef4f8',
          100: '#d3e2ec',
          200: '#a8c5d9',
          300: '#7aa5c2',
          400: '#4d7fa3',
          500: '#345f80',
          600: '#294c67',
          700: '#1f3b50',
          800: '#182d3d',
          900: '#0f1f2b',
        },
        // 墨绿色
        pine: {
          50: '#eef3f0',
          100: '#d5e2db',
          200: '#a9c4b6',
          300: '#7aa38f',
          400: '#54826d',
          500: '#3c6553',
          600: '#2f5142',
          700: '#264034',
          800: '#1c3027',
        },
        // 砂岩色
        sand: {
          50: '#faf7f2',
          100: '#f2ebdf',
          200: '#e4d6c1',
          300: '#d2bd9c',
          400: '#bfa176',
          500: '#a8875a',
          600: '#8c6f47',
          700: '#6d563a',
        },
        // 琥珀色 - 少量强调
        amber2: {
          400: '#e0a640',
          500: '#d18f26',
          600: '#b0741c',
        },
        // 日落橙 - 低饱和，仅小面积强调 / hover
        sunset: {
          300: '#e9a878',
          400: '#dd8f57',
          500: '#c9743c',
          600: '#ab5f30',
        },
        // 低饱和湖蓝 - 小面积点缀
        lake: {
          300: '#8fb8bf',
          400: '#6a9ba3',
          500: '#4f818a',
        },
      },
      borderRadius: {
        card: '8px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
