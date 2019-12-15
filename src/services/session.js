import Cookies from 'universal-cookie';
import moment from 'moment';
const cookies = new Cookies();

export default class Session {

	static setCookie(cname, cvalue) {
		let expires = new Date(moment().add(3, "d"));
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	static set(cookie, data, type = 'cookie'){
		if (type ==='session'){
			/**set data into session storage */
			sessionStorage.setItem(cookie, JSON.stringify(data));
		} else if (type === 'localstorage') {
			/**set data into local storage */
			localStorage.setItem(cookie, JSON.stringify(data));
		} else{
			/** set data into cookies */
			if(typeof data === 'string'){
				this.setCookie(cookie, data);
			}else{
				this.setCookie(cookie, JSON.stringify(data));
			}
		}

		return true;
	}

	static get(cookie, type = 'cookie'){
		let data;

		if (type === 'session') {
			/** get data from session storage */
			data = sessionStorage.getItem(cookie);
		} else if (type === 'localstorage') {
			/** get data from local storage */
			data = localStorage.getItem(cookie);
		} else{
			/** get data from cookies */
			data = cookies.get(cookie);
			
		}

		try {
			return data ? JSON.parse(data) : '';	
		} catch (error) {
			return data || '';
		}
		
		
	}

	static clear(cookie, type = 'cookie'){
		if (type === 'session') {
			/** remove data from session storage */
			sessionStorage.removeItem(cookie);
		} else if (type === 'localstorage') {
			/** remove data from session storage */
			localStorage.removeItem(cookie);
		} else{
			/** remove data from cookies */
			cookies.remove(cookie);
		}

		return true;
	}
}
