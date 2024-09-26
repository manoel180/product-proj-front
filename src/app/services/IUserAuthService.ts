import { Observable } from "rxjs";
import { Token } from "../core/model/token";

/**
 * @description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `login()` method to handle any additional initialization tasks.
 * Define an `logout()` method to handle any additional initialization tasks.
 *
 * @see {@link AfterContentInit}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 *
 * @publicApi
 */
export declare interface IUserAuthService {
  login(_login: string, _password: string): Observable<any>;
  logout(): void;
  getToken(): string;
}
