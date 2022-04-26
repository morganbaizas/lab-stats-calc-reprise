"use strict";
function readAllNumbers() {
    let textArea = document.querySelector("textarea");
    let lines = textArea.value.split("\n");
    let numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (let i = 0; i < lines.length; i++) {
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
function getMean(nums) {
    let sum = 0;
    for (const n of nums) {
        sum += n;
    }
    return sum / nums.length;
}
function getAboveBelowMean(nums) {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums) {
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    console.log(nums, " nums");
    let median = 0;
    if (nums.length % 2 === 0) {
        median = (nums[(nums.length / 2) - 1] + nums[(nums.length / 2)]) / 2;
    }
    else {
        console.log(median);
        median = nums[Math.floor(nums.length / 2)];
        console.log(median);
    }
    return median;
}
function getMinMax(nums) {
    //Step 2
    let min = nums[0];
    let max = nums[nums.length - 1];
    return [min, max];
}
function getStdDev(nums) {
    let mean = getMean(nums);
    let sqrDist = [];
    for (let n of nums) {
        sqrDist.push((mean - n) ** 2);
    }
    let standardDeviation = getMean(sqrDist);
    return Math.sqrt(standardDeviation);
}
let basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = `${getMean(numbers).toFixed(2)}`;
    document.querySelector("#aboveBelow").textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    document.querySelector("#median").textContent = `${getMedian(numbers).toFixed(2)}`;
    document.querySelector("#minMax").textContent = `${getMinMax(numbers).join(" & ")}`;
    document.querySelector("#stdDev").textContent = `${getStdDev(numbers).toFixed(2)}`;
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    let lcm = nums[nums.length - 1];
    function checkLCM(nums, lcm) {
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
    return lcm;
}
function getAllCommonFactors(nums) {
    let smallest = nums[0];
    let arrayFac = [];
    function checkComFactors(nums, smallest) {
        for (let n of nums) {
            if (n % smallest !== 0) {
                return false;
            }
        }
        return true;
    }
    for (let i = smallest; i >= 1; i--) {
        if (checkComFactors(nums, i)) {
            arrayFac.push(i);
        }
    }
    return arrayFac;
}
let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = `${getLeastCommonMultiple(numbers)}`;
    document.querySelector("#factors").textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
