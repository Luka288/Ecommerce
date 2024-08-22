export interface AuthCheck {
    error: {
        documentation: string;
        error: string;
        errorKeys: string[];
        help: string;
        path: string;
        statusCode: number;
        swagger: string;
        timestamp: string;
    };
    errorKeys: string[];
    statusCode: number;
    timestamp: string;
    path: string;
    headers: [];
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
  }
  