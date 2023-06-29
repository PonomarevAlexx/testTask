let photos = [];
const input = document.querySelector('input'),
      main = document.querySelector('.photo_container');

// Загрузка данных из API
const getData = url => fetch(url)
.then(res => res.json())
.then(data => {
    photos = data.hits;
    showPhoto(photos);
})
.catch(error => console.error('Ошибка:', error))

getData('https://pixabay.com/api/?key=37954840-02a2d9419214ddd959c05fe70&image_type=photo');

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