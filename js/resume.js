// select reesume iframe and loading gif div
var resume = document.querySelector('#myResume')
var animation = document.querySelector('#loadingGif')

resume.onload = () => {
    // remove loading gif when resume loaded and make resume visible
    console.log('loaded')
    resume.style.visibility = 'visible'
    animation.style.display = 'none'        // use display: none to remove space made by div
}