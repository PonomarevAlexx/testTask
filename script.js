let photos = [];
const input = document.querySelector('input');

const getData = url => fetch(url)
.then(res => res.json())
.then(data => {
    photos = data.hits;
    showPhoto(photos);
})
.catch(error => console.error('Ошибка:', error))

getData('https://pixabay.com/api/?key=37954840-02a2d9419214ddd959c05fe70&image_type=photo');

function showPhoto (photos) {
    const main = document.querySelector('.photo_container')
    main.innerHTML = ``;
    photos.forEach(elem => {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo_item');
        photoItem.innerHTML = `
            <h2>${elem.user}</h2>
            <img src="${elem.largeImageURL}" alt="${elem.user}"></img>
        `
        main.appendChild(photoItem);
    });
}

input.addEventListener('input', () => {
    const valueFromInput = input.value;
    const filtered = photos.filter(photo => photo.tags.indexOf(valueFromInput) > -1);
    console.log(filtered);
    showPhoto(filtered);

})
