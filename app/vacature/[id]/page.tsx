import { vacatures } from '@/data/vacatures'
import VacatureClient from './VacatureClient'

// Edge Runtime voor Cloudflare Pages
export const runtime = 'edge'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VacatureDetail({ params }: PageProps) {
  const { id } = await params
  const vacature = vacatures[id]

  return <VacatureClient vacature={vacature} vacatureId={id} />
}
