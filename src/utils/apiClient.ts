
const BaseUrl = "https://restcountries.com/v3.1/"

interface ApiResponse<T = any> {
    data: T;
    status: number;
    ok: boolean;
    error?: string | object;
  }


  const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    let responseData;
    try {
      responseData = await response.json();
    } catch (e: any) {
      responseData = null;
      throw new e;
    }
  
    if (!response.ok) {
      const errorData = responseData || { message: response.statusText };
      throw {
        data: errorData,
        status: response.status,
        ok: response.ok,
        error: `API error: ${response.status} ${response.statusText}`,
      };
    }
  
    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  };

export const getRequest = async (
    path: string,
  ): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${BaseUrl}${path}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return handleApiResponse(response);
    } catch (error) {
      console.error("getRequest failed:", error);
      throw error;
    }
  };