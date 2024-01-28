 // * @Author       : Junchen Yi
 // * @Designer	    : Taohua-Nong
 // * @Date         : 2024-01-27 17:44:33
 // * @Program name : languages.js
 // * Copyright (c) 2024 by Junchen Yi Taohua-Nong, All Rights Reserved. 
let languages = {};
let currentLanguage = localStorage.getItem('currentLanguage') || 'en-en'; // 从本地存储中获取当前语言设置，默认为中文（中国）
let baseURL = window.location.origin; // 获取当前页面的主URL

// 加载语言数据
function loadLanguage(lang) {
  let url = `./packages/languages/${lang}.json`;
  return fetch(url)
    .then(response => response.json());
}

// 切换语言
function changeLanguage(lang) {
  loadLanguage(lang)
    .then(data => {
      languages = data;
      currentLanguage = lang; // 更新当前语言
      translatePage();
      // 保存当前语言到本地存储
      localStorage.setItem('currentLanguage', lang);
		document.cookie = `Language=${lang}; path=/`; // 设置cookie，路径为整个网站
    })
    .catch(error => console.error('Error loading language data:', error.message));
}

// 翻译页面
function translatePage() {
  const elements = document.querySelectorAll('[data-mess]');

  elements.forEach(element => {
    const messageKey = element.getAttribute('data-mess');
    const translation = languages[messageKey] || messageKey;
    element.textContent = translation;
  });
}

// 初始化页面
function initialize() {
  // 检查按钮是否存在
  const zhCnButton = document.getElementById('lang-zh-cn');
  const enEnButton = document.getElementById('lang-en-en');

  // 如果按钮存在，则绑定点击事件
  if (zhCnButton) {
    zhCnButton.addEventListener('click', function() {
      changeLanguage('zh-cn');
    });
  }

  if (enEnButton) {
    enEnButton.addEventListener('click', function() {
      changeLanguage('en-en');
    });
  }

  // 初始化页面语言
  loadLanguage(currentLanguage)
    .then(data => {
      languages = data;
      translatePage();
    })
    .catch(error => console.error('Error loading default language:', error.message));
}

// 初始化页面
initialize();



