import { signInWithPopup,getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from "./firebase.js";

let googleBtn  = document.getElementById("googleBtn")

let login = (event)=>{
    event.preventDefault();
    const auth = getAuth();
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    Swal.fire({
        title: "Login Successfull!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Continue"
    }).then(() => {
      location="dashboard.html"
    });

    console.log(userCredential.user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

  let Login = document.getElementById("Login")

  Login.addEventListener('click', login)

  const provider = new GoogleAuthProvider();

  googleBtn.addEventListener('click', ()=>{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
     Swal.fire({
        title: "Login Successfull!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Continue"
    }).then(() => {
      location="dashboard.html"
    });
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(error)
  });
  })