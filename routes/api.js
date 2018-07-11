const config = require('../common/config');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cheerio = require('cheerio');
const superagent = require('superagent');

// 评分最高电影 top250
router.get('/movie/top250', (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  const path = `${config.DATA_PATCH}top250?page=${page}.json`;
  const data = require(path);
  res.json(data);
});

//电影院上映电影
router.get('/movie/on-now', (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  const path = `${config.DATA_PATCH}in_theaters?page=${page}.json`;
  const data = require(path);
  res.json(data);
});

//电影院上映所有电影
router.get('/movie/on-now-all', (req, res, next) => {
  const path = `${config.DATA_PATCH}in_theaters_all.json`;
  const data = require(path);
  res.json(data);
});

//即将上映电影
router.get('/movie/coming-soon', (req, res, next) => {
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  const path = `${config.DATA_PATCH}coming_soon?page=${page}.json`;
  const data = require(path);
  res.json(data);
});

// 根据电影id查找电影详细信息
router.get('/movie/subject/:id', (req, res, next) => {
  // const textName = `${config.SUBJECT_DATA_PATCH}${req.params.id}.json`;

  // if (fs.existsSync(textName)) {
  //   const text = fs.readFileSync(textName);
  //   const textJson = JSON.parse(text);
  //   // 检查存储的json文件是否有数据,有数据就直接获取返回,没有的话,就在爬一次数据.
  //   if (text.toString() && textJson.url) {
  //     const data = require(textName);
  //     return res.json(data);
  //   }
  // }
  // 爬取电影详情的数据.
  superagent.get('https://movie.douban.com/subject/' + req.params.id).end(function(err, result) {
    if (err) {
      return next(err);
    }
    const $ = cheerio.load(result.text);
    const info = $('#info').text();
    const startIndex = info.indexOf('类型:');
    const endIndex = info.indexOf('官方网站:');
    let tags = '';

    if (endIndex !== -1 && startIndex !== -1) {
      tags = info.slice(startIndex, endIndex).replace('类型:', '');
    } else {
      tags = info.slice(startIndex, info.indexOf('制片国家/地区:')).replace('类型:', '');
    }
    const data = {
      title: $('#content>h1>span[property="v:itemreviewed"]').text().split(' ')[0],
      directors: $('#info>span:first-child .attrs').text(),
      casts: $('#info>.actor .attrs').text(),
      tags: tags,
      average: $('#interest_sectl .rating_self .rating_num').text(),
      avatar: $('#mainpic>.nbgnbg>img').attr('src'),
      summary: $('#link-report span[property="v:summary"]').text().replace('©豆瓣', ''),
      url: $('#info>a:last-of-type').attr('href')
    };

    // fs.writeFileSync(textName, JSON.stringify(data));
    res.json(data);
  });

});

// 北美最火电影
router.get('/movie/us-box', (req, res, next) => {
  const path = `${config.DATA_PATCH}us_box_all.json`;
  const data = require(path);
  res.json(data);
});

// 查找电影，query:{q:关键字，tag:标签)
router.get('/movie/search', (req, res, next) => {
  request(`https://api.douban.com/v2${req.originalUrl}`, (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.body)
  })
});


module.exports = router;