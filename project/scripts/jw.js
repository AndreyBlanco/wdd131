const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".top-nav");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
    if (hamButton.textContent == "☰") {
        hamButton.textContent = "X";
    } else if (hamButton.textContent == "X") {
        hamButton.textContent = "☰";
    };
});


const genero_field = document.getElementById("genero-field");
const dias_field = document.getElementById("dias-field");

let ejercicios_list = {};

async function get_ejercicios_list() {
    const response = await fetch(`./files/exercises.json`);
    ejercicios_list = await response.json();
}

get_ejercicios_list();

async function populate_ejercicios_diarios() {
    const genero = document.querySelector('input[name="genero"]:checked');
    const dias = document.querySelector('input[name="dias"]:checked')
    const ejercicios_diarios = document.getElementById("ejercicios-diarios");
    ejercicios_diarios.innerHTML = "";
    
    if ((genero) && (dias)) {
        var gen = "";
        if (genero.id == "masculino") {
            gen = "men";
        } else {
            gen = "women";
        }

        const response = await fetch(`./files/${gen}.json`);
        const content = await response.json();
        var info = content[dias.id];
     
        Object.keys(info).forEach(semana => {
            const semana_field = document.createElement("fieldset");
            const semana_legend = document.createElement('legend');
            semana_legend.textContent = semana;
            var count = 1;
            
            info[semana].forEach(ejercicios => {
                const dia_field = document.createElement("fieldset");
                const dia_legend = document.createElement('legend');
                dia_legend.textContent = `Día ${count}`;
                count += 1;              
                const list = ejercicios.split("-");
                list.forEach(ejercicio => {
                    const label = document.createElement('label')
                    label.textContent = ejercicio;
                    const select = document.createElement('select');
                    console.log(ejercicio);
                    ejercicios_list[ejercicio].forEach(elem => {
                        const option = document.createElement('option');
                        option.value = elem;
                        option.textContent = elem;
                        select.appendChild(option);
                    });
                    dia_field.appendChild(label);
                    dia_field.appendChild(select);
                });
                dia_field.appendChild(dia_legend);
                semana_field.appendChild(dia_field);
            });

            semana_field.appendChild(semana_legend);  
            ejercicios_diarios.appendChild(semana_field);
        });
    } else {
        console.log("nada", genero);
    };
};

genero_field.addEventListener("click", populate_ejercicios_diarios);

dias_field.addEventListener("click", populate_ejercicios_diarios);

