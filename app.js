//creating module patterns
//with IIFE's

//BUDGET
var budgetController = (function () {
    //add code here
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allitems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            //            ID = 0;
            //creating the new ID

            if (data.allitems[type].length == 0) {
                ID = 0;
            } else {
                ID = data.allitems[type][data.allitems[type].length - 1].id + 1;
            }

            //creating the new item
            if (type === 'inc') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'exp') {
                newItem = new Income(ID, des, val);
            }
            data.allitems[type].push(newItem);

            //return the new item
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    };

})();


//UI
var uiController = (function () {
    //add code later

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };


    return {
        inputdata: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                des: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
            
        addListItem : function(obj, type){
            //create html text with place holder
            var html;
            
            
            if(type === 'inc') {
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
            }
            else if(type === 'exp'){
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
            }
            //replace placeholder text with actual data
            
            
        },
        
        getDOMstrings: function () {
            return DOMstrings;
        }
    }


})();




//GLOBAL 
var controller = (function (budgetctrl, uictrl) {
    //add code later
    //add__btn

    var setupEventListeners = function () {

        var DOM = uictrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', function () {
            //call ctrlAddItem
            ctrlAddItem();

        });

        //creating a keypress event
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) { //which for older browsers
                //call ctrlAddItem
                ctrlAddItem();


            }
        });
    };


    //function to avoid repetition + add item
    var ctrlAddItem = function () {

        var entries, newItem;

        //get input data from the field
        entries = uictrl.inputdata();
        //        console.log(entries);

        //add to budget controller
        newItem = budgetctrl.addItem(entries.type, entries.des, entries.value);

        //add the item to UI
        //calculate budget
        //display on UI
    }

    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    };

})(budgetController, uiController);

controller.init();

//modules created
//setting up event listeners
