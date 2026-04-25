<template>
  <div class="page">
    <main class="page-main">
      <WorkspacePanel
        :config="sealStore.config"
        :render-result="sealStore.renderResult"
        @reset="sealStore.resetConfig"
        @update="sealStore.patchConfig"
      />
    </main>

    <footer class="page-footer">
      <span class="footer-meta"> YZSCQ — 在线印章生成器 </span>
      <span class="footer-links">
        <a
          href="https://github.com/612cs/YZSCQ"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          class="footer-icon-link"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.3 24 12 24 5.37 18.63 0 12 0z"
            />
          </svg>
        </a>
        <a href="mailto:13135194467@163.com" title="联系作者" class="footer-icon-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path
              d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </a>
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import WorkspacePanel from '@/components/layout/WorkspacePanel.vue'
import { useSealStore } from '@/stores/seal'

const sealStore = useSealStore()
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(30, 111, 117, 0.08), transparent 280px), #eef3f6;
}

.page-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  min-height: auto;
}

.page-main > * {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.footer-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.footer-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
}

.page-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 14px 24px;
  font-size: 13px;
  color: #1e6f75;
  background: transparent;
  border-top: 1px solid rgba(0, 0, 0, 0.04);

  a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--brand-deep);
    }
  }
}

@media (max-width: 720px) {
  .page-main {
    padding: 12px;
    min-height: auto;
  }

  .page-footer {
    gap: 8px;
    font-size: 12px;
  }
}
</style>
