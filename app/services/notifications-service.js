import firebase from "react-native-firebase";

export class NotificationsService {
    static notifications() {
        return firebase.firestore().collection('broadcasts').orderBy('postedAt').get().then(snapshot => {
            return snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        })
    }
}