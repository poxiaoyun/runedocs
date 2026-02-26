// Custom VitePress theme extension
// https://vitepress.dev/guide/custom-theme

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import RuneLayout from './RuneLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: RuneLayout,
  enhanceApp({ app, router, siteData }) {
    // Register custom global components here if needed
  },
} satisfies Theme
