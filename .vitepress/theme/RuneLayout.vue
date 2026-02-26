<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <!-- Hero background decoration for home page -->
    <template #home-hero-before>
      <div class="rune-hero-bg" v-if="frontmatter.layout === 'home'">
        <div class="rune-hero-bg__blur"></div>
        <div class="rune-hero-bg__shape rune-hero-bg__shape--cyan"></div>
        <div class="rune-hero-bg__shape rune-hero-bg__shape--red"></div>
        <div class="rune-hero-bg__shape rune-hero-bg__shape--purple"></div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.rune-hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

/* Blurred background image overlay (like login page) */
.rune-hero-bg__blur {
  position: absolute;
  inset: 0;
  background: url('/assets/background/background-3-blur.webp') center/cover no-repeat;
  opacity: 0.06;
}

.dark .rune-hero-bg__blur {
  opacity: 0.03;
}

/* Cyan circle (top right) — matches Paper gradient cyan decoration */
.rune-hero-bg__shape--cyan {
  position: absolute;
  top: -80px;
  right: -120px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 184, 217, 0.12) 0%, transparent 70%);
}

/* Red/orange shape (bottom left) — matches Paper gradient red decoration */
.rune-hero-bg__shape--red {
  position: absolute;
  bottom: -60px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 86, 48, 0.06) 0%, transparent 70%);
}

/* Purple glow (center) — primary brand */
.rune-hero-bg__shape--purple {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(105, 80, 232, 0.06) 0%, transparent 60%);
}

.dark .rune-hero-bg__shape--cyan {
  background: radial-gradient(circle, rgba(0, 184, 217, 0.06) 0%, transparent 70%);
}

.dark .rune-hero-bg__shape--red {
  background: radial-gradient(circle, rgba(255, 86, 48, 0.03) 0%, transparent 70%);
}

.dark .rune-hero-bg__shape--purple {
  background: radial-gradient(circle, rgba(105, 80, 232, 0.04) 0%, transparent 60%);
}
</style>
