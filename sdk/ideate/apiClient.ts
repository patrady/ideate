export class ApiClient {
  constructor() {}

  async get<T>(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (await response.json()) as T;
  }

  async post<T>(url: string, body: any) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return (await response.json()) as T;
  }

  async put<T>(url: string, body: any) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return (await response.json()) as T;
  }

  async delete<T = undefined>(url: string) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (await response.json()) as T;
  }
}
