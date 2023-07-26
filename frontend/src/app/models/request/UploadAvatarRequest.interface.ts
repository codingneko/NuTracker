import BaseAuthenticatedRequest from "./BaseAuthenticatedRequest.interface";

export default interface UploadAvatarRequest extends BaseAuthenticatedRequest {
    file: File;
}