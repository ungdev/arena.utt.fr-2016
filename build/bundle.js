/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(2);\n\n__webpack_require__(9);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzPzcxYjQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQVEsQ0FBUjs7QUFFQSxvQkFBUSxDQUFSIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9jc3MvaW5kZXguY3NzJyk7XG5cbnJlcXVpcmUoJy4vc3RpY2t5LmpzJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9hcHAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL2luZGV4LmNzcz8yMDk0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY3NzL2luZGV4LmNzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	eval("const $sticky = document.querySelector('.a-menu');\nconst waypoint = parseInt(getComputedStyle($sticky).top, 10);\n\nconst toggleClass = top => {\n    if (top >= waypoint) {\n        $sticky.classList.add('a-menu--fixed-top');\n    } else {\n        $sticky.classList.remove('a-menu--fixed-top');\n    }\n};\n\nlet previousTop = window.scrollY;\nconst checker = () => {\n    requestAnimationFrame(checker);\n\n    const top = window.scrollY;\n\n    if (previousTop === top) {\n        return;\n    }\n\n    previousTop = top;\n\n    toggleClass(top);\n};\n\nchecker();\n\n// Initial check\ntoggleClass(window.scrollY);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RpY2t5LmpzPzAwYTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFXLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFqQjtBQUNBLE1BQU0sV0FBVyxTQUFTLGlCQUFpQixPQUFqQixFQUEwQixHQUFuQyxFQUF3QyxFQUF4QyxDQUFqQjs7QUFFQSxNQUFNLGNBQWMsT0FBTztBQUN2QixRQUFJLE9BQU8sUUFBWCxFQUFxQjtBQUNqQixnQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLG1CQUF0QjtBQUNILEtBRkQsTUFFTztBQUNILGdCQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsbUJBQXpCO0FBQ0g7QUFDSixDQU5EOztBQVFBLElBQUksY0FBYyxPQUFPLE9BQXpCO0FBQ0EsTUFBTSxVQUFVLE1BQU07QUFDbEIsMEJBQXNCLE9BQXRCOztBQUVBLFVBQU0sTUFBTSxPQUFPLE9BQW5COztBQUVBLFFBQUksZ0JBQWdCLEdBQXBCLEVBQXlCO0FBQ3JCO0FBQ0g7O0FBRUQsa0JBQWMsR0FBZDs7QUFFQSxnQkFBWSxHQUFaO0FBQ0gsQ0FaRDs7QUFjQTs7O0FBR0EsWUFBWSxPQUFPLE9BQW5CIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkc3RpY2t5ICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hLW1lbnUnKTtcclxuY29uc3Qgd2F5cG9pbnQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKCRzdGlja3kpLnRvcCwgMTApO1xyXG5cclxuY29uc3QgdG9nZ2xlQ2xhc3MgPSB0b3AgPT4ge1xyXG4gICAgaWYgKHRvcCA+PSB3YXlwb2ludCkge1xyXG4gICAgICAgICRzdGlja3kuY2xhc3NMaXN0LmFkZCgnYS1tZW51LS1maXhlZC10b3AnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHN0aWNreS5jbGFzc0xpc3QucmVtb3ZlKCdhLW1lbnUtLWZpeGVkLXRvcCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgcHJldmlvdXNUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuY29uc3QgY2hlY2tlciA9ICgpID0+IHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjaGVja2VyKTtcclxuXHJcbiAgICBjb25zdCB0b3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICBpZiAocHJldmlvdXNUb3AgPT09IHRvcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1RvcCA9IHRvcDtcclxuXHJcbiAgICB0b2dnbGVDbGFzcyh0b3ApO1xyXG59O1xyXG5cclxuY2hlY2tlcigpO1xyXG5cclxuLy8gSW5pdGlhbCBjaGVja1xyXG50b2dnbGVDbGFzcyh3aW5kb3cuc2Nyb2xsWSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3N0aWNreS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);