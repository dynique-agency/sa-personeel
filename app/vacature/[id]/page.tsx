import VacatureClient from './VacatureClient'
import { vacatures } from '@/data/vacatures'

// Pre-generate all vacancy pages at build time
export async function generateStaticParams() {
  return Object.keys(vacatures).map((id) => ({
    id: id,
  }))
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VacatureDetail({ params }: PageProps) {
  const { id } = await params
  return <VacatureClient vacatureId={id} />
}
