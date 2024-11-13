'use server';

import { AddressProps } from '@/utils/types';
import { revalidatePath } from 'next/cache';

export async function updateAddress(address: AddressProps) {
  try {
    revalidatePath('/addresses');
    return { success: true };
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
} 