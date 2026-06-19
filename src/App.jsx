import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  ArrowRight, 
  ChevronRight, 
  Video, 
  BookOpen, 
  Layers, 
  Film, 
  ExternalLink,
  Plus,
  Tv,
  Eye,
  Check,
  Sliders,
  X,
  Star
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Defined Presets B and C for comparison
const presets = {
  b: {
    id: "b",
    name: "Preset B",
    tagline: "Midnight Luxe (Dark Editorial)",
    className: "preset-b",
    heroSans: "Critique meets",
    heroDrama: "Obsession.",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600", // luxury architectural shadows
    philosophyImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    palette: ["#0D0D12 (Obsidian)", "#C9A84C (Champagne)", "#FAF8F5 (Ivory)", "#2A2A35 (Slate)"],
    fontNote: "Space Grotesk headers + Playfair Display drama"
  },
  c: {
    id: "c",
    name: "Preset C",
    tagline: "Brutalist Signal (Raw Precision)",
    className: "preset-c",
    heroSans: "Deconstruct the",
    heroDrama: "Frame.",
    heroImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600", // concrete raw geometry
    philosophyImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1600",
    palette: ["#E8E4DD (Paper)", "#E63B2E (Signal Red)", "#F5F3EE (Off-white)", "#111111 (Black)"],
    fontNote: "Space Grotesk headers + DM Serif Display drama"
  }
};

const videoEssays = [
  {
    id: 1,
    platform: "YOUTUBE",
    series: "Festival Vlog",
    title: "SXSW 2026 Vlog",
    desc: "The SXSW Film & TV Festival has changed FOREVER. I’ve vlogged my journey to South by Southwest every year since 2023, but this SXSW 2026 film festival vlog captures a massive shift in Austin, Texas. Navigating convention center demolitions, discontinued wristbands, and major leadership shakeups, is SXSW 2026 the best or worst festival yet? 🎬",
    date: "March 20, 2026",
    duration: "20 min watch",
    image: "https://img.youtube.com/vi/QyEm-dZ7NM8/maxresdefault.jpg",
    url: "https://youtu.be/QyEm-dZ7NM8"
  },
  {
    id: "obsession-short",
    platform: "YOUTUBE SHORTS",
    series: "Reviews",
    title: "Obsession Spoiler-Free Review",
    desc: "Obsession is the most talked-about horror movie right now, but is it worth the hype? The film follows Bear (Michael Johnston), who uses a supernatural toy (the One Wish Willow) to make his crush Nikki (Inde Navarrette) fall in love with him. But his dream quickly spirals into a terrifying nightmare, proving he should've been careful what he wished for... 👻",
    date: "May 18, 2026",
    duration: "2 min watch",
    image: "https://img.youtube.com/vi/1NURDAkviL0/maxresdefault.jpg",
    url: "https://youtube.com/shorts/1NURDAkviL0"
  },
  {
    id: 2,
    platform: "YOUTUBE",
    series: "Awards Season",
    title: "Oscars 2026 Predictions",
    desc: "The 98th Academy Awards are finally here! I’m predicting every single winner for Oscars 2026 across all 24 categories. From the Best Picture showdown between One Battle After Another and Sinners to the chaotic Best Actor race between Timothée Chalamet and Michael B. Jordan, I’m breaking down the precursors, the locks, and the potential upsets.",
    date: "February 15, 2026",
    duration: "9 min watch",
    image: "https://img.youtube.com/vi/in9InwLroiQ/maxresdefault.jpg",
    url: "https://youtu.be/in9InwLroiQ"
  }
];

const articles = [
  {
    id: 1,
    pub: "HYPERREAL FILM CLUB",
    category: "Published",
    title: "Marty Supreme: Hitting Championship Form",
    desc: "Marty Supreme is a triumph because it serves as a pure extension of Josh Safdie's vision.",
    date: "March 12, 2026",
    readTime: "7 min read",
    image: "https://static1.squarespace.com/static/58a13eba20099eb147e68d26/5db36e0fa26b82005ccedf27/69b2cb5abb9b7551dc5f2374/1773437872253/image5.png?format=1000w",
    url: "https://hyperrealfilm.club/reviews/marty-supreme",
    bgPosition: "bg-[center_5%]",
    content: `Josh Safdie’s transition to solo directing with Marty Supreme is less of a departure and more of a distillation. The frantic, nail-biting anxiety of Uncut Gems and Good Time is repurposed here, trading the high-stakes panic of diamond dealers and bank heists for the obsessive micro-world of competitive table tennis.

Visually, Safdie continues to worship at the altar of celluloid tactility. Marty Supreme is painted in dense, thick film grain and hyper-saturated primaries. The camera moves not with calculated clinical sweeps, but with a chaotic kinetic energy that mimics the rapid back-and-forth bounce of the ball itself. Extreme close-ups dominate: beads of sweat, the rubber grip of the paddle, the intense darting of eyes.

It is a deconstruction of obsession. Table tennis becomes a spiritual battleground. By keeping the focal planes incredibly shallow and locking the frame tightly onto the players' faces, Safdie creates a psychological landscape where the external world dissolves. The only reality is the table, the paddle, and the absolute need to win.`
  },
  {
    id: 2,
    pub: "HYPERREAL FILM CLUB",
    category: "Published",
    title: "Weird Wednesdays: American Hunter (1989)",
    desc: "Is American Hunter a \"bad movie\" on paper? Yes. Is it incredibly entertaining to watch? Absolutely",
    date: "October 29, 2025",
    readTime: "5 min read",
    image: "https://static1.squarespace.com/static/58a13eba20099eb147e68d26/5db36e0fa26b82005ccedf27/6902d3e2bd7e280cfd8666bf/1761793857277/american3.jpg?format=1000w",
    url: "https://hyperrealfilm.club/reviews/american-hunter",
    bgPosition: "bg-top",
    content: `The vastness of the American landscape has always been one of cinema's greatest canvases. In American Hunter, this expanse is inverted. The highway is no longer a symbol of freedom; it is a clinical trap.

The cinematography plays on scale contrast. Massive silhouettes of telephone poles and highway signs slice through a pale, overexposed sky, creating a stark, graphic border around the characters. Saturated yellow streetlights and cold fluorescent store signs clash in the nocturnal sequences, defining a world that feels both artificially lit and spiritually hollow.

The editing rhythm is deliberately slow, built on long, static wide shots that force the viewer to sit in the quiet desperation of the environment. In deconstructing these frames, we find a visual syntax of modern discontent—where the horizon is infinite, but the characters have nowhere left to go.`
  },
  {
    id: 3,
    pub: "HYPERREAL FILM CLUB",
    category: "Published",
    title: "Five Fall Festival Films to Look Out For",
    desc: "With the summer coming to an end and temperatures coming down, fall is officially on the horizon. While many people are preparing for football season, us cinephiles are preparing for a different season: the fall film festivals",
    date: "September 9, 2025",
    readTime: "9 min read",
    image: "https://static1.squarespace.com/static/58a13eba20099eb147e68d26/5db36e0fa26b82005ccedf27/68bf360f0db4c7199ddde902/1757452462584/Hamnet_1bc1a0.webp?format=1000w",
    url: "https://hyperrealfilm.club/reviews/five-fall-festival-films",
    bgPosition: "bg-[center_20%]",
    content: `The fall festival circuit is where the language of cinema is rewritten each year. This season's crop of films is defined by a bold departure from traditional narrative structures, opting instead for structural, format-based storytelling.

Across the five standout entries, we observe a shared fascination with experimental aspect ratios, mixing digital formats with 16mm archival footage, and breaking the fourth wall through unconventional visual cues. These films function like visual monographs, rejecting classical pacing in favor of sensory overwhelm and rhythmic editing loops.

Whether utilizing hyper-focal macro shots or layering multiple channels of sound design to create an oppressive atmosphere, these filmmakers prove that narrative is secondary to texture. They construct cinematic monoliths that challenge the audience to perceive film not just as story, but as physical and visual sensation.`
  }
];

const featuredReviews = [
  {
    id: 1,
    platform: "LETTERBOXD",
    category: "Critique",
    title: "Magnum Opus in Cinema",
    movie: "The Dark Knight (2008)",
    review: "Overall, a magnum opus in cinema since everything is nearly perfect as we see Christopher Nolan take a comic book source material and go beyond what is possible as he spins it into a movie about Chaos, Loss, and Sacrifice, something that is driven forward and provoked by Heath Ledger's unforgettable performance.",
    rating: "9.9/10",
    date: "October 1, 2023",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600",
    url: "https://letterboxd.com/akarshv/"
  },
  {
    id: 2,
    platform: "LETTERBOXD",
    category: "Critique",
    title: "Worse Than Argylle",
    movie: "Madame Web (2024)",
    review: "Overall, a terrible movie that makes Argylle seem like Citizen Kane as it feels like they tried to make a watchable movie out of terrible footage, but I got more enjoyment from the man snoring next to me because he showed more emotion than the entire cast.",
    rating: "2.1/10",
    date: "February 16, 2024",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600",
    url: "https://letterboxd.com/akarshv/"
  },
  {
    id: 3,
    platform: "LETTERBOXD",
    category: "Critique",
    title: "Brilliant but Long",
    movie: "Interstellar (2014)",
    review: "Overall, a movie with brilliant moments and brilliant aspects that is dragged down by its extremely long runtime and slow pace; despite all of this, the movie was great as it explores the relationship between family and profession against the backdrop of a space exploration epic.",
    rating: "9.1/10",
    date: "July 5, 2021",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600",
    url: "https://letterboxd.com/akarshv/"
  }
];

// --- PUBLICATIONS VIEW COMPONENT ---
function PublicationsPage({ navigateToSection }) {
  const [activeCategory, setActiveCategory] = useState("Published");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    if (article.category === "Published") {
      window.open(article.url, "_blank", "noopener,noreferrer");
    } else {
      setSelectedArticle(article);
    }
  };

  const categories = ["Published", "Self-Published"];
  const filteredArticles = articles.filter(a => a.category === activeCategory);
  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <section className="pt-36 pb-32 px-6 md:px-20 bg-offwhite min-h-[85vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">Pillar // 3</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none">
              Publications & Essays
            </h1>
            <p className="text-dark/60 mt-3 text-base max-w-xl font-sans">
              Deconstructing focal planes, narrative rhythms, and the geometry of frame layouts. A repository of cinematic analysis.
            </p>
          </div>
          <button 
            onClick={() => navigateToSection("hero")}
            className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full overflow-hidden self-start md:self-auto shadow-md"
          >
            <div className="bg-slide" />
            <span>← Return Home</span>
          </button>
        </div>

        {/* Categories Menu */}
        <div className="flex gap-2 flex-wrap justify-start mb-12 pb-4 border-b border-dark/5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-300 border ${
                  isActive 
                    ? "bg-accent text-offwhite border-accent shadow-sm" 
                    : "bg-dark/5 text-dark/70 border-transparent hover:bg-dark/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Article Card */}
        {featuredArticle && (
          <div 
            onClick={() => handleArticleClick(featuredArticle)}
            className="relative rounded-brutalist overflow-hidden border border-dark/10 shadow-xl mb-12 cursor-pointer group hover:border-accent/30 transition-all duration-500 h-[450px] flex items-end"
          >
            <div 
              className={`absolute inset-0 bg-cover ${featuredArticle.bgPosition || 'bg-top'} scale-100 group-hover:scale-103 transition-transform duration-700 ease-out`}
              style={{ backgroundImage: `url('${featuredArticle.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
            <div className="relative p-8 md:p-12 z-10 text-left w-full">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md font-mono text-[9px] font-bold text-accent uppercase tracking-wider mb-4">
                {featuredArticle.category} — {featuredArticle.pub}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-offwhite font-sans tracking-tight uppercase leading-tight max-w-3xl group-hover:text-accent transition-colors duration-200">
                {featuredArticle.title}
              </h2>
              <p className="text-white text-sm mt-3 max-w-2xl font-sans line-clamp-2 leading-relaxed">
                {featuredArticle.desc}
              </p>
              <div className="flex items-center gap-4 mt-6 text-xs text-offwhite/50 font-mono">
                <span className="text-accent font-bold">{featuredArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-white">
                  <BookOpen className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
                <span className="text-accent font-bold group-hover:translate-x-1 transition-transform duration-300 ml-2 flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-offwhite border border-dark/10 rounded-brutalist overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-400 cursor-pointer group flex flex-col h-[400px]"
              >
                <div className="relative h-44 overflow-hidden bg-dark">
                  <div 
                    className={`absolute inset-0 bg-cover ${article.bgPosition || 'bg-top'} scale-100 group-hover:scale-105 transition-transform duration-500`}
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-offwhite/90 backdrop-blur-sm font-mono text-[8px] font-bold text-accent uppercase tracking-widest border border-dark/5">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-accent mb-2">
                      <span>{article.pub}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold font-sans tracking-tight text-dark group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-dark/70 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                      {article.desc}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 border-t border-dark/5 pt-4">
                    <span className="text-[10px] font-mono text-dark/40 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:underline">
                      Read Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          gridArticles.length === 0 && !featuredArticle && (
            <div className="text-center py-20 border border-dashed border-dark/20 rounded-brutalist w-full">
              <p className="font-mono text-xs uppercase tracking-widest text-dark/40">// No essays published in this category yet</p>
            </div>
          )
        )}
      </div>

      {/* IMMERSIVE READER MODAL OVERLAY */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-dark/75 backdrop-blur-sm animate-fade-in p-4 sm:p-6"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="w-full max-w-3xl h-[90vh] bg-offwhite border border-dark/20 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative animate-slide-left text-dark"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-6 right-6 z-20">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 rounded-full bg-dark/10 hover:bg-dark/20 text-dark flex items-center justify-center transition-all duration-200"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-grow p-8 sm:p-12 md:p-16">
              <div className="max-w-2xl mx-auto">
                <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-3">
                  {selectedArticle.category} — {selectedArticle.pub}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight leading-none uppercase mb-6">
                  {selectedArticle.title}
                </h1>
                
                <div className="flex items-center gap-4 text-xs font-mono text-dark/50 border-b border-dark/10 pb-6 mb-8">
                  <span>Published: {selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <div className="font-sans text-sm sm:text-base leading-relaxed text-dark/85 space-y-6 whitespace-pre-line select-text">
                  {selectedArticle.content}
                </div>

                <div className="mt-12 pt-8 border-t border-dark/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-xs text-dark/50 font-mono">
                    Published on {selectedArticle.pub}
                  </div>
                  <a 
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn bg-accent text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full overflow-hidden shadow-md"
                  >
                    <div className="bg-slide" />
                    <span className="flex items-center gap-1.5">
                      View Original Publication <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- REVIEWS VIEW COMPONENT ---
function ReviewsPage({ navigateToSection }) {
  return (
    <section className="pt-36 pb-32 px-6 md:px-20 bg-offwhite min-h-[85vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">Pillar // 1</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none">
              Film Reviews
            </h1>
            <p className="text-dark/60 mt-3 text-base max-w-xl font-sans">
              Movie reviews and ratings out of 10, critiquing and evaluating every aspect of the cinematic experience.
            </p>
          </div>
          <button 
            onClick={() => navigateToSection("hero")}
            className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full overflow-hidden self-start md:self-auto shadow-md"
          >
            <div className="bg-slide" />
            <span>← Return Home</span>
          </button>
        </div>

        {/* Under Construction Container */}
        <div className="border border-dark/10 rounded-brutalist bg-primary/5 p-8 md:p-12 text-left relative overflow-hidden max-w-3xl mx-auto my-12 shadow-sm">
          {/* Top warning lights */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-fast" />
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold">// SYSTEM UNDER CONSTRUCTION //</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-sans uppercase tracking-tight text-dark mb-4">
            Rebuilding the critique archive.
          </h2>
          
          <p className="text-xs md:text-sm text-dark/70 leading-relaxed font-sans mb-8 max-w-xl">
            This section is currently being reconstructed. In the meantime, you can find quick ratings and log histories on my Letterboxd account, or read full review notes and breakdowns on IMDb.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button 
              onClick={() => window.open("https://letterboxd.com/akarshv/", "_blank", "noopener,noreferrer")}
              className="magnetic-btn bg-[#ff8000] text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-md flex items-center gap-2 self-start"
            >
              <div className="bg-slide !bg-[#00e054]" />
              <span>Letterboxd (Quick Reviews) →</span>
            </button>

            <button 
              onClick={() => window.open("https://www.imdb.com/user/p.2xvicmhwmtxq7s57k63vanxnty/reviews/?ref_=up_ururv_sm", "_blank", "noopener,noreferrer")}
              className="magnetic-btn bg-[#f5c518] text-[#000000] hover:text-[#ffffff] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-md flex items-center gap-2 self-start transition-colors duration-300"
            >
              <div className="bg-slide !bg-[#000000]" />
              <span>IMDb (Full Notes) →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- VIDEOS VIEW COMPONENT ---
function VideosPage({ navigateToSection }) {
  const [activeShortTab, setActiveShortTab] = useState("ALL");

  const longFormVideos = [
    {
      id: 1,
      platform: "YOUTUBE",
      series: "Festival Vlog",
      title: "SXSW 2026 Vlog",
      desc: "The SXSW Film & TV Festival has changed FOREVER. I’ve vlogged my journey to South by Southwest every year since 2023, but this SXSW 2026 film festival vlog captures a massive shift in Austin, Texas. Navigating convention center demolitions, discontinued wristbands, and major leadership shakeups, is SXSW 2026 the best or worst festival yet? 🎬",
      date: "March 20, 2026",
      duration: "20 min watch",
      image: "https://img.youtube.com/vi/QyEm-dZ7NM8/maxresdefault.jpg",
      url: "https://youtu.be/QyEm-dZ7NM8"
    },
    {
      id: 2,
      platform: "YOUTUBE",
      series: "Awards Season",
      title: "Oscars 2026 Predictions",
      desc: "The 98th Academy Awards are finally here! I’m predicting every single winner for Oscars 2026 across all 24 categories. From the Best Picture showdown between One Battle After Another and Sinners to the chaotic Best Actor race between Timothée Chalamet and Michael B. Jordan, I’m breaking down the precursors, the locks, and the potential upsets.",
      date: "February 15, 2026",
      duration: "9 min watch",
      image: "https://img.youtube.com/vi/in9InwLroiQ/maxresdefault.jpg",
      url: "https://youtu.be/in9InwLroiQ"
    },
    {
      id: 3,
      platform: "YOUTUBE",
      series: "Festival Vlog",
      title: "SXSW 2025 VLOG",
      desc: "The SXSW 2025 Film & TV Festival is finally here! Check out  @cinemapersonified 's vlog to hear about his third experience at the SXSW Film Festival in Austin, TX.",
      date: "March 25, 2025",
      duration: "15 min watch",
      image: "https://img.youtube.com/vi/F4zV-JIUvsY/maxresdefault.jpg",
      url: "https://youtu.be/F4zV-JIUvsY"
    }
  ];

  const shortFormVideos = [
    {
      id: "sf-1",
      category: "Reviews",
      title: "Disclosure Day Spoiler-Free Review",
      desc: "Steven Spielberg is back with a massive sci-fi alien blockbuster, but is it actually worth the watch? While some are calling Disclosure Day his best work in decades, I have some thoughts on why this alien adventure doesn't quite hit the mark. 🫣",
      date: "June 12, 2026",
      duration: "0:59",
      image: "https://img.youtube.com/vi/byw7srH5H1c/maxresdefault.jpg",
      url: "https://youtube.com/shorts/byw7srH5H1c"
    },
    {
      id: "sf-2",
      category: "Reviews",
      title: "Tuner Spoiler-Free Review",
      desc: "I have never seen a film make sound feel so tangible while telling a story like this. Tuner has some of the absolute best sound design I’ve ever experienced in a movie, and here is why you need to watch it! 😱",
      date: "May 29, 2026",
      duration: "0:54",
      image: "https://img.youtube.com/vi/osU6iiQgrDQ/maxresdefault.jpg",
      url: "https://youtube.com/shorts/osU6iiQgrDQ"
    },
    {
      id: "sf-3",
      category: "Reviews",
      title: "Obsession Spoiler-Free Review",
      desc: "Obsession is the most talked-about horror movie right now, but is it worth the hype? The film follows Bear (Michael Johnston), who uses a supernatural toy (the One Wish Willow) to make his crush Nikki (Inde Navarrette) fall in love with him. But his dream quickly spirals into a terrifying nightmare, proving he should've been careful what he wished for... 👻",
      date: "May 18, 2026",
      duration: "2 min watch",
      image: "https://img.youtube.com/vi/1NURDAkviL0/maxresdefault.jpg",
      url: "https://youtube.com/shorts/1NURDAkviL0"
    },
    {
      id: "sf-4",
      category: "Reviews",
      title: "Michael Spoiler-Free Review",
      desc: "The Michael Jackson movie is getting slammed by critics, but is it really that bad? 🤔 I watched the 2026 biopic Michael so you don't have to guess! Here's my honest, spoiler-free review of the King of Pop! ✨",
      date: "April 24, 2026",
      duration: "0:58",
      image: "https://img.youtube.com/vi/CSi1xbJgl20/maxresdefault.jpg",
      url: "https://youtube.com/shorts/CSi1xbJgl20"
    },
    {
      id: "sf-5",
      category: "Rankings",
      title: "Oscar Snubs 2026",
      desc: "With Oscar nominations officially out, it's a sad reality that some truly wonderful movies get completely overlooked. Before they're shelved into oblivion by studios, you HAVE to check out these 5 incredible films that deserved so much more attention this award season. Watch them now before they're gone!",
      date: "February 4, 2026",
      duration: "0:59",
      image: "https://img.youtube.com/vi/S5UXNQD4yBE/maxresdefault.jpg",
      url: "https://youtube.com/shorts/S5UXNQD4yBE"
    },
    {
      id: "sf-6",
      category: "Rankings",
      title: "Top 10 Movies of 2025",
      desc: "2025 might not have been the best year for cinema overall, but it certainly delivered some incredible standouts! I've wrapped up the year and compiled my definitive list of the Top 10 Best Movies of 2025. From innovative horror to laugh-out-loud comedies and powerful dramas, these films are must-watches.",
      date: "January 30, 2026",
      duration: "0:59",
      image: "https://img.youtube.com/vi/EfTWPtWQBYs/maxresdefault.jpg",
      url: "https://youtube.com/shorts/EfTWPtWQBYs"
    }
  ];

  const shortCategories = ["ALL", "Reviews", "Rankings"];

  const filteredShortVideos = activeShortTab === "ALL"
    ? shortFormVideos
    : shortFormVideos.filter(v => v.category === activeShortTab);

  return (
    <section className="pt-36 pb-32 px-6 md:px-20 bg-offwhite min-h-[85vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        {/* Header */}
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">Pillar // 2</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none">
              Videos
            </h1>
            <p className="text-dark/60 mt-3 text-base max-w-xl font-sans">
              A repository of movie reviews, film festival vlogs, and Oscars predictions for both short and long-form content
            </p>
          </div>
          <button 
            onClick={() => navigateToSection("hero")}
            className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full overflow-hidden self-start md:self-auto shadow-md"
          >
            <div className="bg-slide" />
            <span>← Return Home</span>
          </button>
        </div>

        {/* SECTION 1: LONG-FORM VIDEOS */}
        <div className="mb-20">
          <div className="border-b border-dark/5 pb-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight uppercase text-dark">
              Long-Form Videos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {longFormVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => window.open(video.url, "_blank", "noopener,noreferrer")}
                className="video-card bg-primary/5 border border-dark/10 rounded-brutalist overflow-hidden shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-500 cursor-pointer group flex flex-col h-[400px] text-left"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 overflow-hidden bg-black flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url('${video.image}')` }}
                  />
                  <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute w-12 h-12 rounded-full bg-accent/90 text-offwhite flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>

                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-dark/80 backdrop-blur-sm font-mono text-[8px] font-bold text-accent uppercase tracking-widest border border-offwhite/10">
                    {video.platform}
                  </span>
                </div>

                {/* Metadata & Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-accent mb-2">
                      <span>{video.series}</span>
                      <span>{video.date}</span>
                    </div>
                    <h3 className="text-lg font-bold font-sans tracking-tight text-dark group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug uppercase">
                      {video.title}
                    </h3>
                    <p className="text-xs text-dark/60 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                      {video.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4 border-t border-dark/5 pt-4">
                    <span className="text-[10px] font-mono text-dark/40 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-accent" />
                      {video.duration}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:underline">
                      Watch Video <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: SHORT-FORM CONTENT */}
        <div>
          <div className="border-b border-dark/5 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight uppercase text-dark">
              Short-form Content (Highlights)
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap justify-start mb-8 pb-4 border-b border-dark/5">
            {shortCategories.map((cat) => {
              const isActive = activeShortTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveShortTab(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-300 border ${
                    isActive 
                      ? "bg-accent text-offwhite border-accent shadow-sm" 
                      : "bg-dark/5 text-dark/70 border-transparent hover:bg-dark/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Shorts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredShortVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => window.open(video.url, "_blank", "noopener,noreferrer")}
                className="video-card bg-primary/5 border border-dark/10 rounded-brutalist overflow-hidden shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-500 cursor-pointer group w-full aspect-[9/16] relative text-left flex flex-col"
              >
                {/* Thumbnail Container (Top 65%) */}
                <div className="relative h-[65%] w-full overflow-hidden bg-black flex items-center justify-center border-b border-dark/10">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url('${video.image}')` }}
                  />
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute w-10 h-10 rounded-full bg-accent/90 text-offwhite flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Text Tray (Bottom 35%) */}
                <div className="h-[35%] p-4 bg-offwhite text-dark flex flex-col justify-between flex-grow transition-colors duration-500">
                  <div>
                    {/* Category & Date Metadata Line */}
                    <div className="flex justify-between items-center text-[8px] font-mono font-bold tracking-wider text-accent mb-1.5">
                      <span>{video.category.toUpperCase()}</span>
                      <span>{video.date}</span>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold font-sans tracking-tight text-dark group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug uppercase">
                      {video.title}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-dark/60 mt-1.5 leading-relaxed line-clamp-2 font-sans font-normal">
                      {video.desc}
                    </p>
                  </div>

                  {/* Footer Line - Watch Video link */}
                  <div className="flex justify-between items-center mt-4 border-t border-dark/5 pt-4">
                    <span className="text-[10px] font-mono text-dark/40 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-accent" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:underline">
                      Watch Video <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: CALL TO ACTION CATALOG */}
        <div className="mt-20 pt-12 border-t border-dark/10 text-center">
          <p className="font-sans text-base text-dark/70 mb-6">
            Looking for more? See my full catalog below:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.open("https://www.tiktok.com/@cinemapersonified", "_blank", "noopener,noreferrer")}
              className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-sm flex items-center gap-2"
            >
              <div className="bg-slide" />
              <span>TikTok →</span>
            </button>

            <button
              onClick={() => window.open("https://www.instagram.com/cinemapersonified/", "_blank", "noopener,noreferrer")}
              className="magnetic-btn bg-[#ff4dbf] text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-sm flex items-center gap-2"
            >
              <div className="bg-slide !bg-[#d61a8a]" />
              <span>Instagram →</span>
            </button>

            <button
              onClick={() => window.open("https://www.youtube.com/@cinemapersonified", "_blank", "noopener,noreferrer")}
              className="magnetic-btn bg-[#FF0000] text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-sm flex items-center gap-2"
            >
              <div className="bg-slide !bg-[#CC0000]" />
              <span>YouTube →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- ABOUT ME VIEW COMPONENT ---
function AboutPage({ navigateToSection }) {
  return (
    <section className="pt-36 pb-32 px-6 md:px-20 bg-offwhite min-h-[85vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        {/* Header */}
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">IDENTITY</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none">
              About Me
            </h1>
            <p className="text-dark/60 mt-3 text-base max-w-xl font-sans">
              The Film Content Creator and Film Critic behind Cinema Personified
            </p>
          </div>
          <button 
            onClick={() => navigateToSection("hero")}
            className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full overflow-hidden self-start md:self-auto shadow-md"
          >
            <div className="bg-slide" />
            <span>← Return Home</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Avatar and Info Card - 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-dark/10 rounded-brutalist overflow-hidden bg-primary/5 p-6 shadow-sm flex flex-col items-center text-center">
              <img 
                src="https://easy-links.s3.us-west-2.amazonaws.com/avatars/avatar-cinemapersonified.com-ney3BA.jpeg" 
                alt="Akarsh - Cinema Personified" 
                className="w-32 h-32 rounded-full border-2 border-accent object-cover shadow-lg mb-6"
              />
              <h2 className="text-xl font-bold font-sans tracking-tight uppercase text-dark">Akarsh</h2>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mt-1">Creator & Critic</p>
              
              <div className="w-full border-t border-dark/5 my-6 pt-6 space-y-3 font-sans text-xs text-dark/70">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-dark/40 uppercase">Based in</span>
                  <span className="font-medium">Austin, Texas, USA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-dark/40 uppercase">Active Since</span>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-dark/40 uppercase">Inquiries</span>
                  <a href="mailto:contact@cinemapersonified.com" className="font-medium text-accent hover:underline">contact@cinemapersonified.com</a>
                </div>
              </div>

              {/* Social links grid */}
              <div className="w-full grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => window.open("https://www.youtube.com/@cinemapersonified", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-[#FF0000] text-offwhite font-sans text-[10px] uppercase tracking-wider font-bold py-2 rounded-full overflow-hidden shadow-sm"
                >
                  <div className="bg-slide !bg-[#CC0000]" />
                  <span>YouTube</span>
                </button>
                <button
                  onClick={() => window.open("https://www.tiktok.com/@cinemapersonified", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-dark text-offwhite font-sans text-[10px] uppercase tracking-wider font-bold py-2 rounded-full overflow-hidden shadow-sm"
                >
                  <div className="bg-slide" />
                  <span>TikTok</span>
                </button>
                <button
                  onClick={() => window.open("https://www.instagram.com/cinemapersonified/", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-[#ff4dbf] text-offwhite font-sans text-[10px] uppercase tracking-wider font-bold py-2 rounded-full overflow-hidden shadow-sm"
                >
                  <div className="bg-slide !bg-[#d61a8a]" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={() => window.open("https://letterboxd.com/akarshv/", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-[#ff8000] text-offwhite font-sans text-[10px] uppercase tracking-wider font-bold py-2 rounded-full overflow-hidden shadow-sm"
                >
                  <div className="bg-slide !bg-[#00e054]" />
                  <span>Letterboxd</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bio and Philosophy Text - 8 Columns */}
          <div className="lg:col-span-8 space-y-8 font-sans text-dark/80 text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-sans uppercase tracking-tight text-dark">
                About Cinema Personified
              </h3>
              <p>
                Hello! My name is Akarsh, and I am the content creator and film critic behind Cinema Personified.
              </p>
              <p>
                When I was 8 years old, I fell in love with the movies after watching Slumdog Millionaire's success at the Oscars. Seeing people that looked like me get rewarded on cinema's highest stage felt like an awakening for me as I started to look at films more closely and pay attention to the Oscars and Awards Season, predicting every Oscars since 2012. After watching La La Land in 2017, I felt that I finally needed to start putting my notes down, so I decided to finally start writing reviews in a spreadsheet for all the movies I watched (something I still keep up with to this day).
              </p>
              <p>
                Too scared to share my thoughts with others, I just kept these film notes to myself, until I finally mustered up the courage to publish my film reviews on TikTok and Letterboxd after attending SXSW 2023. From that point on, the film content creator bug bit me and I have been cross-posting my content on TikTok, Instagram, and YouTube along with written movie reviews on my Letterboxd and IMDb. Broadening my horizons, I began publishing articles to my Medium page until I eventually started contributing articles to Hyperreal Film Journal based in East Austin.
              </p>
              <p>
                Whether you're looking for weekly spoiler-free reviews of the latest theatrical blockbusters, deep-dive discussions on awards season predictions, or coverage and vlogs from major events like the SXSW Film Festival, I strive to make this a comprehensive space for everyone who loves cinema.
              </p>
            </div>

            <div className="border border-dark/10 rounded-brutalist bg-accent/5 p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-widest text-accent font-bold">
                // CONNECT & COLLABORATE
              </h4>
              <p className="text-xs text-dark/70">
                Are you looking to connect on reviewing a movie, covering a film festival, conducting an interview, or fulfilling your other cinematic needs? Feel free to reach out to me at my official email:
              </p>
              <div className="pt-2">
                <a 
                  href="mailto:contact@cinemapersonified.com"
                  className="font-mono text-sm font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  contact@cinemapersonified.com
                </a>
              </div>
            </div>

            <div className="space-y-4 border-t border-dark/10 pt-6">
              <h3 className="text-xl md:text-2xl font-bold font-sans uppercase tracking-tight text-dark">
                About Akarsh
              </h3>
              <p>
                Outside of film criticism and content creation, I am a software engineer based in Austin, Texas. Originally from the Chicagoland area, I spent the first 22 years of my life in Illinois, where I eventually attended the University of Illinois Urbana-Champaign to earn my BS and MCS in Computer Science.
              </p>
              <p>
                When I’m not writing code or watching movies, I am most likely watching sports, especially Chicago teams, or playing tennis.
              </p>
              <p>
                If you want to learn more about me, head over to my personal website <a href="https://akarshv.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold transition-colors">here</a>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  // --- VIEW ROUTER STATE ---
  const [currentView, setCurrentView] = useState("home"); // "home" | "publications" | "reviews" | "videos" | "about"

  // --- PRESET SELECTION STATE ---
  const [activePresetKey, setActivePresetKey] = useState("b"); // Default to Preset B
  const activePreset = presets[activePresetKey];

  // --- STATE FOR INTERACTIVE ARTIFACTS ---
  
  // Card 1: Diagnostic Shuffler (Letterboxd reviews)
  const [shuffledCards, setShuffledCards] = useState([
    {
      id: 1,
      tag: "19",
      title: "Magnum Opus in Cinema",
      movie: "The Dark Knight (2008)",
      review: "Overall, a magnum opus in cinema since everything is nearly perfect as we see Christopher Nolan take a comic book source material and go beyond what is possible as he spins it into a movie about Chaos, Loss, and Sacrifice, something that is driven forward and provoked by Heath Ledger's unforgettable performance",
      rating: "9.9/10",
      date: "October 1, 2023"
    },
    {
      id: 2,
      tag: "415",
      title: "Worse Than Argylle",
      movie: "Madame Web (2024)",
      review: "Overall, a terrible movie that makes Argylle seem like Citizen Kane as it feels like they tried to make a watchable movie out of terrible footage, but I got more enjoyment from the man snoring next to me because he showed more emotion than the entire cast",
      rating: "2.1/10",
      date: "February 16, 2024"
    },
    {
      id: 3,
      tag: "207",
      title: "Brilliant but Long",
      movie: "Interstellar (2014)",
      review: "Overall, a movie with brilliant moments and brilliant aspects that is dragged down by its extremely long runtime and slow pace; despite all of this, the movie was great as it explores the relationship between family and profession against the backdrop of a space exploration epic in one of Nolan's finest moments (even though he may falter at times)",
      rating: "9.1/10",
      date: "July 5, 2021"
    }
  ]);

  // Card 2: Aspect Ratio Viewfinder
  const [activeRatio, setActiveRatio] = useState("16:9 (Widescreen)");
  const viewportRef = useRef(null);

  // Card 3: Editorial Page Scroll Refs
  const scrollContentRef = useRef(null);
  const trackerGuideRef = useRef(null);
  const crosshairRef = useRef(null);

  // --- REFS FOR GSAP ANIMATIONS ---
  const heroRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroSubheadingRef = useRef(null);
  const heroCtaRef = useRef(null);

  const navbarRef = useRef(null);
  const videosRef = useRef(null);
  const publicationsRef = useRef(null);
  const homeReviewsRef = useRef(null);

  // --- NAVBAR SCROLL DETECTOR ---
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // --- DIAGNOSTIC SHUFFLER ROTATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- GSAP AND CURSOR SCHEDULER ANIMATIONS ---
  useEffect(() => {
    if (currentView !== "home") return; // Only run GSAP if home page is active

    const ctx = gsap.context(() => {
      // 1. Hero Entrances
      gsap.fromTo(heroHeadingRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(heroSubheadingRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(heroCtaRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );



      // 5. Videos Section Stagger Entrance
      if (videosRef.current) {
        const videoCards = videosRef.current.querySelectorAll('.video-card');
        gsap.fromTo(videoCards,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: videosRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
          }
        );
      }

      // 5b. Publications Section Stagger Entrance
      if (publicationsRef.current) {
        const articleCards = publicationsRef.current.querySelectorAll('.article-card');
        gsap.fromTo(articleCards,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: publicationsRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
          }
        );
      }

      // 5c. Reviews Section Stagger Entrance
      if (homeReviewsRef.current) {
        const reviewCards = homeReviewsRef.current.querySelectorAll('.review-card');
        gsap.fromTo(reviewCards,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: homeReviewsRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
          }
        );
      }

      // 4. Aspect Ratio Viewfinder Animation Loop
      const animateViewfinder = () => {
        if (!viewportRef.current) return;

        const ratioTimeline = gsap.timeline({
          repeat: -1,
          defaults: { duration: 1.5, ease: "power2.inOut" }
        });

        // Loop: 16:9 -> 2.39:1 -> 4:3 -> 1.43:1 -> 16:9
        ratioTimeline.to(viewportRef.current, {
          width: "220px",
          height: "92px",
          onStart: () => setActiveRatio("2.39:1 (Anamorphic)")
        }, "+=1.5");

        ratioTimeline.to(viewportRef.current, {
          width: "150px",
          height: "112px",
          onStart: () => setActiveRatio("4:3 (Academy)")
        }, "+=1.5");

        ratioTimeline.to(viewportRef.current, {
          width: "170px",
          height: "119px",
          onStart: () => setActiveRatio("1.43:1 (IMAX)")
        }, "+=1.5");

        ratioTimeline.to(viewportRef.current, {
          width: "200px",
          height: "112px",
          onStart: () => setActiveRatio("16:9 (Widescreen)")
        }, "+=1.5");
      };

      animateViewfinder();

      // 6. Editorial Page Scroll Animation Loop (Concept B)
      const animatePageScroll = () => {
        if (!scrollContentRef.current) return;

        const scrollTimeline = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power2.inOut" }
        });

        // 1. Initial State
        scrollTimeline.set(scrollContentRef.current, { y: 0 });

        // 2. Scroll to Paragraph 2 / Section II
        scrollTimeline.to(scrollContentRef.current, {
          y: -65,
          duration: 2.0
        }, "+=1.5");

        // 3. Scroll to Pull Quote & LOCK target
        scrollTimeline.to(scrollContentRef.current, {
          y: -130,
          duration: 2.0
        }, "+=1.5");

        // 4. Scroll to Paragraph 3
        scrollTimeline.to(scrollContentRef.current, {
          y: -195,
          duration: 2.0
        }, "+=1.5");

        // 5. Scroll back to top
        scrollTimeline.to(scrollContentRef.current, {
          y: 0,
          duration: 2.5,
          ease: "power2.out"
        }, "+=2.0");
      };

      animatePageScroll();

    });

    return () => ctx.revert();
  }, [activePresetKey, currentView]);

  // Handle switching preset & refreshing ScrollTrigger
  const handlePresetSwitch = (key) => {
    setActivePresetKey(key);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // Navigates to a specific section on the home page, switching views if necessary
  const navigateToSection = (sectionId) => {
    setCurrentView("home");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`relative overflow-x-hidden min-h-screen ${activePreset.className}`}>
      
      {/* GLOBAL SVG NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* FLOATING PRESET CONTROLLER / THEME DESK (Preset B vs Preset C COMPARATOR) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-dark/95 border border-primary/20 backdrop-blur-md rounded-full px-5 py-3 shadow-2xl flex items-center gap-4 max-w-[95%] sm:max-w-none">
        <div className="flex items-center gap-2 border-r border-primary/20 pr-3 hidden sm:flex text-primary">
          <Sliders className="w-4 h-4 text-accent" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-offwhite/90">Comparison Deck</span>
        </div>
        <div className="flex gap-2">
          {Object.keys(presets).map((key) => {
            const preset = presets[key];
            const isSelected = activePresetKey === key;
            return (
              <button
                key={key}
                onClick={() => handlePresetSwitch(key)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase transition-all duration-300 tracking-wider flex flex-col items-center gap-0.5 ${
                  isSelected 
                    ? "bg-accent text-offwhite border border-accent shadow-md scale-105" 
                    : "bg-primary/10 text-offwhite/70 border border-primary/10 hover:bg-primary/20"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-offwhite/20" style={{ backgroundColor: preset.palette[1].split(' ')[0] }} />
                  <span>{preset.name}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="text-[9px] font-mono text-offwhite/40 border-l border-primary/20 pl-3 hidden lg:block uppercase tracking-wider">
          Active: {activePreset.fontNote}
        </div>
      </div>

      {/* A. NAVBAR — "The Floating Island" */}
      <nav 
        ref={navbarRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-full px-6 py-3 transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? "bg-offwhite/85 backdrop-blur-xl border border-dark/10 shadow-lg" 
            : "bg-transparent border border-transparent"
        }`}
      >
        <button onClick={() => navigateToSection("hero")} className="font-sans font-bold text-lg tracking-tight flex items-center gap-2">
          <Film className="w-5 h-5 text-accent" />
          <span className="text-dark font-sans">Cinema Personified</span>
        </button>
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-tight">
          <button 
            onClick={() => navigateToSection("features")} 
            className="text-dark/70 hover:text-accent transition-colors duration-200"
          >
            Critiques
          </button>
          <button 
            onClick={() => { setCurrentView("reviews"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-colors duration-200 ${currentView === "reviews" ? "text-accent font-bold" : "text-dark/70 hover:text-accent"}`}
          >
            Reviews
          </button>
          <button 
            onClick={() => { setCurrentView("videos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-colors duration-200 ${currentView === "videos" ? "text-accent font-bold" : "text-dark/70 hover:text-accent"}`}
          >
            Videos
          </button>
          <button 
            onClick={() => { setCurrentView("publications"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-colors duration-200 ${currentView === "publications" ? "text-accent font-bold" : "text-dark/70 hover:text-accent"}`}
          >
            Publications
          </button>
          <button 
            onClick={() => { setCurrentView("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-colors duration-200 ${currentView === "about" ? "text-accent font-bold" : "text-dark/70 hover:text-accent"}`}
          >
            About
          </button>
        </div>
        <button 
          onClick={() => window.open("https://cinemapersonified-com.l.ink/", "_blank", "noopener,noreferrer")} 
          className="magnetic-btn bg-accent text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full overflow-hidden"
        >
          <div className="bg-slide" />
          <span>FOLLOW CINEMA PERSONIFIED</span>
        </button>
      </nav>

      {/* VIEW CONTROLLER BLOCK */}
      {currentView === "publications" ? (
        <PublicationsPage navigateToSection={navigateToSection} />
      ) : currentView === "reviews" ? (
        <ReviewsPage navigateToSection={navigateToSection} />
      ) : currentView === "videos" ? (
        <VideosPage navigateToSection={navigateToSection} />
      ) : currentView === "about" ? (
        <AboutPage navigateToSection={navigateToSection} />
      ) : (
        <>
          {/* B. HERO SECTION — "The Opening Shot" */}
          <section 
            id="hero" 
            ref={heroRef}
            className="relative h-screen w-full flex items-end justify-start p-8 md:p-20 overflow-hidden bg-dark transition-all duration-500"
          >
            {/* Background Image with Heavy Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-all duration-750"
              style={{ backgroundImage: `url('${activePreset.heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

            {/* Content pushed to bottom-left third */}
            <div className="relative z-10 max-w-4xl text-left">
              <p ref={heroSubheadingRef} className="font-mono text-accent text-xs md:text-sm uppercase tracking-[0.25em] mb-4 transition-colors duration-500">
                — World-Class Film Content & Curation ({activePreset.tagline})
              </p>
              <h1 ref={heroHeadingRef} className="text-5xl md:text-8xl font-bold tracking-tighter text-offwhite flex flex-col gap-1 leading-[0.9]">
                <span className="font-sans font-extrabold uppercase transition-all duration-500">{activePreset.heroSans}</span>
                <span className="font-drama text-accent text-7xl md:text-9xl mt-2 italic transition-all duration-500">{activePreset.heroDrama}</span>
              </h1>
              <div className="mt-4 font-mono text-[10px] uppercase text-offwhite/50 tracking-wider">
                Active Palette: {activePreset.palette.join(" | ")}
              </div>
              <div ref={heroCtaRef} className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button 
                  onClick={() => window.open("https://cinemapersonified-com.l.ink/", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-accent text-offwhite font-sans text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden"
                >
                  <div className="bg-slide" />
                  <span>FOLLOW CINEMA PERSONIFIED</span>
                </button>
                <button 
                  onClick={() => navigateToSection("features")} 
                  className="group flex items-center gap-2 text-offwhite/80 hover:text-accent font-mono text-xs uppercase tracking-widest transition-colors py-3"
                >
                  <span>Explore Digital Artifacts</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* C. FEATURES SECTION — "Interactive Functional Artifacts" */}
          <section id="features" className="pt-24 pb-8 px-6 md:px-20 bg-offwhite text-dark max-w-7xl mx-auto transition-colors duration-500">
            <div className="text-left mb-16 max-w-2xl">
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2 transition-colors duration-500">// WELCOME</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sans transition-all duration-500">Three pillars of cinematic analysis.</h2>
              <p className="text-dark/60 mt-4 text-base transition-colors duration-500 font-sans">
                Welcome to Cinema Personified! I'm Akarsh, and this space serves as your hub for multi-platform film commentary. I deconstruct cinema across three core mediums: Movie Reviews, Short/Long-form Videos, and Articles. Whether you're looking for my thoughts on movies, my film festival recaps, or my analysis on the awards circuit, there's something here to fulfill your cinematic needs in the pillars below!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Card 1 — "Diagnostic Shuffler" (Written Reviews) */}
              <div 
                onClick={() => { setCurrentView("reviews"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-primary/20 border border-dark/10 p-8 rounded-brutalist flex flex-col justify-between h-[420px] shadow-sm relative overflow-hidden cursor-pointer hover:border-accent/30 transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-dark/50">[ REVIEWS ]</span>
                    <BookOpen className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight font-sans mb-2 transition-all duration-500">Written Reviews</h3>
                  <p className="text-xs text-dark/60 mb-6 transition-colors duration-500">Movie Reviews for everything I have seen broken up by comments per category and a final rating out of 10.</p>
                </div>

                {/* Shuffling review deck */}
                <div className="relative h-44 w-full mt-4">
                  {shuffledCards.map((card, index) => {
                    const yOffset = index * 12;
                    const scale = 1 - index * 0.04;
                    const opacity = 1 - index * 0.25;
                    const zIndex = 30 - index;
                    
                    return (
                      <div
                        key={card.id}
                        className="absolute inset-x-0 top-0 bg-offwhite border border-dark/15 rounded-2xl p-4 shadow-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-between h-40"
                        style={{
                          transform: `translateY(${yOffset}px) scale(${scale})`,
                          opacity: opacity,
                          zIndex: zIndex,
                        }}
                      >
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-wider text-accent mb-2 transition-colors duration-500">
                            <span>ID: {card.tag}</span>
                            <span>{card.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-dark truncate font-sans transition-all duration-500">{card.movie}</h4>
                          <p className="text-[11px] text-dark/70 leading-relaxed line-clamp-2 mt-1 font-mono transition-colors duration-500">
                            "{card.review}"
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2 border-t border-dark/5 pt-2">
                          <span className="text-[10px] text-dark/40 font-mono">RATING</span>
                          <span className="text-xs text-accent font-bold tracking-widest transition-colors duration-500">{card.rating}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2 — "Aspect Ratio Viewfinder" (Videos) */}
              <div 
                onClick={() => { setCurrentView("videos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-primary/20 border border-dark/10 p-8 rounded-brutalist flex flex-col justify-between h-[420px] shadow-sm relative overflow-hidden cursor-pointer hover:border-accent/30 transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-dark/50">[ VIDEOS ]</span>
                    <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full transition-all duration-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-fast transition-colors duration-500" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold transition-colors duration-500">LIVE FEED</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight font-sans mb-2 transition-all duration-500">Videos</h3>
                  <p className="text-xs text-dark/60 mb-6 transition-colors duration-500">Short-form video reviews and awards season coverage on my TikTok, Instagram, and Youtube Shorts, and long-form vlogs and Oscars predictions on my Youtube.</p>
                </div>

                {/* Viewfinder Bounding Box Container */}
                <div className="bg-dark text-offwhite border border-offwhite/10 rounded-2xl p-5 shadow-inner flex flex-col justify-between items-center h-44 relative transition-colors duration-500">
                  {/* Top-left/right/bottom diagnostics */}
                  <div className="absolute top-2 left-4 font-mono text-[8px] text-offwhite/40 tracking-wider">
                    REC [●] 24FPS
                  </div>
                  <div className="absolute top-2 right-4 font-mono text-[8px] text-offwhite/40 tracking-wider">
                    ISO 400
                  </div>

                  {/* Centered Viewfinder Box */}
                  <div className="flex-grow flex items-center justify-center w-full relative">
                    <div 
                      ref={viewportRef}
                      className="border border-accent rounded-sm relative flex items-center justify-center transition-colors duration-500"
                      style={{ width: "200px", height: "112px" }}
                    >
                      {/* Viewfinder Center Crosshair */}
                      <div className="absolute w-2 h-2 flex items-center justify-center">
                        <div className="w-2 h-[1px] bg-accent/60 absolute" />
                        <div className="h-2 w-[1px] bg-accent/60 absolute" />
                      </div>
                      
                      {/* Viewfinder Corners */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40" />
                    </div>
                  </div>

                  {/* Telemetry Output */}
                  <div className="w-full flex justify-between items-center border-t border-offwhite/10 pt-2 text-[9px] font-mono">
                    <span className="text-accent/60">FORMAT:</span>
                    <span className="text-accent font-bold uppercase tracking-wider">{activeRatio}</span>
                  </div>
                </div>
              </div>

              {/* Card 3 — "Editorial Page Scroll" (Deep Film Articles) */}
              <div 
                onClick={() => { setCurrentView("publications"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-primary/20 border border-dark/10 p-8 rounded-brutalist flex flex-col justify-between h-[420px] shadow-sm relative overflow-hidden cursor-pointer hover:border-accent/30 transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-dark/50">[ PUBLICATIONS ]</span>
                    <Layers className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight font-sans mb-2 transition-all duration-500">Deep Film Articles</h3>
                  <p className="text-xs text-dark/60 mb-6 transition-colors duration-500">Articles for publications like Hyperreal Film Journal consisting of movie reviews and film festival coverage.</p>
                </div>

                {/* Editorial Page Scroll Container */}
                <div className="bg-offwhite text-dark border border-dark/10 rounded-2xl p-4 shadow-inner flex flex-col justify-between h-44 relative transition-colors duration-500 overflow-hidden font-mono text-[9px]">
                  
                  {/* Left & Top Rulers (tick marks) */}
                  {/* Top Ruler */}
                  <div className="absolute top-0 left-0 right-0 h-3 border-b border-dark/10 bg-offwhite/80 z-20 flex justify-between px-6 items-center text-[6px] text-dark/30 pointer-events-none select-none">
                    <span>|</span><span>.</span><span>.</span><span>.</span><span>|</span><span>.</span><span>.</span><span>.</span><span>|</span><span>.</span><span>.</span><span>.</span><span>|</span><span>.</span><span>.</span><span>.</span><span>|</span><span>.</span><span>.</span><span>.</span><span>|</span><span>.</span><span>.</span><span>.</span><span>|</span>
                  </div>
                  {/* Left Ruler */}
                  <div className="absolute top-3 left-0 bottom-0 w-3 border-r border-dark/10 bg-offwhite/80 z-20 flex flex-col justify-between py-4 items-center text-[6px] text-dark/30 pointer-events-none select-none">
                    <span>-</span><span>.</span><span>-</span><span>.</span><span>-</span><span>.</span><span>-</span><span>.</span><span>-</span><span>.</span><span>-</span>
                  </div>



                  {/* Header metadata overlay */}
                  <div className="absolute top-3 left-3 right-0 h-4 bg-gradient-to-b from-offwhite to-transparent z-15 pointer-events-none" />
                  
                  {/* Scrolling Page Window */}
                  <div className="w-full h-full pt-4 pl-3 overflow-hidden relative">
                    <div 
                      ref={scrollContentRef}
                      className="space-y-4 pr-2 text-left"
                      style={{ transform: "translateY(0px)" }}
                    >
                      {/* Paragraph 1 */}
                      <div className="flex gap-2.5 items-start">
                        <span className="font-serif text-3xl font-bold text-accent leading-none mt-1 transition-colors duration-500">E</span>
                        <p className="text-[10px] leading-relaxed text-dark/70 font-sans">
                          ven before these festivals started, there has already been major buzz around the films that are to premiere. So, here are my five fall festival films to look out for this year at Venice, NYFF, and TIFF, and how I think they will play in this year's Oscars race!
                        </p>
                      </div>

                      {/* Highlighted Header block */}
                      <div className="border-l-2 border-accent pl-2 py-0.5 my-2 transition-colors duration-500">
                        <h4 className="font-sans font-bold text-accent uppercase text-[9px] tracking-wider transition-colors duration-500">5. Hamnet (Chloé Zhao)</h4>
                      </div>

                      {/* Paragraph 2 */}
                      <p className="text-[10px] leading-relaxed text-dark/70 font-sans pb-8">
                        Making her return to directing feature films after four years, Chloé Zhao is looking to redeem herself to those who doubted her. While her last film, the MCU's Eternals, may have been a commercial and critical flop, Zhao is back to remind everyone of the prestigious director she really is.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Bar diagnostics overlay */}
                  <div className="absolute bottom-0 left-3 right-0 h-5 bg-offwhite border-t border-dark/10 z-20 flex justify-between items-center px-3 text-[7px] text-dark/40 pointer-events-none select-none">
                    <span>TRACKING: BLOCK_02_L15</span>
                    <span className="text-accent uppercase transition-colors duration-500 animate-pulse">● READ_ENGAGED</span>
                  </div>
                </div>

              </div>
            </div>
          </section>



          {/* REVIEWS SECTION */}
          <section 
            id="home-reviews"
            ref={homeReviewsRef}
            className="pt-8 pb-16 px-6 md:px-20 bg-offwhite text-dark overflow-hidden transition-colors duration-500 relative border-b border-dark/5"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-left space-y-6">
                <p className="font-mono text-xs text-accent uppercase tracking-widest transition-colors duration-500">Pillar // 1</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-sans transition-all duration-500 uppercase">Reviews</h2>
                <p className="text-dark/60 max-w-xl text-base transition-colors duration-500 font-sans font-normal">
                  Movie reviews and ratings out of 10, critiquing and evaluating every aspect of the cinematic experience.
                </p>
              </div>

              {/* Browse All Reviews CTA */}
              <div className="text-center mt-16">
                <button
                  onClick={() => { setCurrentView("reviews"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-4 px-8 rounded-full overflow-hidden shadow-md inline-flex items-center gap-2"
                >
                  <div className="bg-slide" />
                  <span>Browse All Reviews →</span>
                </button>
              </div>
            </div>
          </section>

          {/* VIDEOS SECTION */}
          <section 
            id="videos"
            ref={videosRef}
            className="py-16 px-6 md:px-20 bg-dark text-offwhite overflow-hidden transition-colors duration-500 relative"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-16 space-y-4">
                <p className="font-mono text-xs text-accent uppercase tracking-widest transition-colors duration-500">Pillar // 2</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-sans transition-all duration-500 uppercase">Videos</h2>
                <p className="text-offwhite/60 max-w-xl text-base transition-colors duration-500 font-sans">
                  Deep dives, vlogs, and award show forecasts. Analysis of cinematic language in video format.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full">
                {videoEssays.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => window.open(video.url, "_blank", "noopener,noreferrer")}
                    className="video-card bg-primary/20 border border-offwhite/10 rounded-brutalist overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-500 cursor-pointer group flex flex-col h-[400px] text-left flex-1 min-w-[280px]"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative h-48 overflow-hidden bg-black flex items-center justify-center">
                      <div 
                        className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{ backgroundImage: `url('${video.image}')` }}
                      />
                      <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors duration-300" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute w-12 h-12 rounded-full bg-accent/90 text-offwhite flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>

                      <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-dark/80 backdrop-blur-sm font-mono text-[8px] font-bold text-accent uppercase tracking-widest border border-offwhite/10">
                        {video.platform}
                      </span>
                    </div>

                    {/* Metadata & Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-accent mb-2">
                          <span>{video.series}</span>
                          <span>{video.date}</span>
                        </div>
                        <h3 className="text-lg font-bold font-sans tracking-tight text-offwhite group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug uppercase">
                          {video.title}
                        </h3>
                        <p className="text-xs text-offwhite/60 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                          {video.desc}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4 border-t border-offwhite/10 pt-4">
                        <span className="text-[10px] font-mono text-offwhite/40 flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-accent" />
                          {video.duration}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:underline">
                          Watch Video <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Browse All Videos CTA */}
              <div className="text-center mt-16">
                <button
                  onClick={() => { setCurrentView("videos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="magnetic-btn bg-accent text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-4 px-8 rounded-full overflow-hidden shadow-md inline-flex items-center gap-2"
                >
                  <div className="bg-slide" />
                  <span>Browse All Videos →</span>
                </button>
              </div>

            </div>
          </section>

          {/* PUBLICATIONS SECTION */}
          <section 
            id="publications-home"
            ref={publicationsRef}
            className="py-16 px-6 md:px-20 bg-offwhite text-dark overflow-hidden transition-colors duration-500 relative border-t border-dark/5"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-16 space-y-4">
                <p className="font-mono text-xs text-accent uppercase tracking-widest transition-colors duration-500">Pillar // 3</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-sans transition-all duration-500 uppercase">Publications</h2>
                <p className="text-dark/60 max-w-xl text-base transition-colors duration-500 font-sans">
                  Deconstructing focal planes, narrative rhythms, and the geometry of frame layouts. A repository of cinematic analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      if (article.category === "Published") {
                        window.open(article.url, "_blank", "noopener,noreferrer");
                      } else {
                        setCurrentView("publications");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="article-card bg-primary/5 border border-dark/10 rounded-brutalist overflow-hidden shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-500 cursor-pointer group flex flex-col h-[400px] text-left"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-black">
                      <div 
                        className={`absolute inset-0 bg-cover ${article.bgPosition || 'bg-center'} scale-100 group-hover:scale-105 transition-transform duration-700 ease-out`}
                        style={{ backgroundImage: `url('${article.image}')` }}
                      />
                      <div className="absolute inset-0 bg-dark/10 group-hover:bg-dark/30 transition-colors duration-300" />
                      
                      <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-offwhite/90 backdrop-blur-sm font-mono text-[8px] font-bold text-accent uppercase tracking-widest border border-dark/5">
                        {article.pub}
                      </span>
                    </div>

                    {/* Metadata & Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-accent mb-2">
                          <span>{article.category}</span>
                          <span>{article.date}</span>
                        </div>
                        <h3 className="text-lg font-bold font-sans tracking-tight text-dark group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug uppercase">
                          {article.title}
                        </h3>
                        <p className="text-xs text-dark/60 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                          {article.desc}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4 border-t border-dark/5 pt-4">
                        <span className="text-[10px] font-mono text-dark/40 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-accent" />
                          {article.readTime}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1 group-hover:underline">
                          Read Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Browse All Articles CTA */}
              <div className="text-center mt-16">
                <button
                  onClick={() => { setCurrentView("publications"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="magnetic-btn bg-dark text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-4 px-8 rounded-full overflow-hidden shadow-md inline-flex items-center gap-2"
                >
                  <div className="bg-slide" />
                  <span>Browse All Articles →</span>
                </button>
              </div>

            </div>
          </section>
        </>
      )}

      {/* G. FOOTER */}
      <footer className="bg-dark text-offwhite rounded-t-[4rem] pt-16 pb-12 px-8 md:px-20 relative overflow-hidden transition-colors duration-500">
        
        {/* Abstract design vector overlay */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="4" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left border-b border-offwhite/10 pb-16">
          
          {/* Column 1 & 2: Creator Profile / About */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://easy-links.s3.us-west-2.amazonaws.com/avatars/avatar-cinemapersonified.com-ney3BA.jpeg" 
                alt="Cinema Personified" 
                className="w-16 h-16 rounded-full border-2 border-accent object-cover shadow-lg" 
              />
              <div>
                <button onClick={() => navigateToSection("hero")} className="font-sans font-bold text-2xl tracking-tight text-offwhite hover:text-accent transition-colors flex items-center gap-2">
                  <Film className="w-6 h-6 text-accent transition-colors duration-500" />
                  <span>Cinema Personified</span>
                </button>
                <p className="text-[10px] font-mono text-accent uppercase tracking-widest mt-1 transition-colors duration-500">Austin, TX // Aspiring Film Critic</p>
              </div>
            </div>
            <p className="text-offwhite/70 text-sm leading-relaxed max-w-lg font-sans transition-colors duration-500">
              Welcome to Cinema Personified, your hub for multi-platform film commentary and cinema analysis! I am a film content creator and aspiring critic based in Austin, TX, specializing in engaging movie reviews, cinema articles, and festival coverage.
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-offwhite/50">
              <span>Contact:</span>
              <a href="mailto:contact@cinemapersonified.com" className="text-accent hover:underline flex items-center gap-1 transition-colors duration-500">
                <span>contact@cinemapersonified.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="font-sans text-xs text-offwhite/50 mt-2">
              Looking for my personal website? Head{" "}
              <a href="https://akarshv.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-0.5 font-bold transition-colors duration-500">
                here
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              !
            </p>
          </div>

          {/* Column 3: Video Channels */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-bold transition-colors duration-500">// VIDEO CONTENT</h4>
            <ul className="space-y-3 font-sans text-sm text-offwhite/60">
              <li>
                <a href="https://www.youtube.com/@cinemapersonified" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@cinemapersonified" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cinemapersonified/" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/akarshv_20" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>Twitter / X</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Written Criticism */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-bold transition-colors duration-500">// WRITTEN CRITICISM</h4>
            <ul className="space-y-3 font-sans text-sm text-offwhite/60">
              <li>
                <a href="https://letterboxd.com/akarshv/" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>Letterboxd</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://hyperrealfilm.club/reviews?author=68bf3470f061b11828bafdc6" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>Hyperreal Journal</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://www.imdb.com/user/p.2xvicmhwmtxq7s57k63vanxnty" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>IMDb Profile</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
              <li>
                <a href="https://cinemapersonified.medium.com/" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors flex items-center gap-1.5">
                  <span>Medium Publications</span>
                  <ExternalLink className="w-3 h-3 text-offwhite/30" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-offwhite/45 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} CINEMA PERSONIFIED. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-2 bg-primary/5 border border-offwhite/10 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_1.5s_infinite_cubic-bezier(0.4,0,0.6,1)]" />
            <span>SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
