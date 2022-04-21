const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema

mongoose.plugin(slug);

const articleSchema = new Schema({

    title: {
      type:String,
      required:true
    },
    description: {
      type:String,
      required:true
    },
    body: {
      type:String,
      required:true
    },
    tagList: [{
      type: String
    }],
    author: {
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    favorited: {
      type: Boolean,
      default: false
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    slug: {
      type: String, 
      slug: "title" 
    },
    favoritedBy: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
    }]
    
  },  { timestamps: true });

  const Article = mongoose.model('Article', articleSchema);

  exports.Article = Article