import { getAuth, signInWithEmailAndPassword } from "./firebase.js";



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