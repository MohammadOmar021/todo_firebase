import { getAuth, signInWithEmailAndPassword,collection, getDocs,db, onAuthStateChanged, doc, signOut, setDoc, serverTimestamp, addDoc, onSnapshot} from "./firebase.js";
let addtask = document.getElementById("addtask")

let taskdiv = document.getElementById("taskdiv")
let addtodo = ()=>{

}

let userdata = document.getElementById("userdata")
let userName=document.getElementById('userName')
let userEmail=document.getElementById('userEmail')
let userVerify=document.getElementById('userVerify')
let logout = document.getElementById("logout")


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    getdata(user)
    // ...
  } else {
    // User is signed out
    // ...
    //  location="index.html"
  }
});


let getdata = async (user)=>{
   

if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  console.log(displayName)
  userName.innerHTML=  `${displayName}`
  userEmail.innerHTML=  `${email}`
}
}

 addtask.addEventListener('click', async ()=>{
    let inputdiv = document.getElementById("inputdiv")
    let inputdivvalue = inputdiv.value
        const docRef = await addDoc(collection(db, "Tasks"), {
  Task: inputdivvalue,
  completed: false,
  timestamp: serverTimestamp()
});
console.log("Document written with ID: ", docRef.id);
console.log("data added to db")
   
    inputdiv.value="";

 })

 let signOff = ()=>{
    signOut(auth).then(() => {
    Swal.fire({
  title: "LogOut Successfully",
  icon: "success",
   confirmButtonText: "OK"
}).then(()=>{
    location="index.html"
})
}).catch((error) => {
  // An error happened.
});
 }

 logout.addEventListener('click', signOff)

 let getTodo= ()=>{
const unsubscribe = onSnapshot(collection(db, "Tasks"), (snapshot) => {
    taskdiv.innerHTML="";
  snapshot.forEach((doc) => {
    let data=doc.data();
    console.log(doc.id, " => ", doc.data());
        
     taskdiv.innerHTML+=` <li class="task-item d-flex justify-content-between align-items-center" style="width: 100%; padding: 10px; border-bottom: 1px solid #ccc;">
    <span>${data.Task}</span>
    <div>
    <button type="button" class="btn btn-warning btn-sm">Edit</button>
    <button type="button" class="btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`;
  });
  
});

 }

 getTodo();