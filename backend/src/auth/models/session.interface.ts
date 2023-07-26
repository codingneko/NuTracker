import PrivateUserInfo from "src/user/mode/PrivateUserInfo.interface";

export default interface Session extends PrivateUserInfo {
    expiryDate: Date;
}