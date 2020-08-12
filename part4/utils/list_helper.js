const _ = require('lodash')
const testinputdata = require('../tests/testinputdata')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.length !== 0 ? blogs.reduce((sum, act) => sum + act.likes, 0) : 0
}

const mostBlogs = (blogs) => {
    return _(blogs)
        .groupBy('author')
        .map((group, key) => ({ 'author': key, 'blogs': group.length }))
        .maxBy(x => x.blogs)
}

const mostLikes = (blogs) => {
    return _(blogs)
    .groupBy('author')
    .map((group, key) => ({ 'author': key, 'likes': _.sumBy(group, x => x.likes)}))
    .maxBy(x => x.likes)        
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes }