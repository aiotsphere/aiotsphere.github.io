import Button from './ui/Button'
import SectionHeading from './ui/SectionHeading'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
      <div className="max-w-3xl">
        <SectionHeading>Build delightful AI experiences</SectionHeading>
        <p className="mt-4 text-gray-700">Starter template showing hero, navbar and button primitives styled with Tailwind.</p>
        <div className="mt-6">
          <Button>Get started</Button>
        </div>
      </div>
    </section>
  )
}
