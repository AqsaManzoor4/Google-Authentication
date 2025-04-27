  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"; 
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBiPxfmkf3yoob_44RB3A3_j0OBMLCgYD0",
    authDomain: "signin-signup-page-ac2d8.firebaseapp.com",
    projectId: "signin-signup-page-ac2d8",
    storageBucket: "signin-signup-page-ac2d8.firebasestorage.app",
    messagingSenderId: "849297582453",
    appId: "1:849297582453:web:ef643182b2f38679688b3c",
    measurementId: "G-5738FBT7JL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
document.getElementById("signup-btn")?.addEventListener('click',(e)=>{
e.preventDefault();
let email=document.getElementById("signup-email").value;
 let password=document.getElementById("signup-password" ).value;
 createUserWithEmailAndPassword(auth, email, password)   
      .then(() => {    
    alert("Sign Up Successful!"); 
 window.location.href = "welcome.html";   
  })  
 .catch((error) => {     
    alert(error.message);   
  }) 
});  
//login with email and password
document.getElementById("login-btn")?.addEventListener("click", (e) => {  
    e.preventDefault();
     const email = document.getElementById("login-email").value;  
      const password = document.getElementById("login-password").value;   
       signInWithEmailAndPassword(auth, email, password)    
        .then(() => {   
    alert("Login Successful!");  
     window.location.href = "welcome1.html";    
     })    
      .catch((error) => {    
           alert(error.message);     
        }); 
    }); 
//continue with google//
document.getElementById("google-btn")?.addEventListener("click", (e) => { 
    e.preventDefault();
signInWithPopup(auth, provider)  
    .then(() => {     
alert("Login Successful!");   
 window.location.href = "welcome1.html"; 
    })     
.catch((error) => {      
 alert(error.message); 
   }); 
 }); 

//logout//
 document.getElementById("logout-btn")?.addEventListener("click", () => { 
      signOut(auth)    
       .then(() => {      
         alert("Logged Out Successfully!"); 
       window.location.href = "index.html";    
     })     
     .catch((error) => {   
    alert(error.message);   
  });
 }); 

 // Show User Email on Welcome Page 
 onAuthStateChanged(auth, (user) => { 
if (user && window.location.pathname.includes("welcome1.html"))
 {    
 document.getElementById("user-email").textContent = user.email; 
 }
  else if (!user && window.location.pathname.includes("welcome1.html"))
   {    
     
    window.location.href = "index.html"; 
  } 
}); 