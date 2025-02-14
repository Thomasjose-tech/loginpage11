import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { username, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('YOUR_DB_NAME');
  const users = db.collection('users');

  // Find user by username
  const user = await users.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login Successful' });
}
