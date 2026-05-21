# ECU Firmware API

车载 ECU 固件版本管理 API — PingCode DevOps 集成演示项目。

## API 端点

| 端点 | 说明 |
|------|------|
| `GET /api/firmware` | 列出所有 ECU 固件版本 |
| `GET /api/firmware/ota?ecu=VCU-100` | 查询指定 ECU 的 OTA 升级状态 |
| `GET /health` | 健康检查 |

## CI/CD 流水线

每次 push 和 PR 自动触发 GitHub Actions：
1. **Lint** — 代码检查
2. **Test** — 单元测试
3. **Build** — 构建镜像

## 与 PingCode 联动

本项目通过 PingCode Flow 自动化引擎与研发管理平台打通：

- 工作项 `#MD-xxx` 引用在 Commit / PR 标题中 → 自动关联
- 工作项状态变更 → 自动创建 feature 分支
- MR 创建/合并 → 自动同步工作项状态
- Pipeline 结果 → 回推到工作项详情页
