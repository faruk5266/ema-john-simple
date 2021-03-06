import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export  const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
}


export  const handleGoogleSingIn = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
  .then(res => {
    const {displayName, photoURL, email} = res.user;
        const singInUser ={
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        setUserToken();
        return (singInUser);
  })
  .catch(err => {
    console.log(err);
    console.log(err.message)
  })
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

  export const handleFbSingIn= () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider) 
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;  
      
    }).catch(function(error) {
      
      var errorCode = error.code;
      var errorMessage = error.message;
     console.log(errorCode, errorMessage)
    });
  }


 export const handleSingOut= () => {
   return firebase.auth().signOut()
    .then(res => {
      const singOutUser ={
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false,
        photo: ''
      }
     return (singOutUser)
    })
    .catch(err => {
      
    })
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = ''
        newUserInfo.success= true
        updateUserName(name);
        return newUserInfo;
    })
    .catch( error => {
      
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success= false;
      return newUserInfo;
      
    });
  }


  export const signInWithEmailAndPassword = (email, password) => {
  return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user
        newUserInfo.error = ''
        newUserInfo.success= true
        return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success= false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

           user.updateProfile({
          displayName: {name}
          }).then(function() {
          console.log('Updated Successfully')
          }).catch(function(error) {
            console.log(error)  
          });
  }