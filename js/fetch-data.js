import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIyONSKwzD0xyhTHHUw45SAyu0rUiBfTQ",
  authDomain: "studymate-d9b59.firebaseapp.com",
  databaseURL: "https://studymate-d9b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "studymate-d9b59",
  storageBucket: "studymate-d9b59.firebasestorage.app",
  messagingSenderId: "408843680613",
  appId: "1:408843680613:web:815bc035f09f453b743f8c",
  measurementId: "G-NDYPGH5SWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fetch data from Firebase Realtime Database
async function fetchData() {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "/")); // Replace '/' with the desired path
    if (snapshot.exists()) {
      console.log("Data:", snapshot.val());

      // Set entire JSON data to an element
      document.getElementById("jsonData").textContent = JSON.stringify(snapshot.val(), null, 2);

      // Iterate through each key-value pair in the snapshot
      snapshot.forEach((snap) => {
        snap.forEach((key) => {
            const key3 = key.key; // Key of the current node
            const value3 = key.val(); // Value of the current node
    
            const p = document.createElement("p");
            p.textContent = `${key3} = ${JSON.stringify(value3)}`;
            document.body.appendChild(p); // Append the <p> element to the body
          });
      });
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function
fetchData();
