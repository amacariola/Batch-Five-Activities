/*************************************************/
/*        Avion School Coding Challenge          */
/*    Create a bookstore app with Javascript     */
/*          Coded by: Macariola Ace H.           */
/*         Github: github.com/amacariola         */
/*************************************************/

let store = {
    store: "Ace Books",
    inventoryList: [],
    earnings: 0,
}

let book = {
    title: undefined,
    quantity: undefined,
    value: undefined,
}

/****************************************************/
/*               MAIN JS FILE                       */
/****************************************************/


function addBook(title, quantity, value) {
    let check = store.inventoryList.some(function (el) {
        return el.title === title;
    });
    if (check === false) {
        let books = Object.create(book);
        books.title = title;
        books.quantity = quantity;
        books.value = value;
        store.inventoryList.push(books);
        console.log('Book added');
    }
    else {
        console.log('Book already added to inventory');
    }

}

function restockBook(title, quantity) {
    let check = store.inventoryList.some(function (el) {
        return el.title === title;
    });
    let ctitle = store.inventoryList.filter((book) => book.title === title);
    if (check === true) {
        for (let i = 0; i < ctitle.length; i++) {
            ctitle[i].quantity += quantity;
            console.log('[+]Book restocked');
        }
    } else {
        console.log('Book doesnt exist in invoentory');
    }
}

function sellBook(title, quantity) {
    for (let i = 0; i < store.inventoryList.length; i++) {
        if (store.inventoryList[i].title === title) {
            if (store.inventoryList[i].quantity === 0) {
                console.log('[-]Uh oh, book seems out of stock already :c');
            }
            else if (store.inventoryList[i].quantity < quantity) {
                console.log(`[-]only ${store.inventoryList[i].quantity} left on stock`);
            }
            else {
                store.inventoryList[i].quantity -= quantity;
                addEarnings(store.inventoryList[i].value * quantity);
                console.log('Purchase Successful');
            }
        }
    }
}


function addEarnings(points) {
    store.earnings += points;
}

function totalEarnings() {
    console.log(`total:${store.earnings} PHP`);
}

// End of bookstore.js file

/* Some tests lol 
console.log(addBook('HTML', 3, 3));
console.log(addBook('CSS', 3, 3));
console.log(addBook('JS', 3, 3));
console.log(addBook('HTML', 3, 3));
console.log(restockBook('HTML', 3));
console.log(sellBook('HTML', 4));
totalEarnings();
console.log(store.inventoryList);
*/


