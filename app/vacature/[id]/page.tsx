import VacatureClient from './VacatureClient'

// Edge Runtime voor Cloudflare Pages (vereist voor dynamische routes)
export const runtime = 'edge'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VacatureDetail({ params }: PageProps) {
  let vacatureId = ''
  try {
    const resolvedParams = await params
    vacatureId = resolvedParams.id
  } catch (error) {
    console.error('Error resolving params:', error)
  }

  return <VacatureClient vacatureId={vacatureId} />
}
