import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronRight,
  Eye,
  ImagePlus,
  LayoutTemplate,
  Play,
  Rocket,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <nav className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Camera size={21} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                StatusX <span className="text-green-400">Studio</span>
              </h1>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">
                Create • Customize • Share
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white font-medium"
            >
              Home
            </Link>

            <Link
              to="/templates"
              className="text-slate-400 hover:text-white transition"
            >
              Templates
            </Link>

            <Link
              to="/feed"
              className="text-slate-400 hover:text-white transition"
            >
              Stories
            </Link>

            <Link
              to="/dashboard"
              className="text-slate-400 hover:text-white transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Navbar CTA */}
          <Link
            to="/templates"
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-green-500/20"
          >
            <Rocket size={17} />
            Create Story
          </Link>

        </div>
      </nav>


      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative">

        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="relative z-10">

              {/* Small badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-7">
                <Sparkles size={15} />
                Creative Story Studio
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight">
                CREATE.
                <br />

                <span className="text-green-400">
                  CUSTOMIZE.
                </span>

                <br />

                SHARE.
              </h1>

              <p className="mt-7 text-lg text-slate-400 max-w-xl leading-relaxed">
                Turn your favorite moments into beautiful stories.
                Choose a template, add your photos, personalize your
                message, and publish in seconds.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-9">

                <Link
                  to="/templates"
                  className="group flex items-center gap-3 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-7 py-4 rounded-2xl transition shadow-xl shadow-green-500/20"
                >
                  <WandSparkles size={19} />

                  Create Your Story

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </Link>

                <Link
                  to="/feed"
                  className="flex items-center gap-3 border border-slate-700 hover:border-slate-500 bg-white/5 px-7 py-4 rounded-2xl font-semibold transition"
                >
                  <Play size={17} />
                  Explore Stories
                </Link>

              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8 mt-12">

                <div>
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-sm text-slate-500">Templates</p>
                </div>

                <div className="w-px bg-slate-800" />

                <div>
                  <p className="text-2xl font-bold">1080p</p>
                  <p className="text-sm text-slate-500">Story Quality</p>
                </div>

                <div className="w-px bg-slate-800" />

                <div>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-sm text-slate-500">Story Lifetime</p>
                </div>

              </div>

            </div>


            {/* =====================================================
                STORY PHONE PREVIEW
            ===================================================== */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Decorative glow */}
              <div className="absolute w-80 h-80 bg-green-500/20 blur-[100px] rounded-full" />

              {/* Phone */}
              <div className="relative w-[290px] sm:w-[320px]">

                {/* Phone outer */}
                <div className="rounded-[42px] border-[7px] border-slate-700 bg-black shadow-2xl shadow-black/60 p-2">

                  {/* Screen */}
                  <div className="relative aspect-[9/18.5] rounded-[32px] overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900">

                    {/* Fake status bar */}
                    <div className="absolute top-0 left-0 right-0 px-5 pt-4 flex justify-between text-[10px] text-white/80">
                      <span>9:41</span>
                      <span>● ● ●</span>
                    </div>

                    {/* Story header */}
                    <div className="absolute top-10 left-4 right-4 flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-300 to-green-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <Camera size={15} />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold">
                          StatusX Studio
                        </p>
                        <p className="text-[9px] text-white/60">
                          Just now
                        </p>
                      </div>

                    </div>

                    {/* Main story content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">

                      <div className="w-28 h-28 rounded-3xl border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center mb-7 shadow-2xl">
                        <ImagePlus
                          size={48}
                          className="text-white/90"
                          strokeWidth={1.5}
                        />
                      </div>

                      <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-3">
                        Your Story
                      </p>

                      <h2 className="text-3xl font-black leading-tight">
                        Your Moments.
                        <br />
                        Your Style.
                      </h2>

                      <div className="mt-5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs">
                        Made with StatusX
                      </div>

                    </div>

                    {/* Bottom story controls */}
                    <div className="absolute bottom-5 left-5 right-5">

                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-1 flex-1 rounded-full bg-white" />
                        <div className="h-1 flex-1 rounded-full bg-white/30" />
                        <div className="h-1 flex-1 rounded-full bg-white/30" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/70">
                          StatusX Studio
                        </span>

                        <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center">
                          <ArrowRight size={15} />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -left-16 top-28 hidden sm:flex items-center gap-3 bg-slate-900/95 border border-slate-700 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl">

                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Check size={18} className="text-green-400" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Story Ready
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Published successfully
                    </p>
                  </div>

                </div>

                {/* Floating template card */}
                <div className="absolute -right-12 bottom-28 hidden sm:flex items-center gap-3 bg-slate-900/95 border border-slate-700 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl">

                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <LayoutTemplate size={17} className="text-purple-400" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Beautiful Templates
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Ready to customize
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="border-y border-white/5 bg-slate-900/40">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest">
              Simple workflow
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Create in three steps.
            </h2>

            <p className="text-slate-400 mt-5">
              No complicated editing tools. Just choose, customize,
              and share.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-14">

            {/* Step 1 */}
            <div className="group bg-slate-950 border border-slate-800 hover:border-green-500/40 rounded-3xl p-8 transition">

              <div className="flex items-center justify-between">

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <LayoutTemplate
                    size={27}
                    className="text-green-400"
                  />
                </div>

                <span className="text-5xl font-black text-slate-800">
                  01
                </span>

              </div>

              <h3 className="text-xl font-bold mt-7">
                Choose a Template
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Pick from beautiful festive, celebration,
                friendship, birthday, and memory templates.
              </p>

            </div>


            {/* Step 2 */}
            <div className="group bg-slate-950 border border-slate-800 hover:border-purple-500/40 rounded-3xl p-8 transition">

              <div className="flex items-center justify-between">

                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <WandSparkles
                    size={27}
                    className="text-purple-400"
                  />
                </div>

                <span className="text-5xl font-black text-slate-800">
                  02
                </span>

              </div>

              <h3 className="text-xl font-bold mt-7">
                Customize
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Upload your photo and personalize your name,
                message, and story design.
              </p>

            </div>


            {/* Step 3 */}
            <div className="group bg-slate-950 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-8 transition">

              <div className="flex items-center justify-between">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Rocket
                    size={27}
                    className="text-blue-400"
                  />
                </div>

                <span className="text-5xl font-black text-slate-800">
                  03
                </span>

              </div>

              <h3 className="text-xl font-bold mt-7">
                Publish & Share
              </h3>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Generate your final story, publish it, and
                let your friends experience your moment.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest">
              Built for creativity
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Everything you need to make
              <span className="text-green-400"> better stories.</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-relaxed max-w-xl">
              StatusX Studio combines ready-made designs with a
              simple editing workflow so anyone can create
              polished social stories without professional design skills.
            </p>

            <div className="mt-9 space-y-5">

              <div className="flex gap-4">

                <div className="w-10 h-10 shrink-0 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Zap size={18} className="text-green-400" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Fast story creation
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Go from photo to publish-ready story in seconds.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-purple-400" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Beautiful designs
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Professionally inspired templates for every occasion.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Eye size={18} className="text-blue-400" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Story analytics
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Track views and understand how your stories perform.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Right feature card */}
          <div className="relative">

            <div className="absolute inset-0 bg-green-500/10 blur-[80px]" />

            <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[32px] p-8">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <p className="text-sm text-slate-500">
                    Story performance
                  </p>

                  <p className="text-3xl font-bold mt-1">
                    12.5K
                  </p>

                  <p className="text-xs text-green-400 mt-1">
                    Total views
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <Eye size={21} className="text-green-400" />
                </div>

              </div>


              {/* Fake analytics bars */}
              <div className="space-y-5">

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      Stories
                    </span>
                    <span>24</span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-green-500 rounded-full" />
                  </div>
                </div>


                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      Engagement
                    </span>
                    <span>68%</span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-purple-500 rounded-full" />
                  </div>
                </div>


                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      Reactions
                    </span>
                    <span>892</span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-blue-500 rounded-full" />
                  </div>
                </div>

              </div>


              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">

                <div className="flex -space-x-2">

                  <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-slate-950" />
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-slate-950" />
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-slate-950" />

                </div>

                <p className="text-xs text-slate-500">
                  Your stories are reaching people.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          POPULAR TEMPLATES
      ========================================================= */}
      <section className="bg-slate-900/40 border-y border-white/5">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">

            <div>

              <p className="text-green-400 text-sm font-semibold uppercase tracking-widest">
                Explore
              </p>

              <h2 className="text-4xl font-bold mt-2">
                Popular templates
              </h2>

              <p className="text-slate-500 mt-3">
                Start with a design and make it yours.
              </p>

            </div>

            <Link
              to="/templates"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold"
            >
              View all templates
              <ChevronRight size={17} />
            </Link>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

            {/* Template cards */}
            <div className="group rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 aspect-[4/5] relative">

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">

                <div className="text-5xl mb-5">
                  🪔
                </div>

                <h3 className="font-bold text-xl">
                  Diwali
                </h3>

                <p className="text-xs text-white/70 mt-2">
                  Festival of Lights
                </p>

              </div>

              <Link
                to="/templates"
                className="absolute inset-x-4 bottom-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl py-2 text-xs text-center opacity-0 group-hover:opacity-100 transition"
              >
                Use Template
              </Link>

            </div>


            <div className="group rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 aspect-[4/5] relative">

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">

                <div className="text-5xl mb-5">
                  🎂
                </div>

                <h3 className="font-bold text-xl">
                  Birthday
                </h3>

                <p className="text-xs text-white/70 mt-2">
                  Make it special
                </p>

              </div>

              <Link
                to="/templates"
                className="absolute inset-x-4 bottom-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl py-2 text-xs text-center opacity-0 group-hover:opacity-100 transition"
              >
                Use Template
              </Link>

            </div>


            <div className="group rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-pink-500 via-rose-400 to-purple-500 aspect-[4/5] relative">

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">

                <div className="text-5xl mb-5">
                  ❤️
                </div>

                <h3 className="font-bold text-xl">
                  Rakhi
                </h3>

                <p className="text-xs text-white/70 mt-2">
                  Celebrate together
                </p>

              </div>

              <Link
                to="/templates"
                className="absolute inset-x-4 bottom-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl py-2 text-xs text-center opacity-0 group-hover:opacity-100 transition"
              >
                Use Template
              </Link>

            </div>


            <div className="group rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-900 aspect-[4/5] relative">

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">

                <div className="text-5xl mb-5">
                  📸
                </div>

                <h3 className="font-bold text-xl">
                  Memories
                </h3>

                <p className="text-xs text-white/70 mt-2">
                  Keep the moment
                </p>

              </div>

              <Link
                to="/templates"
                className="absolute inset-x-4 bottom-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl py-2 text-xs text-center opacity-0 group-hover:opacity-100 transition"
              >
                Use Template
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="max-w-5xl mx-auto px-6 py-28 text-center">

        <div className="relative">

          <div className="absolute inset-0 bg-green-500/10 blur-[100px]" />

          <div className="relative">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Rocket size={27} className="text-green-400" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mt-7">
              Ready to create your story?
            </h2>

            <p className="text-slate-400 mt-5 max-w-xl mx-auto">
              Choose a template, add your moment, and create something
              worth sharing.
            </p>

            <Link
              to="/templates"
              className="inline-flex items-center gap-3 mt-9 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition shadow-xl shadow-green-500/20"
            >
              <Sparkles size={18} />
              Start Creating
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Camera size={18} className="text-green-400" />
              </div>

              <div>
                <p className="font-bold">
                  StatusX Studio
                </p>

                <p className="text-xs text-slate-600">
                  Your stories. Your style.
                </p>
              </div>

            </div>


            <div className="flex items-center gap-6 text-sm text-slate-500">

              <Link
                to="/templates"
                className="hover:text-white transition"
              >
                Templates
              </Link>

              <Link
                to="/feed"
                className="hover:text-white transition"
              >
                Stories
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-white transition"
              >
                Dashboard
              </Link>

            </div>


            <p className="text-xs text-slate-600">
              © 2026 StatusX Studio
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;