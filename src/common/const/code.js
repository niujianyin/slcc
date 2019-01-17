/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/21 17:28
 */
export const STATECODE = {
  'SUCCESS': 200,
  'INVALID': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'ERROR': 500
}


export const SMSTYPECODE = {}
// '1' => 'phone_register',        //手机号注册
SMSTYPECODE.PHONE_REGISTER = 1;
// '2' => 'phone_login',           //手机号登入
SMSTYPECODE.PHONE_LOGIN = 2;
// '3' => 'set_pay_password',      //设置支付密码
SMSTYPECODE.SET_PAY_PASSWORD = 3;
// '4' => 'update_pay_password',   //重置支付密码
SMSTYPECODE.UPDATE_PAY_PASSWORD = 4;
// '5' => 'third_login',           //第三方注册
SMSTYPECODE.THIRD_LOGIN = 5;
// '6' => 'phone_update_old',      //修改手机号, 校验原手机号短信验证码
SMSTYPECODE.PHONE_UPDATE_OLD = 6;
// '7' => 'update_loginpwd',       //忘记登入密码（登入的情况下）
SMSTYPECODE.UPDATE_LOGINPWD = 7;
// '8' => 'forget_loginpwd',       //忘记登入密码（未登入的情况下）
SMSTYPECODE.FORGET_LOGINPWD = 8;
// '9' => 'phone_update_new',      //修改手机号, 校验新手机号短信验证码
SMSTYPECODE.PHONE_UPDATE_NEW = 9;


export const ERR_CODE = {};
// 0 => 'success',
ERR_CODE.SUCCESS = 0;
// 500 => '未知异常',
ERR_CODE.UNDEFINED = 500;
// 1000 => '非法的cat参数',
ERR_CODE.CAT_FAIL = 1000;
// 1001 => '找不到对应的action',
ERR_CODE.ACTION_FAIL = 1001;
// 1002 => '参数校验失败',
ERR_CODE.PARAM_FAIL = 1002;
// 1003 => '前置处理失败',
ERR_CODE.PRE_FAIL = 1003;
// 1004 => '参数[__verno__或者__caller__或cat1]未设置',
ERR_CODE.CAT1_FAIL = 1004;
// 1005 => '找不到对应的调用者配置',
ERR_CODE.CONFIG_FAIL = 1005;
// 1006 => '服务已停用',
ERR_CODE.SERVER_STOP = 1006;
// 1007 => '数据返回异常',
ERR_CODE.DATA_EXCEPTION = 1007;
// 1008 => '非法的Cache方法调用',
ERR_CODE.CACHE_ILLEGAL = 1008;
// 1111 => '维护通知预告',
ERR_CODE.MAINTENANCE = 1111;


// 2000-3000：JWT报出来的错误码
// 2000 => '非法的Request Method',
ERR_CODE.JWT_ILLEGAL_REQUEST = 2000;
// 2001 => '非法的jwt请求参数',
ERR_CODE.JWT_ILLEGAL_PARAM = 2001;
// 2002 => '生成jwt失败',
ERR_CODE.JWT_ILLEGAL_CREAT = 2002;
// 2003 => '请求爱彩member接口失败',
ERR_CODE.JWT_ILLEGAL_MEMBER = 2003;
// 2004 => '从header获取jwt失败',
ERR_CODE.JWT_ILLEGAL_HEADER = 2004;
// 2005 => 'jwt未生效，请稍后再试',
ERR_CODE.JWT_ILLEGAL_INOPERATIVE = 2005;
// 2006 => 'jwt已失效',
ERR_CODE.JWT_ILLEGAL_EXPIRED = 2006;
// 2007 => '无效的jwt签名',
ERR_CODE.JWT_ILLEGAL_INVALID = 2007;
// 2008 => '无法解析的jwt',
ERR_CODE.JWT_ILLEGAL_ANALYSIS = 2008;
// 2009 => '非法的参数',
ERR_CODE.JWT_ILLEGAL_PARAM1 = 2009;
// 2010 => '无法解析的jwt',
ERR_CODE.JWT_ILLEGAL_ANALYSIS1 = 2010;
// 2011 => 'jwt解析结果为空',
ERR_CODE.JWT_ILLEGAL_ANALYSIS_NULL = 2011;
// 2012 => '无效的jwt token data签名',
ERR_CODE.JWT_ILLEGAL_TOKEN = 2012;
// 2013 => '参数uid与jwt中获取到uid不一致',
ERR_CODE.JWT_ILLEGAL_UID = 2013;
// 2014 => '处理client_id数据异常',
ERR_CODE.JWT_ILLEGAL_CLIENT_ID = 2014;

// 3000-3500：access_token报出来的错误码
// 3000 => 'access_token不能为空',
// 3001 => '非法access_token',
// 3002 => 'access_token已失效',
// 3003 => '无效的access_token签名',

// 3500-4000 请求签名校验错误码
// 3501 => '签名不能为空',
ERR_CODE.JWT_SIGN_NULL = 3501;
// 3502 => '无效的sign',
ERR_CODE.JWT_SIGN_INVALID = 3502;

// 爱彩对接相关错误码
// 200 => 'success',
// 201 => 'success',
// 300 => '请先绑定手机号码',
// 400 => '第三方id不能为空',
// 444 => '该手机号已经被注册',

// 4000-9999：预留错误码
// 4001 => '体育类型错误',
// 4002 => '暂无比赛显示',
// 4003 => '暂无本场预测数据',
// 4004 => '玩法类型格式错误',
// 4005 => 'Model找不到对应的类',
// 4006 => 'Model找不到对应的方法',
// 4007 => '价格不合法',
// 4008 => '从cookie中获取UID失败',
// 4009 => '支付失败',
// 4010 => '请求接口失败，返回数据异常',
// 4011 => '请求的数据不存在，返回数据为空',
// 4012 => '数据库操作失败',
// 4013 => '获取用户ID失败',
// 4014 => '用户暂无购买记录',
// 4015 => '关注比赛失败',
// 4016 => '取消关注比赛失败',

// 4020 => '微博accessToken获取失败',

// 5001 => '保存问题反馈失败',

// 7000-8000 文件上传错误
// 7000 => '根目录不存在',
// 7001 => '子目录创建失败',
// 7002 => '文件名设置失败',
// 7003 => '上传组建的filename没有配置',
// 7004 => '文件上传失败',

// 10000起为各服务自行报错码，各服务用到的错误码必须要在这个类里登记才能使用，
// 10000-11000 分享错误码
// 10001 => '非法的share type',
// 10002 => '无法解析的share url',

// 11000-12000 小炮会员注册错误码
// 11001 => '非法的actionType',
ERR_CODE.REGISTER_ACTIONTYPE_ILLEGAL = 11001;
// 11002 => '错误的function配置',
ERR_CODE.REGISTER_FUNCTION_ILLEGAL = 11002;
// 11003 => '无法解析的接口返回数据',
ERR_CODE.REGISTER_DATA_ILLEGAL = 11003;
// 11004 => '短信验证码发送失败',
ERR_CODE.REGISTER_MESSAGE_SEND_FAIL = 11004;
// 11005 => '非法的member_id生成策略',
ERR_CODE.REGISTER_MEMBER_ID_ILLEGAL = 11005;
// 11006 => '生成member_id失败',
ERR_CODE.REGISTER_MEMBER_ID_FAIL = 11006;
// 11007 => '该手机号已经被注册',
ERR_CODE.REGISTER_PHONE_HAS = 11007;
// 11008 => '生成pao_member记录失败',
ERR_CODE.REGISTER_PAO_MEMBER_FAIL = 11008;
// 11009 => '生成pao_member_third_account记录失败',
ERR_CODE.REGISTER_PAO_MEMBER_THIRD_ACCOUNT = 11009;
// 11010 => '第三方登录校验不通过',
ERR_CODE.REGISTER_THIRD_LOGIN_FAIL = 11010;
// 11011 => '不支持此第三方登录类型',
ERR_CODE.REGISTER_THIRD_LOGIN_NO = 11011;
// 11012 => '此第三方账号已被其他用户绑定',
ERR_CODE.REGISTER_THIRD_LOGIN_OTHER_BIND = 11012;
// 11013 => '请先绑定手机号码',
ERR_CODE.REGISTER_UNBIND_PHONE = 11013;

// 11014 => '修改登入密码失败',
ERR_CODE.REGISTER_CHANGE_LOGIN_PWD_FAIL = 11014;
// 11015 => '原登入密码输入有误',
ERR_CODE.REGISTER_ENTER_LOGIN_PWD_FAIL = 11015;
// 11016 => '修改支付密码失败',
ERR_CODE.REGISTER_CHANGE_PAY_PWD_FAIL = 11016;
// 11017 => '原支付密码输入有误',
ERR_CODE.REGISTER_ENTER_PAY_PWD_FAIL = 11017;
// 11018 => '无法再次设置支付密码',
ERR_CODE.REGISTER_SET_PAY_PWD_FAIL = 11018;
// 11021 => '该用户已经绑定手机号',
ERR_CODE.REGISTER_HAS_BIND_PHONE = 11021;
// 11024 => '余额支付状态异常，请重新设置支付密码',
ERR_CODE.REGISTER_BALANCE_ILLEGAL = 11024;
// 11025 => '支付密码输入错误，请重新输入',
ERR_CODE.REGISTER_ENTER_PAY1_PWD_FAIL = 11025;
// 11026 => '生成pao_member_wallet记录失败',
ERR_CODE.REGISTER_PAO_MEMBER_WALLET_FAIL = 11026;
// 11027 => '登入密码包含非法字符，请重新输入',
ERR_CODE.REGISTER_LOGIN_PWD_HAS_ILLEGAL_WORD = 11027;
// 11028 => '支付密码包含非法字符，请重新输入',
ERR_CODE.REGISTER_PAY_PWD_HAS_ILLEGAL_WORD = 11028;
// 11029 => '账户包含非法字符，请重新输入',
ERR_CODE.REGISTER_ACCOUNT_HAS_ILLEGAL_WORD = 11029;
// 11030 => '用户昵称包涵非法字符，请重新输入',
ERR_CODE.REGISTER_NICK_HAS_ILLEGAL_WORD = 11030;
// 11031 => '设置登入密码失败',
ERR_CODE.REGISTER_SET_LOGIN_PWD_FAIL = 11031;
// 11032 => '此用户已经绑定过其他三方账号',
ERR_CODE.REGISTER_ACCOUNT_BIND_THIRD = 11032;
// 11033 => '此手机号与三方账号已经绑定过',
ERR_CODE.REGISTER_PHONE_BIND_THIRD = 11033;
// 11034 => '数据修改失败',
ERR_CODE.REGISTER_CHANGE_DATA_FAIL = 11034;
// 11035 => '上传头像失败',
ERR_CODE.REGISTER_UPLOAD_AVATAR_FAIL = 11035;
// 11036 => '文件大小最大限制为1M',
ERR_CODE.REGISTER_LIMIT_1M = 11036;
// 11037 => '文件格式仅支持JPG,JPEG和PNG',
ERR_CODE.REGISTER_SUPPORT_IMG = 11037;
// 11038 => '文件不可写',
ERR_CODE.REGISTER_FILE_NOT_WRITE = 11038;
// 11039 => '第三方帐号解绑失败',
ERR_CODE.REGISTER_THIRD_UNBIND_FAIL = 11039;
// 11040 => '未设置登入密码',
ERR_CODE.REGISTER_UNSET_LOGIN_PWD = 11040;
// 11041 => '登入密码校验失败',
ERR_CODE.REGISTER_LOGIN_PWD_CHECK_FAIL = 11041;
// 11042 => '微博accessToken获取失败',
ERR_CODE.REGISTER_ACCESSTOKEN_FAIL = 11042;
// 11043 => '账户不可用',
ERR_CODE.REGISTER_ACCOUNT_NO = 11043;
// 11044 => '图片验证码校验失败',
ERR_CODE.REGISTER_IMAGECODE_CHECK_FAIL = 11044;



// 12000-13000 赛事盘口数据错误码
// 12001 => '非法的玩法类型type',
ERR_CODE.JWT_SIGN_INVALID = 12001;

// 14000-14500 短信验证码错误
// 14000 => '短信验证码的用途不明',
ERR_CODE.MESSAGE_UNDEFINED = 14000;
// 14001 => '短信验证码次数已达上限，请明天再试',
ERR_CODE.MESSAGE_HAS_FULL = 14001;
// 14002 => '短信验证码校验失败',
ERR_CODE.MESSAGE_CHECK_FAIL = 14002;
// 14003 => '一分钟之内请勿再次请求', //'短信验证码还未过期，请勿重复请求',
ERR_CODE.MESSAGE_1MINUTE_NO_REQUEST = 14003;
// 14004 => '短信验证码已失效，请重新发送',
ERR_CODE.MESSAGE_INVALID = 14004;
// 14005 => '短信验证码保存失败',
ERR_CODE.MESSAGE_SAVE_FAIL = 14005;
// 14006 => '手机号校验失败',
ERR_CODE.MESSAGE_PHONE_CHECK_FAIL = 14006;
// 14007 => '获取短信验证码失败',
ERR_CODE.MESSAGE_GET_CODE_FAIL = 14007;
// 14008 => '短信验证码的用途不匹配',
ERR_CODE.MESSAGE_CODE_TYPE_UNMATCH = 14008;
// 14009 => '获取短信验证码模版失败',
ERR_CODE.MESSAGE_CODE_TEMPLATE_FAIL = 14009;
// 14010 => '同一个手机号同一验证码模板每30秒只能发送一条',
ERR_CODE.MESSAGE_CODE_30SECOND_NO_REQUEST = 14010;
// 14011 => '内部错误，请重试', // 增加防刷toBindPhone接口机制，缓存失败报错
ERR_CODE.MESSAGE_INSIDE = 14011;
// 14012 => '不是合法请求', // 不可信任的刷接口而报错
ERR_CODE.MESSAGE_NOT_LEGAL_REQUEST = 14012;


// 15010 => 不存在此文章
ERR_CODE.UNARTICLE = 15010;
// 15011 => 您无权查看此内容，请重新登录
ERR_CODE.UNAUTHORIZED = 15011;
// 15007 => 推荐已经停止购买
ERR_CODE.STOPPAY = 15007;
// 15009 => 不存在此专家
ERR_CODE.UNEXPERT = 15009;





// 20000-21000 客户端webview H5页面代理接口错误码
// 20001 => '代理接口返回数据为空',
ERR_CODE.PROXY_DATA_NULL = 20001;

// 30000-31000 数据分析相关错误码
// 30001 => '非法的actionType',
// 30002 => '非法的statsType',
// 30003 => '暂无此leagueType对应的统计数据',
ERR_CODE.NO_LT_DATA=30003;
// 30004 => '非法的sportsType',
// 30005 => '非法的gameType',
// 30006 => '非法的daysStatsType',

// 31000-32000 创建测试账号相关错误码
// 31001 => '已无可用的测试账号',

// 40000-41000 支付相关错误码
// 40001 => '不支持的chargeWay',
ERR_CODE.PAY_NOT_SUPPORT_CHARGEWAY = 40001;
// 40002 => '不支持的checkWallet',
ERR_CODE.PAY_NOT_SUPPORT_CHECKWALLET = 40002;
// 40003 => '不支持的actionType',
ERR_CODE.PAY_NOT_SUPPORT_ACTIONTYPE = 40003;
// 40004 => '不支持的pdtId',
ERR_CODE.PAY_NOT_SUPPORT_PDTID = 40004;
// 40005 => '创建chargeNo失败',
ERR_CODE.PAY_CREATE_CHARGENO_FAIL = 40005;
// 40006 => '非法的订单记录',
ERR_CODE.PAY_ILLEGAL_ORDER_RECORD = 40006;
// 40007 => '非法的交易号记录',
ERR_CODE.PAY_ILLEGAL_TRANSACTION_NUMBER = 40007;
// 40008 => '更新订单数据失败',
ERR_CODE.PAY_UPDATE_ORDER_FAIL = 40008;
// 40009 => '数据库中无此chargeNo',
ERR_CODE.PAY_NOT_DATA_CHARGENO = 40009;
// 40010 => '商品id与支付凭证中不一致',
ERR_CODE.PAY_UNMATCH_ID_VOUCHER = 40010;
// 40011 => '本次交易已失效',
ERR_CODE.PAY_TRANSACTION_EXPIRED = 40011;
// 40012 => '不支持的chargeType',
ERR_CODE.PAY_NOT_SUPPORT_CHARGETYPE = 40012;
// 40013 => '此凭证已经使用过，请勿重复使用',
ERR_CODE.PAY_VOUCHER_EXPIRED = 40013;
// 40014 => 'pdtIds参数校验失败',
ERR_CODE.PAY_PDTIDS_CHECK_FAIL = 40014;
// 40015 => '生成订单失败',
ERR_CODE.PAY_CREATE_ORDER_FAIL = 40015;
// 40016 => 'dc类型只能包含一个单场',
ERR_CODE.PAY_DC_CONTAINER_SINGLEMATCH = 40016;
// 40017 => '非法的赛事id',
ERR_CODE.PAY_ILLEGAL_MATCHID = 40017;
// 40018 => '本场比赛已停止购买',
ERR_CODE.PAY_STOP_MATCH_PURCHASE = 40018;
// 40019 => '您已买过了,请勿重复购买',
ERR_CODE.PAY_HAS_SPURCHASE = 40019;
// 40020 => 'checkWallet和chargeWay参数组合使用非法',
ERR_CODE.PAY_ILLEGAL_CHECKWALLET_CHARGEWAY = 40020;
// 40021 => '非法的订单',
ERR_CODE.PAY_ILLEGAL_ORDER = 40021;
// 40022 => '查询不到此订单',
ERR_CODE.PAY_FIND_ORDER_FAIL = 40022;
// 40023 => '订单已支付，不能重复支付',
ERR_CODE.PAY_NOT_REPEAT_PAY = 40023;
// 40024 => '订单已失效',
ERR_CODE.PAY_ORDER_EXPIRED = 40024;
// 40025 => '价格不正确，请重新刷新页面',
ERR_CODE.PAY_PRICE_ILLEGAL = 40025;
// 40026 => '创建交易失败',
ERR_CODE.PAY_CREATE_CHARGE_FAIL = 40026;
// 40027 => '余额不足',
ERR_CODE.PAY_BALANCE_NOT_EOUGH = 40027;
// 40028 => '支付失败，请稍候重新尝试',
ERR_CODE.PAY_FAIL = 40028;
// 40029 => '支付失败，数据回滚异常',
ERR_CODE.PAY_FAIL_BACK_DATA = 40029;
// 40030 => '支付失败，数据回滚成功',
ERR_CODE.PAY_FAIL_BACK_DATA_SUCCESS = 40030;
// 40031 => '此订单被回滚，不能再做支付',
ERR_CODE.PAY_FAIL_BACK_DATA_NO_PAY = 40031;
// 40032 => '此pdtType类型只能单独结算',
ERR_CODE.PAY_PDTTYPE_SUPPORT_SINGLE_PAY = 40032;
// 40033 => '没有查询到商品相关明细',
ERR_CODE.PAY_NOT_FIND_GOOD_DETAIL = 40033;
// 40034 => '没有查询到商品信息',
ERR_CODE.PAY_NOT_FIND_GOOD_INFO = 40034;
// 40035 => '商品已经下架',
ERR_CODE.PAY_GOOD_OFF = 40035;
// 40036 => 'notify验签失败',
ERR_CODE.PAY_NOTIFY_CHECK_FAIL = 40036;
// 40037 => '非法的out_trade_no',
ERR_CODE.PAY_ILLEGAL_OUT_TRADE_NO = 40037;
// 40038 => '非法的seller_id',
ERR_CODE.PAY_ILLEGAL_SELLER_ID = 40038;
// 40039 => '非法的trade_status',
ERR_CODE.PAY_ILLEGAL_TRADE_STATUS = 40039;
// 40040 => '暂无本场预测数据',
ERR_CODE.PAY_NOT_MATCH_FORECAST_DATA = 40040;
// 40041 => '包内已无可购买的比赛',
ERR_CODE.PAY_BAO_NOT_PAY_MATCH = 40041;
// 40042 => '交易类型错误',
ERR_CODE.PAY_CHARGE_TYPE = 40042;
// 40043 => '交易校验失败',
ERR_CODE.PAY_CHARGE_CHECK = 40043;
// 40044 => 'IAP支付凭证验证失败',
ERR_CODE.PAY_IAP_check = 40044;
// 40045 => '暂未购买单场记录',
ERR_CODE.PAY_NOT_PURCHASE_RECORD = 40045;
// 40046 => '订单未支付',
ERR_CODE.PAY_ORDER_NO_PURCHASE = 40046;
// 40047 => '验证失败，请稍后再试'
ERR_CODE.PAY_CHECK_FAIL = 40047;


// 40048=>'充值卡购买限制次数limit参数错误'
ERR_CODE.PAY_CZHD_LIMIT_PARAM_FAIL = 40048;
// 40049=>'限制充值卡购买的次数已经超过限制次数'
ERR_CODE.PAY_CZHD_LIMIT_FAIL = 40049;
// 40050=>'输入的金额类型错误，请重试'
ERR_CODE.PAY_CZHD_TYPE_FAIL = 40050;
// 40051=>'起充价格至少200元'
ERR_CODE.PAY_CZHD_MIN_FIAL = 40051;

// 无赔率信息
ERR_CODE.MATCH_NO_DATA = 51001;
// 定制失败
ERR_CODE.MATCH_MKERR=51003;
// 最多选20家
ERR_CODE.MATCH_MK_MAX20 = 51004;
// 您暂未定制赔率公司，点击右上角开启定制
ERR_CODE.MATCH_MK_NO = 51005;

