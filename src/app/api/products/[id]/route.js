import dbConnect from '../../../../lib/db';
import Product from '../../../../models/Product';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params; // Next.js 15 requires awaiting params
        const body = await request.json();

        // If img is empty string (not updated), delete it so we don't overwrite with empty
        if (!body.img) {
            delete body.img;
        }

        const product = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedProduct = await Product.deleteOne({ _id: id });

        if (!deletedProduct) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
