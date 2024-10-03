module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // 扫描 src 文件夹中的所有 JSX/JS 组件文件
    './public/**/*.html',  // 扫描 public 文件夹中的所有 HTML 文件
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0c50d',  // 自定义主要颜色（例如按钮、焦点）
        secondary: '#3a2920',  // 自定义侧边栏背景颜色
        hoverRed: '#f44336',  // 删除按钮的 hover 颜色
        hoverGreen: '#4CAF50',  // 图标 hover 的绿色效果
        dark: '#111',  // 用于暗色背景
        light: '#fff',  // 用于浅色字体
        black: '#000', // 自定义黑色背景
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],  // 自定义字体使用 Poppins
      },
      spacing: {
        128: '32rem',  // 额外的宽度/高度定义
        70: '17.5rem',  // 为 Heart 图标悬停提供的定位空间
      },
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',  // 中等阴影效果，用于搜索框等元素
      },
      fontSize: {
        xs: '0.75rem',  // 超小的字体
        sm: '0.875rem',  // 较小的字体
        md: '1rem',  // 常规字体
        lg: '1.125rem',  // 较大的字体
        xl: '1.25rem',  // 更大的字体
        '2xl': '1.5rem',  // 超大字体
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInSlide: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.8s ease-in-out',
        fadeIn: 'fadeIn 1.2s forwards',
        fadeInSlide: 'fadeInSlide 1s forwards',
      },
      screens: {
        'max-md': {'max': '768px'},  // 用于最大屏幕宽度为 md 尺寸的设备
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // 插件用于改进表单的样式
  ],
};
