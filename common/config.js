require('dotenv').config();

module.exports = {
  // 数据储存路径
  DATA_PATCH: process.env.dataSrc,
  // 单个电影储存路径
  SUBJECT_DATA_PATCH: process.env.subjectDataSrc,
  //请求地址
  REQUEST_API: 'https://api.douban.com/v2/movie/'
};