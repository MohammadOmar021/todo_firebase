import { auth, getAuth, createUserWithEmailAndPassword, addDoc, setDoc, doc, db} from "./firebase.js";


let signup = document.getElementById("signup")

let saveusertodb =async (user)=>{
    let fullname = document.getElementById("fullname")
    try {
         await setDoc(doc(db, "users", user.uid), {
        Name: fullname.value,
          email: user.email,
            uid: user.uid
        });
        console.log("Document written with ID: ", user.uid);
        location="dashboard.html"
        console.log("User data Added to db")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

let register = ()=>{

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User Saved")
    saveusertodb(user)
  })
  .catch((error) => {
   console.log("error", error)
    // ..
  });
}

signup.addEventListener('click', register)