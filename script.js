document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById("array");

    function clearArray() {
        container.innerHTML = "";
    }

    // Function to generate the array of blocks from user input
    window.getUserArray = function() {
        clearArray();
        var input = document.getElementById("userInput").value;
        var array = input.split(',').map(Number);
        generateArray(array);
        BubbleSort();
    };

    // Function to generate the array of blocks
    function generateArray(arr) {
        var maxVal = Math.max(...arr);
        var containerHeight = container.clientHeight;

        for (var i = 0; i < arr.length; i++) {
            var value = arr[i];

            var array_ele = document.createElement("div");
            array_ele.classList.add("block");

            var height = (value / maxVal) * containerHeight;

            array_ele.style.height = `${height}px`;
            array_ele.style.transform = `translate(${i * 30}px)`;

            var array_ele_label = document.createElement("label");
            array_ele_label.classList.add("block_id");
            array_ele_label.innerText = value;

            array_ele.appendChild(array_ele_label);
            container.appendChild(array_ele);
        }
    }

    // Promise to swap two blocks
    function swap(el1, el2) {
        return new Promise((resolve) => {
            var temp = el1.style.transform;
            el1.style.transform = el2.style.transform;
            el2.style.transform = temp;

            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    container.insertBefore(el2, el1);
                    resolve();
                }, 250);
            });
        });
    }

    // Asynchronous BubbleSort function
    async function BubbleSort(delay = 100) {
        var blocks = document.querySelectorAll(".block");

        for (var i = 0; i < blocks.length; i += 1) {
            for (var j = 0; j < blocks.length - i - 1; j += 1) {
                blocks[j].style.backgroundColor = "#FF4949";
                blocks[j + 1].style.backgroundColor = "#FF4949";

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );

                var value1 = Number(blocks[j].childNodes[0].innerHTML);
                var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

                if (value1 > value2) {
                    await swap(blocks[j], blocks[j + 1]);
                    blocks = document.querySelectorAll(".block");
                }

                blocks[j].style.backgroundColor = "#6b5b95";
                blocks[j + 1].style.backgroundColor = "#6b5b95";
            }

            blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
        }
    }
});
