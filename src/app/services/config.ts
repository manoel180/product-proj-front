import {environment} from '../../environments/environment';

export abstract class ConfigAPI {
    private static readonly URL_BASE = environment.apiUrl;

    public static readonly PRODUCT = ConfigAPI.URL_BASE.concat('products');
    public static readonly LOGIN = ConfigAPI.URL_BASE.concat('o/token/');

}
