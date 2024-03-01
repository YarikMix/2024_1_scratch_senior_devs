const mainPage = {
    id: "main-page",
    href: "/",
    needAuth: true,
    home: {
        id: "home",
        previewImage: {
            id: "preview-image",
            src: "src/assets/1.jpg"
        },
        linkToLogin: {
            text: "Попробовать"
        }
    }
}

const header = {
    name: "YouNote",
    logo: {
        href: "/",
        text: "YouNote"
    },
    settings: {
        id: "settings-wrapper",
        panel: {
            id: "popup-content",
            avatar: {
                id: "user-avatar"
            },
            username: {
                class: "username"
            },
            logoutBtn: {
                id: "logout-btn",
                text: "Выйти"
            }
        }
    },
    menu: {
        home: {
            href: "/",
            text: "Главная"
        },
        main: {
            href: "/",
            text: "Мои заметки"
        },
        auth: {
            id: "link-to-login",
            href: "/login",
            text: "Вход"
        },
        register: {
            href: "/register",
            text: "Регистрация"
        }
    }
}

const footer = {
    id: "footer"
}

const wrapper = {
    id: "wrapper"
}

const profilePage = {
    href: "/profile",
    id: "profile-page",
    logoutBtn: {
        text: "Выйти"
    }
}

const loginPage = {
    id: "login-page",
    href: "/login",
    form: {
        id: "login-form",
        inputs: {
            login: {
                id: "login",
                type: 'text',
                placeholder: 'Введите логин'
            },
            password: {
                id: "password",
                type: "password",
                placeholder: "Придумайте пароль"
            }
        },
        links: {
            registerPage: {
                href: "/register",
                text: "Ещё не зарегистрированы?",
            }
        },
        buttons: {
            submitBtn: {
                text: "Войти"
            }
        }
    }
}

const registerPage = {
    href: "/register",
    id: "register-page",
    form: {
        id: "register-form",
        inputs: {
            login: {
                type: "text",
                placeholder: "Введите логин"
            },
            password: {
                type: "password",
                placeholder: "Введите пароль"
            },
            repeatPassword: {
                type: "password",
                placeholder: "Повторите пароль"
            }
        },
        links: {
            loginPage: {
                href: "/login",
                text: "Уже есть аккаунт?",
            }
        },
        buttons: {
            submitBtn: {
                text: "Зарегистрироваться"
            }
        }
    },
}

const notFoundPage = {
    href: "/404",
    id: "not-found",
    link: {
        href: "/",
        text: "Вернуться на главную"
    }
}

const notes = {

}

const noteEditor = {

}

const note = {

}

const avatar = {

}

export const config = {
    isAuthorized: false,
    mainPage: mainPage,
    loginPage: loginPage,
    registerPage: registerPage,
    profilePage: profilePage,
    notFoundPage: notFoundPage,
    header: header,
    notes: notes,
    noteEditor: noteEditor,
    note: note,
    avatar: avatar,
    wrapper: wrapper,
    footer: footer
};
