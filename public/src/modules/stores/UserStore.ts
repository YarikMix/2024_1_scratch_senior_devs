import {AppDispatcher} from "../dispatcher";
import {AppAuthRequests, AppProfileRequests} from "../api";
import {AppRouter} from "../router";
import {BaseStore} from "./BaseStore";

export type UserStoreState = {
    JWT: string | null | undefined,
    username: string,
    avatarUrl: string,
    isAuth: boolean,
    errorLoginForm: string | undefined,
    errorRegisterForm: string | undefined,
    errorUpdatePasswordForm: string | undefined,
}

class UserStore extends BaseStore<UserStoreState>{
    state = {
        JWT: null,
        username: "",
        avatarUrl: "",
        isAuth: false,
        errorLoginForm: undefined,
        errorRegisterForm: undefined,
        errorUpdatePasswordForm: undefined
    }

    constructor() {
        super();
        this.state.JWT = window.localStorage.getItem('Authorization');
        this.registerEvents();
        this.checkUser()
    }

    private registerEvents(){
        AppDispatcher.register(async (action) => {
            switch (action.type){
                case UserActions.LOGIN:
                    await this.login(action.payload);
                    break;
                case UserActions.LOGOUT:
                    await this.logout();
                    break;
                case UserActions.REGISTER:
                    await this.register(action.payload);
                    break;
                case UserActions.CHECK_USER:
                    await this.checkUser();
                    break;
                case UserActions.UPDATE_AVATAR:
                    await this.updateAvatar(action.payload);
                    break;
                case UserActions.UPDATE_PASSWORD:
                    await this.updatePassword(action.payload);
                    break;
            }
        });
    }

    private async login(credentials){
        this.SetState(state => ({
            ...state,
            errorLoginForm: undefined
        }))

        try {
            const res = await AppAuthRequests.Login(credentials.username, credentials.password);
            this.SetState(s => {
                return {
                    ...s,
                    JWT: res.jwt,
                    username: res.username,
                    isAuth: true,
                    avatarUrl: res.image_path
                }
            })
            localStorage.setItem('Authorization', this.state.JWT)
            console.log("login successfull");
            AppRouter.go("/notes");
        } catch (err) {
            console.log(err);

            this.SetState(state => ({
                ...state,
                errorLoginForm: "Неправильный логин или пароль"
            }))

        }
    }

    public async logout() {
        try {
            await AppAuthRequests.Logout(this.state.JWT);
            this.SetState(s => {
                return {
                    ...s,
                    isAuth: false,
                    username: "",
                    avatarUrl: ""
                }
            })
            console.log("logout successful");
            AppRouter.go("/")
        } catch (err) {
            console.log(err);
        }
    }

    private async register(credentials) {
        this.SetState(state => ({
            ...state,
            errorRegisterForm: undefined
        }))

        try {
            const res = await AppAuthRequests.SignUp(credentials.username, credentials.password);

            this.SetState(s => {
                return {
                    ...s,
                    isAuth: true,
                    username: res.username,
                    avatarUrl: res.image_path,
                    JWT: res.jwt
                }
            })
            localStorage.setItem('Authorization', this.state.JWT)
            console.log("signup successfull");
            AppRouter.go("/notes")
        } catch (err) {
            console.log(err);

            console.log("username already taken");
            this.SetState(state => ({
                ...state,
                errorRegisterForm: "Неправильный пароль"
            }))
        }
    }

    private async checkUser(){
        try {
            const res = await AppAuthRequests.CheckUser(this.state.JWT)

            this.SetState(s => {
                return {
                    ...s,
                    isAuth: true,
                    username: res.username,
                    avatarUrl: res.image_path
                }
            })
        } catch (err) {
            console.log("не зареган");
            console.log(err);
        }
    }

    private async updateAvatar(file:File) {
        const avatarUrl = await AppProfileRequests.UpdateAvatar(file, this.state.JWT)

        this.SetState(state => {
            return {
                ...state,
                avatarUrl: avatarUrl
            }
        })
    }

    private async updatePassword({oldPassword, newPassword}) {
        try {
            console.log("updatePassword")
            await AppProfileRequests.UpdatePassword(oldPassword, newPassword, this.state.JWT)

            // TODO
            // new Toast

            this.SetState(state => ({
                ...state,
                errorUpdatePasswordForm: undefined
            }))
        }
        catch (err) {
            if (err.message == "Неверный пароль") {
                console.log("fsdadfasdfasdf")
                this.SetState(state => ({
                    ...state,
                    errorUpdatePasswordForm: "Неправильный пароль"
                }))
            }
        }
    }
}

export const AppUserStore = new UserStore();

export const UserActions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    CHECK_USER: "CHECK_USER",
    UPDATE_AVATAR: "UPDATE_AVATAR",
    UPDATE_PASSWORD: "UPDATE_PASSWORD"
}