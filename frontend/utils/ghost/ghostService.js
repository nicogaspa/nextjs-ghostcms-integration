import GhostContentAPI from '@tryghost/content-api'
import GhostAdminAPI from '@tryghost/admin-api'

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL

/**
 * DOCS
 * https://ghost.org/docs/content-api/javascript/
 *
 * */

const contentApi = new GhostContentAPI({
  url: GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: 'v3',
})

const adminApi = new GhostAdminAPI({
  url: GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v3',
})

export async function getPosts(
  include = null,
  fields = null,
  limit = 'all',
  filters = null,
  formats = null,
  admin = false
) {
  /**
   * https://ghost.org/docs/content-api/#posts
   * TODO limit, page, order, filter
   */
  // returns [{id,uuid,title,slug,html,custom_excerpt,url...},...]
  let params = {
    limit,
  }
  if (include !== null) params['include'] = include
  if (fields !== null) params['fields'] = fields
  if (filters !== null) params['filters'] = filters
  if (formats !== null) params['formats'] = formats
  let api = admin === true ? adminApi : contentApi
  // if (include !== null) params['include'] = include
  return await api.posts.browse(params).catch((err) => {
    console.error(err)
  })
}

export async function getPostBySlug(slug) {
  return await contentApi.posts
    .read(
      {
        slug: slug,
        include: 'authors,tags',
      },
      { formats: ['html', 'plaintext'] }
    )
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostByUUID(postUUID) {
  // Need to call adminApi because unpublished posts are not returned by content
  const posts = await getPosts('authors,tags', null, '1', `uuid:${postUUID}`, 'html', true)
  return posts[0]
}
