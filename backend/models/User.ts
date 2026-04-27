import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password: string
  comparePassword(candidatePassword: string, cb: (err: Error | null, isMatch: boolean) => void): void
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: (err: Error | null, isMatch: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err ?? null, isMatch)
  })
}

export default mongoose.model<IUser>('User', UserSchema)
