# 个人信息

## 功能简介

个人信息页面是您管理账户基本资料的入口。在此页面中，您可以查看和编辑个人显示名称、头像等信息。部分字段（如用户名）在注册后不可修改，以确保账户标识的唯一性和一致性。

## 进入路径

右上角头像 → 个人中心 → **基本信息**

路径：`/iam/account/general`

## 页面概览

![个人信息页面](/screenshots/console/iam-profile.png)

个人信息页面展示您的账户资料，分为**可编辑区域**和**只读信息**两部分。

---

## 用户数据结构

| 字段 | 类型 | 可编辑 | 说明 |
|------|------|--------|------|
| `id` | string | ❌ | 系统分配的唯一用户 ID |
| `name` | string | ❌ | 用户名（注册时设定，全局唯一） |
| `displayName` | string | ✅ | 显示名称（在界面和协作中展示的名字） |
| `picture` | string | ✅ | 头像 URL |
| `email` | string | ❌ * | 联系邮箱（修改需通过安全设置） |
| `phone` | string | ❌ * | 手机号码（修改需通过安全设置） |
| `avatar` | file | ✅ | 头像图片 |
| `mfa.enabled` | boolean | ❌ | 是否已启用多因素认证 |
| `preferences` | object | ✅ | 用户偏好设置（主题等） |

> 💡 提示: 邮箱和手机号的修改涉及身份验证流程，请前往 [安全设置](./security.md) 页面操作。

---

## 编辑个人信息

### 修改显示名称

1. 在个人信息页面找到 **显示名称** 字段
2. 清除当前名称，输入新的显示名称
3. 点击 **保存** 按钮

| 验证规则 | 说明 |
|----------|------|
| 必填 | 显示名称不能为空 |
| 最小长度 | 至少 1 个字符 |

> 💡 提示: 显示名称会出现在对话、评论、协作等所有需要展示您身份的场景中。建议使用易于识别的名称。

### 上传/更换头像

个人信息页面提供 **UploadAvatarWithCrop**（上传并裁剪头像）组件，支持图片上传和裁剪：

![头像上传与裁剪](/screenshots/console/iam-avatar-crop.png)

#### 操作步骤

1. 点击头像区域或 **更换头像** 按钮
2. 在文件选择器中选择一张图片
3. 在裁剪器中调整裁剪区域（支持缩放和拖动）
4. 确认裁剪，图片将自动上传
5. 上传成功后头像即时更新

#### 头像要求

| 要求 | 限制 |
|------|------|
| 最大文件大小 | **3 MB** |
| 推荐格式 | JPG、PNG、GIF |
| 裁剪比例 | 1:1（正方形） |

> ⚠️ 注意: 超过 3MB 的图片将无法上传。建议使用清晰的正方形图片以获得最佳显示效果。

---

## 只读信息

以下字段仅供查看，不支持在此页面修改：

| 字段 | 说明 |
|------|------|
| **用户名** | 注册时设定的唯一标识符，不可更改。在登录、API 调用等场景中使用 |
| **用户 ID** | 系统自动分配的唯一 ID，格式为 UUID |
| **注册时间** | 账号创建的日期和时间 |
| **MFA 状态** | 多因素认证是否已启用（如需修改，请前往安全设置） |

---

## 页面交互流程

```mermaid
flowchart TD
    Enter["进入个人信息页面"] --> Load["加载当前用户资料<br/>GET /api/iam/current/profile"]
    Load --> Display["展示用户信息"]
    Display --> EditName{"修改显示名称?"}
    EditName -- 是 --> InputName["输入新名称"]
    InputName --> SaveProfile["保存<br/>PUT /api/iam/current/profile"]
    SaveProfile --> Success["更新成功提示"]
    EditName -- 否 --> EditAvatar{"更换头像?"}
    EditAvatar -- 是 --> SelectFile["选择图片文件"]
    SelectFile --> Crop["裁剪图片"]
    Crop --> Upload["上传头像<br/>POST /api/iam/current/avatar"]
    Upload --> RefreshAvatar["刷新头像显示"]
    EditAvatar -- 否 --> Done["完成"]
```

---

## 相关 API 接口

| 操作 | 方法 | 路径 |
|------|------|------|
| 获取当前用户信息 | GET | `/api/iam/current/profile` |
| 更新用户信息 | PUT | `/api/iam/current/profile` |
| 上传头像 | POST | `/api/iam/current/avatar` |

> 💡 提示: 修改个人信息后，新信息会在下次页面刷新或重新登录时全局生效。部分场景（如已缓存的头像）可能需要短暂时间更新。
