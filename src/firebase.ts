import admin from "firebase-admin";
import serviceAccount from "../equity-6d8c4-firebase-adminsdk-fbsvc-3e22a61c15.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
