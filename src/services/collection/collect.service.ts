import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface XenteConfig {
  apiKey: string;
}

export class Collection {
  private apiKey: string;
  private baseURL: string;

  constructor(config: XenteConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = 'https://api.xente.co';
  }

  private async sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse<T> = await axios({ ...config, baseURL: this.baseURL });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  private getHeaders() {
    const timestamp = Date.now();
    const nonce = Math.floor(Math.random() * 1000000);

    return {
        'Content-Type': 'application/json',
        'X-Time': timestamp.toString(),
        'X-Nonce': nonce.toString(),
        Authorization: `Token ${this.apiKey}`
      };
  }

  public async mobileMoney(amount: number, description: string): Promise<any> {
    const endpoint = '/payments';

    const headers = this.getHeaders();

    const payload = {
      amount,
      description,
      // Add other required parameters
    };

    const config: AxiosRequestConfig = {
      method: 'post',
      url: endpoint,
      headers,
      data: payload,
    };

    return this.sendRequest<any>(config);
  }

  public async getPerson(phoneNumber: string ): Promise<any> {
    try {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: '/people',
            headers: this.getHeaders(),
            params: {
                phone_number: phoneNumber
              },
          };
        const response = await this.sendRequest(config);
        if (response.status === 200) {
            console.log("GET request successful!");
            return response.data;
          }

        console.log("Error occurred: " + response.statusText);
        
        return null;
    
    } catch (error) {
        throw error.response?.data || error.message;
    }
  }
}
