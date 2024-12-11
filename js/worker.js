let i = 0; // Counter variable

function incrementCounter() {
    i++; // Increment the counter
    postMessage(i); // Send the current counter value to the main script
    setTimeout(incrementCounter, 1000); // Repeat every 1 second
}

// Start the counter
incrementCounter();
