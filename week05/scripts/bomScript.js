const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

function displayList(item) {
    const li = document.createElement('li');
    const delButton = document.createElement('button');

    li.textContent = item;
    delButton.textContent = "❌";
    delButton.classList.add('delete');

    li.append(delButton);
    list.append(li);

    delButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
    });
};

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', function () {
    const input = document.querySelector('#favchap');
    const list = document.querySelector('#list');

    if (input.value.trim() !== '') {

        displayList(input.value);
        chaptersArray.push(input.value);

        setChapterList(chaptersArray);

        input.value = '';
        input.focus();
    }
});

function setChapterList() {
    localStorage.setItem('chapterList', JSON.stringify(chaptersArray));
};


function getChapterList() {
    return JSON.parse(localStorage.getItem('chapterList'));
};

function deleteChapter(chapter) {
    console.log(chapter);
    chapter = chapter.slice(0, chapter.length - 1);
    console.log(chapter);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}


