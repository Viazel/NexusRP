<template>
  <div>
    <div class="brand-logo">
      <img src="" alt="">
      <h1>Lumina</h1>
      <p>Premium Launcher Experience</p>
    </div>
    <div class="actions">
      <button>
        <img src="" alt="">
        <p>Login with Microsoft</p>
      </button>
      <p>OR</p>
      <button>
        <img src="" alt="">
        <p>Local Account</p>
      </button>
    </div>
    <div class="indicator">
      <img src="" alt="">
      <p>Secure OAuth Login via Microsoft</p>
    </div>
  </div>
</template>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

html, body {
  height: 100%;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.brand-logo {
  width: 180px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.actions {
  width: 370px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.indicator {
  width: 250px;
  height: 70;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>