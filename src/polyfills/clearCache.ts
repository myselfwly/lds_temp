; (function () {
  function clearCache() {
    console.log("clear_cache")
    localStorage.clear();
    sessionStorage.clear();
  }
  // 清空缓存
  var clearDom = document.createElement("div");
  clearDom.setAttribute("id", "clearDom");
  var style = document.createElement("style");
  style.innerHTML = `
  #clearDom {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 18px;
    height: 18px;
    background: #bbffaa88;
    cursor: pointer;
    z-index: 9999;
  }
  `;
  window.onload = function () {
    document.body.appendChild(clearDom);
    document.body.appendChild(style);
    setTimeout(() => { 
      clearDom.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        clearCache()
      })
    },1000)
  }
})()