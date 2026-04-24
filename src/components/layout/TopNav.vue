<template>
  <header class="top-nav">
    <div class="brand">
      <div class="logo">YZSCQ</div>
      <div>
        <strong>印章生成器</strong>
        <span>Professional Seal Workspace</span>
      </div>
    </div>
    <nav class="nav-links" aria-label="主导航">
      <RouterLink to="/">工作台</RouterLink>
      <RouterLink to="/history">历史</RouterLink>
      <RouterLink to="/my-templates">模板</RouterLink>
      <RouterLink to="/vip">会员</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 72px;
  padding: 14px 28px;
  background: #173f43;
  color: #fff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;

  .logo {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 16px;
  }

  span {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.68);
    font-size: 12px;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;

  a {
    min-height: 36px;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.78);
    padding: 9px 12px;
    font-size: 13px;
    text-decoration: none;

    &:hover,
    &.router-link-active {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }

    &:focus-visible {
      outline: 3px solid rgba(255, 255, 255, 0.22);
      outline-offset: 2px;
    }
  }
}

@media (max-width: 680px) {
  .top-nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    flex-wrap: wrap;
  }
}
</style>
