// Name : Morgan Baizas
// Period : 5

function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let num = lines[i].split(' ');
        for (let n of num) {
            if (isNaN(Number(n)))
            continue;
        numbers.push(Number(n));
        }
    }
    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    console.log(nums, " nums")
    let median : number = 0
    if (nums.length % 2 === 0) {
        median = (nums[(nums.length/2) - 1] + nums[(nums.length/2)])/2
    } else {
        console.log(median)
        median = nums[Math.floor(nums.length/2)]
        console.log(median)
    }
    return median
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    let min : number = nums[0]
    let max : number = nums[nums.length -1]
    return [min, max]
}

function getStdDev(nums : number[]) : number {
    let mean = getMean(nums)
    let sqrDist : number[] = []
    for (let n of nums) {
        sqrDist.push((mean - n)**2)
    }
    let standardDeviation : number = getMean(sqrDist)
    return Math.sqrt(standardDeviation)
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers).toFixed(2)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers).toFixed(2)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers).toFixed(2)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let lcm : number = nums[nums.length - 1]
    function checkLCM (nums : number[], lcm : number) : boolean {
        for (const n of nums) {
            if (lcm % n !== 0) {
                return false;
            }
        }
        return true;
    }
    while (checkLCM(nums, lcm) === false) {
        lcm += 1;
    }
    return lcm
}

function getAllCommonFactors(nums : number[]) : number[] {
    let smallest : number = nums[0]
    let arrayFac : number[] = []
    function checkComFactors (nums : number[], smallest : number) : boolean {
    for (let n of nums) {
        if (n % smallest !== 0) {
            return false;
        }
    } return true;
    }
    for (let i = smallest; i >= 1; i-- ){
        if (checkComFactors(nums, i)) {
            arrayFac.push(i)
        }
    }
    return arrayFac
}

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
