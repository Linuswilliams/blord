import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongoose';
import PosApplications from '../../../lib/models/posApplications';

export async function GET(req) {
  try {
    await dbConnect();

    const checkIfApplicationsExists = await PosApplications.find({}).sort({createdAt:-1})

    if(checkIfApplicationsExists.length === 0) return NextResponse.json({
        message: 'Applications not found'
    }, {status:404})

    // Respond with success message
    return NextResponse.json(
      { message: checkIfApplicationsExists },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving POS Application data' }, { status: 500 });
  }
}
