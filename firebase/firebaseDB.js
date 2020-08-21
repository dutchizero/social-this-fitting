import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwfuINQBrjzs07LyvEKs1PKthEURPGfp8",
    authDomain: "social-this-fitting-d30fb.firebaseapp.com",
    databaseURL: "https://social-this-fitting-d30fb.firebaseio.com",
    projectId: "social-this-fitting-d30fb",
    storageBucket: "social-this-fitting-d30fb.appspot.com",
    messagingSenderId: "522856523662",
    appId: "1:522856523662:web:b96078f3ad1c1d1c02e6df"
  }
  
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const getChallengeScore = (userID, challengeID) => {
    return db.collection('ChallengerScore')
        .where('UserID', '==', userID)
        .where('ChallengeID', '==', challengeID)
        .get();
}

const updateUserChallengeScore = (id, challengeScore) => {
    db.collection('ChallengerScore').doc(id).update(challengeScore);
}

export { getChallengeScore, updateUserChallengeScore };