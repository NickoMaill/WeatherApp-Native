import configManager from './configManager';

const weatherUrl = configManager.getConfig.WEATHER_API_BASE_URL;
const mapUrl = configManager.getConfig.MAPBOX_BASE_URL;

class ApiManager {
    public async get<T>(host: 'map' | 'weather', route: string, headersRequest?: HeadersInit_): Promise<T> {
        const apiHost = host === 'map' ? mapUrl : weatherUrl;
        const headers = new Headers();

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers,
        };

        const url = `${apiHost}/${route}`;

        const request = await fetch(url, options);
        const response = await request.json();

        return response as T;
    }

    public async getFile(host: 'map' | 'weather', route: string, headersRequest?: HeadersInit_): Promise<Blob> {
        const headers = new Headers();
        const apiHost = host === 'map' ? mapUrl : weatherUrl;

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers,
        };

        const url = `${apiHost}/${route}`;

        const request = await fetch(url, options);

        const response = await request.blob();
        return response;
    }

    public async post<T>(host: 'map' | 'weather', route: string, body?: T, formData?: FormData, headersRequest?: HeadersInit_) {
        const headers = new Headers();
        const apiHost = host === 'map' ? mapUrl : weatherUrl;

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify(body),
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response;
    }

    public async put<T>(host: 'map' | 'weather', route: string, body?: T, formData?: FormData, headersRequest?: HeadersInit_) {
        const headers = new Headers();
        const apiHost = host === 'map' ? mapUrl : weatherUrl;

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'PUT',
            credentials: 'include',
            headers,
            body: formData ? formData : JSON.stringify(body),
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response;
    }

    public async delete<T>(host: 'map' | 'weather', route: string, body?: T, headersRequest?: HeadersInit_) {
        const headers = new Headers();
        const apiHost = host === 'map' ? mapUrl : weatherUrl;

        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'DELETE',
            credentials: 'include',
            headers,
            body: body ? JSON.stringify(body) : null,
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);

        const response = await request.json();
        return response;
    }
}

export default new ApiManager();
