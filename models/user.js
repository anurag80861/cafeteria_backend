const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
        Validate: {
            Validator: async function (dishId) {
                const dishExists = await mongoose.model('Dish').exists({ _id: dishId })
                return dishExists
            },
            message: 'Invalid Dish reference'
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Customer', 'Merchant', 'Admin'], required: true },
    cart: { type: [CartItemSchema] }
})

const User = mongoose.model('User', userSchema);

module.exports=User