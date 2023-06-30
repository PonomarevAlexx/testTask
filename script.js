let photos = [];
let currentPage = 1;
const input = document.querySelector('.filter_input');
const main = document.querySelector('.photo_container');
const btnClearInput = document.querySelector('.btn_clear_input');
const URL_IMAGE_SERVER = 'https://pixabay.com/api/?key=37954840-02a2d9419214ddd959c05fe70&orientation=vertical&image_type=photo&per_page=21'
const btnPrevPage = document.querySelector('.btn_prev');
const btnNextPage = document.querySelector('.btn_next');
const pageNumber = document.querySelector('.number_page');

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
    if(input.value !== ''){
        input.value = '';
        showPhoto(photos);
    }
}

// Функция создающая элемент для вывода фото
function createElementShowPhoto(elem){
    const photoItem = document.createElement('div');
    photoItem.classList.add('photo_item');
    photoItem.innerHTML = `
        <h2>${elem.user}</h2>
        <img src="${elem.largeImageURL}" alt="${elem.user}"></img>
    `
    main.appendChild(photoItem);
}

// Функция вывода полученных фотографий на страницу
function showPhoto (photos) {
    main.innerHTML = ``;
    photos.forEach(elem => createElementShowPhoto(elem));
}

// Функция фильтрации фотографий по тегу
function filterPhotos() {
    const valueFromInput = input.value.toUpperCase();
    const filtered = photos.filter(photo => photo.tags.toUpperCase().indexOf(valueFromInput) > -1);
    showPhoto(filtered);
}

// Инпут для ввода тегов
input.addEventListener('input', filterPhotos);

// Вызов функции очистки фильтра
btnClearInput.addEventListener('click', clearInput);

// Вызов предыдущей страницы
btnPrevPage.addEventListener('click', () => {
    currentPage--;
    pageNumber.textContent = currentPage;
    getData(URL_IMAGE_SERVER, currentPage);
    if(currentPage < 2) btnPrevPage.setAttribute('disabled', true);
});

// Вызов следующей страницы
btnNextPage.addEventListener('click', () => {
    currentPage++;
    pageNumber.textContent = currentPage;
    getData(URL_IMAGE_SERVER, currentPage);
    if(currentPage > 1) btnPrevPage.removeAttribute('disabled');
});