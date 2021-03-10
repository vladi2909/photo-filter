const fullScreenBtn = document.querySelector('.fullscreen').addEventListener('click', toggleScreen);

const btnsContainer = document.querySelector('.btn-container').addEventListener('click', e => toggleBtns(e));
const btns = document.querySelectorAll('.btn');
const btnLoad = document.querySelector('.btn-load');

const filters = document.querySelectorAll('.filters input');


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

function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    const outputs = document.querySelectorAll('output');

    switch (this.name) {
        case 'blur':
            outputs[0].innerHTML = this.value;
            break;
        case 'invert':
            outputs[1].innerHTML = this.value;
            break;
        case 'sepia':
            outputs[2].innerHTML = this.value;
            break;
        case 'saturate':
            outputs[3].innerHTML = this.value;
            break;
        case 'hue':
            outputs[4].innerHTML = this.value;
            break;
        default:
            break;
    }

}

filters.forEach(input => input.addEventListener('input', handleUpdate));
