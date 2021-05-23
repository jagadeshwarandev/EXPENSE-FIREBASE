var firebaseConfig = {
    apiKey: "AIzaSyAs093aITSeLxM-G8aXFTWxIQzqwSjRNHg",
    authDomain: "expenseapp-6dc0a.firebaseapp.com",
    projectId: "expenseapp-6dc0a",
    storageBucket: "expenseapp-6dc0a.appspot.com",
    messagingSenderId: "825806348652",
    appId: "1:825806348652:web:d6d027b3cb2bd4f6249349"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // console.log(firebase.app());
  
  const db = firebase.firestore();
  