/**
 * @type {HTMLDivElement}
 */
const appContent = document.querySelector('[data-id="app-content"]')

setScrollPositionFromStorage()

appContent.addEventListener('scroll', event => {
  localStorage.setItem('scroll-position', appContent.scrollTop)
})


function setScrollPositionFromStorage() {
  const storedScrollPosition = localStorage.getItem('scroll-position')

  appContent.style.scrollBehavior = 'auto'

  appContent.scrollTo({top: storedScrollPosition, behavior: 'auto'})

  appContent.style.scrollBehavior = ''
}
