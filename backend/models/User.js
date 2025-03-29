import mongoose from "mongoose";

const dbURI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);

    console.log("✅ MongoDB Connected Successfully");

    // Ensure at least one collection exists (MongoDB creates the DB only when a collection is added)
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log("⚠️ Database is empty. Creating an initial collection...");
      await mongoose.connection.db.createCollection("initCollection"); // Dummy collection
      console.log("✅ Database initialized with 'initCollection'.");
    } else {
      console.log("✅ Database already exists with collections.");
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    favorites: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one favorite must be selected",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Export User model
export const User = mongoose.model("User", UserSchema);
