const test = require('../../data/test')

module.exports = (req, res, next) => {
  const testData = test()
  testData.desc = '这是自定义数据'
  res.success(testData)
}

