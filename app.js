import { query, where, updateDoc,deleteDoc , getAuth, signInWithEmailAndPassword,collection, getDocs,db, onAuthStateChanged, doc, signOut, setDoc, serverTimestamp, addDoc, onSnapshot} from "./firebase.js";
let addtask = document.getElementById("addtask")

let taskdiv = document.getElementById("taskdiv")
let addtodo = ()=>{

}
let verifybtn = document.getElementById("verifybtn")
let userdata = document.getElementById("userdata")
let userName=document.getElementById('userName')
let userEmail=document.getElementById('userEmail')
let userVerify=document.getElementById('userVerify')
let logout = document.getElementById("logout")
let imageInput=document.getElementById("imageInput")
let logoutbtn=document.getElementById("logout-btn")
let imgdiv = document.getElementById("img-div")
let img = document.getElementById("img")
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    getdata(user)
     getTodo(user);
    window.userid=user.uid;
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
   document.getElementById("data-div").style.display = "block";
   imgdiv.style.display="block"
   img.style.display="none";
  // document.getElementById("data-div").style.display = "none";
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
  if(!emailVerified){
    verifybtn.innerHTML=`<button type="button" class="btn btn-info btn-sm">Verify Email</button>`
    logoutbtn.innerHTML=`<button type="button" class="btn btn-danger btn-sm" onclick="signOff()">LogOut</button>`
  }
  //  document.getElementById("data-skeleton").style.display = "none";
  document.getElementById("data-div").style.display = "none";
  img.style.display="block";
  imgdiv.style.display="none"
}
}

 addtask.addEventListener('click', async ()=>{
    let inputdiv = document.getElementById("inputdiv")
    let inputdivvalue = inputdiv.value
        const docRef = await addDoc(collection(db, "Tasks"), {
  Task: inputdivvalue,
  completed: false,
  timestamp: serverTimestamp(),
  uid: userid
});
inputdiv.value="";
console.log("Document written with ID: ", docRef.id);
console.log("Task Added with the user Id", userid)
console.log("data added to db")
   
    

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
window.signOff=signOff;
//  logout.addEventListener('click', signOff)

 let getTodo= (user)=>{
   document.getElementById("skeletonLoader").style.display = "block";
  document.getElementById("taskdiv").style.display = "none";
   const q = query(collection(db, "Tasks"), where("userId", "==", user.uid))
const unsubscribe = onSnapshot(collection(db, "Tasks"), (snapshot) => {
    taskdiv.innerHTML="";
  snapshot.forEach((doc) => {
    let data=doc.data();
    console.log(doc.id, " => ", doc.data());
        
     taskdiv.innerHTML+=` <li class="task-item d-flex justify-content-between align-items-center" style="width: 100%; padding: 10px; border-bottom: 1px solid #ccc;">
    <span>${data.Task}</span>
    <div>
      <input type="checkbox" class="btn-check btn-sm" id="btncheck1-${doc.id}"  onchange="toggleCheckbox('${doc.id}', this.checked)" ${doc.completed ? checked : ""}>
  <label class="btn btn-outline-primary" for="btncheck1-${doc.id}" )">Completed</label>
    <button type="button" class="btn btn-warning btn-sm" onclick="editTodo('${doc.id}')">Edit</button>
    <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo('${doc.id}')">Delete</button>
    </div>
  </li>`;
  });
    document.getElementById("skeletonLoader").style.display = "none";
    document.getElementById("taskdiv").style.display = "block";
});

 }

async function toggleCheckbox(id, completed){
  
   try{
    const taskRef = doc(db, "Tasks", id)
    await updateDoc(taskRef, {
      completed: completed,
      
    });
    Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Task Completed',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});
   }
   catch(e){
    console.log(e)
   }
}
window.toggleCheckbox = toggleCheckbox;
 let deleteTodo = async (id)=>{
    try{
         Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Deleted Successfully',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});
      await deleteDoc(doc(db, "Tasks", id));
    console.log("Task Deleted")
 

    }
    catch(error){
      console.log(error);
    }
 }

 window.deleteTodo = deleteTodo;

 let editTodo = async(id)=>{
  let updatedTask = prompt("Enter the new Value")
  if(updatedTask){
     try {
    const taskRef = doc(db, "Tasks", id);
    await updateDoc(taskRef, {
      Task: updatedTask,
      timestamp: serverTimestamp(), 
    });
    console.log("Task updated successfully");
    toastr.success('Task added successfully!');
  } catch (error) {
    console.error("Error updating task:", error);
  }
}else{
   Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'No value',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});

}
 }

 window.editTodo = editTodo;

 console.log(window.toastr)