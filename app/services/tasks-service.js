import firebase from 'react-native-firebase'
import { UserService } from './user-service'

export class TasksService {
    static teamByIds(ids) {
        return Promise.all(ids.map(id => {
            return firebase.firestore().collection(`users`).doc(id).get().then(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        }))
    }

    static tasks() {
        return UserService.currentUser().then(user => {
            return firebase.firestore().collection(`tasks`).where('members', 'array-contains', user.uid).get().then(snapshots => {
                return snapshots.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
            })
        })
    }

    static posts(taskId) {
        return firebase.firestore().collection(`tasks/${taskId}/posts`).get().then(snapshots => {
            return snapshots.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        }).then(posts => {
            const ids = {}
            for (let i = 0; i < posts.length; i++) {
                ids[posts[i].uid] = true
            }
            const userProfiles = {}
            return UserService.profilesByIds(Object.keys(ids)).then(profiles => {
                console.log(profiles)
                for (let i = 0; i < profiles.length; i++) {
                    userProfiles[profiles[i].id] = profiles[i]
                }

                return posts.map(post => {
                    return {
                        ...post,
                        profile: userProfiles[post.uid]
                    }
                })
            })
        })
    }

    static uploadFile(taskId, text, files) {
        return UserService.currentUser().then(user => {
            return firebase.firestore().collection(`tasks/${taskId}/posts`).add({
                // type: type,
                text: text,
                uid: user.uid,
                active: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(doc => {
                return Promise.all(files.map((file, index) => {
                    console.log('Sending ' + file)
                    return firebase.storage().ref(`uploads/${taskId}/${doc.id}-${index+1}`).putFile(file).then(ref => {
                        return ref.downloadURL
                    })
                })).then(files => {
                    console.log(files)
                    return firebase.firestore().collection(`tasks/${taskId}/posts`).doc(doc.id).update({
                        files: files,
                        active: true
                    })
                })
            })
            
            
        })
    }

    static task(id) {
        return firebase.firestore().collection(`tasks`).doc(id).get().then(snapshot => {
            console.log(snapshot.exists)
            return {
                ...snapshot.data(),
                id: snapshot.id
            }
        })
    }
}