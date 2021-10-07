"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Provider = require("./Components/Provider");

Object.keys(_Provider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Provider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Provider[key];
    }
  });
});

var _Gaurd = require("./Components/Gaurd");

Object.keys(_Gaurd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Gaurd[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Gaurd[key];
    }
  });
});

var _hook = require("./hook");

Object.keys(_hook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hook[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hook[key];
    }
  });
});