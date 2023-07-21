const playBtn = document.querySelector('#playBtn')
const gameMenu = document.querySelector('.game-menu')

playBtn.addEventListener('click', () => {
  GameRun = true
  console.log('Loaded.....')
  setTimeout(() => {
    isShowGameplay = true
    console.log('loading')
  }, 500)

  gameMenu.classList.remove('visible')
})
