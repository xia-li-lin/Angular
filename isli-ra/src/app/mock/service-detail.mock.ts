import { registerMock } from '../core/http-mock';
import { ServiceDetailData, ServiceForm } from '../service/model';

const GET_SERVICE_DETAIL_URL = '/v1/service/detail';    // 服务详情

// 获取服务列表
function getServiceDetail() {
    const data = new ServiceDetailData();
    data.cn = new ServiceForm(
        '1',
        '11',
        '000013',
        ['00001','00002','00003','00004','00005','00006'],
        7,
        '4',
        '国家文化大数据项目官网优化点清单.docx',
        '4',
        null,
        null,
        'http://www.mpr.net.cn',
        '1,2,3,4'
    );
    data.en = new ServiceForm(
        '1',
        '22',
        '000013',
        ['00001','00002','00003','00004','00005','00006'],
        7,
        '4',
        '国家文化大数据项目官网优化点清单111.docx',
        '2222222222222',
        null,
        null,
        'http://www.mpr.net.cn',
        '1,2,3,4'
    );
    console.log('--------------------------------------------------------');
    console.log(data);
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data
    };
}

registerMock('get', GET_SERVICE_DETAIL_URL, getServiceDetail);
