import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 6,
        maxLength: 100
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be greater than 0'],
        max: [1000, 'Price must be less than 1000']
    },
    currency:{
        type: String,
        enum: ['USD', 'RWF', 'GBP', 'EUR'],
        default: 'USD'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category:{
        type: String,
        enum: ['Entertainment', 'Sports', 'Finance', 'Education', 'Health', 'Politics']
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: function(value) {   // ✅ regular function
                return value <= new Date();
            },
            message: 'Starting date must be in the past'
        }
    },
    renewalDate:{
        type: Date,
        validate:{
            validator: function(value) {   // ✅ regular function
                return value > this.startDate;
            },
            message: 'Renewal date must be after the starting date'
        }
    },
    user:{                                 // ✅ lowercase to match controller
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    }
},
{
    timestamps: true
});

// ✅ Regular function so `this` works correctly
// Option 1 - rename parameter to avoid confusion
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;