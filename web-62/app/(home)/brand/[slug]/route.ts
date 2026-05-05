import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const page = searchParams.get('page') || '1';
    return NextResponse.json({page})
}