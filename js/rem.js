var winWidth = window.innerWidth; 
var targetRem = parseInt(winWidth / 375 * 100); 
 if (targetRem % 2) { targetRem++; } 
document.documentElement.style.fontSize = targetRem + "px";