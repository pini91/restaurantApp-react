import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URL || process.env.DB_STRING
  if (!uri) throw new Error('MONGO_URL is not defined in environment variables')
  
  await mongoose.connect(uri)
  console.log('MongoDB connected successfully')
  console.log('Database:', mongoose.connection.db?.databaseName)
  console.log('Host:', mongoose.connection.host)
}
