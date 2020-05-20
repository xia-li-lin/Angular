// import { registerMock } from '../core/http-mock';
// import { GameListListDataObj } from '../service/model';

// const GET_GAME_LIST_URL = 'GET_GAME_LIST_URL';
// const POST_GAME_LIST_OBTAINED = 'POST_GAME_LIST_OBTAINED';

// function getGameListData() {
//     const obj = [
//         new GameListListDataObj(
//             '火烈鸟传说V1.0.0', '/assets/images/p0.jpg', '1', '深圳市新时深圳市新时代科技有限公司', '1', '2019-09-02  09:34:8', '1'),
//         new GameListListDataObj(
//             '灌篮高手 V2.3.1', '/assets/images/p0.jpg', '2', '上海蛙扑网络技术有限公司', '2', '2019-09-01  17:05:17', '2'),
//         new GameListListDataObj(
//             '跳跳鸡 V1.2.0', '/assets/images/p0.jpg', '3', '成都盈众九州网络科技有限公司', '2', '2019-08-21  17:05:17', '3')];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {
//             list: obj,
//             total: 30
//         }
//     };
// }
// function getGameListObtained() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {}
//     };
// }
// registerMock('get', GET_GAME_LIST_URL, getGameListData);
// registerMock('post', POST_GAME_LIST_OBTAINED, getGameListObtained);
