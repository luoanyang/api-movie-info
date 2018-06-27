const update = require('./update');

// 获取电影院上映电影
update.writePageData('in_theaters', 1);

// 获取电影院上映所有电影
update.writeData('in_theaters');

// 获取即将上映电影
update.writePageData('coming_soon', 1);

// 获取北美最火电影
update.writeData('us_box');

// 获取 Top250
update.writePageData('top250', 1);