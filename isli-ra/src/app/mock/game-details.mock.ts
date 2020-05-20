// import { registerMock } from '../core/http-mock';
// import { GameDetailsTableObj } from '../service/model';

// const GET_GAME_DETAILS_OVERVIEW_URL = 'GET_GAME_DETAILS_OVERVIEW_URL';
// const GET_GAME_DETAILS_TABLE_URL = 'GET_GAME_DETAILS_TABLE_URL';

// function getGameDetailsTableData() {
//     const obj = [
//         new GameDetailsTableObj(
//             '2019-09-02  09:34:8', '完善游戏基本信息，上传安装包与资料包。', '完成项：创建游戏'),
//         new GameDetailsTableObj(
//             '2019-09-02  09:34:8', '游戏已提交审核，将进入自动化审核程序，请等待审核结果。', '等待项：自动化审核中'),
//         new GameDetailsTableObj(
//             '2019-09-02  09:34:8', '您提交的游戏在自动化审核过程中发现异常，将进行人工复审。', '异常项：审核异常,人工审核中'),
//         new GameDetailsTableObj(
//             '2019-09-02  09:34:8', '向注册中心申请ISLI标志码。', '待操作：待申请ISLI游戏版号')
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: obj
//     };
// }
// registerMock('get', GET_GAME_DETAILS_TABLE_URL, getGameDetailsTableData);
