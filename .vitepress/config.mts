import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

const zhNav = [
  { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
  { text: '认证与授权', link: '/auth/login', activeMatch: '/auth/' },
  { text: 'Console', link: '/console/', activeMatch: '/console/' },
  { text: 'BOSS', link: '/boss/', activeMatch: '/boss/' },
  { text: '参考', link: '/reference/permissions', activeMatch: '/reference/' },
];

const enNav = [
  { text: 'Guide', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
  { text: 'Auth', link: '/en/auth/login', activeMatch: '/en/auth/' },
  { text: 'Console', link: '/en/console/', activeMatch: '/en/console/' },
  { text: 'BOSS', link: '/en/boss/', activeMatch: '/en/boss/' },
  { text: 'Reference', link: '/en/reference/permissions', activeMatch: '/en/reference/' },
];

function zhSidebar() {
  return {
    '/guide/': [
      {
        text: '入门指南',
        items: [
          { text: '产品概述', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '平台架构', link: '/guide/architecture' },
          { text: '术语表', link: '/guide/glossary' },
        ],
      },
    ],
    '/auth/': [
      {
        text: '认证与授权',
        items: [
          { text: '登录', link: '/auth/login' },
          { text: '注册', link: '/auth/register' },
          { text: '重置密码', link: '/auth/reset-password' },
          { text: '选择/注册租户', link: '/auth/select-tenant' },
          { text: '多因素认证', link: '/auth/mfa' },
          { text: '角色与权限', link: '/auth/roles' },
        ],
      },
    ],
    '/console/': [
      {
        text: 'Console 概览',
        items: [
          { text: '概览', link: '/console/' },
          { text: '首页与仪表盘', link: '/console/dashboard' },
        ],
      },
      {
        text: 'Rune AI 工作台',
        items: [
          { text: '工作台概览', link: '/console/rune/' },
          { text: '推理服务', link: '/console/rune/inference' },
          { text: '微调服务', link: '/console/rune/finetune' },
          { text: '开发环境', link: '/console/rune/devenv' },
          { text: '应用管理', link: '/console/rune/app' },
          { text: '实验管理', link: '/console/rune/experiment' },
          { text: '评测管理', link: '/console/rune/evaluation' },
          { text: '存储卷管理', link: '/console/rune/storage' },
          { text: '日志查看', link: '/console/rune/logging' },
          { text: '应用市场', link: '/console/rune/app-market' },
          { text: '工作空间管理', link: '/console/rune/workspace' },
          { text: '配额查看', link: '/console/rune/quota' },
          { text: '规格查看', link: '/console/rune/flavor' },
        ],
      },
      {
        text: 'Moha 模型中心',
        items: [
          { text: '模型中心概览', link: '/console/moha/' },
          { text: '模型管理', link: '/console/moha/model' },
          { text: '数据集管理', link: '/console/moha/dataset' },
          { text: '镜像仓库', link: '/console/moha/image' },
          { text: 'Space 管理', link: '/console/moha/space' },
          { text: '组织管理', link: '/console/moha/organization' },
          { text: '个人访问令牌', link: '/console/moha/token' },
        ],
      },
      {
        text: 'ChatApp 对话体验',
        items: [
          { text: 'ChatApp 概览', link: '/console/chatapp/' },
          { text: 'AI 对话体验', link: '/console/chatapp/experience' },
          { text: '对话调试', link: '/console/chatapp/debug' },
          { text: '多模型对比', link: '/console/chatapp/compare' },
          { text: 'API Key 管理', link: '/console/chatapp/token' },
        ],
      },
      {
        text: '个人中心 (IAM)',
        items: [
          { text: '个人信息', link: '/console/iam/profile' },
          { text: '安全设置', link: '/console/iam/security' },
          { text: 'API Key', link: '/console/iam/api-key' },
          { text: 'SSH Key', link: '/console/iam/ssh-key' },
          { text: '主题设置', link: '/console/iam/theme' },
          { text: '租户管理', link: '/console/iam/tenant' },
        ],
      },
    ],
    '/boss/': [
      {
        text: 'BOSS 概览',
        items: [
          { text: '概览', link: '/boss/' },
          { text: '平台仪表盘', link: '/boss/dashboard' },
        ],
      },
      {
        text: '账户中心',
        items: [
          { text: '用户管理', link: '/boss/iam/users' },
          { text: '租户管理', link: '/boss/iam/tenants' },
        ],
      },
      {
        text: 'Rune 管理',
        items: [
          { text: '集群管理', link: '/boss/rune/clusters' },
          { text: '资源池管理', link: '/boss/rune/resource-pools' },
          { text: '规格管理', link: '/boss/rune/flavors' },
          { text: '系统实例管理', link: '/boss/rune/systems' },
          { text: '系统模板部署', link: '/boss/rune/system-market' },
          { text: '租户资源管理', link: '/boss/rune/tenants' },
          { text: '产品模板管理', link: '/boss/rune/templates' },
        ],
      },
      {
        text: 'LLM 网关',
        items: [
          { text: '运营概览', link: '/boss/gateway/operations' },
          { text: 'API Key 管理', link: '/boss/gateway/api-keys' },
          { text: '模型列表', link: '/boss/gateway/channels' },
          { text: '推理服务注册', link: '/boss/gateway/service-reg' },
          { text: '内容审查', link: '/boss/gateway/moderation' },
          { text: '网关配置', link: '/boss/gateway/config' },
          { text: '审计日志', link: '/boss/gateway/audit' },
        ],
      },
      {
        text: '数据仓库',
        items: [
          { text: '模型库管理', link: '/boss/moha/models' },
          { text: '数据集管理', link: '/boss/moha/datasets' },
          { text: '镜像仓库管理', link: '/boss/moha/images' },
          { text: 'Space 管理', link: '/boss/moha/spaces' },
          { text: '数据镜像管理', link: '/boss/moha/mirrors' },
        ],
      },
      {
        text: '平台设置',
        items: [
          { text: '全局平台设置', link: '/boss/settings/platform' },
          { text: 'Rune 设置', link: '/boss/settings/rune' },
          { text: 'Moha 设置', link: '/boss/settings/moha' },
          { text: 'ChatApp 设置', link: '/boss/settings/chatapp' },
          { text: '系统成员管理', link: '/boss/settings/members' },
          { text: '动态仪表板', link: '/boss/settings/dynamic-dashboard' },
        ],
      },
    ],
    '/reference/': [
      {
        text: '参考',
        items: [
          { text: '权限设计详解', link: '/reference/permissions' },
          { text: 'API 服务概览', link: '/reference/api-overview' },
          { text: '常见问题', link: '/reference/faq' },
        ],
      },
    ],
  };
}

function enSidebar() {
  const zh = zhSidebar();
  // Map Chinese sidebar structure to English paths
  const mapping: Record<string, Record<string, string>> = {
    '/guide/': {
      '入门指南': 'Getting Started',
      '产品概述': 'Introduction',
      '快速开始': 'Quick Start',
      '平台架构': 'Architecture',
      '术语表': 'Glossary',
    },
    '/auth/': {
      '认证与授权': 'Authentication & Authorization',
      '登录': 'Login',
      '注册': 'Register',
      '重置密码': 'Reset Password',
      '选择/注册租户': 'Select/Register Tenant',
      '多因素认证': 'MFA',
      '角色与权限': 'Roles & Permissions',
    },
    '/console/': {
      'Console 概览': 'Console Overview',
      '概览': 'Overview',
      '首页与仪表盘': 'Home & Dashboard',
      'Rune AI 工作台': 'Rune AI Workbench',
      '工作台概览': 'Workbench Overview',
      '推理服务': 'Inference Service',
      '微调服务': 'Fine-tuning Service',
      '开发环境': 'Dev Environment',
      '应用管理': 'Application Mgmt',
      '实验管理': 'Experiment Mgmt',
      '评测管理': 'Evaluation Mgmt',
      '存储卷管理': 'Storage Volume',
      '日志查看': 'Logs',
      '应用市场': 'App Market',
      '工作空间管理': 'Workspace Mgmt',
      '配额查看': 'Quota',
      '规格查看': 'Flavor',
      'Moha 模型中心': 'Moha Model Hub',
      '模型中心概览': 'Model Hub Overview',
      '模型管理': 'Model Mgmt',
      '数据集管理': 'Dataset Mgmt',
      '镜像仓库': 'Image Registry',
      'Space 管理': 'Space Mgmt',
      '组织管理': 'Organization',
      '个人访问令牌': 'Access Token',
      'ChatApp 对话体验': 'ChatApp',
      'ChatApp 概览': 'ChatApp Overview',
      'AI 对话体验': 'AI Chat',
      '对话调试': 'Debug',
      '多模型对比': 'Model Compare',
      'API Key 管理': 'API Key Mgmt',
      '个人中心 (IAM)': 'Personal (IAM)',
      '个人信息': 'Profile',
      '安全设置': 'Security',
      'API Key': 'API Key',
      'SSH Key': 'SSH Key',
      '主题设置': 'Theme',
      '租户管理': 'Tenant Mgmt',
    },
    '/boss/': {
      'BOSS 概览': 'BOSS Overview',
      '概览': 'Overview',
      '平台仪表盘': 'Dashboard',
      '账户中心': 'Account Center',
      '用户管理': 'User Mgmt',
      '租户管理': 'Tenant Mgmt',
      'Rune 管理': 'Rune Admin',
      '集群管理': 'Cluster Mgmt',
      '资源池管理': 'Resource Pool',
      '规格管理': 'Flavor Mgmt',
      '系统实例管理': 'System Instance',
      '系统模板部署': 'System Market',
      '租户资源管理': 'Tenant Resource',
      '产品模板管理': 'Product Template',
      'LLM 网关': 'LLM Gateway',
      '运营概览': 'Operations',
      'API Key 管理': 'API Key Mgmt',
      '模型列表': 'Model List',
      '推理服务注册': 'Service Reg',
      '内容审查': 'Moderation',
      '网关配置': 'Gateway Config',
      '审计日志': 'Audit Log',
      '数据仓库': 'Data Store',
      '模型库管理': 'Model Mgmt',
      '数据集管理': 'Dataset Mgmt',
      '镜像仓库管理': 'Image Mgmt',
      'Space 管理': 'Space Mgmt',
      '数据镜像管理': 'Mirror Mgmt',
      '平台设置': 'Platform Settings',
      '全局平台设置': 'Global Settings',
      'Rune 设置': 'Rune Settings',
      'Moha 设置': 'Moha Settings',
      'ChatApp 设置': 'ChatApp Settings',
      '系统成员管理': 'System Members',
      '动态仪表板': 'Dynamic Dashboard',
    },
    '/reference/': {
      '参考': 'Reference',
      '权限设计详解': 'Permission Design',
      'API 服务概览': 'API Overview',
      '常见问题': 'FAQ',
    },
  };

  const result: Record<string, any> = {};
  for (const [key, groups] of Object.entries(zh)) {
    const enKey = `/en${key}`;
    result[enKey] = groups.map((group: any) => ({
      text: mapping[key]?.[group.text] ?? group.text,
      items: group.items.map((item: any) => ({
        text: mapping[key]?.[item.text] ?? item.text,
        link: `/en${item.link}`,
      })),
    }));
  }
  return result;
}

export default withMermaid(
  defineConfig({
    title: 'Rune Console',
    description: '晓石AI 平台控制台使用文档',
    base: (process.env.VITEPRESS_BASE as `/${string}/` | '/') || '/',
    lastUpdated: true,
    cleanUrls: true,
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo/favicon.svg' }],
      ['link', { rel: 'icon', type: 'image/png', href: '/logo/favicon.svg' }],
      ['meta', { name: 'theme-color', content: '#6950E8' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ],

    locales: {
      root: {
        label: '中文',
        lang: 'zh-CN',
        themeConfig: {
          nav: zhNav,
          sidebar: zhSidebar(),
          outline: { label: '目录', level: [2, 3] },
          lastUpdated: { text: '最后更新' },
          editLink: { pattern: '', text: '' },
          docFooter: { prev: '上一页', next: '下一页' },
          search: { provider: 'local', options: { translations: { button: { buttonText: '搜索文档' } } } },
        },
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: {
          nav: enNav,
          sidebar: enSidebar(),
          outline: { label: 'On this page', level: [2, 3] },
          lastUpdated: { text: 'Last updated' },
          docFooter: { prev: 'Previous', next: 'Next' },
          search: { provider: 'local' },
        },
      },
    },

    themeConfig: {
      logo: '/logo/logo.svg',
      socialLinks: [],
      footer: {
        message: '晓石AI · Rune Console',
        copyright: 'Copyright © 2024-2026 晓石AI',
      },
    },

    mermaid: {
      theme: 'default',
    },

    // Ignore missing screenshot assets during build; screenshots are captured separately via Playwright
    ignoreDeadLinks: true,

    vite: {
      build: {
        assetsInlineLimit: 0,
      },
    },
  })
);
