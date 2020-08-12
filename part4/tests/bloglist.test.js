const listHelper = require('../utils/list_helper')
const blogsTestData = require('./testinputdata')

test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1)
}) 

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    test('of emptylist is zero', () => expect(listHelper.totalLikes([])).toBe(0))
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogsTestData)
        expect(result).toBe(36)
    })
  })

  describe('most blogs', () => {
    test('of complex data', () => {
        const mostBlogs = listHelper.mostBlogs(blogsTestData)
        expect(mostBlogs.author).toBe('Robert C. Martin')
        expect(mostBlogs.blogs).toBe(3)
    })

    test('of empty data', () => {
        const mostBlogs = listHelper.mostBlogs([])
        expect(mostBlogs).toBe(undefined)
    })
  })

  describe('most likes', () => {
    test('of complex data', () => {
        const mostLikes = listHelper.mostLikes(blogsTestData)
        expect(mostLikes.author).toBe('Edsger W. Dijkstra')
        expect(mostLikes.likes).toBe(17)
    })

    test('of empty data', () => {
        const mostLikes = listHelper.mostLikes([])
        expect(mostLikes).toBe(undefined)
    })
  })