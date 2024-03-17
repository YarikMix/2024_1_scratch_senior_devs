import {AppDispatcher} from "../dispatcher";
import {AppAuthRequests} from "../api";
import {AppRouter} from "../router";
import {BaseStore} from "./BaseStore";

export type UserStoreState = {
    JWT: string | null | undefined,
    username: string,
    avatarUrl: string,
    isAuth: boolean
}
class UserStore extends BaseStore<UserStoreState>{
    state = {
        JWT: null,
        username: "",
        avatarUrl: "",
        isAuth: false
    }

    constructor() {
        super();
        this.state.JWT = window.localStorage.getItem('Authorization');
        this.registerEvents();
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
                    console.log("action handled");
                    await this.checkUser();
                    break;
            }
        });
    }

    private async login(credentials){
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
        }
    }

    private async logout() {
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
        try {
            const res = await AppAuthRequests.SignUp(credentials.username, credentials.password);
            this.SetState(s => {
                return {
                    ...s,
                    isAuth: true,
                    username: res.username,
                    avatarUrl: res.image_path
                }
            })
            localStorage.setItem('Authorization', this.state.JWT)
            console.log("signup successfull");
            AppRouter.go("/notes")
        } catch (err) {
            console.log(err);
        }
    }

    private async checkUser(){
        try {
            const res = await AppAuthRequests.CheckUser(this.state.JWT);
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
}

export const AppUserStore = new UserStore();

export const UserActions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    CHECK_USER: "CHECK_USER"
}