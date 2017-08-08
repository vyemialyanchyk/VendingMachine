import { observable, action, computed } from 'mobx';

class Navigator {

    @observable currentUrl: string = '';

    constructor() {
        this.setCurrentUrl(window.location.pathname);
        window.addEventListener('popstate', (e) => {
            this.setCurrentUrl(window.location.pathname);
        });
    }

    @computed get isLogin() {
        return this.currentUrl.toLowerCase().startsWith('login');
    }

    @action setCurrentUrl = (url: string) => {
        while (url.startsWith('/')) {
            url = url.substring(1);
        }
        if (this.currentUrl.toLowerCase() !== url.toLowerCase()) {
            this.currentUrl = url;
        }
    }

    @action transitionToUrl = (url: string) => {
        history.pushState(null, null, url);
        this.setCurrentUrl(url);
    }

    @action replaceUrl = (url: string) => {
        history.replaceState(null, null, url);
        this.setCurrentUrl(url);
    }

}

const instance = new Navigator();
export default instance;