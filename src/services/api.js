export async function apiCall(type, url, data) {
	if(type.toLowerCase() === 'get'){
		const resp = await fetch(process.env.REACT_APP_BACKEND_URL + '/api' + url, {
			method: type,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.token}`
			}
		});
		const d = await resp.json();
		return d;
	} else {
		const resp = await fetch(process.env.REACT_APP_BACKEND_URL + '/api' + url, {
			method: type,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.token}`
			},
			body: JSON.stringify(data)
		});
		const d = await resp.json();
		return d;
	}
}