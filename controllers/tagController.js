const {findAllTags} = require("../models/article")
exports.get_All_Tags = async function(req, res, next){
    const tagss = await findAllTags()
    let arrayOfTags = []
    tagss.forEach(item => {
        arrayOfTags = arrayOfTags.concat(item.tagList)
    })
    tags = [...new Set(arrayOfTags)];
    let tagscount = {}
    arrayOfTags.forEach(item => {
        tagscount[item] = (tagscount[item] || 0) + 1;
    })
    
    res.json({tags})
}