const createBiller = ({description, category, amount}) => ({
    description,
    category,
    amount,
  });

const removeBiller = (bills, id) => {
    return bills.filter(bill => {
        return bill.id !== id
    })
}

const initialState =  [
    {
        id: 1,
        description: "Dominoes",
        category: "FoodNDining",
        amount: 430,
        date: "01-02-2020"
    }, {
        id: 2,
        description: "Car wash",
        category: "utility",
        amount: 500,
        date: "01-06-2020"
    }, {
        id: 3,
        description: "Amazon",
        category: "shopping",
        amount: 2030,
        date: "01-07-2020"
    }, {
        id: 4,
        description: "House rent",
        category: "Food & Dining",
        amount: 35900,
        date: "01-03-2020"
    }, {
        id: 5,
        description: "Tuition",
        category: "education",
        amount: 2200,
        date: "01-12-2020"
    }, {
        id: 6,
        description: "Laundry",
        category: "Personal Care",
        amount: 320,
        date: "01-14-2020"
    }, {
        id: 7,
        description: "Vacation",
        category: "Travel",
        amount: 3430,
        date: "01-18-2020"
    }
]

const reducer = (state = [...initialState], action) => {
    const { type, payload } = action
    switch (type) {
        case "ADD_BILL":
            return [...state, createBiller(payload)];
        case "REMOVE_BILL":
            return removeBiller(state, payload.id)
        default:
            return state;
    }
}
 
export default reducer;