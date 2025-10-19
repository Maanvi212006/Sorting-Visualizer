let array =[];
let delay=0;
let allBars;
function updateArraySize(n)
{
	document.getElementById("sizeValue").innerText = n;
	generateArray(n);
}

let speed = 3;
function updateSortingSpeed(val) {
    document.getElementById("sortingSpeedValue").innerText = val;
    speed = val;
}


function generateArray(n)
{
	array = [];
	for(let i=0; i<n; i++)
	{
		array.push(Math.floor(Math.random() * 100) + 1);
	}
	displayArray(array);
}

function displayArray(array)
{
	let container = document.querySelector(".bars-container");
	container.innerHTML = "";
	array.forEach((value) => {
		let bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.height = (value*3) + "px";
		container.appendChild(bar);
	});
}

function bubbleSort()
{
	allBars = document.querySelectorAll(".bar");
    let temp;
    delay = 0;
    let n=allBars.length;
	for(let i=0; i<n-1; i++)
	{

		for(let j=0; j<n-1-i; j++)
		{
			((j) => {
    setTimeout(() => {
        // highlight bars
        allBars[j].classList.add("compare");
        allBars[j+1].classList.add("compare");
    }, delay);
    setTimeout(() => {

        // read heights NOW, after delay
        let height1 = parseInt(allBars[j].style.height);
        let height2 = parseInt(allBars[j+1].style.height);

        // swap if needed
        if(height1 > height2){
            let temp = allBars[j].style.height;
            allBars[j].style.height = allBars[j+1].style.height;
            allBars[j+1].style.height = temp;
        }
    }, delay+250);
setTimeout(() => {
        allBars[j].classList.remove("compare");
        allBars[j+1].classList.remove("compare");

    }, delay+500);
})(j);

delay += 1000/speed; 

				 
		}
		setTimeout(() => {
    		allBars[n-1-i].style.backgroundColor = "green";
				}, delay);  


	}
	setTimeout(() => {
    for(let k = 0; k < n; k++){
        allBars[k].style.backgroundColor = '#0047AB';
    }
}, delay); 

}
window.onload = () => {
    
    let defaultSize = document.getElementById("sizeSlider").value;
    generateArray(defaultSize);
};

let animations = [];


function startMergeSort() {
    allBars = document.querySelectorAll(".bar");
    let array = Array.from(allBars).map(bar => parseInt(bar.style.height));

    animations = []; 
    delay = 0;

    generateMergeSortAnimations(array, 0, array.length - 1);
    playAnimations(array);
}

// Generate all animations for merge sort
function generateMergeSortAnimations(array, l, r) {
    if (l >= r) return;

    const mid = Math.floor((l + r) / 2);
    generateMergeSortAnimations(array, l, mid);
    generateMergeSortAnimations(array, mid + 1, r);
    merge(array, l, mid, r);
}


function merge(array, l, mid, r) {
    let i = l;
    let j = mid + 1;
    const temp = [];

    while (i <= mid && j <= r) {
        animations.push({ type: 'compare', indices: [i, j] });

        if (array[i] <= array[j]) {
            temp.push(array[i]);
            animations.push({ type: 'overwrite', index: l + temp.length - 1, height: array[i] });
            i++;
        } else {
            temp.push(array[j]);
            animations.push({ type: 'overwrite', index: l + temp.length - 1, height: array[j] });
            j++;
        }
    }

    while (i <= mid) {
        temp.push(array[i]);
        animations.push({ type: 'overwrite', index: l + temp.length - 1, height: array[i] });
        i++;
    }

    while (j <= r) {
        temp.push(array[j]);
        animations.push({ type: 'overwrite', index: l + temp.length - 1, height: array[j] });
        j++;
    }

    // Copy temp back to array
    for (let k = 0; k < temp.length; k++) {
        array[l + k] = temp[k];
        animations.push({ type: 'final', index: l + k, height: temp[k] });
    }
}

// Play animations one by one
function playAnimations(array) {
    animations.forEach((action, i) => {
        setTimeout(() => {
            if (action.type === 'compare') {
                const [a, b] = action.indices;
                allBars[a].style.backgroundColor = 'red';
                allBars[b].style.backgroundColor = 'red';
                setTimeout(() => {
                    allBars[a].style.backgroundColor = '';
                    allBars[b].style.backgroundColor = '';
                }, 150);
            } else if (action.type === 'overwrite') {
                allBars[action.index].style.height = action.height + 'px';
                allBars[action.index].style.backgroundColor = 'green';
            } else if (action.type === 'final') {
                allBars[action.index].style.height = action.height + 'px';
                allBars[action.index].style.backgroundColor = '#0047AB';
            }
        }, i * 1000/speed);
    });
}

function insertionSort() {
    const allBars = document.querySelectorAll(".bar");
    const heights = Array.from(allBars).map(bar => parseInt(bar.style.height));
    delay = 0;

    for (let i = 1; i < heights.length; i++) {
        let temp = heights[i];
        let j = i - 1;

        ((i) => {
            setTimeout(() => {
                allBars[i].style.backgroundColor = 'yellow';
            }, delay);
        })(i);

        delay += 1000 / speed;

        while (j >= 0 && heights[j] > temp) {
            heights[j + 1] = heights[j];

            ((j) => {
                setTimeout(() => {
                    allBars[j].style.backgroundColor = "red";
                    allBars[j + 1].style.height = allBars[j].style.height;
                    setTimeout(() => {
                        allBars[j].style.backgroundColor = "#0047AB";
                    }, 200);
                }, delay);
            })(j);

            j--;
            delay += 1000 / speed;
        }

        heights[j + 1] = temp;

        ((j, temp) => {
            setTimeout(() => {
                allBars[j + 1].style.height = temp + "px";
                allBars[j + 1].style.backgroundColor = 'green';
                setTimeout(() => {
                    allBars[j + 1].style.backgroundColor = "#0047AB";
                }, 400);
            }, delay);
        })(j, temp);

        delay += 1000 / speed;
    }

    // Final blue pass
    for (let i = 0; i < allBars.length; i++) {
        setTimeout(() => {
            allBars[i].style.backgroundColor = '#0047AB';
        }, delay);
        delay += 1000 / speed;
    }
}
