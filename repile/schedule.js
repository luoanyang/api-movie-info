const schedule = require('node-schedule');
const update = require('./update');

// 定时任务,周 1,3,5 的14:01:01 执行.
schedule.scheduleJob('1 1 14 * * 1,3,5,0', function () {
  // 获取电影院上映电影
  update.writePageData('in_theaters', 1);

  // 获取电影院上映所有电影
  update.writeData('in_theaters');

  // 获取即将上映电影
  update.writePageData('coming_soon', 1);

  // 获取北美最火电影
  update.writeData('us_box');
});


// 定时任务,每月31号的14:01:01 执行.
schedule.scheduleJob('1 1 14 31 * *', function () {
  // 获取 Top250
  update.writePageData('top250', 1);
});