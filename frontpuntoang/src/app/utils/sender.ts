type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface SenderParams<T = any> {
  url: string;
  data?: T;
  token?: string | null;
  method?: HttpMethod;
}

async function sender<T = any>({
    url,
    data = {},
    token = null,
    method = 'POST'
}: SenderParams): Promise<T | null> {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    console.log({sender: JSON.stringify(data)})

    let response = await fetch(url, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(data) : null,
      redirect: "follow"
    });

    if (response.status === 401) {
      localStorage.removeItem('auth');
      window.location.href = '/';
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const json = await response.json();

    return json.data as T;

  } catch (error) {
    //throw handleApiError(error);
    return null;
  }
}

export default sender ;
