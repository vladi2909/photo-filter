const fullScreenBtn = document.querySelector('.fullscreen').addEventListener('click', toggleScreen);

const btnsContainer = document.querySelector('.btn-container').addEventListener('click', e => toggleBtns(e));
const btns = document.querySelectorAll('.btn');
const btnLoad = document.querySelector('.btn-load');

function toggleScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
}

function toggleBtns(e) {
    if (e.target.classList.contains('btn')) {
        btns.forEach(btn => {
            if (btn.classList.contains('btn-active')) {
                btn.classList.remove('btn-active');
            }
        });

        e.target.classList.add('btn-active');
    }

    if (e.target.classList.value === 'btn-load--input') {
        btns.forEach(btn => btn.classList.remove('btn-active'));
        btnLoad.classList.add('btn-active');
    } 
}