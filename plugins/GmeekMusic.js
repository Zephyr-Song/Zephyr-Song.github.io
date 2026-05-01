/**
 * Gmeek Music Player v8 - 华语私人雷达歌单 + 悬浮歌词
 * 纯 HTML5 Audio,无 eval/new Function,兼容 GitHub Pages CSP
 * 歌单: 网易云 2829883282 (华语私人雷达)
 */
(function () {
  'use strict';

  function initPlayer() {

  var HARDCODED_SONGS = [
    { name: '河流', artist: '马赫mood', url: 'https://music.163.com/song/media/outer/url?id=1984760613.mp3', id: '1984760613' },
    { name: '旅行家的忠诚', artist: '黄旭', url: 'https://music.163.com/song/media/outer/url?id=2079429439.mp3', id: '2079429439' },
    { name: '外面冷 Coldest Night', artist: '艾福杰尼', url: 'https://music.163.com/song/media/outer/url?id=1982964017.mp3', id: '1982964017' },
    { name: '空山灵雨 feat.旅行团', artist: '新裤子', url: 'https://music.163.com/song/media/outer/url?id=2712645752.mp3', id: '2712645752' },
    { name: '浪漫鬼', artist: 'DANNY K', url: 'https://music.163.com/song/media/outer/url?id=2111060878.mp3', id: '2111060878' },
    { name: '雨后的哲学家', artist: 'ZaZaZsu咂咂苏', url: 'https://music.163.com/song/media/outer/url?id=2649850191.mp3', id: '2649850191' },
    { name: '过春天', artist: '谭维维', url: 'https://music.163.com/song/media/outer/url?id=1346093339.mp3', id: '1346093339' },
    { name: '你我经历的一刻', artist: 'ZaZaZsu咂咂苏', url: 'https://music.163.com/song/media/outer/url?id=2655065698.mp3', id: '2655065698' },
    { name: '若把你', artist: 'Kirsty刘瑾睿', url: 'https://music.163.com/song/media/outer/url?id=865632948.mp3', id: '865632948' },
    { name: '几分', artist: '雷泷Raylong', url: 'https://music.163.com/song/media/outer/url?id=2156910268.mp3', id: '2156910268' }
  ];

  var HARDCODED_LYRICS = {
    '2079429439': "[00:00.00] 作词 : 艾热 AIR/黄旭\n[00:00.05] 作曲 : 艾热 AIR/黄旭\n[00:00.24]黄旭:\n[00:00.42]好像是糊里糊涂坐上远航的飞机\n[00:03.57]也不知道哪一站会落地\n[00:06.15]这样继续漫无目的没有归期\n[00:08.40]身边消失的朋友也不绝络绎\n[00:11.13]我见识过鼎盛的繁华沦为废墟\n[00:13.65]空虚的昼夜交替只留恋醉意\n[00:16.26]人一次又一次被欲望利用威逼\n[00:18.57]和追求最简单的快乐保持对立\n[00:35.67]I got loyalty loyalty 但不来自DNA\n[00:38.37]已经记不清陪客人喝的第几杯\n[00:40.92]这里乌烟瘴气来了就为买个醉\n[00:43.20]老板给我涨了工资客人大方给小费\n[00:45.78]已经第十三个年头在酒吧驻唱\n[00:48.24]来这儿讨生活的属我来事嗓门最亮\n[00:50.73]眼看三十要出头了也想讨个婆娘\n[00:53.22]身边几个哥们穷 日子过的多像\n[00:55.98]空闲了一起躲在十几平的出租屋\n[00:58.62]龙敲beat我作曲布布卷本大的书\n[01:01.14]人穷志不短 过的悠哉悠哉\n[01:03.33]我们早晚走得起别墅旁有山有海\n[01:05.97]I got loyalty loyalty 特别是对她\n[01:08.43]我用一个月的工资送她长裙碎花\n[01:10.83]她哄睡酒醉后的我扫干净玻璃碎渣\n[01:13.47]只要有她陪的地方地下室也像家\n[01:15.96]艾热AIR:\n[01:17.52]我像个旅行家 天南地北到处飞\n[01:19.50]听遍言不由衷的话\n[01:21.99]明天会更好吗\n[01:23.52]我也不知道但至少暂时还能表达\n[01:26.79]半山腰快过了我们快登顶\n[01:29.16]笑谈自大的我们装云淡风轻\n[01:31.80]可能受够了 总是紧绷咬牙\n[01:34.89]所以现在只要...\n[01:36.27]黄旭:\n[01:36.27]酒醉激励豪言壮志发了许多誓\n[01:38.61]酒醒现状落差太大抱怨许多次\n[01:41.10]我说是 朋友劝我别再搞作词\n[01:43.68]奶奶发着高烧 在冬夜里过世\n[01:46.20]她的最后一滴泪 对我打击太大\n[01:48.78]想到摇篮里的笑 安慰且有点害怕\n[01:51.36]如果天使降临是恩赐是实属意外\n[01:53.88]继续rap会让我翻身还是继续负债\n[01:56.40]暂时我也无能为力\n[01:58.68]打开微博看看哪些平台最近办比赛\n[02:01.50]混不出头没脸回去\n[02:03.42]一起玩的朋友上电视 我混得像乞丐\n[02:06.45]火起来的都是bullsh*t\n[02:08.64]又羡慕又酸小屁孩爱听的歌真奇怪\n[02:11.61]背上包又去狩猎\n[02:13.50]为了她和她的生活费又漂泊几礼拜\n[02:26.55]我像个旅行家 天南地北到处飞\n[02:28.29]听遍言不由衷的话\n[02:30.27]明天会更好吗\n[02:32.76]我也不知道但至少暂时还能表达\n[02:37.20]半山腰快过了我们快登顶\n[02:39.96]笑谈自大的我们装云淡风轻\n[02:42.54]可能受够了 总是紧绷咬牙\n[02:45.57]现在一步一个脚丫\n[02:47.28]我擅长文字堆叠 垒起来的高度\n[02:50.40]像在徒手爬高山\n[02:51.90]时来运转像飞碟\n[02:53.94]过去称兄道弟的如今笑着说不敢高攀\n[02:57.09]我当他们谈吐诙谐\n[02:58.86]小小选秀歌手又不是什么权贵高官\n[03:02.10]那些苦日子刚终结\n[03:04.35]52层落地窗边 私教陪我练高翻\n[03:07.08]跑不完的媒体通告假笑到麻木\n[03:09.66]陌生城市香水味和酒都不明来路\n[03:12.21]最近远亲旧友总找我讲生活难处\n[03:14.76]偶遇赞助山旁落满灰的匡威帆布\n[03:17.13]我看了好久 像曾经对她目不转睛\n[03:19.71]阔别了好久 除了数字外久违的暖心\n[03:22.20]我像个伞兵 被新高度压迫的好晕\n[03:24.87]于是我把Loyal刻在新的现场返听\n[03:31.35]当故事刚到一半\n[03:33.09]当故事刚写一半\n[03:41.43]当故事刚读一半\n[03:46.50]别着急着说遗憾\n",
    '1982964017': "[00:22.20]When I give you my broken heart in the coldest night please hold it tight\n[00:32.68]If you lie to me babe I just might let a falling dice decide my whole life\n[00:43.56]When I give you my broken heart in the coldest night please hold it tight\n[00:54.45]If you lie to me babe I just might let a falling dice decide my whole life\n[01:05.16]如果要放弃就请一起放弃彻底\n[01:07.68]理解有上亿种方法看是什么目的\n[01:10.32]让我们肉体剥离去放肆也算保护你\n[01:13.06]也说过怕我被骗当我们在一起沐浴\n[01:15.80]抱怨声音太大盖过兑现\n[01:18.48]本能的去顾虑不知道危险\n[01:21.18]Girl你明明爱的就很明显\n[01:23.96]谎言是善意还是你会演\n[01:27.04]你说过太多时间维护野心从没考虑你\n[01:29.76]日以继夜银行卡里只是那些破数据\n[01:32.44]我们都是某种蝼蚁维护着某种默契\n[01:35.20]也尽量不去过度关注你也习惯了过滤\n[01:37.90]这束光若隐又若现而我又拖延又拖延\n[01:40.49]感受到失去耐心的你慢慢对我的冷眼\n[01:43.35]可每首歌都有你影子我亲手来设计\n[01:46.11]Baby我最大野心是你其他没意义\n[01:48.69]Will I go easy will I go hard\n[01:51.21]I think we both should keep the best part\n[01:53.92]如何被你吸引\n[01:55.57]How we getting started\n[01:56.68]Love is so strong so strong\n[01:59.39]Will I go easy will I go hard\n[02:02.13]I think we both should keep the best part\n[02:04.88]如何被你吸引\n[02:06.26]How we getting started\n[02:07.56]I thought we were go along go along\n[02:11.04]When I give you my broken heart in the coldest night please hold it tight\n[02:21.61]If you lie to me babe I just might let a falling dice decide my whole life\n[02:32.86]Saturday night is cold outside\n[02:35.30]人们都是彼此 新欢与旧爱\n[02:38.24]杂乱无章交织或者空白\n[02:40.68]这就是种游戏还可以重来\n[02:43.67]Saturday night is cold outside\n[02:46.32]也许那边火热也许灯没开\n[02:48.92]也许都有想过一切都回来\n[02:51.59]这就是种游戏还可以重来\n[02:54.54]Saturday night is cold outside\n[02:57.28]It's cold outside\n[03:02.83]It's cold outside\n[03:05.51]Saturday night is cold outside\n[03:10.94]It's cold outside\n[03:13.67]It's cold outside\n[03:19.09]Journey makes you cry\n[03:23.57]Journey makes you cry\n[03:27.48]When I give you my broken heart in the coldest night please hold it tight\n",
    '2712645752': "[00:22.43]年轻的你 还在叹息 为何不向荒野走去\n[00:30.15]空空行囊 空的心灵 空时光怕无人同行\n[00:37.91]像一只郊外的狐狸 孤独中欢愉\n[00:44.78]走入深深 山谷 忽然下起 空山的灵雨\n[00:52.92]打湿的外衣 又开始想你\n[01:00.99]回想和你 在这城中陋室 倾听着风雨\n[01:08.46]人间在下雨 迷乱的诗意\n[01:34.83]年轻的你 还在叹息 为何不向荒野走去\n[01:41.86]空空行囊 空的心灵 空时光怕无人同行\n[01:49.81]像一只郊外的狐狸 孤独中欢愉\n[01:56.83]走入深深 山谷 忽然下起 空山的灵雨\n[02:04.61]打湿的外衣 又开始想你\n[02:12.59]回想和你 在这城中陋室 倾听着风雨\n[02:20.75]人间在下雨 迷乱的诗意\n[02:28.42]一直在下雨\n[02:37.24]一直在想你\n[02:41.00]不停的想你\n",
    '2111060878': "[00:05.52] DANNY K:\n[00:05.70]别理所应当从得到你的微信号\n[00:07.92]到请你喝一杯再慢慢开始对我笑\n[00:10.56]无法戒掉你就像那些rapper要吃药\n[00:12.84]你的笑容温暖得像太阳直射在赤道\n[00:15.57]突然想起你我的念头应该想到哪里\n[00:18.09]如果我是富翁 take my love don't take my money\n[00:20.58]但我像个游荡的鬼魂 so kiss me honey\n[00:22.89]没能抓住你的灵魂只能算我粗心大意\n[00:25.56]周夏影 Sino:\n[00:26.04]Don't be afraid anymore\n[00:26.94]再聊下去就不浪漫了\n[00:29.91]马路上的街灯闪了下 就能吓到她\n[00:32.88]停电的夜我不想回家\n[00:35.37]Don't be afraid anymore\n[00:36.87]再聊下去就到夜半了\n[00:39.87]风摇树陌生的号码 不停的拨打\n[00:42.60]停电的夜她不想回家\n[00:44.88] FEEEleven:\n[00:45.09]过着你看不见也融不进的life style\n[00:47.13]别以为鬼只会出现在没路灯的拐角\n[00:49.98]让雨停住是我为你披的外套\n[00:52.11]当你穿上你姐的高跟偷偷去逛live house\n[00:55.02]丢你一个人过七夕你的man no patience\n[00:57.45]喝到妆花了我能给你变出镜子\n[00:59.85]如果你注意到了我 plz show me some love\n[01:02.49]不要恐惧 like we always live in the dark\n[01:04.89]鼠尾草:\n[01:05.10]可你看不见我 我只不过是串电波\n[01:07.38]别再去研究照片 我们前世早就见过\n[01:09.84]1936年在西班牙你给了我一次回眸\n[01:12.57]来到2023那就换我把你护在背后\n[01:15.12]我随手为你点燃魔仙堡的烛火\n[01:17.34]把森林修成爱你的形状我不是胡说\n[01:19.86]每一个最阴间的夜晚我都陪着你去度过\n[01:22.56]快点打开收音机浪漫鬼有情话诉说\n[01:25.50]今天是我100岁生日\n[01:27.39]你是这场派对的特别来宾\n[01:29.61]我有吃不完的面包虫 孟婆汤无限量供应\n[01:33.18]一起干杯普天同庆\n[01:35.34]或许我有些丑陋 但我可以为你卖命\n[01:40.32]我有一千万冥币 来满足你的拜金\n[01:42.84]我是一个坚定的唯物主义者\n[01:44.88]没人能主宰我的爱情\n[01:45.72]周夏影 Sino:\n[01:46.05]Girl u be my lover\n[01:46.53]最漂浮的舞步\n[01:47.79]是我在你身边反复踢踏行走\n[01:51.48]你就像你回家的巴士上播的love song\n[01:54.39]我没听够\n[01:56.52]电视机里画面总是在闪\n[01:59.58]是我的情书变成电波\n[02:02.19]漆黑的夜伤感巷子的尽头 浪漫鬼inside\n[02:05.34] EINK:\n[02:05.43]微风抚过你的眉宇顺着鼻梁滑向侧脸\n[02:07.65]我们把这一段时间称作夏天\n[02:09.87]我想要带你把那漫山遍野踏遍\n[02:12.24]尽管苦难难以下咽\n[02:13.68]但还是不难发现\n[02:14.82]我们的故事能够诠释什么是爱\n[02:17.04]你的笔触含羞但我的表达直白\n[02:19.41]太关心不分昼夜 欢欣还是抽噎\n[02:22.20]我在脑海已经陪你到老有乐队在奏乐\n",
    '2649850191': "[00:31.39]她夜观天象 决定重新出发\n[00:38.59]不再猜大雨 会不会落下\n[00:46.31]路有多滑 已经听了很多家\n[00:54.15]大家都劝她 不要轻易潇洒\n[01:01.49]雨后的哲学家 总学不会挣扎\n[01:09.18]无论谁在牵挂 银河早已替她回答\n[01:18.16]心有多远 世界就有多爱她\n[01:25.60]再多大雨落下 还是钟意潇洒\n[01:46.29]她头发一甩 决定重新出发\n[01:53.77]不再问良辰和吉日 怎么搭\n[02:01.36]那些说法 不是她的兵法\n[02:08.79]没什么万一 能把她留下\n[02:16.56]雨后的哲学家 总学不会挣扎\n[02:23.89]无论谁在牵挂 银河早已替她回答\n[02:33.13]心有多远 世界就有多爱她\n[02:40.58]再多大雨落下 还是钟意潇洒\n[03:01.99]那么多的应该 白白让人等待\n[03:09.12]再远的星辰大海 都会经过未来\n[03:16.45]雨后的哲学家 总学不会挣扎\n[03:24.05]无论谁在牵挂 银河早已替她回答\n[03:33.07]心有多远 世界就有多爱她\n[03:40.49]再多大雨落下 她只钟意潇洒\n[03:48.20]这雨说下就下 还是钟意潇洒\n",
    '1346093339': "[00:35.92]春天 夏天 秋天 冬天\n[00:42.08]她的方向是 过去再回来\n[00:48.24]黑天 白天 晴天 雨天\n[00:54.42]停不住的脚步 向前 向前\n[01:00.84]她总会烦恼 总会忧伤 叹口气说 算了吧\n[01:07.37]亲爱的 何时才会学着 放下一些\n[01:13.80]她也会开心 也会欢笑 藏着心事 说还好吧\n[01:20.38]亲爱的 谁能陪你 过春天\n[01:26.96]亲爱的 嘿呀 嘿呀\n[01:33.34]亲爱的 嘿呀 嘿呀\n[02:13.21]一天 一天 一天 长大\n[02:19.57]好像看得见下一站\n[02:26.05]走着 走着 不知 不觉\n[02:31.81]有什么正在疯狂的蔓延\n[02:38.97]让那些眼花缭乱繁华 都变成一场春风\n[02:45.36]不知山高水浅的孩子 就任性又自由\n[02:51.84]来陪我一起走进人群 看看世事的艰难\n[02:58.11]我们朝着春天去 好吗\n[03:04.78]亲爱的 陪我一起 去看梦里不融化的雪吧\n[03:10.86]亲爱的 陪我一起学着 不顾一切\n[03:17.29]亲爱的 陪我一起 让我靠在影子里落泪吧\n[03:23.63]亲爱的 陪我一起 过春天\n[03:30.16]亲爱的 我们一起 去看梦里不融化的雪吧\n[03:36.53]亲爱的 青春可能单薄 转眼如烟\n[03:43.12]亲爱的 即便如此 让我们牵手向着那里走吧\n[03:49.57]亲爱的 我们一起 过春天\n",
    '865632948': "[00:18.840]落叶无归根 单丝不成线\n[00:27.710]无所寄托 亦无心流浪\n[00:36.570]你把红豆赠我不如写我一首歌\n[00:44.240]落款你的名字 工整又好看\n[00:52.470]若把你比作歌 你便是那高山流水\n[01:02.150]佳人伴舞 天地伴舞 绝弦的美\n[01:10.190]若把你比作歌 歌写的我缠绵悱恻\n[01:19.920]恒顺众生 迁走我魂 绝弦的美\n[01:47.660]落叶无归根 单丝不成线\n[01:56.540]有嘴无心 亦有才无命\n[02:05.410]不一起看星星 星星它亮有什么用\n[02:13.240]你我矢志不渝 举案又齐眉\n[02:21.360]若把你比作歌 你便是那高山流水\n[02:31.000]佳人伴舞 天地伴舞 绝弦的美\n[02:39.210]若把你比作歌 歌写的我缠绵悱恻\n[02:48.700]恒顺众生 迁走我魂 绝弦的美\n[02:57.740]恒顺众生 迁走我魂 绝弦的美\n",
    '2156910268': "[00:10.120]曲甲:\n[00:10.460]我想你也没把话讲的多么真诚\n[00:13.490]对于有多爱我你说还没那么深\n[00:16.140]只是可惜我当时太当真\n[00:19.120]对待这份感情没有适当的诚恳\n[00:21.880]如果我有上帝视角如果我有魔法\n[00:24.960]理解你的要强理解各有各的活法\n[00:27.740]理解你的要求其实也没过分\n[00:30.450]成长生活需要摩擦\n[00:33.230]雷泷:\n[00:33.230]我的又多了几分 你的又没了几分\n[00:35.930]再给我多一点时间多一点忍耐\n[00:39.170]是怎么就变成最亲密的敌人\n[00:41.910]到最后聊天记录什么都剩不下来\n[00:44.990]我的又多了几分 你的又没了几分\n[00:47.570]为什么你的伤口好的比我要快\n[00:50.600]我的又没了几分 你也许多了几分\n[00:53.320]我想我需要分泌更多的内啡肽\n[00:56.330]有时候我的真心话听起来就像理由\n[00:59.300]我想闭上嘴巴因为你比看起来更棘手\n[01:02.119]就戳吧戳点窟窿 把糟心留到以后\n[01:04.959]像看不见的一把匕首 钻泥巴的泥鳅\n[01:07.849]钻进了我的以后 钻进了我的虚构\n[01:10.590]钻进了那个从来就没存在过的宇宙\n[01:13.489]你说你已经收拾好了不会遗漏\n[01:16.319]带走我的时间和钱 去那颗没有我的地球\n[01:20.620]唐康宁:\n[01:20.620]我把自己关起来 对着夜幕发呆\n[01:26.040]忽然什么都没有 放下回忆成全你离开\n[01:30.549]侃侃而谈变成惴惴不安\n[01:33.430]崩塌之前其实早有预感\n[01:37.769]同床共枕过的亲密关系不用计较偿还\n[01:42.140]let it go 也许思念会愈来愈远\n[01:47.760]放开手 这即兴的爱还是画上句点\n[01:53.410]曲甲:\n[01:53.410]我的又多了几分 你的又没了几分\n[01:56.040]再给我多一点时间多一点忍耐\n[01:59.190]是怎么就变成最亲密的敌人\n[02:01.730]到最后聊天记录什么都剩不下来\n[02:04.909]雷泷:\n[02:04.909]我的又多了几分 你的又没了几分\n[02:08.069]为什么你的伤口好的比我要快\n[02:10.650]我的又没了几分 你也许多了几分\n[02:13.169]我想我需要分泌更多的内啡肽\n[02:16.229]曲甲:\n[02:16.229]我想你也没把话讲的多么真诚\n[02:19.250]对于有多爱我你说还没那么深\n[02:21.830]只是可惜我当时太当真\n[02:24.870]对待这份感情没有适当的诚恳\n[02:27.479]为何刚好我和你一起落下\n[02:31.289]两片树叶交替着旋转疯狂的热吻\n[02:34.009]等到落地时早就不记事变成传闻\n"
  };

  // ---- CSS ----
  var css = [
    /* 右下角固定定位 */
    '#gmeek-player{position:fixed;right:24px;bottom:24px;z-index:10004;font-family:Arial,Helvetica,sans-serif;}',

    /* 播放器主体 */
    '#gmp-body{width:320px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.18);overflow:hidden;transition:all 0.3s ease;display:none;}',
    '#gmp-body.show{display:block;}',

    /* 顶部信息区 */
    '#gmp-header{position:relative;padding:14px 14px 10px;background:#fff;cursor:pointer;}',

    /* 封面图 */
    '#gmp-cover{position:absolute;left:14px;top:14px;width:46px;height:46px;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;}',
    '#gmp-cover.playing{animation:ap-cover-rotate 20s linear infinite;}',
    '@keyframes ap-cover-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}',
    '#gmp-cover svg{width:20px;height:20px;color:#fff;}',
    '#gmp-cover img{width:100%;height:100%;object-fit:cover;}',

    /* 歌曲信息 */
    '#gmp-info{margin-left:60px;min-height:46px;display:flex;flex-direction:column;justify-content:center;}',
    '#gmp-title{color:#333;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;}',
    '#gmp-artist{color:#999;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;margin-top:2px;}',

    /* 歌词按钮 */
    '#gmp-lyrics-btn{position:absolute;right:14px;top:4px;transform:none;background:none;border:none;cursor:pointer;color:#999;padding:4px;transition:color 0.2s;}', 
    '#gmp-lyrics-btn:hover{color:#8fb3a9;}',
    '#gmp-lyrics-btn svg{width:16px;height:16px;}',
    '#gmp-lyrics-btn.active{color:#8fb3a9;}',

    /* 悬浮歌词面板 */
    '#gmp-lyrics-float{position:absolute;bottom:100%;left:0;right:0;margin-bottom:8px;background:rgba(255,255,255,0.97);border-radius:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.12);max-height:240px;overflow-y:auto;display:none;backdrop-filter:blur(8px);}',
    '#gmp-lyrics-float.show{display:block;}',
    '#gmp-lyrics-float::-webkit-scrollbar{width:4px;}',
    '#gmp-lyrics-float::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '#gmp-lyrics-inner{padding:12px 14px;text-align:center;font-size:13px;line-height:2;}',
    '.gmp-lrc{color:#666;cursor:pointer;transition:all 0.2s;padding:2px 0;}',
    '.gmp-lrc:hover{color:#333;}',
    '.gmp-lrc.active{color:#8fb3a9;font-weight:500;font-size:14px;}',
    '.gmp-lrc.passive{color:#ccc;}',

    /* 进度条区域 */
    '#gmp-progress{padding:0 14px 8px;}',
    '#gmp-bar-wrap{height:2px;background:#eee;border-radius:1px;cursor:pointer;position:relative;}',
    '#gmp-bar{height:100%;background:#8fb3a9;border-radius:1px;width:0%;position:relative;}',
    '#gmp-bar::after{content:"";position:absolute;right:-6px;top:-5px;width:12px;height:12px;background:#8fb3a9;border-radius:50%;opacity:0;transition:opacity 0.2s;box-shadow:0 0 4px rgba(143,179,169,0.4);}',
    '#gmp-bar-wrap:hover #gmp-bar::after{opacity:1;}',

    /* 控制区 */
    '#gmp-controls{display:flex;align-items:center;padding:0 14px 10px;background:#fff;}',
    '#gmp-time{color:#999;font-size:11px;font-variant-numeric:tabular-nums;min-width:40px;}',
    '#gmp-btns{display:flex;align-items:center;gap:8px;flex:1;justify-content:center;}',
    '.gmp-btn{background:none;border:none;cursor:pointer;padding:6px;color:#666;transition:color 0.2s;border-radius:50%;}',
    '.gmp-btn:hover{color:#8fb3a9;}',
    '.gmp-btn svg{width:18px;height:18px;display:block;}',
    '.gmp-btn.play-btn svg{width:22px;height:22px;}',

    /* 音量 */
    '#gmp-vol{display:flex;align-items:center;margin-left:auto;}',
    '#gmp-vol-icon{cursor:pointer;color:#999;transition:color 0.2s;}',
    '#gmp-vol-icon:hover{color:#8fb3a9;}',
    '#gmp-vol-icon svg{width:16px;height:16px;}',
    '#gmp-vol-bar-wrap{width:60px;height:2px;background:#eee;border-radius:1px;margin-left:6px;cursor:pointer;}',
    '#gmp-vol-bar{height:100%;background:#8fb3a9;border-radius:1px;width:70%;}',

    /* 歌单列表 */
    '#gmp-list{max-height:0;overflow-y:auto;transition:max-height 0.3s ease;background:#fafafa;border-radius:0 0 12px 12px;}',
    '#gmp-list.open{max-height:200px;border-top:1px solid #eee;}',
    '#gmp-list::-webkit-scrollbar{width:4px;}',
    '#gmp-list::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '.gmp-item{display:flex;align-items:center;padding:8px 14px;cursor:pointer;border-left:3px solid transparent;transition:all 0.15s;}',
    '.gmp-item:hover{background:#f0f0f0;}',
    '.gmp-item.playing{background:#f0f7f5;border-left-color:#8fb3a9;}',
    '.gmp-item-num{color:#ccc;font-size:12px;min-width:24px;font-variant-numeric:tabular-nums;}',
    '.gmp-item.playing .gmp-item-num{color:#8fb3a9;}',
    '.gmp-item-info{flex:1;min-width:0;}',
    '.gmp-item-name{color:#333;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-item.playing .gmp-item-name{color:#8fb3a9;font-weight:500;}',
    '.gmp-item-artist{color:#999;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',

    /* Mini 切换按钮 */
    '#gmp-mini{position:absolute;left:-28px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:-2px 0 8px rgba(143,179,169,0.4);transition:all 0.2s;}',
    '#gmp-mini:hover{box-shadow:-2px 0 12px rgba(143,179,169,0.6);transform:translateY(-50%) scale(1.05);}',
    '#gmp-mini svg{width:14px;height:14px;color:#fff;transition:transform 0.3s;}',
    '#gmp-mini.collapsed svg{transform:rotate(180deg);}',

    /* 移动端响应 */
    '@media(max-width:480px){#gmeek-player{right:8px;bottom:16px;}#gmp-body{width:calc(100vw - 52px);}}',
  ].join('');

  // ---- Inject Styles ----
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Build UI ----
  var container = document.createElement('div');
  container.id = 'gmeek-player';

  container.innerHTML =
    '<div id="gmp-mini" title="展开播放器">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>' +
    '</div>' +
    '<div id="gmp-body">' +
      '<div id="gmp-lyrics-float"><div id="gmp-lyrics-inner"></div></div>' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">华语私人雷达</div>' +
          '<div id="gmp-artist">点击播放</div>' +
        '</div>' +
        '<button id="gmp-lyrics-btn" title="歌词">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div id="gmp-progress"><div id="gmp-bar-wrap"><div id="gmp-bar"></div></div></div>' +
      '<div id="gmp-controls">' +
        '<span id="gmp-time">0:00</span>' +
        '<div id="gmp-btns">' +
          '<button class="gmp-btn" id="gmp-prev" title="上一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/></svg></button>' +
          '<button class="gmp-btn play-btn" id="gmp-play" title="播放"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></button>' +
          '<button class="gmp-btn" id="gmp-next" title="下一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-12v12l6.5-6L8 6zm8 0v12h2V6h-2z"/></svg></button>' +
        '</div>' +
        '<div id="gmp-vol">' +
          '<span id="gmp-vol-icon" title="静音"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></span>' +
          '<div id="gmp-vol-bar-wrap"><div id="gmp-vol-bar"></div></div>' +
        '</div>' +
      '</div>' +
      '<div id="gmp-list"></div>' +
    '</div>';

  document.body.appendChild(container);

  // ---- DOM Refs ----
  var bodyEl = document.getElementById('gmp-body');
  var miniBtn = document.getElementById('gmp-mini');
  var titleEl = document.getElementById('gmp-title');
  var artistEl = document.getElementById('gmp-artist');
  var coverEl = document.getElementById('gmp-cover');
  var playBtn = document.getElementById('gmp-play');
  var timeEl = document.getElementById('gmp-time');
  var barEl = document.getElementById('gmp-bar');
  var barWrap = document.getElementById('gmp-bar-wrap');
  var volBar = document.getElementById('gmp-vol-bar');
  var volBarWrap = document.getElementById('gmp-vol-bar-wrap');
  var volIcon = document.getElementById('gmp-vol-icon');
  var listEl = document.getElementById('gmp-list');
  var lyricsBtn = document.getElementById('gmp-lyrics-btn');
  var lyricsFloat = document.getElementById('gmp-lyrics-float');
  var lyricsInner = document.getElementById('gmp-lyrics-inner');

  // ---- State ----
  var audio = new Audio();
  audio.volume = 0.7;
  var current = -1;
  var playing = false;
  var muted = false;
  var prevVol = 0.7;
  var songList = [];
  var lyricsData = [];
  var lyricLines = [];
  var playerOpen = false;
  var lyricsOpen = false;

  // ---- Build playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songList.length; i++) {
      var s = songList[i];
      html += '<div class="gmp-item" data-i="' + i + '">' +
        '<span class="gmp-item-num">' + (i + 1) + '</span>' +
        '<div class="gmp-item-info">' +
          '<div class="gmp-item-name">' + esc(s.name) + '</div>' +
          '<div class="gmp-item-artist">' + esc(s.artist) + '</div>' +
        '</div>' +
      '</div>';
    }
    listEl.innerHTML = html;
    listEl.querySelectorAll('.gmp-item').forEach(function (item, idx) {
      item.addEventListener('click', function () { playSong(idx); });
    });
  }

  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- LRC Parser ----
  function parseLRC(text) {
    if (!text) return [];
    var lines = text.split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var textPart = line.substring(line.lastIndexOf(']') + 1).trim();
      if (!textPart) continue;
      var re = /\[(\d+):(\d+)(?:[.\:](\d+))?\]/g;
      var m;
      while ((m = re.exec(line)) !== null) {
        var time = parseInt(m[1]) * 60 + parseInt(m[2]) + (m[3] ? parseInt(m[3].substring(0, 2)) / 100 : 0);
        result.push({ time: time, text: textPart });
      }
    }
    return result.sort(function (a, b) { return a.time - b.time; });
  }

  // ---- Fetch lyrics (硬编码) ----
  function fetchLyric(songId, cb) {
    if (!songId) { cb(''); return; }
    if (HARDCODED_LYRICS[songId]) {
      cb(HARDCODED_LYRICS[songId]);
      return;
    }
    cb('[00:00.00]暂无歌词');
  }

  function buildLyrics(text) {
    lyricsData = parseLRC(text);
    if (!lyricsData.length) {
      lyricsInner.innerHTML = '<div class="gmp-lrc" style="color:#999;">暂无歌词</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < lyricsData.length; i++) {
      html += '<div class="gmp-lrc" data-i="' + i + '">' + esc(lyricsData[i].text) + '</div>';
    }
    lyricsInner.innerHTML = html;
    lyricLines = lyricsInner.querySelectorAll('.gmp-lrc');
    lyricLines.forEach(function (el, idx) {
      el.addEventListener('click', function () {
        if (audio.duration && lyricsData[idx]) {
          audio.currentTime = lyricsData[idx].time;
        }
      });
    });
  }

  function updateLyrics() {
    if (!lyricsData.length || !lyricsOpen) return;
    var t = audio.currentTime || 0;
    var active = -1;
    for (var i = lyricsData.length - 1; i >= 0; i--) {
      if (t >= lyricsData[i].time) { active = i; break; }
    }
    for (var j = 0; j < lyricLines.length; j++) {
      lyricLines[j].classList.remove('active', 'passive');
      if (j === active) {
        lyricLines[j].classList.add('active');
        var st = lyricLines[j].offsetTop - lyricsFloat.clientHeight / 2 + lyricLines[j].clientHeight / 2;
        lyricsFloat.scrollTop = st;
      } else if (j < active) {
        lyricLines[j].classList.add('passive');
      }
    }
  }

  // ---- Play song ----
  function playSong(idx) {
    if (idx < 0 || idx >= songList.length) return;
    current = idx;
    var s = songList[idx];
    audio.src = s.url;
    audio.load();
    titleEl.textContent = s.name;
    artistEl.textContent = s.artist;
    barEl.style.width = '0%';
    timeEl.textContent = '0:00';

    // Update list highlight
    listEl.querySelectorAll('.gmp-item').forEach(function (item, i) {
      item.classList.toggle('playing', i === idx);
    });

    // Fetch lyrics
    fetchLyric(s.id || '', buildLyrics);

    // Play
    audio.play().catch(function () { });
    playing = true;
    updatePlayIcon();
  }

  function updatePlayIcon() {
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
    coverEl.classList.toggle('playing', playing);
  }

  // ---- Controls ----
  playBtn.addEventListener('click', function () {
    if (current === -1) { playSong(0); return; }
    if (playing) { audio.pause(); playing = false; }
    else { audio.play().catch(function () { }); playing = true; }
    updatePlayIcon();
  });

  document.getElementById('gmp-prev').addEventListener('click', function () {
    playSong((current - 1 + songList.length) % songList.length);
  });

  document.getElementById('gmp-next').addEventListener('click', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Progress ----
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    barEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
    var m = Math.floor(audio.currentTime / 60);
    var s = Math.floor(audio.currentTime % 60);
    timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    updateLyrics();
  });

  audio.addEventListener('ended', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Seek ----
  barWrap.addEventListener('click', function (e) {
    if (!audio.duration) return;
    var rect = barWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  });

  // ---- Volume ----
  volIcon.addEventListener('click', function () {
    if (muted) {
      audio.volume = prevVol;
      muted = false;
      volBar.style.width = (prevVol * 100) + '%';
    } else {
      prevVol = audio.volume;
      audio.volume = 0;
      muted = true;
      volBar.style.width = '0%';
    }
  });

  volBarWrap.addEventListener('click', function (e) {
    var rect = volBarWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = pct;
    volBar.style.width = (pct * 100) + '%';
    muted = false;
  });

  // ---- Toggle player ----
  miniBtn.addEventListener('click', function () {
    playerOpen = !playerOpen;
    bodyEl.classList.toggle('show', playerOpen);
    miniBtn.classList.toggle('collapsed', !playerOpen);
    miniBtn.title = playerOpen ? '收起播放器' : '展开播放器';
  });

  // ---- Toggle floating lyrics ----
  lyricsBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    lyricsOpen = !lyricsOpen;
    lyricsFloat.classList.toggle('show', lyricsOpen);
    lyricsBtn.classList.toggle('active', lyricsOpen);
  });

  // ---- Toggle list (click header) ----
  document.getElementById('gmp-header').addEventListener('click', function (e) {
    if (e.target.closest('#gmp-lyrics-btn')) return;
    listEl.classList.toggle('open');
  });

  // ---- Init ----
  songList = HARDCODED_SONGS;
  buildList();
  console.log('[GmeekMusic] Loaded', songList.length, 'songs');

  } // end initPlayer()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

})();
