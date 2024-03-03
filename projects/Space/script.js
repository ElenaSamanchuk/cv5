let planets = document.querySelectorAll('.header__planet');
let main = document.querySelector('main');
let playBtn = document.querySelector('.main__button');
let desc = document.querySelector('.main__description');
let Name = document.querySelector('.main__planet-name');
const audio = new Audio('sounds/sun.mp3');
audio.loop = 'true';
let curBg = 'sun';

planets.forEach(planet => {
    planet.addEventListener('click', () => {
        curBg = planet.dataset.bg;
        main.className = `${curBg}`;
        Name.textContent = curBg;
        audio.src = `sounds/${curBg}.mp3`
        if (playBtn.classList.contains('playing')) {
            audio.play();
        }
        planets.forEach (planet => {
            if (planet.dataset.bg == curBg) {
                planet.classList.add('active');
            } else {
                planet.classList.remove('active');
            }
        })
    })
});

playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('playing')) {
        audio.pause();
    } else {
        audio.play();
    }
    playBtn.classList.toggle('playing');
});
