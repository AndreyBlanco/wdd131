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

function getRegistroPrograma() {
    return JSON.parse(localStorage.getItem('registro_programa'));
};

let registro_programa = getRegistroPrograma() || 0;

if (registro_programa != 0 && document.querySelector('#programa-personal')) {
    const genero = registro_programa.genero;
    const dias = registro_programa.dias;
    delete registro_programa.genero;
    delete registro_programa.dias;
    delete registro_programa['fecha-actual'];
    const programa = document.createElement('fieldset');
    programa.setAttribute("id", "programa");
    programa.setAttribute("class", "ejercicios_listas");
    document.querySelector('#programa-personal').innerHTML = `<p class="p_form">Su programa para género ${genero} y ${dias} días a la semana es el siguiente:</p>`;
    document.querySelector('#programa-personal').appendChild(programa);
    
    let lastSemana = '';
    let lastDia = '';

    Object.keys(registro_programa).forEach(key => {
        const [musculo, orden_musculo, dia, semana] = key.split('-');
        const ejercicio = registro_programa[key];

        if (semana !== lastSemana) {
            const semana_elemento = document.createElement('fieldset');
            semana_elemento.setAttribute("id", `semana${semana}`)
            semana_elemento.setAttribute("class", "semana_field")
            const semana_legend = document.createElement('legend');
            semana_legend.textContent = `Semana ${semana}`;
            semana_legend.setAttribute("class", "semana-legend");
            semana_elemento.appendChild(semana_legend);
            document.querySelector('#programa').appendChild(semana_elemento);
            lastSemana = semana;
            lastDia = '';
        };
        
        if (dia !== lastDia) {
            const dia_elemento = document.createElement('fieldset');
            dia_elemento.setAttribute("id", `semana${semana}_${dia}`)
            dia_elemento.setAttribute("class", "dia_field")
            const dia_legend = document.createElement('legend');
            dia_legend.textContent = `Día ${dia}`;
            dia_elemento.appendChild(dia_legend);
            document.querySelector(`#semana${semana}`).appendChild(dia_elemento);
            lastDia = dia;
        };
        
        const ejercicio_elemento = document.createElement('p');
        ejercicio_elemento.textContent = `• ${musculo}: ${ejercicio}`;
        
        document.querySelector(`#semana${semana}_${dia}`).appendChild(ejercicio_elemento);       
        
    });

    document.querySelector('#cambiar-programa').style.display = "block";


} else if (registro_programa == 0 && document.querySelector('#programa-personal')) {
    document.querySelector('#programa-personal').innerHTML = '<p class="p_form">Aun no ha creado un Programa Personalizado</p>';
    document.querySelector('#crear-programa').style.display = "block";
} else if (registro_programa != 0 && document.querySelector('#plan-de-ejercicios')) {

    const startDate = new Date(registro_programa['fecha-actual']);
    const dayOfWeek = startDate.getDay();
    console.log(registro_programa.dias);
    const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    startDate.setDate(startDate.getDate() - daysToMonday);
    var dias_semana = [];

    if (registro_programa.dias == "3") {
        dias_semana = ['Lunes', 'Miércoles', 'Viernes'];
    } else if (registro_programa.dias == "4") {
        dias_semana = ['Lunes', 'Martes', 'Jueves', 'Viernes'];
    } else if (registro_programa.dias == "5") {
        dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    };

    const semanas = new Set();
    const dias = new Set();

    Object.keys(registro_programa).forEach(key => {
        const [, , dia, semana] = key.split('-');
        semanas.add(semana);
        dias.add(dia);
    });

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const semana_seleccionada = document.getElementById('semana');
    semanas.forEach(semana => {
        const option = document.createElement('option');
        const weekStartDate = addDays(startDate, (semana - 1) * 7);
        const weekEndDate = addDays(weekStartDate, 4);
        if (weekStartDate.toLocaleDateString() == "Invalid Date") {
            option.value = semana;
            option.textContent = `SEMANA`;
            option.disabled = true;
            option.selected = true;
        } else {
            option.value = semana;
            option.textContent = `${weekStartDate.toLocaleDateString()} al ${weekEndDate.toLocaleDateString()}`;
        };
        semana_seleccionada.appendChild(option);
    });

    const dia_seleccionado = document.getElementById('dia');
    dias.forEach(dia => {
        const option = document.createElement('option');
        if (!dias_semana[dia - 1]) {
            option.value = dia;
            option.textContent = `DÍA`;
            option.disabled = true;
            option.selected = true;
        } else {
            option.value = dia;
            option.textContent = dias_semana[dia - 1];
        }

        dia_seleccionado.appendChild(option);
    });

    const checkbox = document.getElementById('completado');

    const mostrarPlan = () => {
        const seleccion_semana = semana_seleccionada.value;
        const seleccion_dia = dia_seleccionado.value;
        const plan = document.getElementById('plan');
        plan.innerHTML = '';

        const completado = `completado-${seleccion_semana}-${seleccion_dia}`;
        console.log(completo);
        console.log(completado);
        checkbox.checked = completo[completado];

        Object.keys(registro_programa).forEach(key => {
            const [musculo, , dia, semana] = key.split('-');
            const ejercicio = registro_programa[key];

            if (semana === seleccion_semana && dia === seleccion_dia) {
                const ejercicioElemento = document.createElement('p');
                ejercicioElemento.textContent = `• ${musculo}: ${ejercicio}`;
                plan.appendChild(ejercicioElemento);
                document.querySelector('#label-completado').style.display = "block";
            }
        });
    };

    function getCompleto() {
        return JSON.parse(localStorage.getItem('completo'));
    };

    let completo = getCompleto() || {};
    

    checkbox.addEventListener('change', () => {
        const semana = semana_seleccionada.value;
        const dia = dia_seleccionado.value;
        const completado = `completado-${semana}-${dia}`;
        completo[completado] = checkbox.checked;
        localStorage.setItem('completo', JSON.stringify(completo));
    });

    semana_seleccionada.addEventListener('change', mostrarPlan);
    dia_seleccionado.addEventListener('change', mostrarPlan);

    mostrarPlan();
} else if (registro_programa == 0 && document.querySelector('#plan-de-ejercicios')) {
    document.querySelector('#plan-de-ejercicios').innerHTML = '<p class="p_form">Aun no ha creado un Programa Personalizado</p>';
    document.querySelector('#selector-ejercicios').style.display = "none";
    document.querySelector('#crear-programa').style.display = "block";
} else if (document.querySelector('#ejercicios-diarios')) {

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
            ejercicios_diarios.style.display = "grid";
            var gen = "";
            if (genero.id == "masculino") {
                gen = "men";
            } else {
                gen = "women";
            }

            const response = await fetch(`./files/${gen}.json`);
            const content = await response.json();
            var info = content[dias.id];
            var semana_count = 1;

            Object.keys(info).forEach(semana => {
                const semana_field = document.createElement("fieldset");
                semana_field.setAttribute("class", "semana_field");
                semana_field.setAttribute("id", semana);
                const semana_legend = document.createElement('legend');
                semana_legend.setAttribute("class", "semana-legend");
                semana_legend.textContent = `Semana ${semana_count}`;
                var dia_count = 1;

                info[semana].forEach(ejercicios => {
                    const dia_field = document.createElement("fieldset");
                    dia_field.setAttribute("class", "dia_field");
                    dia_field.setAttribute("id", `${dia_count}-${semana_count}`);
                    const dia_legend = document.createElement('legend');
                    dia_legend.textContent = `Día ${dia_count}`;

                    const list = ejercicios.split("-");
                    var ejercicio_count = 1;

                    list.forEach(ejercicio => {
                        const indicador = `${ejercicio}-${ejercicio_count}-${dia_count}-${semana_count}`
                        const label = document.createElement('label')
                        label.textContent = ejercicio;
                        label.setAttribute("for", indicador);
                        label.setAttribute("class", "label-ejercicio")
                        const select = document.createElement('select');
                        select.setAttribute("name", indicador);
                        select.setAttribute("id", indicador);

                        ejercicios_list[ejercicio].forEach(elem => {
                            const option = document.createElement('option');
                            option.value = elem;
                            option.textContent = elem;
                            select.appendChild(option);
                        });
                        dia_field.appendChild(label);
                        dia_field.appendChild(select);
                        ejercicio_count += 1;
                    });
                    dia_field.appendChild(dia_legend);
                    semana_field.appendChild(dia_field);
                    dia_count += 1;
                });

                semana_field.appendChild(semana_legend);
                ejercicios_diarios.appendChild(semana_field);
                semana_count += 1;
            });
        } else {
            console.log("nada", genero);
        };
    };

    genero_field.addEventListener("click", populate_ejercicios_diarios);

    dias_field.addEventListener("click", populate_ejercicios_diarios);

    const fecha_actual_input = document.getElementById('fecha-actual');
    const fecha_actual = new Date();
    fecha_actual_input.value = fecha_actual;

    document.getElementById('registro_programa').addEventListener('submit', function (event) {
        const formData = new FormData(event.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        localStorage.setItem('registro_programa', JSON.stringify(data));
        localStorage.removeItem('completo');
    });
};



