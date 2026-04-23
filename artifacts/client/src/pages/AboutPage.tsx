import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>

        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            My Clothing Brand was born from a simple idea: clothing should be timeless, well-made, and accessible.
            We believe that the best wardrobe is a considered one — fewer, better pieces that work harder and last longer.
          </p>

          <div className="bg-gray-950 text-white rounded-2xl p-8 my-10">
            <p className="text-2xl font-light leading-relaxed italic">
              &quot;We don&apos;t follow trends. We make things worth keeping.&quot;
            </p>
          </div>

          <p>
            Every piece in our collection is designed with intention. We work with suppliers who share our commitment
            to fair labour, sustainable materials, and minimal environmental impact. Our basics are cut generously,
            sewn precisely, and finished with care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: "♻️", title: "Sustainable", desc: "Organic cotton, recycled fibres, and carbon-neutral shipping." },
              { icon: "🤝", title: "Ethical", desc: "Fair wages and safe conditions at every step of our supply chain." },
              { icon: "🎯", title: "Intentional", desc: "Every design decision is purposeful. No fast fashion, no throwaway pieces." },
            ].map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-xl p-6">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-3 font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10">
            We&apos;re a small team based out of a studio, and we genuinely care about the work we put into the world.
            Thank you for being part of it.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
