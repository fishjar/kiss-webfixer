// ==UserScript==
// @name            kiss-webfixer
// @namespace       https://github.com/fishjar/kiss-webfixer
// @version         0.0.1
// @description     Used in conjunction with [KISS Translator], a repair script for non-standard web pages. (配合 [简约翻译] 使用的，针对不规范网页的修复脚本。)
// @author          Gabe<yugang2002@gmail.com>
// @homepageURL     https://github.com/fishjar/kiss-webfixer
// @license         MIT
// @match           *://www.phoronix.com/*
// @match           *://t.me/*
// @grant           none
// @downloadURL     https://fishjar.github.io/kiss-webfixer/kiss-webfixer.user.js
// @updateURL       https://fishjar.github.io/kiss-webfixer/kiss-webfixer.user.js
// ==/UserScript==

(function () {
  var sites = {
    "www.phoronix.com": ".content",
    "t.me": ".js-message_text",
  };

  var gapTags = ["BR", "WBR"];
  var newlineTags = [
    "DIV",
    "UL",
    "OL",
    "LI",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "HR",
    "PRE",
    "TABLE",
  ];

  document
    .querySelectorAll(sites[document.location.hostname])
    .forEach(function ($conent) {
      var html = "";
      $conent.childNodes.forEach(function (child, index) {
        if (index === 0) {
          html += "<p>";
        }

        if (gapTags.indexOf(child.nodeName) !== -1) {
          html += "</p><p>";
        } else if (newlineTags.indexOf(child.nodeName) !== -1) {
          html += "</p>" + child.outerHTML + "<p>";
        } else if (child.outerHTML) {
          html += child.outerHTML;
        } else if (child.nodeValue) {
          html += child.nodeValue;
        }

        if (index === $conent.childNodes.length - 1) {
          html += "</p>";
        }
      });
      $conent.innerHTML = html;
    });
})();
