import { NotFoundError } from "elysia";
import { parse } from "valibot";
import bcrypt from "bcrypt";
import { connectDB } from "@utils/db/database";
import { ObjectId } from "mongodb";
import type { User } from "@models/users";
import { PartialUserSchema, UserSchema } from "@models/users";

const db = await connectDB();
const usersCollection = db.collection("users");

export async function getAllUsers(status: Number | string) {
  try {
    const users = await usersCollection.find().toArray();

    if (!users) {
      throw new NotFoundError("Users not found.");
    }

    return users;
  } catch (error: unknown) {
    return { status, error: `🔥 ${error}` };
  }
}

export async function signUpUser(body: unknown, status: Number | string) {
  try {
    const { email, password } = parse(UserSchema, body);

    if (email && password) {
      const userExist = await usersCollection.findOne({ email: email });

      if (userExist) {
        return { error: "User already exist" };
      }

      const user = body as User;

      const hashedPassword = await bcrypt.hash(user.password, 10);

      user.password = hashedPassword;
      user.active = true;
      user.createDate = new Date();

      const result = await usersCollection.insertOne(user);
      return { message: "Success", userId: result.insertedId };
    }
  } catch (error: unknown) {
    status = 400;
    return { status, error: `🔥 ${error}` };
  }
}

export async function signInUser(body: unknown, status: Number | string) {
  try {
    const { email, password } = parse(UserSchema, body);

    if (email && password) {
      const userExist = await usersCollection.findOne({ email: email });

      if (!userExist) {
        status = 401;
        return { error: "Invalid email or password" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!isPasswordValid) {
        status = 401;
        return { error: "Invalid email or password" };
      }

      if (!userExist.active) {
        return { error: "This user is not active" };
      }

      ///    const token = jwt.sign({ userId: userExist._id }, JWT_SECRET);

      return { message: "Login successful", userExist };
    }
  } catch (error: unknown) {
    status = 400;
    return { status, error: `🔥 ${error}` };
  }
}

export async function getUserById(id: string, status: Number | string) {
  try {
    const result = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new NotFoundError("User not found.");
    }

    return { message: "Success", result };
  } catch (error: unknown) {
    status = 400;
    return { status, error: `🔥 ${error}` };
  }
}

export async function deleteUserById(id: string, status: Number | string) {
  try {
    const result = await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new NotFoundError("User not found.");
    }

    return { message: "User deleted", result };
  } catch (error: unknown) {
    return { status, error: `🔥 Error: ${error}` };
  }
}

export async function updateUserStatusById(
  id: string,
  status?: number | string
) {
  try {
    const objectId = new ObjectId(id);

    const user = await usersCollection.findOne({ _id: objectId });

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const newStatus = !user.active;

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: objectId },
      { $set: { active: newStatus } },
      { returnDocument: "after" }
    );

    return { message: "User status updated successfully", user: updatedUser };
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof NotFoundError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { status: status ?? 500, error: `🔥 ${errorMessage}` };
  }
}

export async function updateUserPassword(
  body: unknown,
  id: string,
  status?: number | string
) {
  try {
    const objectId = new ObjectId(id);

    const validatedBody = parse(PartialUserSchema, body);

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: objectId },
      { $set: { password: validatedBody.password } },
      { returnDocument: "after" }
    );

    return { message: "User status updated successfully", user: updatedUser };
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";

    if (error instanceof NotFoundError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { status: status ?? 500, error: `🔥 ${errorMessage}` };
  }
}
