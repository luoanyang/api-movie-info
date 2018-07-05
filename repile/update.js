const request = require('request');
const fs = require('fs');
//请求地址
const REQUEST_API = 'https://api.douban.com/v2/movie/';
//储存数据的地址
const DATA_PATCH = '/home/html/web/api-movie/data/';

// 根据接口获取数据并且写入.json文件,分页数据
function writePageData(name, page) {
  const url = `${REQUEST_API}${name}?start= ${(page - 1) * 10} &count=10`;
  request(url, (err, result) => {
    if (err) {
      return next(err);
    }
    const data = JSON.parse(result.body);
    const totalPage = Math.ceil(data.total / data.count);
    const textName = `${DATA_PATCH}${name}?page=${page}.json`;
    fs.writeFileSync(textName, result.body);
    if (page < totalPage) {
      console.log(page)
      page++;
      writePageData(name, page);
    }
  });
}

// 根据接口获取数据并且写入.json文件
function writeData(name) {
  const url = `${REQUEST_API}${name}?start=0&count=100`;
  request(url, (err, result) => {
    if (err) {
      return next(err);
    }
    const textName = `${DATA_PATCH}${name}_all.json`;
    fs.writeFileSync(textName, result.body);
  });
}

module.exports = {
  writeData,
  writePageData
};