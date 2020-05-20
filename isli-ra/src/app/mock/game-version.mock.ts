import { registerMock } from '../core/http-mock';

const GET_GAME_VERSION_URL = 'GET_GAME_VERSION_URL';

function getGameVersionData() {
    const obj = [

    ];
    return {
        resultCode: '00000000',
        resultMsg: 'ok',
        data: obj
    };
}
registerMock('get', GET_GAME_VERSION_URL, getGameVersionData);
