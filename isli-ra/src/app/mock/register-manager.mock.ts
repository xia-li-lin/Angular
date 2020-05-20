// import { registerMock } from '../core/http-mock';
// import { PageParams, RegisterManagerData, STATUS, SystemData } from '../service/model';

// const GET_SERVICES_URL = '/v1/services';    // 服务
// const GET_SERVICE_CODE_URL = '/v1/service/code';    // 服务编码
// const GET_SERVICE_PROVIDER_URL = '/v1/service/provider';    // 服务提供商
// const GET_SERVICE_REGISTER_MANAGER_URL = '/v1/service/register/manager';    // 获取服务登记管理列表
// const GET_SYSTEM_DATA_URL = '/v1/system/data/:id';  // 获取系统资料
// const POST_FORZEN_URL = '/v1/forzen/:id';   // 冻结
// const POST_ENABLE_URL = '/v1/enable/:id';   // 启用
// const POST_STOP_URL = '/v1/stop/:id';   // 停用
// const POST_PEND_TRIAL_URL = '/v1/pend/trial/:id';   // 待初审
// const POST_PEND_REVIEW_URL = '/v1/pend/review/:id';   // 待复审
// const POST_TO_EXAMINE_URL = '/v1/to/examine/:id'; // 建设中--审核处理

// // 获取服务
// function getServices() {
//     const data = [
//         { label: '全部', value: '' },
//         { label: '010000_audio', value: '010000_audio' },
//         { label: '010001', value: '010001' },
//         { label: '010003', value: '010003' },
//         { label: 'Link service: audio', value: 'Link service: audio' }
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data
//     };
// }

// // 获取服务编码
// function getServiceCode() {
//     const data = [
//         { label: '全部', value: '' },
//         { label: '010001', value: '010001' },
//         { label: '010002', value: '010002' },
//         { label: '010003', value: '010003' }
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data
//     };
// }

// // 获取服务提供商
// function getServiceProvider() {
//     const data = [
//         { label: '全部', value: '' },
//         { label: '中国香港ISLI注册区组', value: '中国香港ISLI注册区组' },
//         { label: '佩奇集团2', value: '佩奇集团2' },
//         { label: '大唐集团', value: '大唐集团' },
//         { label: '天朗', value: '天朗' },
//         { label: '鑫达产业', value: '鑫达产业' },
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data
//     };
// }

// // 获取服务登记管理列表
// function getServiceRegisterManager() {
//     const pageInfo = new PageParams(1, 10);
//     const pageIndex = pageInfo.pageIndex;
//     const pageRows = pageInfo.pageRows;
//     const data = [
//         new RegisterManagerData('1', 'ISLI/KSL(知识服务)', '000002', '中国香港ISLI注册区组', '2019-11-12', STATUS.NORMAL, '1'),
//         new RegisterManagerData('2', '图书/音像制品关联服务', '000002', '深圳市泛媒网络科技有限公司', '2019-11-13', STATUS.FORZEN, '2'),
//         new RegisterManagerData('3', '视频关联服务010001', '000002', '中国香港ISLI注册区组', '2019-11-12', STATUS.STOP, '3'),
//         new RegisterManagerData('4', '010003', '000002', '中国香港ISLI注册区组', '2019-11-12', STATUS.PEND_TRIAL, '4'),
//         new RegisterManagerData('5', 'ISLI/KSL(知识服务)', '000002', '深圳市泛媒网络科技有限公司', '2019-11-15', STATUS.PEND_REVIEW, '5'),
//         new RegisterManagerData('6', '010002', '000002', '中国香港ISLI注册区组', '2019-11-13', STATUS.NOT_PASS, '6'),
//         new RegisterManagerData('7', '010001', '000002', '中国香港ISLI注册区组', '2019-11-11', STATUS.BUILD, '7'),
//     ];
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: {
//             pageDataSize: 7,
//             list: data.splice((pageIndex - 1) * pageRows, pageIndex * pageRows)
//         }
//     };
// }

// // 服务登记申请资料--获取系统资料
// function getSystemData() {
//     const data = new SystemData(
//         'http://106.75.66.73:28080',
//         'http://106.75.66.71:29080/lcrs/resolution/',
//         '43AE3303-8820-4128-8ED8-16FB957F110A',
//         'AA0C4C96-B065-453B-A5C1-4C0F2706A1F7'
//     );
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data
//     };
// }

// // 冻结
// function postForzen() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     };
// }

// // 启用
// function postEnable() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     }
// }

// // 停用
// function postStop() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     }
// }

// // 待初审
// function postPendTrial() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     }
// }

// // 待复审
// function postPendReview() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     }
// }

// // 建设中-审核处理
// function postToExamine() {
//     return {
//         resultCode: '00000000',
//         resultMsg: 'ok',
//         data: null
//     }
// }

// registerMock('get', GET_SERVICES_URL, getServices);
// registerMock('get', GET_SERVICE_CODE_URL, getServiceCode);
// registerMock('get', GET_SERVICE_PROVIDER_URL, getServiceProvider);
// registerMock('get', GET_SERVICE_REGISTER_MANAGER_URL, getServiceRegisterManager);
// registerMock('get', GET_SYSTEM_DATA_URL, getSystemData);
// registerMock('post', POST_FORZEN_URL, postForzen);
// registerMock('post', POST_ENABLE_URL, postEnable);
// registerMock('post', POST_STOP_URL, postStop);
// registerMock('post', POST_PEND_TRIAL_URL, postPendTrial);
// registerMock('post', POST_PEND_REVIEW_URL, postPendReview);
// registerMock('post', POST_TO_EXAMINE_URL, postToExamine);
