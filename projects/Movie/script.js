const cardItem = document.querySelectorAll('.cards__item');
const cinema = document.querySelector('.cinema');
const video = document.querySelector('.video__viewer');
const player = document.querySelector('.player');
const closeVideoBtn = document.querySelector('.close-video');

cardItem.forEach(function (el) {
    let x = (document.documentElement.clientWidth - player.offsetWidth) / 2;
    let y = (document.documentElement.clientHeight - player.offsetHeight) / 2.5;
    el.addEventListener('click', function () {
        let videoNumber;
        if (el.id == 'item1') {
            videoNumber = 1
        } else if (el.id == 'item2') {
            videoNumber = 2
        } else if (el.id == 'item3') {
            videoNumber = 3
        } else if (el.id == 'item4') {
            videoNumber = 4
        } else if (el.id == 'item5') {
            videoNumber = 5
        } else if (el.id == 'item6') {
            videoNumber = 6
        } else if (el.id == 'item7') {
            videoNumber = 7
        } else if (el.id == 'item8') {
            videoNumber = 8
        } else if (el.id == 'item9') {
            videoNumber = 9
        } else if (el.id == 'item10') {
            videoNumber = 10
        } else if (el.id == 'item11') {
            videoNumber = 11
        } else if (el.id == 'item12') {
            videoNumber = 12
        }
        video.src = `video/${videoNumber}.mp4`;
        player.style.top = `${y}px`;
        player.style.left = `${x}px`;
        cinema.style.zIndex = '10';
        cinema.style.opacity = '10';
        cinema.style.backgroundColor = 'rgb(0 0 0 / 90%)';
        player.style.opacity = '1';      
        closeVideoBtn.style.display = 'block';
        closeVideoBtn.style.left = `${player.getBoundingClientRect().width + x}px`;
        closeVideoBtn.style.top = `${player.getBoundingClientRect().y}px`; 
    });
});

document.addEventListener('keydown', function (e) {   
    if (e.code == 'Escape') {
        video.pause();
        video.currentTime = 0;
        cinema.style.zIndex = '0';
        cinema.style.opacity = '0';
        player.style.opacity = '0';
        closeVideoBtn.style.display = 'none';
    }
});

closeVideoBtn.addEventListener('click', function(e){
    video.pause();
    video.currentTime = 0;
    cinema.style.zIndex = '0';
    cinema.style.opacity = '0';
    player.style.opacity = '0';
    closeVideoBtn.style.display = 'none';
})





