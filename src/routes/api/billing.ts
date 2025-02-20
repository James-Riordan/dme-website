import { PUBLIC_BILLING_API_URL } from '$env/static/public';


export async function createCustomer(data: any) {
  const response = await fetch(`${PUBLIC_BILLING_API_URL}/api/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }

  return response.json();
}
