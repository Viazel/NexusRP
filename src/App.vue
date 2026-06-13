<template>
  <main>
    <div class="brand-logo">
      <img src="./assets/Icon.svg" alt="">
      <h1>Lumina</h1>
      <p>Premium Launcher Experience</p>
    </div>
    <div class="actions">
      <button class="primary">
        <img src="./assets/people.svg" alt="">
        <p>Login with Microsoft</p>
      </button>
      <div class="or">
        <div></div>
        <p>OR</p>
        <div></div>
      </div>
      <button class="secondary">
        <img src="./assets/server.svg" alt="">
        <p>Local Account</p>
      </button>
    </div>
    <div class="indicator">
      <div>
        <img src="./assets/secure.svg" alt="">
        <p>Secure OAuth Login via Microsoft</p>
      </div>
    </div>
  </main>
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

h1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

main {
  background: rgba(30, 30, 30, 0.6);
  padding: 25px;
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 8px 32px;
  backdrop-filter: blur(20px);
}

html, body {
  height: 100%;
}

body {
  font-family: monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #141113;
  background: radial-gradient(
    circle at center,
    #d0ccbc 0%,
    #792f1f 15%,
    #2a1417 45%,
    #141113 85%
  );
}

.brand-logo {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
}

.brand-logo p {
  font-size: 0.8rem;
  color: #bfc9bd;
}

.actions {
  width: 100%;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
}

.or {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.or div {
  width: 100%;
  height: 2px;
  background: #404940;
}

.indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.indicator div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 13px;
  border-radius: 999px;
  gap: 10px;
  color: #87D898;
  background: rgba(42, 42, 42, 0.5);
}

button {
  cursor: pointer;
  width: 370px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.primary {
    background: #0078d4;
}

.secondary {
  background: rgba(30, 30, 30, 0);
  border: solid #404940 1px;
  font-family: monospace;
  font-weight: 100;
  font-size: 0.8rem;
}
</style>