const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.querySelector('.btn-save');
const uploadFile = document.querySelector('.btn-load--input');
const resetBtn = document.querySelector('.btn-reset');
const nextBtn = document.querySelector('.btn-next');

const filters = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('output');

let imageCount = 0;

// Add filters
filters.forEach(input => input.addEventListener('input', (e) => {
    

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

    ctx.filter = `blur(${outputs[0].value}px) invert(${outputs[1].value}%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${outputs[4].value}deg)`;
    ctx.drawImage(img, 0 , 0);
}));

// resert file
resetBtn.addEventListener('click', (e) => {
    filters.forEach((input, index) =>  {
        const suffix = input.dataset.sizing || '';
        (index === 3) ? input.value = 100 : input.value = 0;
        document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
    });

    outputs.forEach((item, index) => index === 3 ? item.innerHTML = 100 : item.innerHTML = 0);
    ctx.filter = `blur(0px) invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg)`;
    ctx.drawImage(img, 0 , 0);
});

nextBtn.addEventListener('click', (e) => {
    const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
    const imgNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const urlTimeOfDay  = baseUrl + getTimeOfDay() + '/';
    const index = imageCount % imgNum.length;
    const imageSrc = urlTimeOfDay + imgNum[index] + '.jpg';
    // img = new Image();
    img.src = imageSrc;
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }

    imageCount++;

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
    } else {timeOfDay = 'tyt'}

    return timeOfDay;
}

// Upload file
uploadFile.addEventListener('change', (e) => {
    const file = uploadFile.files[0];
    const reader = new FileReader();

    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    }, false);

});

// download
downloadBtn.addEventListener('click', (e) => {
    const fileExtension = fileName.slice(-4);
    let newFileName;
    
    if (fileExtension === '.jpg' || fileExtension === '.png') {
        newFileName = fileName.substring(0, fileName.length - 4) + '(edited).jpg';
    }

    download(canvas, newFileName);
});

function download(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
    link.delete;
}