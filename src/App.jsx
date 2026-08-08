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
  Star,
  Menu
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import reviewsCatalog from './data/reviews_catalog.json';

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
    heroImage: "/curtain.png",
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
    heroImage: "/curtain.png",
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
    date: "June 5th, 2026",
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
    date: "March 11th, 2026",
    duration: "9 min watch",
    image: "https://img.youtube.com/vi/in9InwLroiQ/maxresdefault.jpg",
    url: "https://youtu.be/in9InwLroiQ"
  }
];

const articles = [
  {
    id: 1,
    pub: "HYPERREAL FILM JOURNAL",
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
    pub: "HYPERREAL FILM JOURNAL",
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
    pub: "HYPERREAL FILM JOURNAL",
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
  },
  {
    id: 4,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "SXSW 2024 Recap",
    desc: "My recap of the 2024 SXSW Film & TV Festival and all of the 17 premieres I went to",
    date: "March 24, 2024",
    readTime: "12 min read",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*jEmt4Zz844VestonBfB8bQ.jpeg",
    url: "https://cinemapersonified.medium.com/sxsw-2024-recap-08f65848fe94?source=user_profile_page---------0-------------501d68ab7f7d----------------------",
    bgPosition: "bg-center"
  },
  {
    id: 5,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "Piece by Piece Review",
    desc: "Expands storytelling possibilities with Lego animation",
    date: "October 11, 2024",
    readTime: "4 min read",
    image: "https://cdn-images-1.medium.com/max/1024/1*4VXTagyfJdW3KwxodaFcIw.jpeg",
    url: "https://cinemapersonified.medium.com/piece-by-piece-review-05adf932c079",
    bgPosition: "bg-center"
  },
  {
    id: 6,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "The Wild Robot Review",
    desc: "DreamWorks resurges as a competitor to Pixar",
    date: "September 27, 2024",
    readTime: "3 min read",
    image: "https://cdn-images-1.medium.com/max/1024/1*N0n1Y5O9VhU6pTibPPrnKA.jpeg",
    url: "https://cinemapersonified.medium.com/the-wild-robot-review-be52f509d577",
    bgPosition: "bg-center"
  },
  {
    id: 7,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "Transformers One Review",
    desc: "Only fitting it comes out right after the Linkin Park announcement",
    date: "September 20, 2024",
    readTime: "3 min read",
    image: "https://cdn-images-1.medium.com/max/1024/1*5X3XkDeTpVILvFls-NjcKA.jpeg",
    url: "https://cinemapersonified.medium.com/transformers-one-review-9c2baa0f2bc4",
    bgPosition: "bg-center"
  },
  {
    id: 8,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "Speak No Evil Review",
    desc: "Is this Blumhouse's last chance?",
    date: "September 14, 2024",
    readTime: "3 min read",
    image: "https://cdn-images-1.medium.com/max/1024/1*k5HmaBBrMUZm7x1VX15_rg.jpeg",
    url: "https://cinemapersonified.medium.com/speak-no-evil-review-9446b0b4c030",
    bgPosition: "bg-center"
  },
  {
    id: 9,
    pub: "MEDIUM",
    category: "Self-Published",
    title: "Hit Man Review",
    desc: "Is Austin the new LA?",
    date: "June 7, 2024",
    readTime: "3 min read",
    image: "https://cdn-images-1.medium.com/max/1000/1*XPL18gO7YW_iUqt7NKpAcg.jpeg",
    url: "https://cinemapersonified.medium.com/hit-man-review-36b12db5f832",
    bgPosition: "bg-top"
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
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  const categories = ["Published", "Self-Published"];
  const filteredArticles = articles.filter(a => a.category === activeCategory);
  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <section className="pt-36 pb-12 px-6 md:px-20 bg-offwhite min-h-[60vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">Pillar // 3</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none">
              Publications
            </h1>
            <p className="text-dark/60 mt-3 text-base max-w-xl font-sans">
              Deep dives into movies and the film festival circuit. An analysis of cinema in a long-form written format.
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
                  {featuredArticle.category === "Published" ? "Read Essay" : "Read Article"} <ArrowRight className="w-3.5 h-3.5" />
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
                      {article.category === "Published" ? "Read Essay" : "Read Article"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
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

        {/* SECTION 3: CALL TO ACTION CATALOG (Only for Self-Published tab) */}
        {activeCategory === "Self-Published" && (
          <div className="mt-20 pt-12 border-t border-dark/10 text-center">
            <p className="font-sans text-base text-dark/70 mb-6">
              Looking for more? See my full catalog below:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.open("https://cinemapersonified.medium.com/", "_blank", "noopener,noreferrer")}
                className="magnetic-btn bg-[#010101] text-[#FFFFFF] hover:text-[#010101] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-sm flex items-center gap-2 transition-colors duration-300"
              >
                <div className="bg-slide !bg-[#FFFFFF]" />
                <span>Medium →</span>
              </button>
            </div>
          </div>
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
function ReviewsPage({ navigateToSection, initialReviewId, setInitialReviewId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [decadeFilter, setDecadeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Detail review states
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("above"); // "above" | "below" | "final"

  // Average rating computation (of the full catalog)
  const averageRating = (
    reviewsCatalog.reduce((sum, r) => sum + r.rating, 0) / reviewsCatalog.length
  ).toFixed(1);

  // Trigger detailed review load
  const handleSelectReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsDetailLoading(true);
    setSelectedReview(null);
    setActiveTab("above");
    window.location.hash = `/reviews/${reviewId}`;

    fetch(`/reviews/${reviewId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Review not found");
        return res.json();
      })
      .then((data) => {
        setSelectedReview(data);
        setIsDetailLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsDetailLoading(false);
      });
  };

  const handleCloseReview = () => {
    setSelectedReviewId(null);
    setSelectedReview(null);
    window.location.hash = "";
  };

  // Sync with deep-linked initialReviewId from router
  useEffect(() => {
    if (initialReviewId !== null) {
      handleSelectReview(initialReviewId);
      setInitialReviewId(null);
    }
  }, [initialReviewId]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, ratingFilter, decadeFilter, typeFilter]);

  // Filtering Logic
  const filteredReviews = reviewsCatalog.filter((review) => {
    // 1. Search term match (title or year)
    const matchSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.release_year.toString().includes(searchTerm);

    // 2. Rating tier match
    let matchRating = true;
    if (ratingFilter === "cinema_personified") matchRating = review.rating >= 9.5;
    else if (ratingFilter === "great") matchRating = review.rating >= 9.0 && review.rating < 9.5;
    else if (ratingFilter === "very_good") matchRating = review.rating >= 8.5 && review.rating < 9.0;
    else if (ratingFilter === "good") matchRating = review.rating >= 8.0 && review.rating < 8.5;
    else if (ratingFilter === "pretty_good") matchRating = review.rating >= 7.0 && review.rating < 8.0;
    else if (ratingFilter === "decent") matchRating = review.rating >= 6.0 && review.rating < 7.0;
    else if (ratingFilter === "pretty_bad") matchRating = review.rating >= 5.0 && review.rating < 6.0;
    else if (ratingFilter === "bad") matchRating = review.rating >= 4.0 && review.rating < 5.0;
    else if (ratingFilter === "very_bad") matchRating = review.rating >= 3.0 && review.rating < 4.0;
    else if (ratingFilter === "terrible") matchRating = review.rating >= 1.0 && review.rating < 3.0;

    // 3. Decade match
    let matchDecade = true;
    if (decadeFilter === "2020s") matchDecade = review.release_year >= 2020;
    else if (decadeFilter === "2010s")
      matchDecade = review.release_year >= 2010 && review.release_year < 2020;
    else if (decadeFilter === "2000s")
      matchDecade = review.release_year >= 2000 && review.release_year < 2010;
    else if (decadeFilter === "90s")
      matchDecade = review.release_year >= 1990 && review.release_year < 2000;
    else if (decadeFilter === "classics") matchDecade = review.release_year < 1990;

    // 4. Type match
    let matchType = true;
    if (typeFilter === "redux") matchType = review.redux === true;
    else if (typeFilter === "standard") matchType = review.redux !== true;

    return matchSearch && matchRating && matchDecade && matchType;
  });

  // Sorting Logic
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
    return b.id - a.id; // newest (default)
  });

  // Pagination Logic
  const reviewsPerPage = 12;
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const isFreeFormat = selectedReview && typeof selectedReview.review === "string";

  // Helpers for Rendering detailed categories safely
  const formatPeople = (peopleList) => {
    if (!peopleList || peopleList.length === 0) return "";
    return peopleList.map((p) => p.name).join(", ");
  };

  const CritiqueCard = ({ label, content }) => {
    if (!content) return null;
    return (
      <div className="bg-white/50 border border-dark/10 rounded-[1.5rem] p-5 shadow-sm">
        <p className="font-mono text-[9px] text-accent uppercase tracking-widest mb-2 font-bold">// {label} //</p>
        <p className="text-sm font-sans leading-relaxed text-dark">{content}</p>
      </div>
    );
  };

  const CategoryCard = ({ title, peopleLabel, people, rating, comments }) => {
    if (!rating && !comments && (!people || people.length === 0)) return null;
    return (
      <div className="bg-white/50 border border-dark/10 rounded-[1.5rem] p-5 shadow-sm flex flex-col gap-2.5">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <p className="font-sans font-bold text-sm uppercase tracking-wider text-dark">{title}</p>
          {rating && (
            <span className="font-mono text-[9px] uppercase font-bold bg-accent/10 text-accent px-2 py-0.5 rounded">
              Rating: {rating}
            </span>
          )}
        </div>
        {people && people.length > 0 && (
          <p className="font-sans text-xs text-dark/70">
            <span className="font-mono text-[9px] text-dark/40 uppercase block mb-0.5">{peopleLabel}</span>
            {formatPeople(people)}
          </p>
        )}
        {comments && (
          <p className="text-xs font-sans leading-relaxed text-dark/80 border-t border-dark/5 pt-2 mt-1">
            {comments}
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="pt-36 pb-32 px-6 md:px-20 bg-offwhite min-h-[85vh] text-dark transition-colors duration-500 relative">
      <div className="max-w-6xl mx-auto text-left">
        {/* A. HEADER AREA */}
        <div className="border-b border-dark/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">Pillar // 1</p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight uppercase leading-none text-dark">
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

        {/* B. DATABASE STATS & CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Stats Box */}
          <div className="lg:col-span-1 bg-dark text-offwhite rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-pulse" />
            <div>
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">// SYSTEM METRICS //</p>
              <h3 className="text-xs uppercase font-sans font-bold text-offwhite/50 tracking-wider">LOGGED ARCHIVE</h3>
            </div>
            <div className="my-6">
              <div className="text-5xl font-extrabold font-sans text-accent tracking-tighter leading-none">
                {reviewsCatalog.length}
              </div>
              <p className="text-[10px] font-mono text-offwhite/40 mt-1 uppercase">Films Logged</p>
            </div>
            <div className="border-t border-offwhite/10 pt-4 flex justify-between text-xs">
              <div>
                <span className="font-mono text-accent block font-bold">{averageRating}/10</span>
                <span className="text-[9px] text-offwhite/40 uppercase font-mono">Avg Score</span>
              </div>
              <div>
                <span className="font-mono text-accent block font-bold">2001-2026</span>
                <span className="text-[9px] text-offwhite/40 uppercase font-mono">Years Covered</span>
              </div>
            </div>
          </div>

          {/* Filtering and Search Controls */}
          <div className="lg:col-span-3 bg-white/60 backdrop-blur-md border border-dark/10 rounded-[2rem] p-6 flex flex-col gap-6 shadow-sm">
            {/* Search and Sort Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <input 
                  type="text" 
                  placeholder="Search by title or year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-offwhite border border-dark/15 rounded-full px-5 py-3 text-sm font-sans tracking-tight text-dark placeholder-dark/45 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-offwhite border border-dark/15 rounded-full px-5 py-3 text-sm font-sans font-medium text-dark focus:outline-none focus:border-accent transition-colors cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="newest">Sort: Newest Logged</option>
                  <option value="oldest">Sort: Oldest Logged</option>
                  <option value="highest">Sort: Highest Rated</option>
                  <option value="lowest">Sort: Lowest Rated</option>
                  <option value="alphabetical">Sort: Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Filter Pills Grid */}
            <div className="flex flex-col gap-3.5">
              {/* Decade filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] text-dark/45 uppercase tracking-wider min-w-[70px]">Decade:</span>
                {["all", "2020s", "2010s", "2000s", "90s", "classics"].map((dec) => (
                  <button
                    key={dec}
                    onClick={() => setDecadeFilter(dec)}
                    className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      decadeFilter === dec 
                        ? "bg-accent border-accent text-offwhite font-bold" 
                        : "bg-offwhite border-dark/10 text-dark hover:border-dark/30"
                    }`}
                  >
                    {dec === "all" ? "All" : dec === "90s" ? "90s" : dec === "classics" ? "Classics (<90)" : dec}
                  </button>
                ))}
              </div>

              {/* Rating filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] text-dark/45 uppercase tracking-wider min-w-[70px]">Rating:</span>
                {[
                  { value: "all", label: "All" },
                  { value: "cinema_personified", label: "Cinema Personified (9.5+)" },
                  { value: "great", label: "Great (9.0-9.4)" },
                  { value: "very_good", label: "Very Good (8.5-8.9)" },
                  { value: "good", label: "Good (8.0-8.4)" },
                  { value: "pretty_good", label: "Pretty Good (7.0-7.9)" },
                  { value: "decent", label: "Decent (6.0-6.9)" },
                  { value: "pretty_bad", label: "Pretty Bad (5.0-5.9)" },
                  { value: "bad", label: "Bad (4.0-4.9)" },
                  { value: "very_bad", label: "Very Bad (3.0-3.9)" },
                  { value: "terrible", label: "Terrible (1.0-2.9)" }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => setRatingFilter(tier.value)}
                    className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      ratingFilter === tier.value 
                        ? "bg-accent border-accent text-offwhite font-bold" 
                        : "bg-offwhite border-dark/10 text-dark hover:border-dark/30"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Redux vs Standard filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] text-dark/45 uppercase tracking-wider min-w-[70px]">Type:</span>
                {[
                  { value: "all", label: "All Reviews" },
                  { value: "standard", label: "Standard Logs" },
                  { value: "redux", label: "Redux Reviews" }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setTypeFilter(type.value)}
                    className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      typeFilter === type.value 
                        ? "bg-accent border-accent text-offwhite font-bold" 
                        : "bg-offwhite border-dark/10 text-dark hover:border-dark/30"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* C. REVIEW CARDS GRID */}
        {filteredReviews.length === 0 ? (
          <div className="border border-dark/10 rounded-[2rem] p-16 text-center bg-white/40 my-8">
            <Sliders className="w-8 h-8 text-dark/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-sans text-dark uppercase tracking-tight">No reviews match filters</h3>
            <p className="text-sm text-dark/60 mt-2 font-sans">Try modifying your search or reset filters to view reviews.</p>
            <button 
              onClick={() => { setSearchTerm(""); setRatingFilter("all"); setDecadeFilter("all"); setTypeFilter("all"); }}
              className="mt-6 font-mono text-xs text-accent hover:underline uppercase tracking-wider font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedReviews.map((review) => (
                <div 
                  key={review.id}
                  onClick={() => handleSelectReview(review.id)}
                  className="bg-white/60 hover:bg-white border border-dark/10 hover:border-accent/40 rounded-[2rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[9px] text-dark/40 uppercase tracking-wider">
                        #{review.id} // {review.release_year}
                      </span>
                      {review.redux && (
                        <span className="bg-accent/15 text-accent text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide">
                          REDUX
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg md:text-xl font-extrabold font-sans uppercase tracking-tight text-dark mt-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {review.title}
                    </h4>
                  </div>
                  
                  <div className="mt-6 border-t border-dark/5 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-black font-sans text-accent tracking-tighter">
                          {review.rating}
                        </span>
                        <span className="text-[10px] font-mono text-dark/40">/10</span>
                      </div>
                      <span className="font-mono text-[10px] text-dark/40 uppercase group-hover:text-accent transition-colors flex items-center gap-1">
                        Breakdown <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    {/* Progress score bar */}
                    <div className="w-full bg-dark/5 h-1 rounded-full overflow-hidden mt-3">
                      <div className="bg-accent h-full rounded-full transition-all duration-500" style={{ width: `${review.rating * 10}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* D. PAGINATION NAVIGATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-full border border-dark/10 bg-white/60 hover:bg-white text-dark disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                >
                  Prev
                </button>
                
                {/* Pages List */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    // Render truncated page numbers if total pages is large
                    if (
                      totalPages > 6 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      Math.abs(pageNum - currentPage) > 1
                    ) {
                      if (pageNum === 2 && currentPage > 3) return <span key={pageNum} className="px-1 text-dark/40">...</span>;
                      if (pageNum === totalPages - 1 && currentPage < totalPages - 2) return <span key={pageNum} className="px-1 text-dark/40">...</span>;
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-dark border-dark text-offwhite"
                            : "border-dark/10 bg-white/60 hover:bg-white text-dark"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-full border border-dark/10 bg-white/60 hover:bg-white text-dark disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* E. DETAIL DRAWER / OVERLAY MODAL */}
        {selectedReviewId && (
          <div className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div className="bg-[#FAF8F5] text-dark rounded-[2.5rem] w-full max-w-5xl h-[85vh] md:h-[80vh] flex flex-col relative overflow-hidden shadow-2xl border border-dark/10 animate-fade-in">
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-dark/10 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {selectedReview && selectedReview.redux && (
                      <span className="bg-accent text-offwhite text-[9px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded">
                        REDUX REVIEW
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-dark/40 uppercase tracking-wider">
                      // ID #{selectedReviewId} {selectedReview && `// RELEASED ${selectedReview.release_year}`} {selectedReview && selectedReview.review_date && `// LOGGED ${selectedReview.review_date}`} //
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold font-sans tracking-tight uppercase mt-2 leading-none text-dark">
                    {selectedReview ? selectedReview.title : "Loading Review..."}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2">
                  {selectedReview && selectedReview.imdb_id && (
                    <button 
                      onClick={() => window.open(`https://www.imdb.com/title/${selectedReview.imdb_id}`, "_blank", "noopener,noreferrer")}
                      className="p-2.5 rounded-full border border-dark/10 hover:border-accent hover:text-accent transition-all text-dark/60"
                      title="View on IMDb"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={handleCloseReview}
                    className="p-2.5 rounded-full bg-dark text-offwhite hover:bg-accent transition-all shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {isDetailLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
                    <p className="font-mono text-xs text-dark/50 uppercase tracking-widest">Fetching review catalog assets...</p>
                  </div>
                ) : selectedReview ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Stats Column */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-0">
                      {/* Overall Score Box */}
                      <div className="bg-dark text-offwhite rounded-[2rem] p-6 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                        <p className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1">// OVERALL VERDICT //</p>
                        <div className="text-6xl md:text-7xl font-extrabold font-sans text-accent tracking-tighter leading-none">
                          {selectedReview.rating}
                          <span className="text-sm text-offwhite/40 font-normal">/10</span>
                        </div>
                        {selectedReview.review && selectedReview.review.overall && (
                          <p className="text-xs italic text-offwhite/85 mt-4 leading-relaxed font-sans border-t border-offwhite/10 pt-4 w-full text-center">
                            "{selectedReview.review.overall}"
                          </p>
                        )}
                      </div>

                      {/* Info Panel */}
                      <div className="border border-dark/10 rounded-[2rem] p-5 bg-white/50 flex flex-col gap-3.5 text-xs font-sans">
                        <p className="font-mono text-[9px] text-dark/40 uppercase tracking-widest border-b border-dark/5 pb-2">// DIRECTORY METADATA //</p>
                        {!isFreeFormat && selectedReview.review ? (
                          <>
                            <div>
                              <span className="font-mono text-[9px] text-dark/40 uppercase block">Directed by:</span>
                              <span className="font-bold text-dark">{formatPeople(selectedReview.review.direction?.director) || "N/A"}</span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-dark/40 uppercase block">Written by (Story):</span>
                              <span className="font-bold text-dark">{formatPeople(selectedReview.review.story?.writer) || "N/A"}</span>
                            </div>
                            {selectedReview.review.score?.composer && (
                              <div>
                                <span className="font-mono text-[9px] text-dark/40 uppercase block">Music by:</span>
                                <span className="font-bold text-dark">{formatPeople(selectedReview.review.score.composer)}</span>
                              </div>
                            )}
                            {selectedReview.review.cinematography?.cinematographer && (
                              <div>
                                <span className="font-mono text-[9px] text-dark/40 uppercase block">Cinematography:</span>
                                <span className="font-bold text-dark">{formatPeople(selectedReview.review.cinematography.cinematographer)}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div>
                            <span className="font-mono text-[9px] text-dark/40 uppercase block">Film Title:</span>
                            <span className="font-bold text-dark">{selectedReview.title} ({selectedReview.release_year})</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Narrative/Breakdown Column */}
                    <div className="lg:col-span-2">
                      {isFreeFormat ? (
                        /* Free Format Render */
                        <div className="bg-white/70 border border-dark/10 rounded-[2rem] p-6 md:p-8 font-sans leading-relaxed text-dark text-base whitespace-pre-line shadow-sm">
                          <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 font-bold border-b border-dark/5 pb-3">// FULL NOTES ARCHIVE //</p>
                          {selectedReview.review}
                        </div>
                      ) : (
                        /* Structured Tabbed View */
                        <div className="flex flex-col gap-6">
                          {/* Tabs selector */}
                          <div className="flex border border-dark/10 rounded-full bg-white/60 p-1.5 self-start">
                            {[
                              { id: "above", label: "Above the Line" },
                              { id: "below", label: "Below the Line" },
                              { id: "final", label: "Final Notes" }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`font-mono text-[9px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 font-bold ${
                                  activeTab === tab.id 
                                    ? "bg-dark text-offwhite shadow-sm" 
                                    : "text-dark/60 hover:text-dark"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content panels */}
                          <div className="flex flex-col gap-4">
                            {activeTab === "above" && (
                              <>
                                <CategoryCard 
                                  title="Direction" 
                                  peopleLabel="Directors" 
                                  people={selectedReview.review.direction?.director} 
                                  rating={selectedReview.review.direction?.rating} 
                                  comments={selectedReview.review.direction?.comments} 
                                />
                                <CategoryCard 
                                  title="Story & Writing" 
                                  peopleLabel="Writers" 
                                  people={selectedReview.review.story?.writer} 
                                  rating={selectedReview.review.story?.rating} 
                                  comments={selectedReview.review.story?.comments} 
                                />
                                <CategoryCard 
                                  title="Screenplay & Dialogue" 
                                  peopleLabel="Screenplay Credits" 
                                  people={selectedReview.review.screenplay?.writer} 
                                  rating={selectedReview.review.screenplay?.rating} 
                                  comments={selectedReview.review.screenplay?.comments} 
                                />
                                
                                {/* Detailed Performances list */}
                                {selectedReview.review.acting && (
                                  <div className="bg-white/50 border border-dark/10 rounded-[1.5rem] p-5 shadow-sm flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-dark/5 pb-2">
                                      <h5 className="font-sans font-bold text-sm uppercase tracking-wider text-dark">Acting & Ensemble</h5>
                                      {selectedReview.review.acting.rating && (
                                        <span className="font-mono text-[9px] uppercase font-bold bg-accent/10 text-accent px-2 py-0.5 rounded">
                                          Overall: {selectedReview.review.acting.rating}
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Performances grid */}
                                    {selectedReview.review.acting.performance && selectedReview.review.acting.performance.length > 0 && (
                                      <div className="flex flex-col gap-4">
                                        {selectedReview.review.acting.performance.map((perf, idx) => (
                                          <div key={idx} className="text-xs font-sans border-b border-dark/5 last:border-0 pb-3 last:pb-0">
                                            <div className="flex justify-between items-center font-bold text-dark mb-1">
                                              <span>{perf.actor?.name}</span>
                                              <span className="font-mono text-[9px] uppercase text-accent font-semibold">{perf.rating}</span>
                                            </div>
                                            {perf.comments && <p className="text-dark/70 leading-relaxed italic">"{perf.comments}"</p>}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Cast commentary */}
                                    {selectedReview.review.acting.cast && (
                                      <div className="bg-dark/5 p-3 rounded-xl text-xs font-sans">
                                        <span className="font-mono text-[9px] text-dark/40 uppercase block mb-1">Cast Ensemble Comments // Rating: {selectedReview.review.acting.cast.rating}</span>
                                        {selectedReview.review.acting.cast.comments && <p className="text-dark/80 italic">"{selectedReview.review.acting.cast.comments}"</p>}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}

                            {activeTab === "below" && (
                              <>
                                <CategoryCard 
                                  title="Score & Musical Theme" 
                                  peopleLabel="Composers" 
                                  people={selectedReview.review.score?.composer} 
                                  rating={selectedReview.review.score?.rating} 
                                  comments={selectedReview.review.score?.comments} 
                                />
                                {selectedReview.review.soundtrack && (
                                  <CategoryCard 
                                    title="Soundtrack (Licensing)" 
                                    rating={selectedReview.review.soundtrack.rating} 
                                    comments={selectedReview.review.soundtrack.comments} 
                                  />
                                )}
                                <CategoryCard 
                                  title="Cinematography" 
                                  peopleLabel="Cinematographers" 
                                  people={selectedReview.review.cinematography?.cinematographer} 
                                  rating={selectedReview.review.cinematography?.rating} 
                                  comments={selectedReview.review.cinematography?.comments} 
                                />
                                <CategoryCard 
                                  title="Editing & Transitions" 
                                  peopleLabel="Editors" 
                                  people={selectedReview.review.editing?.editor} 
                                  rating={selectedReview.review.editing?.rating} 
                                  comments={selectedReview.review.editing?.comments} 
                                />
                                {selectedReview.review.sound && (
                                  <CategoryCard 
                                    title="Sound Design & Mixing" 
                                    rating={selectedReview.review.sound.rating} 
                                    comments={selectedReview.review.sound.comments} 
                                  />
                                )}
                                {selectedReview.review.visual_effects && (
                                  <CategoryCard 
                                    title="Visual Effects" 
                                    rating={selectedReview.review.visual_effects.rating} 
                                    comments={selectedReview.review.visual_effects.comments} 
                                  />
                                )}
                                {selectedReview.review.animation && (
                                  <CategoryCard 
                                    title="Animation & Art style" 
                                    rating={selectedReview.review.animation.rating} 
                                    comments={selectedReview.review.animation.comments} 
                                  />
                                )}
                                {selectedReview.review.production_design && (
                                  <CategoryCard 
                                    title="Production Design (Set/Art)" 
                                    rating={selectedReview.review.production_design.rating} 
                                    comments={selectedReview.review.production_design.comments} 
                                  />
                                )}
                                {selectedReview.review.makeup && (
                                  <CategoryCard 
                                    title="Makeup & Hair" 
                                    rating={selectedReview.review.makeup.rating} 
                                    comments={selectedReview.review.makeup.comments} 
                                  />
                                )}
                                {selectedReview.review.costumes && (
                                  <CategoryCard 
                                    title="Costumes & Styling" 
                                    rating={selectedReview.review.costumes.rating} 
                                    comments={selectedReview.review.costumes.comments} 
                                  />
                                )}
                              </>
                            )}

                            {activeTab === "final" && (
                              <>
                                <CritiqueCard label="Plot Structure" content={selectedReview.review.plot_structure} />
                                <CritiqueCard label="Pacing & Timing" content={selectedReview.review.pacing} />
                                <CritiqueCard label="Climax Breakdown" content={selectedReview.review.climax} />
                                <CritiqueCard label="Tone & Atmospherics" content={selectedReview.review.tone} />
                                <CritiqueCard label="Final Notes" content={selectedReview.review.final_notes} />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="font-sans text-dark/50">Error rendering review details.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
      date: "June 5th, 2026",
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
      date: "March 11th, 2026",
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
      date: "April 25th, 2025",
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
              A repository of movie reviews, film festival vlogs, and Oscars predictions for both short and long-form content.
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
              Short-form Videos (Highlights)
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
              className="magnetic-btn bg-[#010101] text-[#FFFFFF] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full overflow-hidden shadow-sm flex items-center gap-2"
            >
              <div className="bg-slide !bg-[#EE1D52]" />
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
                  className="magnetic-btn bg-[#010101] text-[#FFFFFF] font-sans text-[10px] uppercase tracking-wider font-bold py-2 rounded-full overflow-hidden shadow-sm"
                >
                  <div className="bg-slide !bg-[#EE1D52]" />
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
  const activePresetKey = "b";
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

  // --- DYNAMIC BROWSER TAB TITLE ---
  useEffect(() => {
    const titles = {
      home: "Cinema Personified — Film Critique & Curation",
      publications: "Publications — Cinema Personified",
      reviews: "Reviews — Cinema Personified",
      videos: "Videos — Cinema Personified",
      about: "About — Cinema Personified"
    };
    document.title = titles[currentView] || "Cinema Personified";
  }, [currentView]);

  // --- NAVBAR SCROLL DETECTOR & THEME TRACKER ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarDarkBg, setIsNavbarDarkBg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [initialReviewId, setInitialReviewId] = useState(null);

  // Parse deep-linking parameter on mount
  useEffect(() => {
    // 1. Check query parameter (e.g. ?review=244)
    const params = new URLSearchParams(window.location.search);
    const queryReviewId = params.get("review");
    if (queryReviewId) {
      setInitialReviewId(Number(queryReviewId));
      setCurrentView("reviews");
      return;
    }

    // 2. Check hash parameter (e.g. #/reviews/244)
    const hash = window.location.hash;
    const match = hash.match(/#\/reviews\/(\d+)/);
    if (match) {
      setInitialReviewId(Number(match[1]));
      setCurrentView("reviews");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (currentView !== "home") {
        setIsNavbarDarkBg(false);
        return;
      }

      // Check if navbar (at top: 24px, approx height 50px) overlaps a dark section
      // Let's use 50px from viewport top as the scanning line
      const threshold = 50;
      const darkSections = ["hero", "videos"];
      let overDark = false;

      // In the white top strip (scrollY < 96), it's definitely light background
      if (scrollY < 96) {
        setIsNavbarDarkBg(false);
        return;
      }

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom >= threshold) {
            overDark = true;
            break;
          }
        }
      }
      setIsNavbarDarkBg(overDark);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentView]);



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



  // Navigates to a specific section on the home page, switching views if necessary
  const navigateToSection = (sectionId) => {
    setCurrentView("home");
    setTimeout(() => {
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <div className={`relative overflow-x-hidden min-h-screen ${activePreset.className}`}>
      
      {/* GLOBAL SVG NOISE OVERLAY */}
      <div className="noise-overlay" />



      {/* A. NAVBAR — "The Floating Island" */}
      <nav 
        ref={navbarRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-full px-6 py-3 transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? (isNavbarDarkBg 
                ? "bg-dark/80 backdrop-blur-xl border border-offwhite/10 shadow-lg" 
                : "bg-offwhite/85 backdrop-blur-xl border border-dark/10 shadow-lg")
            : "bg-transparent border border-transparent"
        }`}
      >
        <button onClick={() => navigateToSection("hero")} className="font-sans font-bold text-lg tracking-tight flex items-center gap-2">
          <Film className="w-5 h-5 text-accent" />
          <span className={`${isNavbarDarkBg ? "text-offwhite" : "text-dark"} font-sans transition-colors duration-500`}>Cinema Personified</span>
        </button>
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-tight">
          <button 
            onClick={() => navigateToSection("features")} 
            className={`transition-all duration-500 hover:text-accent ${
              isNavbarDarkBg 
                ? "text-offwhite opacity-85 hover:opacity-100" 
                : "text-dark opacity-75 hover:opacity-100"
            }`}
          >
            Pillars
          </button>
          <button 
            onClick={() => { setCurrentView("reviews"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-all duration-500 hover:text-accent ${
              currentView === "reviews" 
                ? "text-accent font-bold opacity-100" 
                : (isNavbarDarkBg ? "text-offwhite opacity-85 hover:opacity-100" : "text-dark opacity-75 hover:opacity-100")
            }`}
          >
            Reviews
          </button>
          <button 
            onClick={() => { setCurrentView("videos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-all duration-500 hover:text-accent ${
              currentView === "videos" 
                ? "text-accent font-bold opacity-100" 
                : (isNavbarDarkBg ? "text-offwhite opacity-85 hover:opacity-100" : "text-dark opacity-75 hover:opacity-100")
            }`}
          >
            Videos
          </button>
          <button 
            onClick={() => { setCurrentView("publications"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-all duration-500 hover:text-accent ${
              currentView === "publications" 
                ? "text-accent font-bold opacity-100" 
                : (isNavbarDarkBg ? "text-offwhite opacity-85 hover:opacity-100" : "text-dark opacity-75 hover:opacity-100")
            }`}
          >
            Publications
          </button>
          <button 
            onClick={() => { setCurrentView("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition-all duration-500 hover:text-accent ${
              currentView === "about" 
                ? "text-accent font-bold opacity-100" 
                : (isNavbarDarkBg ? "text-offwhite opacity-85 hover:opacity-100" : "text-dark opacity-75 hover:opacity-100")
            }`}
          >
            About
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.open("https://linktr.ee/cinemapersonified", "_blank", "noopener,noreferrer")} 
            className="magnetic-btn bg-accent text-offwhite font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-3 sm:px-5 rounded-full overflow-hidden whitespace-nowrap"
          >
            <div className="bg-slide" />
            <span className="hidden sm:inline">FOLLOW CINEMA PERSONIFIED</span>
            <span className="sm:hidden">FOLLOW</span>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-full transition-all duration-300 ${
              isNavbarDarkBg 
                ? "text-offwhite hover:bg-offwhite/10" 
                : "text-dark hover:bg-dark/10"
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div 
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-[2rem] p-6 md:hidden flex flex-col gap-4 shadow-2xl border ${
            isNavbarDarkBg 
              ? "bg-dark/95 backdrop-blur-2xl border-offwhite/10 text-offwhite" 
              : "bg-offwhite/95 backdrop-blur-2xl border-dark/10 text-dark"
          } animate-mobile-menu`}
        >
          <button 
            onClick={() => { navigateToSection("features"); setIsMobileMenuOpen(false); }}
            className="text-left font-sans text-xs uppercase tracking-wider font-bold py-3.5 border-b border-current/10 hover:text-accent transition-colors"
          >
            Pillars
          </button>
          <button 
            onClick={() => { setCurrentView("reviews"); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className={`text-left font-sans text-xs uppercase tracking-wider font-bold py-3.5 border-b border-current/10 hover:text-accent transition-colors ${
              currentView === "reviews" ? "text-accent" : ""
            }`}
          >
            Reviews
          </button>
          <button 
            onClick={() => { setCurrentView("videos"); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className={`text-left font-sans text-xs uppercase tracking-wider font-bold py-3.5 border-b border-current/10 hover:text-accent transition-colors ${
              currentView === "videos" ? "text-accent" : ""
            }`}
          >
            Videos
          </button>
          <button 
            onClick={() => { setCurrentView("publications"); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className={`text-left font-sans text-xs uppercase tracking-wider font-bold py-3.5 border-b border-current/10 hover:text-accent transition-colors ${
              currentView === "publications" ? "text-accent" : ""
            }`}
          >
            Publications
          </button>
          <button 
            onClick={() => { setCurrentView("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            className={`text-left font-sans text-xs uppercase tracking-wider font-bold py-3.5 hover:text-accent transition-colors ${
              currentView === "about" ? "text-accent" : ""
            }`}
          >
            About
          </button>
        </div>
      )}

      {/* VIEW CONTROLLER BLOCK */}
      <main id="main-content">
        {currentView === "publications" ? (
        <PublicationsPage navigateToSection={navigateToSection} />
      ) : currentView === "reviews" ? (
        <ReviewsPage 
          navigateToSection={navigateToSection} 
          initialReviewId={initialReviewId}
          setInitialReviewId={setInitialReviewId}
        />
      ) : currentView === "videos" ? (
        <VideosPage navigateToSection={navigateToSection} />
      ) : currentView === "about" ? (
        <AboutPage navigateToSection={navigateToSection} />
      ) : (
        <>
          {/* White Background Strip Above Hero */}
          <div className="w-full h-24 bg-offwhite border-b border-dark/10" />

          {/* B. HERO SECTION — "The Opening Shot" */}
          <section 
            id="hero" 
            ref={heroRef}
            className="relative h-[60vh] md:h-auto md:aspect-[2.39/1] w-full flex items-end justify-start p-8 md:p-20 overflow-hidden bg-dark transition-all duration-500"
          >
            {/* Background Image with Heavy Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_top_-10%] opacity-90 scale-105 transition-all duration-750"
              style={{ backgroundImage: `url('${activePreset.heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

            {/* Content pushed to bottom-left third */}
            <div className="relative z-10 max-w-4xl text-left">
              <p ref={heroSubheadingRef} className="font-mono text-accent text-xs md:text-sm uppercase tracking-[0.25em] mb-4 transition-colors duration-500">
                — WORLD-CLASS FILM CONTENT & REVIEWS
              </p>
              <h1 ref={heroHeadingRef} className="text-5xl md:text-8xl font-bold tracking-tighter text-offwhite flex flex-col gap-1 leading-[0.9]">
                <span className="font-sans font-extrabold uppercase transition-all duration-500">Cinema</span>
                <span className="font-drama text-accent text-7xl md:text-9xl mt-2 italic tracking-normal no-ligatures transition-all duration-500">Personified.</span>
              </h1>

              <div ref={heroCtaRef} className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button 
                  onClick={() => window.open("https://linktr.ee/cinemapersonified", "_blank", "noopener,noreferrer")}
                  className="magnetic-btn bg-accent text-offwhite font-sans text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden"
                >
                  <div className="bg-slide" />
                  <span>FOLLOW CINEMA PERSONIFIED</span>
                </button>
                <button 
                  onClick={() => navigateToSection("features")} 
                  className="group flex items-center gap-2 text-offwhite hover:text-accent font-mono text-xs uppercase tracking-widest transition-colors py-3"
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
                  <h3 className="text-2xl font-bold tracking-tight font-sans mb-2 transition-all duration-500">Cinematic Videos</h3>
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
                  A repository of movie reviews, film festival vlogs, and Oscars predictions for both short and long-form content.
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
                  Deep dives into movies and the film festival circuit. An analysis of cinema in a long-form written format.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.filter(article => article.category === "Published").map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      window.open(article.url, "_blank", "noopener,noreferrer");
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
                        {article.category}
                      </span>
                    </div>

                    {/* Metadata & Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-accent mb-2">
                          <span>{article.pub}</span>
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
                          {article.category === "Published" ? "Read Essay" : "Read Article"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
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
      </main>

      {/* G. FOOTER */}
      <footer className="bg-dark text-offwhite rounded-t-[4rem] pt-16 pb-12 px-8 md:px-20 relative overflow-hidden transition-colors duration-500">
        

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
                <p className="text-[10px] font-mono text-accent uppercase tracking-widest mt-1 transition-colors duration-500">Austin, TX // Film Critic & Content Creator</p>
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
