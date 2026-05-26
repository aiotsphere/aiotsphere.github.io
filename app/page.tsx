import Hero from '../components/Hero'

export default function Page() {
  return (
    <>
      <Hero />
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Sample content</h2>
        <p className="mt-4 text-muted-foreground">This project demonstrates the layout and component primitives.</p>
      </section>
    </>
  )
}
