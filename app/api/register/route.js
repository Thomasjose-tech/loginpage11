import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { firstName, lastName, username, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('YOUR_DB_NAME');
  const users = db.collection('users');

  // Check if username already exists
  const existingUser = await users.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user
  await users.insertOne({
    firstName,
    lastName,
    username,
    password: hashedPassword
  });

  return NextResponse.json({ message: 'Registration Successful' });
}
