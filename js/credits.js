var GUI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"credits": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"iframe-extension-worker":"iframe-extension-worker","sb":"sb"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/playground/credits/credits.jsx","vendors~addon-settings~credits~editor~embed~fullscreen~not_found~player","vendors~credits~editor~embed~fullscreen~player","credits~editor~embed~fullscreen~player"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/index.js?!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js?!./src/components/lk-footer/footer.css":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader??ref--5-1!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src??postcss!./src/components/lk-footer/footer.css ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/lib/css-base.js */ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* overridden by src/lib/themes/guiHelpers.js */\n\n.footer_footer_n3soo {\n    padding: 10px 0;\n    margin-top: 10px;\n    border-top: 2px solid var(--ui-black-transparent);\n}\n\n.footer_footer_n3soo a {\n    font-weight: bold;\n    text-decoration: none;\n}\n\n.footer_footer-content_2dnpC {\n    max-width: 600px;\n    margin: auto;\n}\n\n.footer_footer-text_DMIVv {\n    text-align: center;\n    margin: 5px 0 10px 0;\n}\n\n.footer_footer-columns_2KBNo {\n    display: flex;\n    justify-content: center;\n    justify-items: center;\n    flex-wrap: wrap;\n}\n\n.footer_footer-section_1zkbk {\n    display: flex;\n    flex-direction: column;\n    width: 200px;\n    margin-bottom: 10px;\n}\n\n.footer_footer-section_1zkbk > * {\n    margin-bottom: 10px;\n}", ""]);

// exports
exports.locals = {
	"footer": "footer_footer_n3soo",
	"footer-content": "footer_footer-content_2dnpC",
	"footerContent": "footer_footer-content_2dnpC",
	"footer-text": "footer_footer-text_DMIVv",
	"footerText": "footer_footer-text_DMIVv",
	"footer-columns": "footer_footer-columns_2KBNo",
	"footerColumns": "footer_footer-columns_2KBNo",
	"footer-section": "footer_footer-section_1zkbk",
	"footerSection": "footer_footer-section_1zkbk"
};

/***/ }),

/***/ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/index.js?!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js?!./src/css/info-page.css":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader??ref--5-1!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src??postcss!./src/css/info-page.css ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/lib/css-base.js */ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* overridden by src/lib/themes/guiHelpers.js */\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    background: var(--page-background);\n    color: var(--page-foreground);\n}\n\na {\n    color: var(--link-color);\n}\n\n.info-page_main_1S4oJ section {\n    max-width: 900px;\n    margin: auto;\n    margin-bottom: 30px;\n}\n\n.info-page_header-container_NiGzz {\n    color: white;\n    background-color: var(--motion-tertiary);\n    padding: 20px 0;\n    text-align: center;\n    margin-bottom: 30px;\n}\n\n.info-page_header-text_2A4h- {\n\n}\n\n.info-page_users_3SWlg {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.info-page_user-image_3SaMq {\n    margin-right: 12px;\n}\n\n.info-page_user_1eYBE {\n    display: flex;\n    align-items: center;\n    width: 300px;\n    padding: 4px;\n    border-radius: 4px;\n    font-size: 1.25rem;\n    color: inherit !important;\n    text-decoration: none;\n    transition: background .2s;\n}\n\n.info-page_user_1eYBE:link:hover {\n    background: var(--ui-black-transparent);\n}\n", ""]);

// exports
exports.locals = {
	"main": "info-page_main_1S4oJ",
	"header-container": "info-page_header-container_NiGzz",
	"headerContainer": "info-page_header-container_NiGzz",
	"header-text": "info-page_header-text_2A4h-",
	"headerText": "info-page_header-text_2A4h-",
	"users": "info-page_users_3SWlg",
	"user-image": "info-page_user-image_3SaMq",
	"userImage": "info-page_user-image_3SaMq",
	"user": "info-page_user_1eYBE"
};

/***/ }),

/***/ "./src/components/lk-footer/footer.css":
/*!*********************************************!*\
  !*** ./src/components/lk-footer/footer.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader??ref--5-1!../../../node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src??postcss!./footer.css */ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/index.js?!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js?!./src/components/lk-footer/footer.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/.pnpm/style-loader@0.23.1/node_modules/style-loader/lib/addStyles.js */ "./node_modules/.pnpm/style-loader@0.23.1/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/lk-footer/footer.jsx":
/*!*********************************************!*\
  !*** ./src/components/lk-footer/footer.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_brand_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/brand.js */ "./src/lib/brand.js");
/* harmony import */ var _lib_brand_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_brand_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.es.js");
/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer.css */ "./src/components/lk-footer/footer.css");
/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_footer_css__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */





const hardRefresh = () => {
  var search = location.search.replace(/[?&]nocache=\d+/, '');
  location.replace(location.pathname + search + (search ? '&' : '?') + 'nocache=' + Math.floor(Math.random() * 100000));
};
const eraseData = async () => {
  if (confirm('Please be aware that this will reset all your local data, including the Restore Points and backpack. Are you sure you want to continue?')) {
    ;
    localStorage.clear();
    // We have to manually delete the databases due to Firefox not supporting indexedDB.databases(). WHYYYY???
    indexedDB.deleteDatabase('TW_RestorePoints');
    indexedDB.deleteDatabase('TW_Backpack');
    location.reload();
  }
};
const Footer = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footer
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerContent
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerText
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"]
// eslint-disable-next-line max-len
, {
  defaultMessage: "{APP_NAME} is not affiliated with TurboWarp, GarboMuffin, Scratch, the Scratch Team, or the Scratch Foundation.",
  id: "tw.footer.disclaimer",
  values: {
    APP_NAME: _lib_brand_js__WEBPACK_IMPORTED_MODULE_1__["APP_NAME"]
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerText
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Scratch is a project of the Scratch Foundation. It is available for free at {scratchDotOrg}.",
  id: "tw.footer.scratchDisclaimer",
  values: {
    scratchDotOrg: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://scratch.org/",
      target: "_blank",
      rel: "noreferrer"
    }, 'https://scratch.org/')
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerColumns
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerSection
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "credits.html"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Credits",
  id: "tw.footer.credits"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  /* </div>href="https://github.com/sponsors/GarboMuffin" */style: {
    cursor: 'not-allowed'
  },
  title: "Not available (yet)"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Donate",
  id: "tw.footer.donate"
}))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerSection
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://desktop.turbowarp.org/"
}, 'TurboWarp Desktop'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://packager.turbowarp.org/"
}, 'TurboWarp Packager'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://docs.turbowarp.org/embedding"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Embedding",
  id: "tw.footer.embed"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://docs.turbowarp.org/url-parameters"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "URL Parameters",
  id: "tw.footer.parameters"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://docs.turbowarp.org/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Documentation",
  id: "tw.footer.documentation"
}))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: _footer_css__WEBPACK_IMPORTED_MODULE_3___default.a.footerSection
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://scratch.mit.edu/discuss/topic/772797/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Forum Topic",
  id: "lk.topic"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://codeberg.org/LibreKitten/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Source Code",
  id: "tw.code"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "privacy.html"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Privacy Policy",
  id: "tw.privacy"
})))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  style: {
    textAlign: 'center'
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "Pspspsps! "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
  defaultMessage: "Like {appName}? Want to promote it? Add this badge to your website/forum signature/software forge profile.",
  id: "lk.footer.badge",
  values: {
    appName: _lib_brand_js__WEBPACK_IMPORTED_MODULE_1__["APP_NAME"]
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://librekitten.org/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
  alt: "LibreKitten - Code in blocks seriously",
  src: "https://u.cubeupload.com/gl12/LibreKittenBadge.png"
}))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "HTML")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
  contentEditable: false,
  value: '<a href="https://librekitten.org/"><img alt="LibreKitten - Code in blocks seriously" src="https://u.cubeupload.com/gl12/LibreKittenBadge.png"/></a>'
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "BBCode")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
  contentEditable: false,
  value: '[url=https://librekitten.org/][img]https://u.cubeupload.com/gl12/LibreKittenBadge.png[/img][/url]'
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "Markdown")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
  contentEditable: false,
  value: '[![LibreKitten - Code in blocks seriously](https://u.cubeupload.com/gl12/LibreKittenBadge.png)](https://librekitten.org/)'
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Version: ", "0.8.0", " | ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  onClick: eraseData,
  style: {
    color: 'red'
  }
}, "Erase data"))));
/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/css/info-page.css":
/*!*******************************!*\
  !*** ./src/css/info-page.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader??ref--5-1!../../node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src??postcss!./info-page.css */ "./node_modules/.pnpm/css-loader@1.0.1_webpack@4.47.0_webpack-cli@3.3.12_/node_modules/css-loader/index.js?!./node_modules/.pnpm/postcss-loader@3.0.0/node_modules/postcss-loader/src/index.js?!./src/css/info-page.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/.pnpm/style-loader@0.23.1/node_modules/style-loader/lib/addStyles.js */ "./node_modules/.pnpm/style-loader@0.23.1/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/playground/credits/credits.jsx":
/*!********************************************!*\
  !*** ./src/playground/credits/credits.jsx ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_target__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app-target */ "./src/playground/app-target.js");
/* harmony import */ var _css_info_page_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../css/info-page.css */ "./src/css/info-page.css");
/* harmony import */ var _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_css_info_page_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/app-state-hoc.jsx */ "./src/lib/app-state-hoc.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.es.js");
/* harmony import */ var _lib_brand__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/brand */ "./src/lib/brand.js");
/* harmony import */ var _lib_brand__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lib_brand__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lib_themes_guiHelpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/themes/guiHelpers */ "./src/lib/themes/guiHelpers.js");
/* harmony import */ var _lib_themes_themePersistance__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/themes/themePersistance */ "./src/lib/themes/themePersistance.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./users */ "./src/playground/credits/users.js");
/* harmony import */ var _components_menu_bar_menu_bar_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/menu-bar/menu-bar.jsx */ "./src/components/menu-bar/menu-bar.jsx");
/* harmony import */ var _components_lk_footer_footer_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/lk-footer/footer.jsx */ "./src/components/lk-footer/footer.jsx");
/* harmony import */ var _purring_librekitty_with_love_heart_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./purring-librekitty-with-love-heart.svg */ "./src/playground/credits/purring-librekitty-with-love-heart.svg");
/* harmony import */ var _purring_librekitty_with_love_heart_svg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_purring_librekitty_with_love_heart_svg__WEBPACK_IMPORTED_MODULE_14__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
















/* eslint-disable react/jsx-no-literals */

Object(_lib_themes_guiHelpers__WEBPACK_IMPORTED_MODULE_9__["applyGuiColors"])(Object(_lib_themes_themePersistance__WEBPACK_IMPORTED_MODULE_10__["detectTheme"])());
document.documentElement.lang = 'en';
const User = _ref => {
  let {
    image,
    text,
    href
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noreferrer",
    className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.user
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    loading: "lazy",
    className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.userImage,
    src: image,
    width: "60",
    height: "60"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.userInfo
  }, text));
};
User.propTypes = {
  image: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  text: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  href: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
const UserList = _ref2 => {
  let {
    users
  } = _ref2;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.users
  }, users.map((data, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(User, _extends({
    key: index
  }, data))));
};
UserList.propTypes = {
  users: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object)
};
const Credits = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
  className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.main
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_menu_bar_menu_bar_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
  onClickAddonSettings: () => {}
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
  className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.headerContainer
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
  className: _css_info_page_css__WEBPACK_IMPORTED_MODULE_5___default.a.headerText
}, _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " Credits")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " project is made possible by TurboWarp and Scratch, thank you. Without them, coding would have been less accessible to people, and people would have had to learn confusing languages with syntax errors as their first programming language.")), _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"] !== 'LibreKitten' &&
/*#__PURE__*/
// Be kind and considerate. Don't remove this :) (The TurboWarp one was replaced by a more detailed version.)
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "LibreKitten"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " is based on the work of the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://librekitten.org/credits.html"
}, "LibreKitten contributors"), " but is not endorsed by LibreKitten in any way.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "TurboWarp"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " is based on the work of the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://turbowarp.org/credits.html"
}, "TurboWarp contributors"), " but is not endorsed by TurboWarp in any way."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://github.com/sponsors/GarboMuffin"
}, "Donate to support TurboWarp."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Scratch"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " & TurboWarp is based on the work of the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://scratch.mit.edu/credits"
}, "Scratch contributors"), " but is not endorsed by Scratch in any way."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  href: "https://scratch.mit.edu/donate"
}, "Donate to support Scratch."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Contributors"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserList, {
  users: _users__WEBPACK_IMPORTED_MODULE_11__["default"].contributors
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Addons"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserList, {
  users: _users__WEBPACK_IMPORTED_MODULE_11__["default"].addonDevelopers
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "TurboWarp Extension Gallery"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserList, {
  users: _users__WEBPACK_IMPORTED_MODULE_11__["default"].extensionDevelopers
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Documentation"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserList, {
  users: _users__WEBPACK_IMPORTED_MODULE_11__["default"].docs
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Translators"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Sadly, ", _lib_brand__WEBPACK_IMPORTED_MODULE_8__["APP_NAME"], " is only maintained by 1 person at the time of this being written, and that person only knows English.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Extra credits"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Most importantly of all, you. Thank you for using LibreKitten, or at least giving it a try. We appreciate that."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
  src: _purring_librekitty_with_love_heart_svg__WEBPACK_IMPORTED_MODULE_14___default.a,
  alt: "The Librekitty (cat) purring with a love heart."
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "The  Librekitty purring from your usage of LibreKitten."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "- The Librekitty."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "Individual contributors are listed in no particular order. The order is randomized each visit."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_lk_footer_footer_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], null));
const WrappedCredits = Object(redux__WEBPACK_IMPORTED_MODULE_2__["compose"])(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_6__["default"])(Credits);
Object(_app_target__WEBPACK_IMPORTED_MODULE_4__["default"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedCredits, null));

/***/ }),

/***/ "./src/playground/credits/purring-librekitty-with-love-heart.svg":
/*!***********************************************************************!*\
  !*** ./src/playground/credits/purring-librekitty-with-love-heart.svg ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/a1b08841965bf0969bc99c7e65139010.svg";

/***/ }),

/***/ "./src/playground/credits/users.js":
/*!*****************************************!*\
  !*** ./src/playground/credits/users.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const shuffle = list => {
  for (let i = list.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    const tmp = list[i];
    list[i] = list[random];
    list[random] = tmp;
  }
  return list;
};

/* Documentation:
    userID: '143585',
    username: 'kaj',
    url: 'https://placekitten.com',
    img: 'https://placekitten.com/60/60'
*/

const fromHardcoded = _ref => {
  let {
    userID = '0',
    username,
    url,
    img
  } = _ref;
  const result = {
    image: 'images/unknown.png',
    text: username
  };
  if (username && userID !== '0') {
    result.href = "https://scratch.mit.edu/users/".concat(username, "/");
    result.image = "https://trampoline.turbowarp.org/avatars/".concat(userID);
  } else if (url) {
    result.href = url;
  }
  if (userID == '0' && img) {
    result.image = img;
  }
  return result;
};

// The lists below are in no particular order.

const contributors = [{
  userID: '38055575',
  username: 'o97doge'
}, {
  username: 'This could be you!',
  url: 'https://codeberg.org/LibreKitten'
}, {
  username: 'nmsderp',
  img: 'https://avatars.githubusercontent.com/u/130254323?v=4',
  url: 'https://github.com/nmsderp'
}, {
  username: 'dumo',
  img: 'https://codeberg.org/avatars/c9a451e80c5aa5e03f70fa22950f60d7cad58af959a604e2964df079bf818cdd?size=80',
  url: 'https://codeberg.org/dumo'
}].map(fromHardcoded);
const addonDevelopers = [{
  userID: '34018398',
  username: 'Jeffalo'
}, {
  userID: '64184234',
  username: 'ErrorGamer2000'
}, {
  userID: '41616512',
  username: 'pufferfish101007'
}, {
  userID: '61409215',
  username: 'TheColaber'
}, {
  userID: '1882674',
  username: 'griffpatch'
}, {
  userID: '10817178',
  username: 'apple502j'
}, {
  userID: '16947341',
  username: '--Explosion--'
}, {
  userID: '14880401',
  username: 'Sheep_maker'
}, {
  userID: '9981676',
  username: 'NitroCipher'
}, {
  userID: '2561680',
  username: 'lisa_wolfgang'
}, {
  userID: '60000111',
  username: 'GDUcrash'
}, {
  userID: '4648559',
  username: 'World_Languages'
}, {
  userID: '17340565',
  username: 'GarboMuffin'
}, {
  userID: '5354974',
  username: 'Chrome_Cat'
}, {
  userID: '34455896',
  username: 'summerscar'
}, {
  userID: '55742784',
  username: 'RedGuy7'
}, {
  userID: '9636514',
  username: 'Tacodiva7729'
}, {
  userID: '14792872',
  username: '_nix'
}, {
  userID: '30323614',
  username: 'BarelySmooth'
}, {
  userID: '64691048',
  username: 'CST1229'
}, {
  username: 'DNin01'
}, {
  userID: '16426047',
  username: 'Maximouse'
}, {
  username: 'retronbv'
}, {
  username: 'GrahamSH'
}, {
  userID: '22529928',
  username: 'simiagain'
}, {
  username: 'Secret-chest'
}, {
  userID: '11677378',
  username: 'Mr_MPH'
}, {
  username: 'TheKodeToad'
}, {
  userID: '125590627',
  username: 'ZXMushroom63'
}].map(fromHardcoded);

// generated by TurboWarp/extensions/scripts/get-credits-for-gui.js
const extensionDevelopers = [{
  username: '-SIPC-'
}, {
  username: '0832'
}, {
  userID: '17235330',
  username: 'aleb2005'
}, {
  username: 'BlueDome77'
}, {
  username: 'ClaytonTDM'
}, {
  userID: '37070511',
  username: 'cs2627883'
}, {
  userID: '64691048',
  username: 'CST1229'
}, {
  userID: '41219524',
  username: 'CubesterYT'
}, {
  userID: '33988895',
  username: 'D-ScratchNinja'
}, {
  username: 'DT'
}, {
  userID: '1882674',
  username: 'griffpatch'
}, {
  userID: '41876695',
  username: 'JeremyGamer13'
}, {
  userID: '12498592',
  username: 'LilyMakesThings'
}, {
  username: 'MikeDEV'
}, {
  userID: '62950341',
  username: 'NamelessCat'
}, {
  username: 'NOname-awa'
}, {
  userID: '26959223',
  username: 'pinksheep2917'
}, {
  username: 'pumpkinhasapatch'
}, {
  username: 'qxsck'
}, {
  userID: '29118689',
  username: 'RedMan13'
}, {
  userID: '80038021',
  username: 'RixTheTyrunt'
}, {
  userID: '45777723',
  username: 'DemonX5'
}, {
  userID: '14880401',
  username: 'Sheep_maker'
}, {
  userID: '103496265',
  username: 'shreder95ua'
}, {
  username: 'Skyhigh173'
}, {
  userID: '52066199',
  username: 'softed'
}, {
  username: 'TheShovel'
}, {
  userID: '105362329',
  username: 'TrueFantom'
}, {
  userID: '19133274',
  username: 'Vadik1'
}, {
  username: 'veggiecan0419'
}, {
  userID: '82486672',
  username: 'lolecksdeehaha'
}, {
  userID: '3318598',
  username: 'plant2014'
}, {
  username: 'ZXMushroom63'
}].map(fromHardcoded);
const docs = [{
  userID: '12498592',
  username: 'LilyMakesThings'
}, {
  username: 'DNin01'
}, {
  username: 'Samq64'
}, {
  username: '61080GBA'
}, {
  username: 'adazem009'
}, {
  username: 'sajtosteszta32'
}, {
  username: 'yoyomonem'
}, {
  userID: '55742784',
  username: 'RedGuy7'
}, {
  username: '28klotlucas2'
}, {
  username: 'PPPDUD'
}, {
  username: 'BackThePortal'
}, {
  username: 'Naleksuh'
}].map(fromHardcoded);
/* harmony default export */ __webpack_exports__["default"] = ({
  contributors: shuffle(contributors),
  addonDevelopers: shuffle(addonDevelopers),
  extensionDevelopers: shuffle(extensionDevelopers),
  docs: shuffle(docs)
});

/***/ })

/******/ });
//# sourceMappingURL=credits.js.map