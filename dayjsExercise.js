import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



    /*
        let array = [2];
        function minMaxFunction(array) {
            let min = array[0];
            let max = array[0];
            let array2 = [];
            if (array.length === null) {
                min = null;
                max = null;
            }
            if (array.length === 1) {
                min = array[0];
                max = array[0];
            }
            for (let i = 1; i < array.length; i++) {
                if (array[i] < min) {
                    min = array[i];
    
                }
    
                if (array[i] > max) {
                    max = array[i];
                }
    
    
    
                array2.push(min);
                array2.push(max);
    
    
    
    
            }
            console.log(array2);
    
    
        }
    
        minMaxFunction(array);
        // the below function is to display how many each value are there in this array
        */
    // let array = [
    //     'apple', 'banana', 'cherry', 'date',
    //     'elderberry', 'banana', 'banana',
    //     'apple', 'cherry', 'cherry', 'cherry'
    // ];

    // let counts = {};

    // for (let item of array) {
    //     counts[item] = (counts[item] || 0) + 1;
    // }

    // console.log(counts);



    let array = [
        'apple', 'banana', 'cherry', 'date',
        'elderberry', 'banana', 'banana',
        'apple', 'cherry', 'cherry', 'cherry'
    ];
    let nonDoubledArray = [];
    let counts = {};
    for (let item of array) {
        if (!nonDoubledArray.includes(item)) {
            nonDoubledArray.push(item);
        }

    }
    console.log(nonDoubledArray);

    let autoplayin = true;

    if (!autoplayin) {
        console.log("Not autoplaying");

    }

    const today = dayjs();
    let deliveryDate = today.add(7, 'days');
    let dateString = deliveryDate.format('dddd , MMMM D');
    if(dateString.includes('Thursday')){
        deliveryDate = today.add(1,'days');
        dateString = deliveryDate.format('dddd , MMMM D');
    }
    console.log(dateString);
    