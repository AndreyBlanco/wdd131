const button = document.querySelector('button');

button.addEventListener('click', function () {
    const input = document.querySelector('#favchap');
     const list = document.querySelector('#list');

    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const delButton = document.createElement('button');

        li.textContent = input.value;
        delButton.textContent = "❌";
        
        li.append(delButton);
        list.append(li);

        delButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });
    }

    input.value = '';
    return input.focus();
});