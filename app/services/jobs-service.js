import firebase from "react-native-firebase";
import { UserService } from "./user-service";

export class JobsService {
    static jobAlerts() {
        return UserService.currentUser().then(user => {
            return firebase.firestore().collection('jobAlerts').get().then(snapshot => {
                return snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }).filter(alert => {
                    const responses = alert.responses ? alert.responses : []
                    if (responses.indexOf(user.uid) == -1) {
                        return true
                    }

                    return false
                })
            })
        })
    }

    static apply(alert) {
        return UserService.currentUser().then(user => {
            const responses = alert.responses ? alert.responses : []
            responses.push(user.uid)

            return firebase.firestore().collection('jobAlerts').doc(alert.id).update({
                responses: responses
            })
        })
        
    }
}