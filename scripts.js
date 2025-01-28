/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"63U4NaZy7nowynoc","label":"social","bookmarks":[{"id":"L0YGoJr0f50XXSbD","label":"reddit","url":"https://www.reddit.com/"},{"id":"GeYZdTk7bMOAx0NY","label":"4chan","url":"https://www.4chan.org"},{"id":"kol40asbj1XVB4VJ","label":"youtube","url":"https://www.youtube.com/"},{"id":"eOFVuBYt1mo5dKeA","label":"ign","url":"https://www.ign.com/"}]},{"id":"Hk7wies9urs5VSq3","label":"media","bookmarks":[{"id":"GJhAIkt4nitjbFM6","label":"netflix","url":"https://www.netflix.com/"},{"id":"cXYyQ7BFiZgN9TK6","label":"hbo","url":"https://www.max.com/"},{"id":"fe4IkPNsrlrpaOE7","label":"espn","url":"https://plus.espn.com/"},{"id":"FGgT8eXJlJR8uaMW","label":"anime","url":"https://zoro.to/"}]},{"id":"p7Og7Q8SCRrrWdRf","label":"develop","bookmarks":[{"id":"rlAaF64AUHRuomku","label":"udemy","url":"https://www.udemy.com/"},{"id":"cZM5O99uDLJmxfDg","label":"github","url":"https://github.com/"},{"id":"N72opnfxq4hyHpOQ","label":"aws","url":"https://aws.amazon.com/console/"},{"id":"2jRokDJyJzXWHqBD","label":"freecodecamp","url":"https://www.freecodecamp.org/"}]},{"id":"LvFo7AZs51CvCYMX","label":"other","bookmarks":[{"id":"xrWOhgPQWjO0VU1w","label":"amazon","url":"https://www.amazon.com/"},{"id":"My3k3iBrzliOOzcz","label":"disney","url":"https://www.disneyplus.com/"},{"id":"JpCbaCWF2XXPuSUm","label":"hulu","url":"https://www.hulu.com/welcome?orig_referrer=https%3A%2F%2Fwww.google.com%2F"},{"id":"dnFyMBwQqkB7SoCH","label":"spotify","url":"https://open.spotify.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
