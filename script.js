const expenses = {
    "2023-01": {
        "01": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
};

function solution1(expenses) {
    let result = null;

    // first sunday of month
    function getFirstSunday(year, month) {
        const date = new Date(year, month - 1, 1);
        let dayOfWeek = date.getDay();
        const daysUntilSunday = (7 - dayOfWeek) % 7;
        date.setDate(date.getDate() + daysUntilSunday);
        return date.getDate(); // first sunday
    }

    for (const month in expenses) {
        const [year, monthIndex] = month.split('-').map(Number);
        let expensesUpToSunday = [];
        const firstSunday = getFirstSunday(year, monthIndex);

        // collect all expenses until first sunday
        for (const day in expenses[month]) {
            if (Number(day) <= firstSunday) {
                for (const category in expenses[month][day]) {
                    expensesUpToSunday = expensesUpToSunday.concat(expenses[month][day][category]);
                }
            }
        }

        // if has any expense calculate median
        if (expensesUpToSunday.length > 0) {
            expensesUpToSunday.sort((a, b) => a - b);
            const mid = Math.floor(expensesUpToSunday.length / 2);
            if (expensesUpToSunday.length % 2 === 0) {
                result = (expensesUpToSunday[mid - 1] + expensesUpToSunday[mid]) / 2;
            } else {
                result = expensesUpToSunday[mid];
            }
        }
    }

    return result;
}

console.log(solution1(expenses));






function solution2(expenses) {
    let result = null;

    // first sunday of month
    function getFirstSunday(year, month) {
        const date = new Date(year, month - 1, 1);
        let dayOfWeek = date.getDay();
        const daysUntilSunday = (7 - dayOfWeek) % 7;
        date.setDate(date.getDate() + daysUntilSunday);
        return date.getDate();
    }


// I used the quickselect function in the solution 2. It is function is a derivative of the QuickSort algorithm and is used to quickly find the k'th smallest element in array. 

// I will explain quickselects' working steps: 

    function quickselect(arr, k) {
        if (arr.length === 1) return arr[0]; //if has a only one element, will return that element

        const pivot = arr[Math.floor(Math.random() * arr.length)]; //pivot selection
        const left = arr.filter(x => x < pivot); // keep the ones smaller than the pivot on the left

        const right = arr.filter(x => x > pivot); // keep the ones bigger than the pivot on the right

        const pivotCount = arr.filter(x => x === pivot).length; //define there are how many pivot

        

        if (k < left.length) {
            return quickselect(left, k); // if k is smaller than the number of element on the left, looking at the left
        } else if (k < left.length + pivotCount) {
            return pivot;
        } else {
            return quickselect(right, k - left.length - pivotCount);
        }
    }

    for (const month in expenses) {
        const [year, monthIndex] = month.split('-').map(Number);
        let expensesUpToSunday = [];
        const firstSunday = getFirstSunday(year, monthIndex);

        
        for (const day in expenses[month]) {
            if (Number(day) <= firstSunday) {
                for (const category in expenses[month][day]) {
                    expensesUpToSunday = expensesUpToSunday.concat(expenses[month][day][category]);
                }
            }
        }

      
        if (expensesUpToSunday.length > 0) {
            const mid = Math.floor(expensesUpToSunday.length / 2);
            if (expensesUpToSunday.length % 2 === 0) {
               // if number is even find the average of two middle elements
                const lower = quickselect(expensesUpToSunday, mid - 1);
                const upper = quickselect(expensesUpToSunday, mid);
                result = (lower + upper) / 2;
            } else {
                // if number is Odd directly find the middle element
                result = quickselect(expensesUpToSunday, mid);
            }
        }
    }

    return result;
}

console.log(solution2(expenses));
