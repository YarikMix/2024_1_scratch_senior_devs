import {ScReact} from '@veglem/screact';
import './Header.sass';
import {Button} from '../Button/Button';
import {AppRouter} from '../../modules/router';
import {Logo} from '../Logo/logo';
import {Profile} from '../Profile/Profile';
import {AuthPage} from '../../pages/Auth';
import {AppUserStore, UserActions, UserStoreState} from '../../modules/stores/UserStore';
import {AppDispatcher} from '../../modules/dispatcher';

export class Header extends ScReact.Component<any, any>{
    state = {
        isAuth: false,
        userChecked: false,
        avatarUrl: false,
        otpEnabled: false,
        qr: undefined
    };

    componentDidMount() {
        AppUserStore.SubscribeToStore(this.updateState);
        AppDispatcher.dispatch(UserActions.CHECK_USER);
    }

    updateState = (store:UserStoreState) => {
        this.setState(state => ({
            ...state,
            isAuth: store.isAuth,
            avatarUrl: store.avatarUrl,
            userChecked: true,
            otpEnabled: store.otpEnabled,
            qr: store.qr
        }));
    };

    render() {
        return (
            <header id="header">
                <Logo />
                { this.state.userChecked ? (
                    this.state.isAuth ? <Profile avatarUrl={this.state.avatarUrl} otpEnabled={this.state.otpEnabled} qr={this.state.qr}/> : (
                        this.props.currPage !== AuthPage ? <Button label="Вход" onClick={() => AppRouter.go('/login')} /> : ''
                    )
                 ) : ''
                }
            </header>
        );
    }
}
