import { registerMock } from '../core/http-mock';
import { DropDownOption } from '../service/model';

const GET_SERVICE_ASSOCIATION_TYPE_URL = '/v1/service/association/type';    // 获取关联类型
const GET_AUTO_GET_SERVICE_CODE_URL = '/v1/auto/get/service/code';  // 自动获取服务编码
const GET_SERVICE_EXIST_URL = '/v1/service/exist'; // 服务是否存在
const POST_SAVE_SERVICE = '/v1/save/service'; // 保存服务

// 获取获取关联类型
function getServiceAssociationType() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push(new DropDownOption(
            `0000${i + 1}`,
            `${i + 1}`
        ));
    }
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: data
    };
}

// 自动获取服务编码
function getAutoGetServiceCode() {
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: '000001'
    };
}

// 服务是否存在
function checkServiceExist(){
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: false
    };
}

// 保存服务
function postSaveService(){
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: null
    };
}


registerMock('get', GET_SERVICE_ASSOCIATION_TYPE_URL, getServiceAssociationType);
registerMock('get', GET_AUTO_GET_SERVICE_CODE_URL, getAutoGetServiceCode);
registerMock('post', POST_SAVE_SERVICE, postSaveService);
registerMock('get', GET_SERVICE_EXIST_URL, checkServiceExist);
