const URL_IMAGE_SERVER = 'https://pixabay.com/api/?key=37954840-02a2d9419214ddd959c05fe70&orientation=vertical&image_type=photo&per_page=21'

const input = document.querySelector('.filter_input');
const main = document.querySelector('.photo_container');
const btnClearInput = document.querySelector('.btn_clear_input');
const btnPrevPage = document.querySelector('.btn_prev');
const btnNextPage = document.querySelector('.btn_next');
const pageNumber = document.querySelector('.number_page');

let photos = [];
let currentPage = 1;

// Загрузка данных из API
const getData = (url, page = 1) => fetch(`${url}&page=${page}`)
.then(res => res.json())
.then(data => {
    photos = [...data.hits];
    showPhoto(photos);
})
.catch(error => console.error('Ошибка:', error))

getData(URL_IMAGE_SERVER, currentPage);

// Функция очистки фильтра тегов
function clearInput() {
        input.value = '';
        showPhoto(photos);
        btnClearInput.setAttribute('disabled', true);
}

// Функция создающая элемент для вывода фото
function createElementShowPhoto({user, largeImageURL}){
    const photoItem = document.createElement('div');
    photoItem.classList.add('photo_item');
    photoItem.innerHTML = `
        <h2>${user}</h2>
        <img src="${largeImageURL}" alt="${user}"></img>
    `
    main.appendChild(photoItem);
}

// Функция вывода полученных фотографий на страницу
function showPhoto (photos) {
    main.innerHTML = ``;
    photos.map(createElementShowPhoto);
}

// Функция фильтрации фотографий по тегу
function filterPhotos() {
    const valueFromInput = input.value.toUpperCase().trim();
    const filtered = photos.filter(({tags}) => tags.toUpperCase().trim().includes(valueFromInput));
    showPhoto(filtered);

    btnClearInput.disabled = !valueFromInput;
}

// Инпут для ввода тегов
input.addEventListener('input', filterPhotos);

// Вызов функции очистки фильтра
btnClearInput.addEventListener('click', clearInput);

// Разбиение на страницы
function paginationControl(currentPage) {
    pageNumber.textContent = currentPage;
    getData(URL_IMAGE_SERVER, currentPage);
    btnPrevPage.disabled = currentPage < 2;
}

// Вызов предыдущей страницы
btnPrevPage.addEventListener('click', () => {
    paginationControl(--currentPage);
});

// Вызов следующей страницы
btnNextPage.addEventListener('click', () => {
    paginationControl(++currentPage);
});