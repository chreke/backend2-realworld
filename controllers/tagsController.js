const { Article } = require('../models/Article');

const getTags = async (req, res) => {

const articles = await Article.find()
let articlesTag = []

for (let i = 0; i < articles.length; i++) {
  articlesTag.push(articles[i].tagList[0])       
}

const filterdTags = articlesTag.filter(element => {
    return element !== undefined
})

let tags = [... new Set(filterdTags)]



res.json({ tags });
}


module.exports = { getTags, }