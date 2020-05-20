// import { registerMock } from '../core/http-mock';
// import { WholeProcessGameListObj, GameOverviewDataObj, GameWholeProcessDataCollectionObj } from '../service/model';

// const GET_GAME_LIST_URL = 'GET_GAME_LIST_URL';
// const GET_GAME_LIST_TOTAL_URL = 'GET_GAME_LIST_TOTAL_URL';  // 全流程跟踪管控-数量
// const GET_GAME_OVERVIEW_URL = 'GET_GAME_OVERVIEW_URL'; // 全流程跟踪管控-游戏详情
// const GET_GAME_DATA_COLLECT_URL = 'GET_GAME_DATA_COLLECT_URL'; // 游戏全流程数据采集
// const GET_GAME_DATA_APPROVAL_URL = 'GET_GAME_DATA_APPROVAL_URL'; // 游戏审批全流程
// const GET_GAME_DATA_COLLECT_VERSION_URL = 'GET_GAME_DATA_COLLECT_VERSION_URL'; // 游戏全流程数据采集-版本

// function getGameListData() {
//     const obj = [
//         new WholeProcessGameListObj(
//             '火烈鸟传说', 'assets/images/mock/p1.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '龙珠觉醒', 'assets/images/mock/p3.png', '2', '1'),
//         new WholeProcessGameListObj(
//             '跳跳鸡', 'assets/images/mock/p4.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '星辰变', 'assets/images/mock/p5.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '剑踪情缘', 'assets/images/mock/p6.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '暮影战神', 'assets/images/mock/p7.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '战争与征服', 'assets/images/mock/p8.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '赛博篮球', 'assets/images/mock/p9.png', '3', '1'),
//         new WholeProcessGameListObj(
//             '全球计划', 'assets/images/mock/p10.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '轮盘切割大作', 'assets/images/mock/p11.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '法师消魔', 'assets/images/mock/p12.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '英雄计划', 'assets/images/mock/p13.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '萌鼠大作战', 'assets/images/mock/p14.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '风暴大陆', 'assets/images/mock/p15.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '古剑仙域', 'assets/images/mock/p16.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '流放之路2', 'assets/images/mock/p17.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '猎魂', 'assets/images/mock/p18.png', '1', '1'),
//         new WholeProcessGameListObj(
//             '不如修仙', 'assets/images/mock/p19.png', '1', '1')];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {
//             pageDataList: obj,
//             pageDataSize: 28
//         }
//     };
// }
// function getGameOverviewData() {
//     const obj =
//         new GameOverviewDataObj(
//             1, 'assets/images/mock/p1.png', 3, '游戏名称随机', '0', 'false', '2019-10-22 10:34:44', 'assets/images/mock/p1.png', '1233',
//             'test eeeee', 'tset测试可好看金龙卡金龙卡将龙井路口金龙卡化橘红i欧珀ipipoeIPOip', '201980-3332349204859-3',
//             '201980-3332349204859-3', '13', '34', '火烈鸟传说', 'dssfsdcsdsdf', '2019-10-30 12:34:22', 0, '2-2', '2019-10-23 23:28:34',
//             '', '', '15.0.2', '2019-10-29 13:23:32');
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: obj
//     };
// }

// // function getPreDate(beginDate: Date) {
// //     let begin = beginDate;
// //     return () => {
// //         const year = begin.getFullYear();
// //         const month = begin.getMonth() > 8 ? begin.getMonth() + 1 : '0' + (begin.getMonth() + 1);
// //         const day = begin.getDate() < 10 ? '0' + begin.getDate() : begin.getDate();
// //         const hour = begin.getHours() < 10 ? '0' + begin.getHours() : begin.getHours();
// //         const minute = begin.getMinutes() < 10 ? '0' + begin.getHours() : begin.getHours();
// //         const second = begin.getSeconds() < 10 ? '0' + begin.getSeconds() : begin.getSeconds();
// //         begin = new Date(begin.getTime() - Math.floor(3600 * 1000 * (Math.random() * 24 + 10)));
// //         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
// //     };
// // }

// function getGameDataCollection() {
//     // const nextTime = getPreDate(new Date('2019-10-23T10:23:32'));
//     const obj = [
//         new GameWholeProcessDataCollectionObj('2019-11-22 22:22:32', 'User_456dfad32', '更新游戏', 'OPPO A83',
//             'Android', 'V1.6.1', '0', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 20:12:54', 'User_586226552', '启动游戏', '小米 MIX 2',
//             'Android', 'V1.6.0', '0', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 19:56:34', 'User_256352146', '结束游戏', '荣耀 10青春版',
//             'Android', 'V1.6.0', '1', '1小时1分钟'),
//         new GameWholeProcessDataCollectionObj('2019-11-22 19:46:18', 'User_oiu432fcd', '结束游戏', 'iPhone X',
//             'iOS', 'V1.6.1', '0', '1小时36分钟'),
//         new GameWholeProcessDataCollectionObj('2019-11-22 18:00:32', 'User_25632541d', '更新游戏', 'iPhone X',
//             'iOS', 'V1.2.6', '0', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 17:26:36', 'User_34rt5gy64', '下载游戏', '荣耀 10青春版',
//             'Android', 'V5.0.0', '0', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 12:22:43', 'User_bgh53tgr5', '启动游戏', '华为 P20',
//             'Android', 'V1.2.6', '0', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 12:10:24', 'User_543r5ghyf', '启动游戏', 'OPPO A83',
//             'Android', 'V5.0.0', '1', ''),
//         new GameWholeProcessDataCollectionObj('2019-11-22 09:00:42', 'User_ef4hfdev', '结束游戏', 'iPhone X',
//             'iOS', 'V1.2.6', '0', '5小时12分钟'),
//         new GameWholeProcessDataCollectionObj('2019-11-22 08:46:16', 'User_64fgd4s4', '更新游戏', '华为 P20',
//             'Android', 'V5.0.0', '0', ''),
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {
//             pageDataList: obj,
//             pageDataSize: 12
//         }
//     };
// }
// function getGameDataCollectionVersion() {
//     const obj = [
//         { id: 1, name: 'v1.6.0' },
//         { id: 2, name: 'v1.5.0' },
//         { id: 3, name: 'v1.0.0' },
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: obj
//     };
// }
// function getGameListTotalData() {
//     const obj = { total: 28, abnormal: 2 };
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: obj
//     };
// }
// registerMock('get', GET_GAME_LIST_URL, getGameListData);
// registerMock('get', GET_GAME_LIST_TOTAL_URL, getGameListTotalData);
// registerMock('get', GET_GAME_OVERVIEW_URL, getGameOverviewData);
// registerMock('get', GET_GAME_DATA_COLLECT_URL, getGameDataCollection);
// registerMock('get', GET_GAME_DATA_COLLECT_URL, getGameDataCollection);
// registerMock('get', GET_GAME_DATA_COLLECT_VERSION_URL, getGameDataCollectionVersion);
