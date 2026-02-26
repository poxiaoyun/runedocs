/**
 * Rune Console & BOSS 自动截图脚本
 *
 * 用法：
 *   cd docs
 *   pnpm exec playwright test scripts/capture-screenshots.spec.ts --config scripts/playwright.config.ts
 *
 * 截图输出目录：
 *   docs/public/screenshots/console/
 *   docs/public/screenshots/boss/
 *
 * 前提：服务已运行，账号 admin / password 可以登录
 */

import { test, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://rune.develop.xiaoshiai.cn';
const USERNAME = 'admin';
const PASSWORD = 'password';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONSOLE_SCREENSHOTS_DIR = path.resolve(__dirname, '../public/screenshots/console');
const BOSS_SCREENSHOTS_DIR = path.resolve(__dirname, '../public/screenshots/boss');

// 确保截图输出目录存在
[CONSOLE_SCREENSHOTS_DIR, BOSS_SCREENSHOTS_DIR].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

/** 等待页面主要内容加载完成（避免骨架屏截图） */
async function waitForContent(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
  // 等待常见加载指示器消失
  await page.locator('[role="progressbar"]').waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => {});
  await page.locator('.loading-screen').waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(800); // 额外等待动画完成
}

/** 截图并保存 */
async function shot(page: Page, dir: string, name: string) {
  await waitForContent(page);
  const filePath = path.join(dir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`✅ Captured: ${filePath}`);
}

/** Console 登录 */
async function loginConsole(page: Page) {
  await page.goto(`${BASE_URL}/console`);
  await page.waitForURL(/\/auth\/login|\/console/, { timeout: 15_000 });

  // 如果已经在 console 首页则无需登录
  if (page.url().includes('/console') && !page.url().includes('/auth')) {
    return;
  }

  await page.fill('input[name="username"], input[type="text"]', USERNAME);
  await page.fill('input[name="password"], input[type="password"]', PASSWORD);

  // 图形验证码（如果存在）— 无法自动填写，跳过并记录
  const hasCaptcha = await page.locator('canvas, img[alt*="captcha"], img[alt*="验证码"]').count();
  if (hasCaptcha > 0) {
    console.warn('⚠️  检测到图形验证码，请手动填写后继续（脚本等待 30 秒）');
    await page.waitForTimeout(30_000);
  }

  await page.click('button[type="submit"]');
  await page.waitForURL(/\/console/, { timeout: 20_000 });

  // 如果出现租户选择页
  if (page.url().includes('/select-tenant') || page.url().includes('/auth')) {
    await page.locator('[data-testid="tenant-item"], .tenant-item, li').first().click().catch(() => {});
    await page.waitForURL(/\/console/, { timeout: 10_000 }).catch(() => {});
  }
}

/** BOSS 登录 */
async function loginBoss(page: Page) {
  await page.goto(`${BASE_URL}/boss`);
  await page.waitForURL(/\/auth\/login|\/boss/, { timeout: 15_000 });

  if (page.url().includes('/boss') && !page.url().includes('/auth')) {
    return;
  }

  await page.fill('input[name="username"], input[type="text"]', USERNAME);
  await page.fill('input[name="password"], input[type="password"]', PASSWORD);

  const hasCaptcha = await page.locator('canvas, img[alt*="captcha"], img[alt*="验证码"]').count();
  if (hasCaptcha > 0) {
    console.warn('⚠️  检测到图形验证码，请手动填写后继续（脚本等待 30 秒）');
    await page.waitForTimeout(30_000);
  }

  await page.click('button[type="submit"]');
  await page.waitForURL(/\/boss/, { timeout: 20_000 });
}

// ─────────────────────────────────────────────────────────────────────────────
// Console 截图
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Console 截图', () => {
  test.beforeEach(async ({ page }) => {
    await loginConsole(page);
  });

  test('认证：登录页', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/auth/login`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'auth-login');
  });

  test('首页 / 仪表盘', async ({ page }) => {
    await page.goto(`${BASE_URL}/console`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'dashboard');
  });

  // ── Rune ──────────────────────────────────────────────────────────────────

  test('Rune: 推理服务列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/inferences`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-inference-list');
  });

  test('Rune: 新建推理服务', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/inferences/create`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-inference-create');
  });

  test('Rune: 模型微调列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/finetunes`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-finetune-list');
  });

  test('Rune: 开发环境列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/devenvs`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-devenv-list');
  });

  test('Rune: 应用管理列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/apps`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-app-list');
  });

  test('Rune: 实验管理列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/experiments`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-experiment-list');
  });

  test('Rune: 评测管理列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/evaluations`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-evaluation-list');
  });

  test('Rune: 存储卷列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/storages`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-storage-list');
  });

  test('Rune: 应用市场', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/app-market`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-app-market');
  });

  test('Rune: 工作空间管理', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/rune/workspaces`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'rune-workspaces');
  });

  // ── Moha ──────────────────────────────────────────────────────────────────

  test('Moha: 模型列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/moha/models`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'moha-models');
  });

  test('Moha: 数据集列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/moha/datasets`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'moha-datasets');
  });

  test('Moha: 镜像列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/moha/images`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'moha-images');
  });

  test('Moha: Space 列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/moha/spaces`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'moha-spaces');
  });

  // ── ChatApp ───────────────────────────────────────────────────────────────

  test('ChatApp: 体验页', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/chatapp/experience`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'chatapp-experience');
  });

  test('ChatApp: 调试台', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/chatapp/debug`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'chatapp-debug');
  });

  test('ChatApp: 对比模式', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/chatapp/compare`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'chatapp-compare');
  });

  // ── IAM ───────────────────────────────────────────────────────────────────

  test('IAM: 个人资料', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/iam/profile`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'iam-profile');
  });

  test('IAM: 安全设置', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/iam/security`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'iam-security');
  });

  test('IAM: API Key 管理', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/iam/api-keys`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'iam-api-keys');
  });

  test('IAM: SSH Key 管理', async ({ page }) => {
    await page.goto(`${BASE_URL}/console/iam/ssh-keys`);
    await shot(page, CONSOLE_SCREENSHOTS_DIR, 'iam-ssh-keys');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// BOSS 截图
// ─────────────────────────────────────────────────────────────────────────────

test.describe('BOSS 截图', () => {
  test.beforeEach(async ({ page }) => {
    await loginBoss(page);
  });

  test('BOSS: 仪表盘', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'dashboard');
  });

  // ── IAM ───────────────────────────────────────────────────────────────────

  test('BOSS IAM: 用户列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/iam/users`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'iam-users');
  });

  test('BOSS IAM: 租户列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/iam/tenants`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'iam-tenants');
  });

  // ── Rune ──────────────────────────────────────────────────────────────────

  test('BOSS Rune: 集群列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/clusters`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-clusters');
  });

  test('BOSS Rune: 资源池列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/resource-pools`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-resource-pools');
  });

  test('BOSS Rune: Flavor 列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/flavors`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-flavors');
  });

  test('BOSS Rune: 系统应用', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/systems`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-systems');
  });

  test('BOSS Rune: 系统应用市场', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/system-market`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-system-market');
  });

  test('BOSS Rune: 租户配额', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/rune/tenants`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'rune-tenants');
  });

  // ── Gateway ───────────────────────────────────────────────────────────────

  test('BOSS 网关: 运营数据', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/gateway/operations`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'gateway-operations');
  });

  test('BOSS 网关: API Key', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/gateway/api-keys`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'gateway-api-keys');
  });

  test('BOSS 网关: 渠道管理', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/gateway/channels`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'gateway-channels');
  });

  test('BOSS 网关: 内容审核', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/gateway/moderation`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'gateway-moderation');
  });

  test('BOSS 网关: 审计日志', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/gateway/audit`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'gateway-audit');
  });

  // ── Moha ──────────────────────────────────────────────────────────────────

  test('BOSS Moha: 模型列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/moha/models`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'moha-models');
  });

  test('BOSS Moha: 数据集列表', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/moha/datasets`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'moha-datasets');
  });

  test('BOSS Moha: 镜像同步', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/moha/mirrors`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'moha-mirrors');
  });

  // ── Settings ──────────────────────────────────────────────────────────────

  test('BOSS 设置: 平台设置', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/settings/platform`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'settings-platform');
  });

  test('BOSS 设置: Rune 设置', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/settings/rune`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'settings-rune');
  });

  test('BOSS 设置: Moha 设置', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/settings/moha`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'settings-moha');
  });

  test('BOSS 设置: 系统成员', async ({ page }) => {
    await page.goto(`${BASE_URL}/boss/settings/members`);
    await shot(page, BOSS_SCREENSHOTS_DIR, 'settings-members');
  });
});
