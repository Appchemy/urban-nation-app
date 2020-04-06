import firebase from 'react-native-firebase'
import { from, Observable } from 'rxjs'
import { flatMap } from 'rxjs/operators'

export class UserService  {
    static currentUser() {
        return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged(user => {
                resolve(user)
            })  
        })
    }

    static subscribeToJobAlerts() {
        return UserService.user().then(user => {
            firebase.messaging().subscribeToTopic(user.province + 'JobAlert')
            firebase.messaging().subscribeToTopic('Notifications')
        })
    }

    static registerFCMToken(uid) {
        console.log('Listening for tokens')
        firebase.messaging().getToken().then(token => {
            console.log('Got token from promise: ' + token)
            console.log(uid)
            firebase.firestore().collection(`users`).doc(uid).update({
                fcmToken: token
            })
        })
        firebase.messaging().onTokenRefresh(token => {
            console.log('Got token: ' + token)
            console.log(uid)
            firebase.firestore().collection(`users`).doc(uid).update({
                fcmToken: token
            })
        })
    }

    static user() {
        return this.currentUser().then(user => {
            return firebase.firestore().doc(`users/${user.uid}`).get().then(snapshot => {
                const profile = snapshot.data()

                if (!profile.photo) {
                    profile.photo = 'assets/imgs/avatar.png'
                }

                return profile
            })
        })
    }

    static resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email)
    }

    static logout() {
        return firebase.auth().signOut()
    }

    static login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    static signup(email, password, profile) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            return firebase.firestore().collection(`users`).doc(user.user.uid).set(profile)
        })
    }

    static updateProfile(profile) {
        return this.currentUser().then(user => {
            return firebase.firestore().collection(`users`).doc(user.uid).update(profile)
        })
    }

    static updateProfilePic(pic) {
        return this.currentUser().user(user => {
            return firebase.storage().ref(`profiles/${user.uid}`).putFile(pic).then(task => {
                return task.ref.getDownloadURL().then(url => {
                    return firebase.firestore().collection(`users`).doc(user.uid).update({photo: url})
                })
            })
        })
    }

    static registerPush(token) {
        return this.currentUser().then(user => {
            return firebase.firestore().doc(`users/${user.uid}`).update({pushToken: token})
        })
    }

    static profilesByIds(ids) {
        return Promise.all(ids.map(id => {
            return firebase.firestore().doc(`users/${id}`).get().then(snapshot => {
                return {
                    ...snapshot.data(),
                    id: snapshot.id
                }
            })
        }))
    }
}