/**
 * @type {HTMLDivElement}
 */
const appContent = document.querySelector('[data-id="app-content"]')

setScrollPositionFromStorage()

appContent.addEventListener('scroll', event => {
  sessionStorage.setItem('scroll-position', appContent.scrollTop)
})

function setScrollPositionFromStorage() {
  const storedScrollPosition = sessionStorage.getItem('scroll-position')

  appContent.style.scrollBehavior = 'auto'

  appContent.scrollTo({top: storedScrollPosition, behavior: 'auto'})

  appContent.style.scrollBehavior = ''
}




/**
 * @type {HTMLCanvasElement}
 */
const particlesCanvas = document.querySelector('.particle-effect')
const parentSection = particlesCanvas.parentElement

particlesCanvas.width = parentSection.offsetWidth
particlesCanvas.height = parentSection.offsetHeight

const ctx = particlesCanvas.getContext('2d')


window.addEventListener('resize', event => {
  particlesCanvas.width = parentSection.offsetWidth
  particlesCanvas.height = parentSection.offsetHeight
})


function randomRange(from, to) {
  return Math.floor(Math.random() * (to + 1 - from)) + from
}

class Dot {

  constructor() {
    this.x = randomRange(10, particlesCanvas.width - 10)
    this.y = randomRange(10, particlesCanvas.height - 10)

    this.size = randomRange(5, 20)

    this.speedX = randomRange(1, 3)
    this.speedY = randomRange(1, 3)

    this.draw()
  }

  get leftEdge() {
    return this.x - this.size / 2
  }

  get rightEdge() {
    return this.x + this.size / 2
  }

  get topEdge() {
    return this.y - this.size / 2
  }

  get bottomEdge() {
    return this.y + this.size / 2
  }

  get radius() {
    return this.size / 2
  }

  static createDots(length) {
    const array = Array.from({length})

    return array.map(() => new Dot())
  }

  draw() {
    ctx.beginPath()

    // ctx.strokeStyle = '#000'
    // ctx.lineWidth = 2
    ctx.fillStyle = '#31888c'

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

    // ctx.stroke()
    ctx.fill()
  }

  update() {
    if (this.leftEdge <= 0 || this.rightEdge >= ctx.canvas.width) {
      this.speedX *= -1
    }

    if (this.topEdge <= 0 || this.bottomEdge >= ctx.canvas.height) {
      this.speedY *= -1
    }

    this.x += this.speedX
    this.y += this.speedY


    // Handle out of bounds

    if (this.leftEdge < 0) {
      this.x = 0 + this.radius
    } else if (this.rightEdge > ctx.canvas.width) {
      this.x = ctx.canvas.width - this.radius
    }

    if (this.topEdge < 0) {
      this.y = 0 + this.radius
    } else if (this.bottomEdge > ctx.canvas.height) {
      this.y = ctx.canvas.height - this.radius
    }
  }

}

const dots = Dot.createDots(30)


requestAnimationFrame(function animation() {
  requestAnimationFrame(animation)

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  dots.forEach(dot => {
    dot.update()
    dot.draw()
  })
})
