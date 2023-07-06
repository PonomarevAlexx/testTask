const URL_IMAGE_SERVER = 'https://pixabay.com/api/?key=37954840-02a2d9419214ddd959c05fe70&orientation=vertical&image_type=photo&per_page=21'

const input = document.querySelector('.filter_input');
const main = document.querySelector('.photo_container');
const btnClearInput = document.querySelector('.btn_clear_input');
const btnPrevPage = document.querySelector('.btn_prev');
const btnNextPage = document.querySelector('.btn_next');
const pageNumber = document.querySelector('.number_page');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const btnCloseModal = document.querySelector('.modal-close');

let photos = [];
let currentPage = 1;
let timeoutId;
let numberOfPage;

// Загрузка данных из API
const getData = (url, page = 1, filterValue) => fetch(`${url}&page=${page}&q=${filterValue || ''}`)
.then(res => res.json())
.then(({totalHits, hits, total}) => {
    photos = [...hits];

    numberOfPage = total / 21;

    if (totalHits === 0) {
        main.innerHTML = '<h2>Ничего не найдено</h2>';
        btnNextPage.disabled = true;
        return;
    } else if (btnNextPage.disabled){
        btnNextPage.disabled = false;
    }
    
    if(currentPage >= numberOfPage) btnNextPage.disabled = true;

    showPhoto(photos);
})
.catch(error => console.error('Ошибка:', error))

getData(URL_IMAGE_SERVER, currentPage);

// Функция очистки фильтра тегов
function clearInput() {
        input.value = '';
        btnClearInput.setAttribute('disabled', true);
        currentPage = 1;
        paginationControl(1);
}

// Функция создающая элемент для вывода фото
function createElementShowPhoto({user, largeImageURL}){
    const photoItem = document.createElement('div');
    photoItem.classList.add('photo_item');
    photoItem.innerHTML = `
        <h2>${user}</h2>
        <img src="${largeImageURL}" alt="${user}"></img>
    `
    // Вариант 1 Открытие модального окна
    // photoItem.addEventListener('click', () => {
    //     showModal(largeImageURL);
    // })

    main.appendChild(photoItem);
}

// Функция вывода полученных фотографий на страницу
function showPhoto (photos) {
    main.innerHTML = ``;
    photos.map(createElementShowPhoto);
}

// Функция фильтрации фотографий по тегу
function filterPhotos() {
    btnClearInput.disabled = !input.value.trim();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentPage = 1;
      paginationControl(1);
    }, 500);
}

// Функция откытия модального окна
function showModal(url){
    modal.classList.remove('hidden');
    modal.classList.add('active');
    modalImg.src = url;
}

// Функция закрытия модальнго окна 
function closeModal() {
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

// Инпут для ввода тегов
input.addEventListener('input', filterPhotos);

// Вызов функции очистки фильтра
btnClearInput.addEventListener('click', clearInput);

// Разбиение на страницы
function paginationControl(page) {
    getData(URL_IMAGE_SERVER, page, input.value.toUpperCase().trim());
    pageNumber.textContent = page;
    btnPrevPage.disabled = page < 2;
}

// Вызов предыдущей страницы
btnPrevPage.addEventListener('click', () => {
    paginationControl(--currentPage);
});

// Вызов следующей страницы
btnNextPage.addEventListener('click', () => {
    paginationControl(++currentPage);
});

// Вариант 2 Открытие модального окна
main.addEventListener('click', (e) => {
    let url = e.target.src;
    if(e.target.tagName === 'IMG') showModal(url);
})

// Закрытие модального окна
btnCloseModal.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
    if(!modal.classList.contains('hidden') && e.key === 'Escape') closeModal();
});