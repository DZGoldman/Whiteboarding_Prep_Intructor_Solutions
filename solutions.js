
/* is palindrome:  method 1: reverse string and compare to original, using js-methods 
O(n) time: split, reverse, and join all take n steps
O(n) space: split creates a new array of length n, and join creates a new string of length n
*/
const isPalindrome1 = (string) =>{
    // convert string to array, reverse it, convert array to string:
    const reversedString = string.split('').reverse().join('');
    // true if reversed string equals original, false otherwise
    return reversedString === string;
}


/* isPalindrome method 2: reverse string and compare to original, using a for loop
O(n) time: for loop goes through each char in the string
O(n) space: new reversed string of size n
*/
const isPalindrome2 = (string)=>{
    let reversedString = "";
    // iterate through string
    for (let i = 0 ;  i < string.length; i++ ) {
        let currentChar = string[i]
        // add each char to beginning of new string, building it in reverse
        reversedString = currentChar + reversedString
    }
    return reversedString === string;

}


/* isPalindrome method 3: iterate through string from start to end and end to start at the same time, stopping if corresponding characters aren't equal
as a bonus, also ignore spaces
O(n) time: for loop goes through each char in the string
O(1) space: all new data (start and end index) is of constant size
*/
const isPalindrome3  = (str) => {
    // Initialize start and end indices
    let startIndex = 0;
    let endIndex = str.length -1 
    // break once they meet in the middle
    while ( startIndex < endIndex){
        let startChar = str[startIndex];
        let endChar = str[endIndex];
        
        // bonus!: ignore spaces
        if (startChar === " "){
            // if start is space, increment index and skip to next loop
            startIndex ++
            continue
        }
        
        if (endChar === " "){
            endIndex --
            continue
        }
        // end of bonus

        // return false if corrpesponding characters aren't equal
        if ( startChar !== endChar){
            return false 
        }
        // update indices
        startIndex++
        endIndex--
    }
    // if we get through the loop without returning false, all corresponding characters must be equal, so return true
    return true
}

/*
inputs array of strings, outputs string with most vowels
O(n^2) time if string length is unbounded; O(n) if we assume upper bound on length of each string (20 characters,say)
O(1) space
*/

const mostVowels = (words) => {
    // initiate string and vowel count
    let wordWithMostVowelsSoFar = "";
    let mostVowelsSoFar = 0;
    // iterate through each word
    words.forEach((word)=>{
        let vowelCount = getVowelCount(word)
        // if vowel count equals best so far, update best count and associated word
        if (vowelCount > mostVowelsSoFar){
            wordWithMostVowelsSoFar = word;
            mostVowelsSoFar = vowelCount
        }
    })
    return wordWithMostVowelsSoFar
}
/*
helper method: inputs string and outputs number of vowels
O(n) time (where n is the length of the string)
O(1) space; count, current letter, and vowels take up constant space
*/
const getVowelCount = (word)=>{
    // assign vowels to hash for constant lookup
    const vowels = {
        a: true, e:true, i: true, o: true, u: true
    }
    let count = 0
    // iterate through each char in string
    for (let i =0 ; i<word.length  ;i++ ) {
        const currentLetter = word[i];
        // increment count by one for each char in string
        if (vowels[currentLetter]){
            count ++
        }
    }
    return count
}

/*
inputs array of 2-element arrays representing start and end of "meetings"; returns boolean indicating whether any meetings overlap
O(nlogn) time due to the sort
O(1) space; sort mutates the array, thus doesn't require new memeory
*/
const hasOverlaps = (meetingsArray)=>{
    // sort meetings by start time
    meetingsArray.sort((meeting1, meeting2)=>{
        return meeting1[0] > meeting2[0]
    })
    for (let i = 0 ; i < meetingsArray.length -1; i ++) {
        // use index to get current and next meeting
        const currentMeeting = meetingsArray[i];
        const nextMeeting = meetingsArray[i+1];
        // if meeting ends before the next one starts, we've found an overlap
        if (currentMeeting[1] > nextMeeting[0]){
            return true
        }
    }
    // if we survive the loop with no overlaps, we can return false
    return false
}


/*
inputs and array of numbers and a number included (somewhere) in the array
outputs the index that represents the slot the number would reside in if the array was sorted
strategy: count the number of numbers less than the target
O(n) time
O(1) space
*/
const indexOfNumber =  (numArray, targetNum) =>{
    let smallerNumbersCount = 0;

    numArray.forEach((num)=>{
        if (num <= targetNum){
            smallerNumbersCount++
        }
    })
    return smallerNumbersCount
}


/*
inputs array of numbers, returns boolean indicating whether a number duplicates
O(n) time
O(n) space - new hash contains n elements, in the worst case
*/
const hasDuplicates = (numberArray) =>{
    // track seen numbers in a hash for constant lookup
    const numbersSeenSoFar = {};
    // iterate through each number
    for (let i=0 ; i < numberArray.length  ;i++ ) {
        let currentNumber = numberArray[i];
        // if number is already in our hash, it's been seen, and we have a duplicate
        if (numbersSeenSoFar[currentNumber]){
            return true
        }
        // add number to hash (value "true" is just a placeholder)
        numbersSeenSoFar[currentNumber] = true;
    }
    // if we survive the loop, there are no duplicates, and we can return true
    return true
}


/*
determine whether array represents a "complete cycle" (see slides)
O(n) time
O(1) space
Note that this strategy relies on the observation that the cycle will always return to index 0;
 - this can proven by assuming (for contradiction) that somehow, index 0 was never reached again
 - this would require a a cycle to exist that doesn't contain zero
 - this cycle would need to be entered at some point; the value used to enter it must also be included in the cycle
 - values can't repeat; thus, this is impossible 
*/

const isCompleteCycle = (numArray) =>{
    // track the number of steps and current index; first step is taken in the assignment, so initate stepcount at 1
    let stepCount = 1;
    // start at the value at index 0
    let currentIndex = numArray[0]
    // stop when we return back to zero
    while (currentIndex !== 0 ){
        // value becomes the new index
        currentIndex = numArray[currentIndex];
        // increment steps
        stepCount ++
    }
    // if steps is equal to the length of the array, it's a full cycle. 
    console.warn(stepCount);
    
    return  stepCount  === numArray.length;
}
/*
find missing number in list of scrambled, otherwise consecutive numbers
strategy 1: sort numbers, iterate thorugh integers in order, find the one missing
O(nlogn) time due to sort
O(1) space
*/

const missingNumber1 = (numbers) =>{
    // sort numbers
    numbers.sort();
    // find the maximum potential numbers; length of array + 1, since numbers are 1-n
    const max = numbers.length + 1
    // iterate through integers i up to n
    for (let i=1  ; i <= max  ; i++ ) {
        // if the index itself doesn't equal the array value, we've found the missing number
        if (numbers[i-1] !== i){
            return i
        }
    }
}
/*
strategy two: store all numbers in hash; iterate through 1-n and find the missing one via lookup
O(n) time; iterating and building the hash both take O(n)
O(n) space: hash takes O(n) space, always
*/
const missingNumber2 = (numbers) =>{

    const numHash = {};
    const max = numbers.length + 1
    // store all numbers in hash up front
    numbers.forEach((number)=>{
        numHash[number] = true
    })
    // iterate through values 1...n
    for (let i=1  ; i <= max  ; i++ ) {
        // if it isn't in the hash, return
        if (!numHash[i]){
            return i
        }
    }
}

/*
strategy 3: add up numbers in array, add up values from 1-n, return the difference
O(n)  time
O(1) space! 
*/

const missingNumber3 = (numbers)=>{
    // get sum of numbers in array
    let totalInArray = 0
    numbers.forEach((num)=>{
        totalInArray += num
    })
    // get sum of all possible integers
    const max = numbers.length + 1
    let totalOfAllPossibleIntegers = 0;
    for (let i =1 ; i<= max  ; i++  ) {
        totalOfAllPossibleIntegers += i
    }
    // differnce is the missing number
    return totalOfAllPossibleIntegers - totalInArray


}

/* 
same strategy as above, but fancier approaches to both sums
*/

const missingNumberFancy = (numbers) =>{
    // calculate sum using reduce method
    const totalInArray = numbers.reduce((sum, number)=> sum + number );

    const max = numbers.length + 1;
    // get total with Gauss's triangular number formula https://en.wikipedia.org/wiki/Triangular_number
    let totalOfAllPossibleIntegers  = (max + 1) * max  / 2;
    
    return totalOfAllPossibleIntegers - totalInArray



}


