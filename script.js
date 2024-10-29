const subjects = {
    1: {
        name: "ADMINISTRACIÓN DE EMPRESAS",
        slots: [
            [1, 7, "IN1A-105"],
            [1, 8, "IN1A-105"]
        ]
    },
    2: {
        name: "ADMINISTRACIÓN DE EMPRESAS",
        slots: [
            [4, 7, "IN1A-105"],
            [4, 8, "IN1A-105"]
        ]
    },
    3: {
        name: "ÁLGEBRA LINEAL",
        slots: [
            [1, 7, "C-208"],
            [1, 8, "C-208"],
            [5, 11, "INIA-004"],
            [5, 12, "INIA-004"]
        ]
    },
    4: {
        name: "CALCULO I",
        slots: [
            [1, 9, "C-102"],
            [1, 10, "C-102"],
            [3, 9, "C-102"],
            [3, 10, "C-102"],
            [5, 9, "C-202"],
            [5, 10, "C-202"]

        ]
    },

};

function updateSchedule() {
    const scheduleTable = document.getElementById("schedule-table").getElementsByTagName("tbody")[0];
    const rows = scheduleTable.rows;

    // Limpiar el horario antes de actualizar
    for (let i = 0; i < rows.length; i++) {
        for (let j = 2; j < rows[i].cells.length; j++) {
            rows[i].cells[j].innerText = "";
        }
    }

    // Verificar conflictos y actualizar el horario
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    let scheduleMap = {};

    for (let checkbox of checkboxes) {
        const subjectId = checkbox.value;
        const subject = subjects[subjectId];

        for (let slot of subject.slots) {
            const day = slot[0]; // 1: Lunes, 2: Martes, etc.
            const hour = slot[1]; // 7, 8, etc.
            const classroom = slot[2];
            const key = `${day}-${hour}`;

            if (scheduleMap[key]) {
                // Conflicto detectado
                alert(`Conflicto detectado: ${subject.name} coincide con ${scheduleMap[key].subject.name} en el mismo día y hora.`);

                // Desmarcar ambas materias conflictivas
                checkbox.checked = false;
                document.getElementById(`materia${scheduleMap[key].subjectId}`).checked = false;

                // Reiniciar la función para limpiar y actualizar el horario
                return updateSchedule();
            } else {
                // Registrar el horario sin conflicto
                scheduleMap[key] = { subjectId, subject };

                // Obtener índices de fila y columna para actualizar la tabla
                const rowIndex = hour - 7;
                const columnIndex = day + 1;

                // Añadir el nombre de la materia y el aula al horario
                rows[rowIndex].cells[columnIndex].innerText += `${subject.name} - ${classroom}`;
            }
        }
    }
}