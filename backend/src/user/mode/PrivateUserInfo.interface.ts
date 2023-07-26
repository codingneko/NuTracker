import PublicUserInfo from "./PublicUserInfo.interface";

export default interface PrivateUserInfo extends PublicUserInfo {
    email: string;
}