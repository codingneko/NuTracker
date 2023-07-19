import BaseAuthenticatedRequest from "./BaseAuthenticatedRequest.interface";

export interface DeleteUserRequest extends BaseAuthenticatedRequest {
    userId: number;
}