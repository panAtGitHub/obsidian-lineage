---
name: Obsidian Performance Sentinel
description: 专注于性能优化与资源管理。强制检查事件监听清理、内存泄漏风险、渲染性能及移动端适配，防止 Ob 插件常见的卡顿与崩溃问题。
---

# Obsidian Performance Sentinel (性能哨兵)

你现在的任务是确保插件运行得像“原生功能”一样流畅。Obsidian 的用户对性能极其敏感，微小的卡顿或内存泄漏都是不可接受的。

## 1. 核心铁律 (The Zero-Tolerance Rules)

### R1. 零内存泄漏 (Zero Leaks)
- **注册即清理**: 每一次调用 `registerEvent`, `addCommand`, `setInterval`, `window.addEventListener`，都**必须**对应在 `onunload` 或组件的 `onDestroy` 中有明确的清理逻辑。
- **推荐模式**: 使用 `this.register()` (Plugin 实例) 或 `useEffect`/`onMount` 的 cleanup 函数。

### R2. 渲染预算 (Render Budget)
- **禁止阻塞主线程**: 不要进行超过 50ms 的同步计算。对于复杂运算，使用 `Worker` 或分片处理 (Chunking)。
- **列表虚拟化**: 任何可能超过 50 个 DOM 节点的列表，**必须**使用虚拟滚动 (Virtualization)。
- **CSS 优先**: 动画效果必须使用 CSS `transform` / `opacity`，严禁使用 `top/left/width/height` 做动画（会触发 Reflow）。

### R3. 移动端优先 (Mobile First)
- **触控优化**: 所有的点击事件必须兼容 `Touch` 事件。避免 300ms 点击延迟。
- **GPU 加速**: 对移动端动画元素应用 `will-change` 或 `transform: translateZ(0)`。

## 2. 审查清单 (Performance Checklist)

在提交涉及 DOM 操作或生命周期管理的代码前，自检：

- [ ] **Event Listeners**: 所有的 `addEventListener` 都有对应的 `removeEventListener` 吗？
- [ ] **Timers**: 所有的 `setTimeout` / `setInterval` 都被 `clear` 了吗？
- [ ] **Debounce**: 高频触发的事件（如 `resize`, `input`, `scroll`）是否加了防抖 (Debounce) 或节流 (Throttle)？
- [ ] **Img/Media**: 图片资源是否懒加载 (Lazy Load)？
- [ ] **Reflow**: 是否在循环中请求了 `offsetWidth`/`clientHeight` 等触发布局计算的属性？(读写分离)

## 3. 代码模式 (Anti-Patterns vs Best Practices)

**❌ 错误示范 (Anti-Pattern)**
```typescript
// 经典的内存泄漏
class MyView extends ItemView {
    async onOpen() {
        // ❌ 错误：直接绑定到全局 window，且没有清理
        window.addEventListener('resize', this.updateLayout);
        
        // ❌ 错误：在循环中直接操作 DOM 导致重排
        items.forEach(item => {
            const el = this.containerEl.createDiv();
            el.style.width = el.offsetWidth + 'px'; // 读后写，强制同步重排
        });
    }
}
```

**✅ 推荐示范 (Best Practice)**
```typescript
class MyView extends ItemView {
    async onOpen() {
        // ✅ 正确：使用插件提供的注册方法，自动管理生命周期
        this.registerDomEvent(window, 'resize', this.updateLayout);
        
        // ✅ 正确：使用 DocumentFragment 批量挂载
        const fragment = document.createDocumentFragment();
        items.forEach(item => {
             // ... create elements
             fragment.appendChild(el);
        });
        this.containerEl.appendChild(fragment); // 只触发一次重排
    }
}
```

---
**座右铭**: "快，是用户体验的基石。" (Speed is a feature.)
