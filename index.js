const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const imgDOM = document.querySelector('img');
const filterDef = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('output');

let fileName = '';
let img = new Image();
let imageCount = 0;

const resetBtn = document.querySelector('.btn-reset');
const nextBtn = document.querySelector('.btn-next');
const uploadBtn = document.querySelector('input[type="file"]');
const downloadBtn = document.querySelector('.btn-save');

const fullScreenBtn = document.querySelector('.fullscreen');
const btnsContainer = document.querySelector('.btn-container');
const btns = document.querySelectorAll('.btn');
const btnLoad = document.querySelector('.btn-load');

// Download default image
window.onload = () => {
    img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgDOM.src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
};

// Add filters
const filters = document.querySelector('.filters').addEventListener('input', (e) => {
    switch (e.target.name) {
        case 'blur':
            outputs[0].innerHTML = e.target.value;
            break;
        case 'invert':
            outputs[1].innerHTML = e.target.value;
            break;
        case 'sepia':
            outputs[2].innerHTML = e.target.value;
            break;
        case 'saturate':
            outputs[3].innerHTML = e.target.value;
            break;
        case 'hue-rotate':
            outputs[4].innerHTML = e.target.value;
            break;
        default:
            break;
    }

    const suffix = e.target.dataset.sizing || '';
    const name = e.target.name === 'hue-rotate' ? e.target.name.slice(0, 3) : e.target.name;
    document.documentElement.style.setProperty(`--${name}`, e.target.value + suffix);
});

// Reset filters
resetBtn.addEventListener('click', () => {
    filterDef.forEach((input, index) =>  {
        const suffix = input.dataset.sizing || '';
        (index === 3) ? input.value = 100 : input.value = 0;
        const name = input.name === 'hue-rotate' ? input.name.slice(0, 3) : input.name;
        document.documentElement.style.setProperty(`--${name}`, input.value + suffix);
    });

    outputs.forEach((item, index) => index === 3 ? item.innerHTML = 100 : item.innerHTML = 0);
});

// Next
nextBtn.addEventListener('click', () => {
    const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
    const images = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const urlTimeOfDay = baseUrl + getTimeOfDay() + '/';
    const index = imageCount % images.length;
    const imageSrc = urlTimeOfDay + images[index] + '.jpg';
    imgDOM.src = imageSrc;
    imageCount++;

    img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imageSrc;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
});

function getTimeOfDay() {
    const time = new Date().getHours();
    const arrTimesOfDay = ['morning', 'day', 'evening', 'night'];
    let timeOfDay;

    if (time >= 6 && time < 12) {
        timeOfDay = arrTimesOfDay[0];
    } else if (time >= 12 && time < 18) {
        timeOfDay = arrTimesOfDay[1];
    } else if (time >= 18 && time < 24) {
        timeOfDay = arrTimesOfDay[2];
    } else if (time >= 0 && time < 6) {
        timeOfDay = arrTimesOfDay[3];
    } else { timeOfDay = 'tyt' }

    return timeOfDay;
}

// Upload file
uploadBtn.addEventListener('change', () => {
    const file = uploadBtn.files[0];
    const reader = new FileReader();

    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    //add img to canvas
    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        imgDOM.src = reader.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    });

});

// Download file
downloadBtn.addEventListener('click', (e) => {
    ctx.filter = `blur(${outputs[0].value}px) invert(${outputs[1].value}%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${outputs[4].value}deg)`;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.download = 'download.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
    link.delete;
});

fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
});

btnsContainer.addEventListener('click', (e) => {
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
});