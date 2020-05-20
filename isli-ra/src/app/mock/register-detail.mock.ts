import { registerMock } from '../core/http-mock';
import {
    ServiceRegisterInfoData, ServiceProviderInfoData,
    ServiceRegisterBaseInfoObj, ApplyServicePlanObj, STATUS, NormalObj
} from '../service/model';

const GET_SERVICE_REGISTER_DETAIL_URL = '/v1/service/register/detail/:id/:status';    // 服务服务登记详情信息

// 获取服务登记详情信息
function getServiceRegisterDetail(connection, urlParams, queryParams) {
    const applyServicePlanObj = new ApplyServicePlanObj(
        '国家数字复合出版系统工程 22包软件安装部署手册V3.0.doc',
        '',
        ''
    );
    const serviceRegisterBaseInfoObj = new ServiceRegisterBaseInfoObj(
        '其他文献关联服务',
        '000002',
        'documentation——text、documentation——picture、documentation——audio、documentation——video',
        'documentation',
        'text、audio、video、picture',
        '15',
        '15',
        applyServicePlanObj,
        STATUS.NORMAL
    );
    const data = {
        serviceRegisterInfo: new ServiceRegisterInfoData(
            serviceRegisterBaseInfoObj,
            new NormalObj(
                'cc',
                'cc',
                '2019-11-08',
                '2019-11-08',
                '2019-11-08',
                '88',
                '2019-11-08',
                '9999999999999'
            )
        ),
        serviceProviderInfo: new ServiceProviderInfoData(
            'wenw@mpreader.com',
            '中国香港ISLI注册区组',
            '吕正江',
            '86-0755-83594693-662',
            '86-17688533995',
            'web前端开发工程师',
            'lvzj@mpreader.com',
            'www.mpreader.com',
            '655403'
        )
    };
    console.log(connection);
    console.log(urlParams);
    console.log(queryParams);
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: data
    };
}

registerMock('get', GET_SERVICE_REGISTER_DETAIL_URL, getServiceRegisterDetail);
