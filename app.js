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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allitems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allitems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function () {
            //calculate total income + expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate budget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //percentage   
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage

            };
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
        inputBtn: '.add__btn',
        expensesContainer: '.expenses__list',
        incomeContainer: '.income__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentagesLabel: '.budget__expenses--percentage'
    };


    return {
        inputdata: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                des: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            //create html text with place holder
            var html, newHtml, element;


            if (type === 'inc') {

                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {

                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearInputFields: function () {

            var fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });

            //to change the focus
            fieldsArray[0].focus();
        },

        displayBudegt: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;


            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentagesLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentagesLabel).textContent = '--';
            }

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


    //make changes in the top part
    var updateBudget = function () {
        //calculate budget
        budgetctrl.calculateBudget();

        //return budget
        var budget = budgetctrl.getBudget();
        //        console.log(budget);
        //display on UI
        uictrl.displayBudegt(budget);

    };



    //function to avoid repetition + add item
    var ctrlAddItem = function () {

        var entries, newItem;

        //get input data from the field
        entries = uictrl.inputdata();
        //        console.log(entries);

        if (entries.des != "" && !isNaN(entries.value) && entries.value > 0) {
            //add to budget controller
            newItem = budgetctrl.addItem(entries.type, entries.des, entries.value);

            //add the item to UI

            uictrl.addListItem(newItem, entries.type);

            //clear the fields
            uictrl.clearInputFields();

            //calculate the budget
            updateBudget();
        }
    }

    return {
        init: function () {
            console.log('App has started');
            uictrl.displayBudegt({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    };

})(budgetController, uiController);

controller.init();

//modules created
//setting up event listeners
