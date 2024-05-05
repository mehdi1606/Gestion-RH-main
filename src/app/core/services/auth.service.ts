import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor() {}

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the login
     * @param email email of user
     * @param password password of user
     */
    async login(email: string, password: string): Promise<User> {
        try {
            const response = await getFirebaseBackend().loginUser(email, password);
            return response;
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    async register(email: string, password: string): Promise<User> {
        try {
            const response = await getFirebaseBackend().registerUser(email, password);
            return response;
        } catch (error) {
            throw new Error('Registration failed: ' + error.message);
        }
    }

    /**
     * Reset password
     * @param email email
     */
    async resetPassword(email: string): Promise<string> {
        try {
            const response = await getFirebaseBackend().forgetPassword(email);
            return response.data; // Assuming response.data contains the message
        } catch (error) {
            throw new Error('Password reset failed: ' + error.message);
        }
    }

    /**
     * Logout the user
     */
    logout() {
        getFirebaseBackend().logout();
    }
}
