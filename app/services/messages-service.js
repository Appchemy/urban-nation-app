import firebase from "react-native-firebase";
import { UserService } from "./user-service";

export class MessagesService {
    static messages(onSnapshot) {
        return UserService.user().then(user => {
            const to = user.uid

            return firebase.firestore().collection('messages').where('to', '==', to).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
                onSnapshot(snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }))
            })
        })
        
    }

    static sendMessage(message) {
        return UserService.user().then(user => {
            const to = user.uid
        return firebase.firestore().collection('messages').add({
            message: message, 
            to: to,
            fromAdmin: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }   )
    }
}