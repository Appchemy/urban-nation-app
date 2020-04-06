import firebase from 'react-native-firebase'
import { UserService } from './user-service'

export class ClockInService {
    static clockIn(data) {
        return UserService.currentUser().then(user => {
            const uid = user.uid
            data.uid = uid
            data.inProgress = true
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp()
            data.onBreak = false

            return firebase.firestore().collection(`clockins`).add(data).then(ref => {
                data.id = ref.id

                return data
            })
            
        })
    }

    static currentClockIn() {
        return UserService.currentUser().then(user => {
            console.log('User: ' + user)
            return firebase.firestore().collection(`clockins`)
                .where('uid', '==', user.uid)
                .where('inProgress', '==', true).get().then(snapshots => {
                    console.log('Snapshots: ' + snapshots.docs.length)
                    if (snapshots.docs.length > 0) {
                        const data = {
                            ...snapshots.docs[0].data(),
                            id: snapshots.docs[0].id
                        }

                        if (data.createdAt == null) {
                            data.createdAt = {seconds: new Date().getTime() / 1000}
                        }

                        return data
                    }

                    return null
                })
        })
    }

    static clockout() {
        return ClockInService.currentClockIn().then(clockin => {
            return firebase.firestore().collection(`clockins`).doc(clockin.id).update({
                inProgress: false,
                clockedOutAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
        
    }
}