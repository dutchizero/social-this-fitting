import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import { Directions } from 'react-native-gesture-handler';

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
const fn = firebase.functions();
const auth = firebase.auth();

const getChallengeScoreByUserIDAndChallengeID = (userID, challengeID) => {
    return db.collection('ChallengerScore')
        .where('UserID', '==', userID)
        .where('ChallengeID', '==', challengeID)
        .get();
}

const getChallengeScoreByUserID = (userID) => {
    return db.collection('ChallengerScore')
        .where('UserID', '==', userID)
        .get();
}

const getRealTimeChallengeScoreByUserID = (userID, challengeID) => {
    return db.collection('ChallengerScore')
        .where('UserID', '==', userID)
        .where('ChallengeID', '==', challengeID);
}

const getAllChallengeStatus = () => {
    return db.collection('ChallengeStatus');
}

const updateUserChallengeScore = (id, challengeScore) => {
    db.collection('ChallengerScore').doc(id).update(challengeScore);
}

const getAllChallenge = () => {
    return fn.httpsCallable('getAllChallenges')();
}

const getCurrentUserId = () => {
    return auth.currentUser.uid;
}

const getCurrentUserDisplayName = () => {
    return auth.currentUser.email;
}

const getRealTimeHiestScore = (challengeID) => {
    return db.collection('ChallengerScore').where('ChallengeID', '==', challengeID);
}

const createJoin = (docId, challengerScore) => {
    db.collection('ChallengerScore').doc(docId).set(challengerScore);
}

export { getChallengeScoreByUserIDAndChallengeID, updateUserChallengeScore, getAllChallenge, getChallengeScoreByUserID, getCurrentUserId, getAllChallengeStatus, getRealTimeChallengeScoreByUserID, getRealTimeHiestScore, createJoin, getCurrentUserDisplayName };