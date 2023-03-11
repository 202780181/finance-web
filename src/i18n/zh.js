/*
*  本地定义的中文版内容
*/

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
    ...modules,
    platform: '经费查询系统',
}

