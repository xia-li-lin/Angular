// import { registerMock } from '../core/http-mock';
// import { ServiceListData, PageParams, DropDownOption } from '../service/model';

// const GET_SERVICE_LIST_URL = '/v1/service/list';    // 服务列表
// const GET_DISTRICT_ROW_LIST_URL = '/v1/service/district/row/list';    // 区行列表

// // 获取服务列表
// function getServiceList(connection, urlParams, queryParams) {
//     const pageInfo = new PageParams(1, 10);
//     const pageIndex = pageInfo.pageIndex;
//     const pageRows = pageInfo.pageRows;
//     const data = [];
//     for (let i = 0; i < 100; i++) {
//         data.push(new ServiceListData(
//             `${i + 1}`,
//             'ISLI/KSL(知识服务)',
//             '音像制品-音频',
//             '2020-02-18',
//             `${i + 1}`
//         ));
//     }
//     console.log(connection);
//     console.log(urlParams);
//     console.log(queryParams);
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {
//             pageDataSize: 100,
//             list: data.splice((pageIndex - 1) * pageRows, pageIndex * pageRows)
//         }
//     };
// }

// // 获取区行列表
// function getDistrictRowList() {
//     const data = [];
//     for (let i = 0; i < 20; i++) {
//         data.push(
//             { name: '区行' + (i + 1), code: '区行' + (i + 1) }
//         );
//     }
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data
//     };
// }

// registerMock('get', GET_SERVICE_LIST_URL, getServiceList);
// registerMock('get', GET_DISTRICT_ROW_LIST_URL, getDistrictRowList);
