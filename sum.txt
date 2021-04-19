//jp@pristyncare.com

let arr = [1, 5, 7, -1, 5];
let sum = 6;
let s = 0;
var output = 0;

// Using nested loops

for (let i = 0; i < arr.length; i++) {
    for (j = i + 1; j < arr.length; j++) {
        s = arr[i] + arr[j];
        if (s == sum) {
            output = output + 1;
            s = 0;
        }
    }
}

// Using Map function

myMap = arr.map((value, key) => {
    for (let i = key + 1; i < arr.length; i++) {
        s = value + arr[i];
        if (s == sum) {
            output = output + 1;
            s = 0;
        }
    }
})
