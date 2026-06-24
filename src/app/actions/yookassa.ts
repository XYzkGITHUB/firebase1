
'use server';

/**
 * @fileOverview Server Action for YooKassa payment integration.
 */

import { crypto } from 'crypto';

export async function createYookassaPayment(amount: number, description: string) {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

  if (!shopId || !secretKey || shopId === 'your_shop_id_here') {
    throw new Error('YooKassa credentials not configured. Please add them to .env');
  }

  // Generate a unique idempotency key for this request
  const idempotenceKey = crypto.randomUUID();

  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      'Idempotence-Key': idempotenceKey,
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64'),
    },
    body: JSON.stringify({
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${siteUrl}/payment-success`,
      },
      capture: true,
      description: description,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('YooKassa Error:', errorData);
    throw new Error(errorData.description || 'Failed to create payment');
  }

  const paymentData = await response.json();
  
  // Return the confirmation URL for redirection
  return {
    confirmationUrl: paymentData.confirmation.confirmation_url,
    paymentId: paymentData.id
  };
}
