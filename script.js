// =====================================================
// AUTOCARE
// Основная логика сайта
// =====================================================



// =====================================================
// ДАННЫЕ
// =====================================================


let currentUser =
    JSON.parse(
        localStorage.getItem("autocare_current_user")
    );


let cars =
    JSON.parse(
        localStorage.getItem("autocare_cars")
    ) || [];


let appointments =
    JSON.parse(
        localStorage.getItem("autocare_appointments")
    ) || [];



// =====================================================
// СОХРАНЕНИЕ ДАННЫХ
// =====================================================


function saveData() {

    localStorage.setItem(
        "autocare_cars",
        JSON.stringify(cars)
    );


    localStorage.setItem(
        "autocare_appointments",
        JSON.stringify(appointments)
    );
}



// =====================================================
// ПОКАЗ ПОЛЬЗОВАТЕЛЯ
// =====================================================


function updateAccountArea() {

    const accountArea =
        document.getElementById("accountArea");


    if (!currentUser) {

        accountArea.innerHTML = `

            <button
                class="login-button"
                onclick="openLogin()"
            >
                Войти
            </button>

        `;

        return;
    }


    accountArea.innerHTML = `

        <button
            class="user-button"
            onclick="openProfile()"
        >
            👤 ${currentUser.name}
        </button>

    `;
}



// =====================================================
// РЕГИСТРАЦИЯ
// =====================================================


function openRegister() {

    closeLogin();

    document.getElementById(
        "registerModal"
    ).style.display = "flex";
}


function closeRegister() {

    document.getElementById(
        "registerModal"
    ).style.display = "none";
}


function register() {

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    if (!name) {

        alert("Введите ваше имя.");

        return;
    }


    if (!email) {

        alert("Введите электронную почту.");

        return;
    }


    if (password.length < 6) {

        alert(
            "Пароль должен содержать минимум 6 символов."
        );

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "autocare_user",
        JSON.stringify(user)
    );


    currentUser = user;


    localStorage.setItem(
        "autocare_current_user",
        JSON.stringify(user)
    );


    closeRegister();


    updateAccountArea();


    alert(
        "Аккаунт успешно создан!"
    );
}



// =====================================================
// ВХОД
// =====================================================


function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";
}


function closeLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "none";
}


function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "autocare_user"
            )
        );


    if (!savedUser) {

        alert(
            "Аккаунт не найден. Сначала зарегистрируйтесь."
        );

        return;
    }


    if (
        email !== savedUser.email ||
        password !== savedUser.password
    ) {

        alert(
            "Неверный email или пароль."
        );

        return;
    }


    currentUser = savedUser;


    localStorage.setItem(
        "autocare_current_user",
        JSON.stringify(currentUser)
    );


    closeLogin();


    updateAccountArea();


    alert(
        "Добро пожаловать, " +
        currentUser.name +
        "!"
    );
}



// =====================================================
// ПРОФИЛЬ
// =====================================================


function openProfile() {

    if (!currentUser) {

        openLogin();

        return;
    }


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentUser.email;


    document.getElementById(
        "profileModal"
    ).style.display = "flex";
}


function closeProfile() {

    document.getElementById(
        "profileModal"
    ).style.display = "none";
}



// =====================================================
// ВЫХОД
// =====================================================


function logout() {

    currentUser = null;


    localStorage.removeItem(
        "autocare_current_user"
    );


    closeProfile();


    updateAccountArea();


    alert(
        "Вы вышли из аккаунта."
    );
}



// =====================================================
// АВТОМОБИЛИ
// =====================================================


function openCarModal() {

    if (!currentUser) {

        alert(
            "Сначала войдите или зарегистрируйтесь."
        );

        openLogin();

        return;
    }


    document.getElementById(
        "carModal"
    ).style.display = "flex";
}


function closeCarModal() {

    document.getElementById(
        "carModal"
    ).style.display = "none";
}


function saveCar() {

    const make =
        document.getElementById(
            "carMake"
        ).value.trim();


    const model =
        document.getElementById(
            "carModel"
        ).value.trim();


    const year =
        document.getElementById(
            "carYear"
        ).value;


    const color =
        document.getElementById(
            "carColor"
        ).value.trim();


    const plate =
        document.getElementById(
            "carPlate"
        ).value.trim();


    const mileage =
        document.getElementById(
            "carMileage"
        ).value;


    const problem =
        document.getElementById(
            "carProblem"
        ).value.trim();


    const info =
        document.getElementById(
            "carInfo"
        ).value.trim();



    if (
        !make ||
        !model ||
        !year ||
        !color ||
        !plate ||
        !mileage
    ) {

        alert(
            "Заполните все основные поля автомобиля."
        );

        return;
    }


    const newCar = {

        id: Date.now(),

        ownerEmail: currentUser.email,

        make: make,

        model: model,

        year: year,

        color: color,

        plate: plate,

        mileage: mileage,

        problem: problem,

        info: info

    };


    cars.push(newCar);


    saveData();


    closeCarModal();


    clearCarForm();


    renderCars();


    updateCarSelect();


    alert(
        "Автомобиль успешно добавлен в гараж!"
    );
}



// =====================================================
// ОЧИСТКА ФОРМЫ АВТОМОБИЛЯ
// =====================================================


function clearCarForm() {

    document.getElementById(
        "carMake"
    ).value = "";


    document.getElementById(
        "carModel"
    ).value = "";


    document.getElementById(
        "carYear"
    ).value = "";


    document.getElementById(
        "carColor"
    ).value = "";


    document.getElementById(
        "carPlate"
    ).value = "";


    document.getElementById(
        "carMileage"
    ).value = "";


    document.getElementById(
        "carProblem"
    ).value = "";


    document.getElementById(
        "carInfo"
    ).value = "";
}



// =====================================================
// ПОКАЗ АВТОМОБИЛЕЙ
// =====================================================


function renderCars() {

    const garage =
        document.getElementById(
            "garageList"
        );


    if (!currentUser) {

        garage.innerHTML = `

            <div class="empty-state">

                <h3>
                    Войдите в аккаунт
                </h3>

                <p>
                    После входа здесь появятся
                    ваши автомобили.
                </p>

            </div>

        `;

        return;
    }


    const userCars =
        cars.filter(
            car =>
                car.ownerEmail ===
                currentUser.email
        );


    if (userCars.length === 0) {

        garage.innerHTML = `

            <div class="empty-state">

                <h3>
                    Ваш гараж пока пуст
                </h3>

                <p>
                    Добавьте первый автомобиль.
                </p>

            </div>

        `;

        return;
    }


    garage.innerHTML = `

        <div class="car-grid">

            ${userCars.map(
                car => `

                    <div class="car-card">

                        <button
                            class="car-delete"
                            onclick="deleteCar(${car.id})"
                        >
                            ×
                        </button>


                        <div class="car-top">

                            <div class="car-image">
                                🚗
                            </div>


                            <div class="car-information">

                                <h3>
                                    ${car.make}
                                    ${car.model}
                                </h3>

                                <p>
                                    ${car.year} год
                                </p>

                                <p>
                                    ${car.plate}
                                </p>

                            </div>

                        </div>


                        <div class="car-details">


                            <div class="car-detail">

                                <span>
                                    Цвет
                                </span>

                                <strong>
                                    ${car.color}
                                </strong>

                            </div>


                            <div class="car-detail">

                                <span>
                                    Пробег
                                </span>

                                <strong>
                                    ${Number(
                                        car.mileage
                                    ).toLocaleString()}
                                    км
                                </strong>

                            </div>


                        </div>


                        ${
                            car.problem
                                ? `

                                <div class="problem-box">

                                    <strong>
                                        Проблема:
                                    </strong>

                                    ${car.problem}

                                </div>

                                `
                                : ""
                        }


                        ${
                            car.info
                                ? `

                                <div class="problem-box">

                                    <strong>
                                        Дополнительно:
                                    </strong>

                                    ${car.info}

                                </div>

                                `
                                : ""
                        }

                    </div>

                `
            ).join("")}

        </div>

    `;
}



// =====================================================
// УДАЛЕНИЕ АВТОМОБИЛЯ
// =====================================================


function deleteCar(id) {

    if (
        !confirm(
            "Удалить этот автомобиль?"
        )
    ) {

        return;
    }


    cars =
        cars.filter(
            car => car.id !== id
        );


    saveData();


    renderCars();


    updateCarSelect();
}



// =====================================================
// СПИСОК АВТОМОБИЛЕЙ В ФОРМЕ ЗАПИСИ
// =====================================================


function updateCarSelect() {

    const select =
        document.getElementById(
            "carSelect"
        );


    if (!select) {

        return;
    }


    if (!currentUser) {

        select.innerHTML = `

            <option>
                Сначала войдите в аккаунт
            </option>

        `;

        return;
    }


    const userCars =
        cars.filter(
            car =>
                car.ownerEmail ===
                currentUser.email
        );


    if (userCars.length === 0) {

        select.innerHTML = `

            <option>
                Сначала добавьте автомобиль
            </option>

        `;

        return;
    }


    select.innerHTML =
        userCars.map(
            car => `

                <option value="${car.id}">

                    ${car.make}
                    ${car.model}
                    —
                    ${car.plate}

                </option>

            `
        ).join("");
}



// =====================================================
// ЗАПИСЬ НА ОБСЛУЖИВАНИЕ
// =====================================================


function openBooking() {

    if (!currentUser) {

        alert(
            "Чтобы записаться на обслуживание, войдите в аккаунт."
        );

        openLogin();

        return;
    }


    const userCars =
        cars.filter(
            car =>
                car.ownerEmail ===
                currentUser.email
        );


    if (userCars.length === 0) {

        alert(
            "Сначала добавьте автомобиль в гараж."
        );

        document
            .getElementById("garage")
            .scrollIntoView();

        return;
    }


    updateCarSelect();


    document.getElementById(
        "bookingModal"
    ).style.display = "flex";
}


function closeBooking() {

    document.getElementById(
        "bookingModal"
    ).style.display = "none";
}



// =====================================================
// СОЗДАНИЕ ЗАПИСИ
// =====================================================


function createBooking() {

    const carId =
        Number(
            document.getElementById(
                "carSelect"
            ).value
        );


    const service =
        document.getElementById(
            "serviceSelect"
        ).value;


    const date =
        document.getElementById(
            "bookingDate"
        ).value;


    const time =
        document.getElementById(
            "bookingTime"
        ).value;


    const complaint =
        document.getElementById(
            "complaint"
        ).value.trim();


    if (!carId) {

        alert(
            "Выберите автомобиль."
        );

        return;
    }


    if (!date) {

        alert(
            "Выберите дату."
        );

        return;
    }


    const car =
        cars.find(
            item => item.id === carId
        );


    if (!car) {

        alert(
            "Автомобиль не найден."
        );

        return;
    }


    const appointment = {

        id: Date.now(),

        ownerEmail: currentUser.email,

        carId: car.id,

        carName:
            car.make +
            " " +
            car.model,

        plate: car.plate,

        service: service,

        date: date,

        time: time,

        complaint: complaint,

        status:
            "Ожидает подтверждения"

    };


    appointments.push(
        appointment
    );


    saveData();


    closeBooking();


    document.getElementById(
        "complaint"
    ).value = "";


    renderAppointments();


    alert(
        "Запись успешно создана!\n\n" +
        "Статус: Ожидает подтверждения"
    );


    document
        .getElementById(
            "appointments"
        )
        .scrollIntoView();
}



// =====================================================
// ПОКАЗ ЗАПИСЕЙ
// =====================================================


function renderAppointments() {

    const container =
        document.getElementById(
            "appointmentsList"
        );


    if (!currentUser) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    Войдите в аккаунт
                </h3>

                <p>
                    Здесь будут отображаться
                    ваши записи.
                </p>

            </div>

        `;

        return;
    }


    const userAppointments =
        appointments.filter(
            appointment =>
                appointment.ownerEmail ===
                currentUser.email
        );


    if (userAppointments.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    Записей пока нет
                </h3>

                <p>
                    Запишитесь на обслуживание
                    вашего автомобиля.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="appointment-list">

            ${userAppointments.map(
                appointment => `

                    <div class="appointment-card">


                        <div class="appointment-date">

                            <strong>
                                ${formatDay(
                                    appointment.date
                                )}
                            </strong>

                            <span>
                                ${formatMonth(
                                    appointment.date
                                )}
                            </span>

                        </div>


                        <div class="appointment-information">

                            <h3>
                                ${appointment.service}
                            </h3>


                            <p>
                                🚗
                                ${appointment.carName}
                                —
                                ${appointment.plate}
                            </p>


                            <p>
                                🕐
                                ${appointment.time}
                            </p>


                            ${
                                appointment.complaint
                                    ? `

                                    <p>
                                        Проблема:
                                        ${appointment.complaint}
                                    </p>

                                    `
                                    : ""
                            }

                        </div>


                        <div class="appointment-status">

                            🟠
                            ${appointment.status}

                        </div>


                    </div>

                `
            ).join("")}

        </div>

    `;
}



// =====================================================
// ДАТА
// =====================================================


function formatDay(date) {

    const parts =
        date.split("-");


    return parts[2];
}


function formatMonth(date) {

    const months = [

        "ЯНВ",
        "ФЕВ",
        "МАР",
        "АПР",
        "МАЙ",
        "ИЮН",
        "ИЮЛ",
        "АВГ",
        "СЕН",
        "ОКТ",
        "НОЯ",
        "ДЕК"

    ];


    const month =
        Number(
            date.split("-")[1]
        ) - 1;


    return months[month];
}



// =====================================================
// ЗАКРЫТИЕ ОКОН ПРИ КЛИКЕ СНАРУЖИ
// =====================================================


window.addEventListener(
    "click",
    function(event) {


        const bookingModal =
            document.getElementById(
                "bookingModal"
            );


        const carModal =
            document.getElementById(
                "carModal"
            );


        const loginModal =
            document.getElementById(
                "loginModal"
            );


        const registerModal =
            document.getElementById(
                "registerModal"
            );


        const profileModal =
            document.getElementById(
                "profileModal"
            );


        if (
            event.target ===
            bookingModal
        ) {

            closeBooking();

        }


        if (
            event.target ===
            carModal
        ) {

            closeCarModal();

        }


        if (
            event.target ===
            loginModal
        ) {

            closeLogin();

        }


        if (
            event.target ===
            registerModal
        ) {

            closeRegister();

        }


        if (
            event.target ===
            profileModal
        ) {

            closeProfile();

        }

    }
);



// =====================================================
// ЗАПУСК САЙТА
// =====================================================


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateAccountArea();

        renderCars();

        renderAppointments();

        updateCarSelect();

    }
);