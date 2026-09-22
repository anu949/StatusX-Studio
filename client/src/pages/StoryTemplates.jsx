import {
  Link,
} from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import templates from "../data/templates";

function StoryTemplates() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <nav className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Sparkles
              size={22}
              className="text-green-400"
            />

            <h1 className="text-2xl font-bold text-green-400">
              StatusX Studio
            </h1>

          </div>

          <Link
            to="/dashboard"
            className="border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl text-slate-300 hover:text-white transition"
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-5">

            <Sparkles size={16} />

            Creative Story Studio

          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Template
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose a design, upload your photo,
            personalize your message, and create
            a ready-to-share story.
          </p>

        </div>

        {/* TEMPLATE GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {templates.map(
            (template) => (
              <div
                key={template.id}
                className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-green-500/60 hover:-translate-y-1 transition-all duration-300"
              >

                {/* PREVIEW */}

                <div
                  className={`relative h-[390px] bg-gradient-to-br ${template.background} overflow-hidden`}
                >

                  {/* Glow */}

                  <div className="absolute inset-0 bg-white/5" />

                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

                  <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-black/10 rounded-full blur-3xl" />

                  {/* Story preview */}

                  <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

                    <div className="text-6xl mb-6 drop-shadow-lg">
                      {template.emoji}
                    </div>

                    <div className="text-white/80 text-xs uppercase tracking-[0.25em] mb-3">
                      {template.category}
                    </div>

                    <h2 className="text-3xl font-black text-white drop-shadow-lg">
                      {template.name}
                    </h2>

                    <div className="mt-8 w-36 h-52 rounded-2xl border-4 border-white/60 bg-black/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">

                      <div className="text-center">

                        <div className="text-4xl mb-3">
                          📷
                        </div>

                        <div className="text-xs text-white/80">
                          Your Photo
                        </div>

                      </div>

                    </div>

                    <div className="absolute bottom-6 left-0 right-0 text-white/80 text-sm">
                      {template.defaultMessage}
                    </div>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <div className="flex items-center justify-between mb-2">

                    <h2 className="text-xl font-bold">
                      {template.name}
                    </h2>

                    <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">
                      {template.category}
                    </span>

                  </div>

                  <p className="text-slate-400 text-sm leading-6 mb-5 min-h-[72px]">
                    {template.description}
                  </p>

                  <Link
                    to={`/template-editor/${template.id}`}
                    className="group/button flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition"
                  >

                    Use Template

                    <ArrowRight
                      size={18}
                      className="group-hover/button:translate-x-1 transition"
                    />

                  </Link>

                </div>

              </div>
            )
          )}

        </div>

      </main>

    </div>
  );
}

export default StoryTemplates;