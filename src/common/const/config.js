let env = ''
let baseURL = ''
let PAGEURLS = null
if (env === 'yangxing') {
  baseURL = '//yangxing.match.lottery.sina.com.cn/client/index/clientProxy/'

  PAGEURLS = {
    PAOHOME: '//lottery.sina.com.cn/ai/',
    QTHOME: '//lottery.sina.com.cn/qiutong/',
    DATALIST: '//match.lottery.sina.com.cn/',
    PERSPECTIVE: '//match.lottery.sina.com.cn/perspective.html?id=',
    ALGORITHM: '//match.lottery.sina.com.cn/algorithm.html',
    ALGORITHMBYID: '//match.lottery.sina.com.cn/algorithm.html?id=',
    AIPAY: '//match.lottery.sina.com.cn/aipay.html?pdtIds=',
    LOGIN: '//match.lottery.sina.com.cn/ai/login/',
    RANKING: '//lottery.sina.com.cn/ai/ranking/',
    YOUHUI: '//lottery.sina.com.cn/ai/youhui/',
    ACCOUNT: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account',
    MYPLAN: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_plan=1',
    MYPERSPECTIVE: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_perspective=1',
    MYALGORITHM: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_algorithm=1',
    ORDER: '//match.lottery.sina.com.cn/order.html',
    SUCCESS: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=success',
    ACCOUNTSET: '//match.lottery.sina.com.cn/ai/account_set/',
    RECHARGE: '//lottery.sina.com.cn/ai/cz/',
    FOOTBALLSJ: '//lottery.sina.com.cn/ai/match/football/sj.shtml',
    NBAMX: '//lottery.sina.com.cn/ai/match/nba/mx.shtml',
    MATCHPAY: '//match.lottery.sina.com.cn/ai/match_pay/?pdtIds=',
    BAOPAY: '//match.lottery.sina.com.cn/ai/bao_pay/',
    CZPAY: '//match.lottery.sina.com.cn/ai/cz_pay/',
    BAOLIST: '//match.lottery.sina.com.cn/ai/account_pl/',
    ACCOUNTNICKURL: '//match.lottery.sina.com.cn/ai/account_nick/',
    WELFARE: '//lottery.sina.com.cn/ai/welfare/',
    APP: '//lottery.sina.com.cn/ai/app/download/'
  }
} else {
  baseURL = '//match.lottery.sina.com.cn/client/index/clientProxy/'

  PAGEURLS = {
    PAOHOME: '//lottery.sina.com.cn/ai/',
    QTHOME: '//lottery.sina.com.cn/qiutong/',
    DATALIST: '//lottery.sina.com.cn/ai/datalist.shtml',
    PERSPECTIVE: '//match.lottery.sina.com.cn/render?__t__=perspective&id=',
    ALGORITHM: '//match.lottery.sina.com.cn/render?__t__=algorithm',
    // ALGORITHM: '//match.lottery.sina.com.cn/algorithm.html',
    ALGORITHMBYID: '//match.lottery.sina.com.cn/render?__t__=algorithm&id=',
    AIPAY: '//match.lottery.sina.com.cn/render?__t__=aipay&pdtIds=',
    LOGIN: '//match.lottery.sina.com.cn/ai/login/',
    RANKING: '//lottery.sina.com.cn/ai/ranking/',
    YOUHUI: '//lottery.sina.com.cn/ai/youhui/',
    ACCOUNT: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account',
    MYPLAN: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_plan=1',
    MYPERSPECTIVE: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_perspective=1',
    MYALGORITHM: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=account&is_algorithm=1',
    ORDER: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=order',
    SUCCESS: '//match.lottery.sina.com.cn/ballbest/index/render?__t__=success',
    ACCOUNTSET: '//match.lottery.sina.com.cn/ai/account_set/',
    RECHARGE: '//lottery.sina.com.cn/ai/cz/',
    FOOTBALLSJ: '//lottery.sina.com.cn/ai/match/football/sj.shtml',
    NBAMX: '//lottery.sina.com.cn/ai/match/nba/mx.shtml',
    MATCHPAY: '//match.lottery.sina.com.cn/ai/match_pay/?pdtIds=',
    BAOPAY: '//match.lottery.sina.com.cn/ai/bao_pay/',
    CZPAY: '//match.lottery.sina.com.cn/ai/cz_pay/',
    BAOLIST: '//match.lottery.sina.com.cn/ai/account_pl/',
    ACCOUNTNICKURL: '//match.lottery.sina.com.cn/ai/account_nick/',
    WELFARE: '//lottery.sina.com.cn/ai/welfare/',
    APP: '//lottery.sina.com.cn/ai/app/download/'
  }
}

const commonParams = {
  format: "json",
  __caller__: "web",
  __version__: "1",
  __verno__: 1,
  // _flush_cache:"1",
}
const commonPostParams = {
  format: "json",
  __caller__: "web",
  __verno__: 1
}

const ERR_OK = 0

const DEFAULTHEADPORTRAITURL = '//n.sinaimg.cn/sports/lottpao/v120/wap/i/header_sidebar_face.png'

const WEEK_NAME = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export {
  env,
  baseURL,
  PAGEURLS,
  commonParams,
  commonPostParams,
  ERR_OK,
  DEFAULTHEADPORTRAITURL,
  WEEK_NAME
}

window.__config = {
  env,
  baseURL,
  PAGEURLS,
  commonParams,
  commonPostParams,
  ERR_OK,
  DEFAULTHEADPORTRAITURL,
  WEEK_NAME
}

