import fetch from 'node-fetch'

const baseUrl = 'https://www.4byte.directory/api/v1'

export async function searchSignature(hexSignature: string) {
  const response = await fetch(`${baseUrl}/signatures/?hex_signature=${hexSignature}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  return data.results
    .sort((a: any, b: any) => a.id - b.id)
    .map((result: any) => result.text_signature)
}
