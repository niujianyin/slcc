/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/26 19:08
 */
/* eslint-disable */
import {viewData} from "common/js/util"
let $ = window.$


'use strict';

// CSS3 动画的时常，目前默认都是 500ms，那么JS要在 510ms 后执行DOM操作
var CSS_ANIMATION_DURATION = 510;

// toast() 的默认停留时间
var DURATION_TOAST = 3000;

var toastTimerId = null;

var _eventListener = null;

var Util = {};
/**
 * 合并两个对象，其中以a的属性为基础，用b的属性来覆盖a
 * 然后返回一个新的对象
 */
Util.mergeOjbects = function (_a, _b) {
  var c = {};
  var a = _a || {};
  var b = _b || {};

  for (var key in a) {
    c[key] = a[key];
  }

  for (var key in b) {
    c[key] = b[key];
  }

  return c;
};

/**
 * 一个兼容的事件处理程序注册方法
 * @param {Object} element [DOM | BOM 对象]
 * @param {String} type    [事件类型]
 * @param {Function} handler [处理函数]
 */
Util.addEventHandler = function (element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
};

Util.removeEventHandler = function (element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, handler);
  } else {
    element['on' + type] = null;
  }
};

Util.getEventTarget = function (e) {
  var target = (e && e.target) || window.event.srcElement;
  return target;
};

Util.normalizeUserOption = function (option, onClose) {
  var userOption = option || {};
  if (typeof option === 'string') {
    userOption = {
      text: option
    };
  }

  if (typeof onClose === 'function') {
    userOption.onClose = onClose;
  }

  return userOption;
};

// remove an DOM element
Util.remove = function (element) {
  // Polyfill, 目前看起来有些多余……
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

/**
 * 从 HTML 字符串来创建元素
 * @param  {[type]} htmlStr [description]
 * @return {[type]}         [description]
 */
Util.createElement = function (htmlStr) {
  var div = document.createElement('div');
  div.innerHTML = htmlStr;
  return div.childNodes;
};


Util.addClass = function (element, newClassName) {
  var oldClassName = element.className;
  element.className = oldClassName + ' ' + newClassName;
  return element;
};


/**
 * 将元素淡出
 * @param  {[type]} element [description]
 */
Util.fadeOut = function (element) {
  clearTimeout(toastTimerId);

  // element.style.transition = 'opacity 0.35s';
  element.style.opacity = '0';

  // toastTimerId = setTimeout(function() {
  element.style.display = 'none';
  // }, CSS_ANIMATION_DURATION);
};

/**
 * 将右侧的message box向右侧滑动出去
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
Util.slideRightOut = function (element) {
  element.style.opacity = '0';
  element.style.left = '110%';

  setTimeout(function () {
    element.style.display = 'none';
    Util.remove(element);
  }, CSS_ANIMATION_DURATION);
};

/**
 * 将元素缩小同时淡出
 * @param  {[type]} element [description]
 */
Util.shrinkOut = function (element) {
  // TODO
}

var GLOBAL_TOAST_ID = 'global-toast-container';
var GLOBAL_MESSAGE_STACK_ID = 'global-message-stack-container';

var defaultOption = {
  // 对于 toast, duration 规定了在多长时间（毫秒）后将其关闭
  duration: 3000,

  // 只有 toast.alert 或者 toast.confirm 有标题
  title: '',
  text: '',
  autoHide: true,

  // onClose 被 alert、success 所用到
  onClose: null,

  // 下面两个是只有confirm对话框才支持的回调函数
  // 它们与 callback 选项是互斥的关系
  // 即，在试用 toast.confirm() 方法时，不必传入 callback 属性
  onCancel: null,
  onConfirm: null,

  // UI config
  showCloseBtn: true,
  price: '',
  closeBtnText: '关闭',
  sureBtnText: '确定',
  cancelBtnText: '取消',

  // animation config
  // TODO
  animation: {
    show: true,
    in: 'slide-top',
    out: ''
  },
};

var htmlSuccessPart = '' +
  '<div class="success-icon">' +
  '</div>';

var htmlErrorPart = '' +
  '<div class="success-icon">' +
  '<i class="ticon-frown-circle"></i>' +
  '</div>';

var htmlWarnPart = '' +
  '<div class="warn-icon">' +
  '</div>';

var htmlWarn2Part = '' +
  '<div class="warn-icon2">' +
  '</div>';


// 模板1，长方形，目的是显示大段文本，带有遮罩层、一个“确定”按钮。alert 所用
function template_alert_generator(option) {
  var icon = '';
  var alertTypeClassName = option.type || '';

  if (option.type === 'success') {
    icon = htmlSuccessPart;
  } else if (option.type === 'error') {
    icon = htmlErrorPart;
  } else if (option.type === 'warn') {
    icon = htmlWarnPart;
  } else if (option.type === 'warn_2') {
    icon = htmlWarn2Part;
  }

  var templateHTML_alert = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg ' + alertTypeClassName + '">' +
    icon +
    '<div class="body">{{text}}</div>' +
    '<div class="toast-placeholder"></div>' +
    '<div class="footer"><a data-role="close" href="javascript: void(0);">{{sureBtnText}}</a></div>' +
    '</div>';

  return templateHTML_alert;
};

function template_alert_kf_generator(option) {
  var icon = '';
  var alertTypeClassName = option.type || '';

  if (option.type === 'success') {
    icon = htmlSuccessPart;
  } else if (option.type === 'error') {
    icon = htmlErrorPart;
  } else if (option.type === 'warn') {
    icon = htmlWarnPart;
  } else if (option.type === 'warn_2') {
    icon = htmlWarn2Part;
  }

  var templateHTML_alert = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg ' + alertTypeClassName + '">' +
    icon +
    '<div class="body">{{text}}</div>' +
    '<div class="toast-help">如需帮助请拨打客服电话：<em>4006900000-3-2-5-2-0</em></div>' +
    '<div class="footer"><a data-role="close" href="javascript: void(0);">{{sureBtnText}}</a></div>' +
    '</div>';

  return templateHTML_alert;
};

// 模板2，长方形，没有icon，目的是显示大段文本以进行确认，带有遮罩层、两个按钮。confirm 所用
function template_confirm_generator(option) {
  var icon = '';
  var alertTypeClassName = option.type || '';

  if (option.type === 'success') {
    icon = htmlSuccessPart;
  } else if (option.type === 'error') {
    icon = htmlErrorPart;
  } else if (option.type === 'warn') {
    icon = htmlWarnPart;
  } else if (option.type === 'warn_2') {
    icon = htmlWarn2Part;
  }

  var templateHTML_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg ' + alertTypeClassName + '">' +
    icon +
    '<div class="body">{{text}}</div>' +
    '<div class="toast-placeholder"></div>' +
    '<div class="footer">' +
    '<a data-role="confirm" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    '</div>' +
    '</div>';

  return templateHTML_confirm;
};

// 模板2，长方形，没有icon，目的是显示大段文本以进行确认，带有遮罩层、两个按钮。confirm 所用
function template_confirm_kf_generator(option) {
  var icon = '';
  var alertTypeClassName = option.type || '';

  if (option.type === 'success') {
    icon = htmlSuccessPart;
  } else if (option.type === 'error') {
    icon = htmlErrorPart;
  } else if (option.type === 'warn') {
    icon = htmlWarnPart;
  } else if (option.type === 'warn_2') {
    icon = htmlWarn2Part;
  }

  var templateHTML_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg ' + alertTypeClassName + '">' +
    icon +
    '<div class="body">{{text}}</div>' +
    '<div class="toast-help">如需帮助请拨打客服电话：<em>4006900000-3-2-5-2-0</em></div>' +
    '<div class="footer">' +
    '<a data-role="confirm" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    '</div>' +
    '</div>';

  return templateHTML_confirm;
};

// 模板3，小长方形，没有icon，目的是显示小段文本，无遮罩层，无按钮，全局永远只有一个，会自动消失。toast 所用
var templateHTML_toast = '<div class="toast-content toast">' +
  '<div class="toast-body">{{text}}</div>' +
  '</div>';

// 模板4，中等尺寸的长方形。所有的 msg-box 在屏幕的右侧形成一个 error stack.
function template_msg_box_generator(option) {
  var animationInClassName = 'a-' + option.animation.in;
  var hideBtn = option.autoHide && !option.showCloseBtn;
  var bodyClassName = hideBtn ? 'body fully-scaled' : 'body';

  var template_msg_box = '<div class="msg-box ' + animationInClassName + ' theme-{{type}}">' +
    '<div class="' + bodyClassName + '">' +
    '<div><strong>{{title}}</strong></div>' +
    '<div>{{text}}</div>' +
    '</div>' +
    (hideBtn ? '' : '<div class="close" data-role="close">{{closeBtnText}}</div>') +
    '</div>';
  return template_msg_box;
};


// 模板5，正方形，有icon，带有遮罩层。
var templateHTML_success = '' +
  '<div class="toast-content toast-msg toast-success">' +
  htmlSuccessPart +
  '<div class="body">{{text}}</div>' +
  '</div>';


// 模板6，小炮支付 confirm 所用
function template_confirm_pao_generator(option) {
  var icon = '';
  var templateHTML_pao_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-pao">' +
    '<div class="toast-pao-head">' +
    '<span class="toast-pao-head-link">小炮智能预测精彩呈现</span>' +
    '<a  data-role="close" href="javascript:;" class="toast-pao-head-close"></a>' +
    '</div>' +
    '<div class="toast-pao-icon"></div>' +
    '<div class="toast-pao-body">{{text}}</div>' +
    '<div class="toast-pao-txt">本平台仅提供预测，不售卖彩票</div>' +
    '<div class="footer">' +
    '<div class="toast-pao-price">应付金额：<span class="toast-pao-money">{{price}}</span>炮弹<span class="toast-pao-money-old">{{oldPrice}}炮弹</span></div>' +
    '<a data-role="confirm" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    '</div>' +
    '</div>';

  return templateHTML_pao_confirm;
};
// 模板6，小炮微信支付confirm所用
function template_confirm_wx_generator(option) {
  var icon = '';
  var templateHTML_wx_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-pao">' +
    '<div class="toast-wx-body"><img class="toast-wx-code" src={{text}} alt="wx_code" /></div>' +
    '<div class="footer">' +
    '<div class="toast-pao-price">应付金额：<span class="toast-pao-money">{{price}}</span></div>' +
    '<a data-role="confirm" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    '</div>' +
    '</div>';

  return templateHTML_wx_confirm;
};
// 模板6，小炮图片验证码confirm所用
function template_confirm_imagecode_generator(option) {
  var templateHTML_imagecode_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-imagecode">' +
    '<div class="toast-imagecode-title">请输入图片验证码</div>' +
    '<div class="toast-imagecode-body">' +
    '<div class="toast-imagecode-box">' +
    '<input type="text" id="toast-imagecode-input" class="toast-imagecode-input" name="toast-imagecode-input" autocomplete="off" placeholder="请输入图片验证码" />' +
    '<div id="toast-imagecode-pic">' +
    '<img src="{{text}}" alt="刷新" id="toast-imagecode-img" />' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="toast-imagecode-error"></div>' +
    '<div class="footer">' +
    '<a data-role="confirm_imagecode" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    '</div>' +
    '</div>';

  return templateHTML_imagecode_confirm;
};
// 模板7，长方形，没有icon，目的是显示大段文本以进行确认，带有遮罩层、两个按钮。confirm 所用
function template_confirm_login_generator(option) {
  var hideBtn = option.autoHide && !option.showCloseBtn;

  var templateHTML_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-login">' +
    '<div class="toast-login-body">{{text}}</div>' +
    '<a data-role="confirm" class="toast-login-confirm" href="javascript: void(0);">{{sureBtnText}}</a>' +
    '<a data-role="cancel" class="toast-login-cancel" href="javascript: void(0);">{{cancelBtnText}}</a>' +
    (hideBtn ? '' : '<div class="toast-icon-close" data-role="close"></div>') +
    '</div>';

  return templateHTML_confirm;
};




// 一个非常简易的模板引擎
function compileTemplate(tpl, data) {
  var re = /{{([^}}]+)?}}/g;
  var match;
  while (match = re.exec(tpl)) {
    tpl = tpl.replace(match[0], data[match[1]]);
  }
  return tpl;
};

/**
 * @param {Object} [preOpt] [Toast 对象的每个内置方法都内置一个 proOpt]
 * @param {String} [type] [type 可以为 'toast' | 'alert' | 'confirm' 之一]
 */
function addContentToToastDiv(preOpt, userOpt, templateType) {
  // 在加入新的Toast之前先清除之前的setTimeout
  if (toastTimerId) {
    clearTimeout(toastTimerId);
    toastTimerId = null;
  }

  templateType = templateType || 'toast';

  var opt = Util.mergeOjbects(preOpt, userOpt);

  var option = Util.mergeOjbects(defaultOption, opt);

  var $toast = document.getElementById(GLOBAL_TOAST_ID);
  if (!$toast) {
    $toast = document.createElement('div');
    $toast.id = GLOBAL_TOAST_ID;
    $toast.className = 'toast-container';
    document.body.appendChild($toast);
  }

  var self = {};
  self.html = function (htmlStr) {
    $toast.innerHTML = htmlStr;
    return self;
  };

  self.show = function () {
    var vd = viewData();
    $($toast).show();
    var $layout = $($toast).find('.toast-content');
    var layout = $layout[0];
    var cHeight = layout.offsetHeight;
    layout.style.visibility = "hidden";
    layout.style.marginTop = (vd.viewHeight / 2 - cHeight / 2 - 80) + 'px';
    layout.style.visibility = "visible";
    $toast.setAttribute('style', 'display: block');
    return self;
  };

  var TemplateEnum = {
    toast: templateHTML_toast,
    alert: template_alert_generator(option),
    alert_kf: template_alert_kf_generator(option),
    confirm: template_confirm_generator(option),
    confirm_kf: template_confirm_kf_generator(option),
    confirm_pao: template_confirm_pao_generator(option),
    confirm_wx: template_confirm_wx_generator(option),
    confirm_imagecode: template_confirm_imagecode_generator(option),
    confirm_login: template_confirm_login_generator(option),
    success: templateHTML_success,
    error: template_alert_generator(Util.mergeOjbects(option, {
      type: 'error'
    }))
  };

  var compiled = compileTemplate(TemplateEnum[templateType], option);

  self.html(compiled).show();

  if (templateType === 'toast' || option.autoHide) {
    toastTimerId = setTimeout(function () {
      Util.fadeOut($toast);
    }, option.duration);
  }

  // 每次生成一个新的 alert/toast 时（不包括 message），把之前的事件处理函数移除
  if (_eventListener) {
    Util.removeEventHandler($toast, 'click', _eventListener);
  }

  _eventListener = function (e) {
    e.stopPropagation();
    var target = Util.getEventTarget(e);
    var role = target.getAttribute('data-role');

    if (['close', 'cancel', 'confirm'].indexOf(role) > -1) {
      Util.fadeOut($toast);
    }

    switch (role) {
      case 'close':
        if (typeof option.onClose === 'function') {
          option.onClose();
          option.onClose = null;
        }
        break;
      case 'cancel':
        if (typeof option.onCancel === 'function') {
          option.onCancel();
          option.onCancel = null;
        }
        break;
      case 'confirm':
        if (typeof option.onConfirm === 'function') {
          option.onConfirm();
          option.onConfirm = null;
        }
        break;
      case 'confirm_imagecode':
        if (typeof option.onConfirm === 'function') {
          option.onConfirm();
        }
        break;
      default:
        ;
    }
  };

  Util.addEventHandler($toast, 'click', _eventListener);
};

/**
 * @param [String] {text} 向错误栈中推送错误
 */
function addMessage(preOpt, userOpt) {
  var opt = Util.mergeOjbects(preOpt, userOpt);
  var option = Util.mergeOjbects(defaultOption, opt);

  var $msgStack = document.getElementById(GLOBAL_MESSAGE_STACK_ID);

  if (!$msgStack) {
    $msgStack = document.createElement('div');
    $msgStack.className = 'toast-msg-stack';
    $msgStack.id = GLOBAL_MESSAGE_STACK_ID;
    document.body.appendChild($msgStack);
  }

  var $errorBox = Util.createElement(
    compileTemplate(template_msg_box_generator(option), option)
  );

  // 消息队列遵循“后来居上”的原则
  // 下面要在消息队列的第一个子节点之前插入新的message box
  var theFirstMsgBox = $msgStack.firstChild;
  $msgStack.insertBefore($errorBox[0], theFirstMsgBox);

  // var length = $msgStack.childNodes.length;
  var nowItBecomes = $msgStack.childNodes[0];

  var msgTimerFlag = null;
  var msgTimerStamp;
  var msgTimerLeft = option.duration;

  if (option.autoHide) {
    msgTimerStamp = +new Date();
    msgTimerFlag = setTimeout(function () {
      Util.slideRightOut(nowItBecomes);
    }, option.duration);
  }

  Util.addEventHandler(nowItBecomes, 'click', function (e) {
    var target = Util.getEventTarget(e);
    var role = target.getAttribute('data-role');
    e.stopPropagation();

    if (role === 'close') {
      clearTimeout(msgTimerFlag);
      var msgTimerFlag = null;
      Util.slideRightOut(nowItBecomes);
    }
  });

  if (option.autoHide) {
    Util.addEventHandler(nowItBecomes, 'mouseenter', function (e) {
      var target = Util.getEventTarget(e);

      if (msgTimerFlag) {
        clearTimeout(msgTimerFlag);
        msgTimerFlag = null;
        msgTimerLeft = option.duration - (+new Date() - msgTimerStamp);

        // 这样做的原因是，不要让message在用户的鼠标离开后立即消失，而是友好地等待1秒
        if (msgTimerLeft < 1000) {
          msgTimerLeft = 1000;
        }
      }
    });

    Util.addEventHandler(nowItBecomes, 'mouseleave', function (e) {
      var target = Util.getEventTarget(e);

      if (option.autoHide) {
        msgTimerFlag = setTimeout(function () {
          Util.slideRightOut(nowItBecomes);
        }, msgTimerLeft);
      }
    });
  }
};


/**
 * 最终 export 的对象
 * @type {Object}
 */
var Toast = function (option, onClose) {
  var userOption = Util.normalizeUserOption(option, onClose);
  delete userOption.title;

  var presetOption = {
    autoHide: true,
    duration: DURATION_TOAST
  };
  addContentToToastDiv(presetOption, userOption);
};

Toast.alert = function (option, onClose) {
  var userOption = Util.normalizeUserOption(option, onClose);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  try {
    addContentToToastDiv(presetOption, userOption, 'alert');
  } catch (err) {
    console.error(err);
  }
};
Toast.alert_kf = function (option, onClose) {
  var userOption = Util.normalizeUserOption(option, onClose);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  try {
    addContentToToastDiv(presetOption, userOption, 'alert_kf');
  } catch (err) {
    console.error(err);
  }
};

Toast.confirm = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm');
};
Toast.confirm_kf = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm_kf');
};
Toast.confirm_pao = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm_pao');
};
Toast.confirm_wx = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm_wx');
};
Toast.confirm_imagecode = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm_imagecode');
};

Toast.success = function (option, onClose) {
  var userOption = Util.normalizeUserOption(option, onClose);
  delete userOption.autoHide;

  var presetOption = {
    title: '成功',
    text: '',
    autoHide: true,
    duration: DURATION_TOAST + 500
  };

  addContentToToastDiv(presetOption, userOption, 'success');
};

Toast.confirm_login = function (option) {
  var userOption = Util.normalizeUserOption(option);

  var presetOption = {
    title: '',
    text: '',
    autoHide: false,
  };

  addContentToToastDiv(presetOption, userOption, 'confirm_login');
};

// TODO
Toast.error = function (option, onClose) {
  var userOption = Util.normalizeUserOption(option, onClose);

  var presetOption = {
    title: '出错了',
    text: '',
    autoHide: false
  };

  addContentToToastDiv(presetOption, userOption, 'error');
};

function toastMessage(option, type) {
  var userOption = Util.normalizeUserOption(option);

  type = type || 'message';

  var presetOption = {
    text: '',
    // message 都是会自动隐藏的
    autoHide: true,
    duration: 7000,
    type: type
  };

  addMessage(presetOption, userOption);
};

Toast.message = function (option) {
  toastMessage(option);
};

Toast.danger = function (option) {
  toastMessage(option, 'danger');
};

Toast.info = function (option) {
  toastMessage(option, 'info');
};

Toast.show = function () {
  var $toast = $('#global-toast-container');
  if ($toast.length > 0) {
    var vd = viewData();
    var $layout = $($toast).find('.toast-content');
    var layout = $layout[0];
    var cHeight = layout.offsetHeight;
    layout.style.marginTop = (vd.viewHeight / 2 - cHeight / 2 - 80) + 'px';
  }
};

export default Toast
