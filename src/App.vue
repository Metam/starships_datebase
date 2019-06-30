<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700');
html {
  font-family: 'Roboto Condensed', sans-serif;
  color:#4a4a4a;
}
.wrapper {
  width:100%;
  position:relative;
  max-width:1200px;
  margin:0 auto;
}
.inline {
  width:100%;
  display:inline-flex;
  &[valign=center] {
    align-items:center;
  }
  &[justify=between] {
    justify-content: space-between;
  }
}
</style>
