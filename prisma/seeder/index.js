import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as fs from "fs/promises";

const prisma = new PrismaClient();
const path = "prisma/seeder/data";

async function seedDatabase() {
  let files = [];

  try {
    files = await fs.readdir(path);
  } catch (error) {
    console.error("ERR(read seeder data):", error);
    return;
  }

  try {
    for (let file of files) {
      const jsonFile = await fs.readFile(path + "/" + file, "utf8");
      const data = JSON.parse(jsonFile);

      // Extract the model name based on the file name
      const modelName = file.split("_")[1].split(".")[0]; // Assuming file is like '100_app.json'
      console.log("Model Name:", modelName); // Log the model name for debugging

      // Process the data and hash passwords if necessary
      for (const dat of data) {
        const keys = Object.keys(dat);
        if (keys.includes("password")) {
          const salt = await bcrypt.genSalt();
          dat["password"] = await bcrypt.hash(dat["password"], salt);
        }

        try {
          // Dynamically access the model in Prisma
          if (prisma[modelName]) {
            await prisma[modelName].create({
              data: dat,
            });
            console.log("DONE: seed " + file);
          } else {
            console.warn(`Model "${modelName}" not found in Prisma schema. Skipping.`);
          }
        } catch (error) {
          if (error.code === "P2002") {
            console.warn(
              `ERR(seed): Unique constraint violation on ${file} (SKIPPED)`
            );
          } else {
            throw error;
          }
        }
      }
    }
  } catch (error) {
    console.error("ERR(seed):", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
