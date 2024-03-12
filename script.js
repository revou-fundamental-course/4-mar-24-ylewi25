const calcBtn = document.querySelector('.button');
const reset = document.querySelector('.reset');
const mass = document.getElementById('mass');
const age = document.getElementById('age');
const bodyHeight = document.getElementById('body-height');
const indexResult = document.querySelector('.index-result');
const indexScale = document.querySelector('.index-scale');
const indexDescription = document.querySelector('.index-description');
const howTo = document.querySelector('.how-to');
const ifYou = document.querySelector('.if-you');
const resultOpenoing = document.querySelector('.result-opening');
const addInfo = document.querySelector('.additional-info');
const deseaseMore = document.querySelector('.desease-more');
const deseaseLess = document.querySelector('.desease-less');
const liMore = document.querySelector('.li-more');
const liLess = document.querySelector('.li-less');
const subject = document.querySelector('.subject-desc');
const howToDoIt = document.querySelectorAll('.howto-doit');
const pria = document.getElementById('pria');
const wanita = document.getElementById('wanita');
const unit = document.getElementById('unit');
const unitInfo = document.querySelector('.unit-info');
const loader = document.querySelector('.loader');
const resultArea = document.querySelector('.result-area');
const popUp = document.querySelector('.popUp');
const overlay = document.querySelector('.overlay');
const popUpRemove = document.querySelector('.popup-remove');
const popUpContainer = document.querySelector('.popUp-container');

let gender = "Pria";

let unitChosen = unit.value;
unitInfo.innerHTML = unitChosen;

unit.addEventListener('change', changeOption);

function changeOption() {
    unitChosen = unit.value;
    unitInfo.innerHTML = unitChosen;
}

resultArea.removeChild(loader);

calcBtn.addEventListener('click', () => {
    if (mass.value.length !== 0 && age.value.length !== 0 && bodyHeight.value.length !== 0) {
        resultArea.appendChild(loader);
        let divider = 0;
        if (unit.value == "cm") {
            divider = 100;
        } else {
            divider = 1;
        }

        let resultNumber = mass.value / ((bodyHeight.value / divider)**2);
        if (resultNumber < 1) {
            resultNumber = round(resultNumber, 4);
        } else {
            resultNumber = round(resultNumber, 1);
        }
        indexResult.innerHTML = resultNumber;

        if (wanita.checked = true) {
            gender = "Wanita";
        } else {
            gender = "Pria";
        }

        subject.innerHTML = "Jenis Kelamin : " + gender + ", Usia : " + age.value + " tahun, Tinggi Badan : " + bodyHeight.value + " " + unit.value;

        resultOpenoing.innerHTML = "Body Mass Index Anda adalah :";

        if (resultNumber < 18.5) {
            indexScale.innerHTML = "Hasil BMI kurang dari 18.5";
            indexDescription.innerHTML = "Anda berada dalam kategori <strong>Kurang Berat Badan</strong>.";
            howTo.innerHTML = "Cara terbaik untuk menaikan berat badan adalah Mengonsumsi Makanan yang Kaya Nutrisi, Memilih Makanan Padat Kalori dan Memperbanyak Air Mineral dan Susu.";
            ifYou.innerHTML = "";
            deseaseLess.classList.add('active');
            deseaseMore.classList.remove('active');
            liLess.classList.add('active');
            liMore.classList.remove('active');
        } else if (resultNumber >= 18.5 && resultNumber < 25) {
            indexScale.innerHTML = "Hasil BMI diantara 18.5 dan 24.9";
            indexDescription.innerHTML = "Anda berada dalam kategori <strong>Normal</strong> atau <strong>Ideal</strong>.";
            howTo.innerHTML = "Cara terbaik untuk menjaga berat badan tetap ideal adalah Mengatur pola makan agar bisa berjalan dengan tepat dan Rutin melakukan aktivitas fisik atau latihan fisik.";
            ifYou.innerHTML = "";
            deseaseLess.classList.remove('active');
            deseaseMore.classList.remove('active');
            liLess.classList.remove('active');
            liMore.classList.remove('active');
        } else if (resultNumber >= 25 && resultNumber < 30) {
            indexScale.innerHTML = "Hasil BMI diantara 25 dan 30";
            indexDescription.innerHTML = "Anda berada dalam kategori <strong>Kelebihan Berat Badan</strong>.";
            howTo.innerHTML = "Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.";
            ifYou.innerHTML = "Jika BMI Anda dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.";
            deseaseLess.classList.remove('active');
            deseaseMore.classList.add('active');
            liLess.classList.remove('active');
            liMore.classList.add('active');
        } else {
            indexScale.innerHTML = "Hasil BMI lebih dari 30";
            indexDescription.innerHTML = "Anda berada dalam kategori <strong>Kegemukan</strong> atau <strong>Obesitas</strong>.";
            howTo.innerHTML = "Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi, berolahraga, perbanyak konsumsi serat, hindari stress eating dan atur waktu tidur dengan baik.";
            ifYou.innerHTML = "Jika BMI Anda dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.";
            deseaseLess.classList.remove('active');
            deseaseMore.classList.add('active');
            liLess.classList.remove('active');
            liMore.classList.add('active');
        }

        addInfo.innerHTML = "BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan resiko penyakit seseorang. Anda perlu konsultasi lebih lanjut mengenai resiko dan kekhawatiran Anda terkait dengan berat badan Anda.";

        howToDoIt.forEach(how => {
            how.classList.add('active');
        })

        setTimeout(removeLoader, 5000);       
} else {
    // alert("Input Berat Badan, Usia dan Tinggi Badan Anda");
    overlay.classList.remove('close');
    popUp.classList.add('showpopUp');
    popUpContainer.classList.add('active');
}})

reset.addEventListener('click', () => {
    mass.value = "";
    age.value = "";
    bodyHeight.value = "";
    pria.checked = true;
    unit.value = "cm";

    changeOption();
})

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function removeLoader() {
    resultArea.removeChild(loader);
}

document.addEventListener('click', e => {
    if (!popUp.contains(e.target) && e.target !== calcBtn) {
        overlay.classList.add('close');
        popUp.classList.remove('showpopUp');
        popUpContainer.classList.remove('active');
    }
})

popUpRemove.addEventListener('click', () => {
    overlay.classList.add('close');
    popUp.classList.remove('showpopUp');
    popUpContainer.classList.remove('active');
})