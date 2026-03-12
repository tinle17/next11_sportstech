import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNav from "@/components/AppNav";
import PlayerCard from "@/components/PlayerCard";
import { mockPlayers } from "@/lib/mock-data";
import { Filter, Eye, Search, SlidersHorizontal, MapPin, Calendar, Trophy, X, Sparkles } from "lucide-react";

const positions = ["All", "CAM", "ST", "LB", "CDM", "GK", "CB", "RW", "LW"];
const ages = ["All", "15", "16", "17", "18"];
const locations = ["All", "TX", "FL", "WA", "CO"];
const recruitingStatuses = ["All", "Available", "Exploring", "Committed"];
const sortOptions = [
  { label: "Best Match", value: "best" },
  { label: "Newest", value: "newest" },
  { label: "Most Viewed", value: "views" }
];

const ScoutDiscover = () => {
  const [posFilter, setPosFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("best");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");

  // Parse AI Search Query
  const aiFilters = useMemo(() => {
    if (!aiQuery) return null;
    const q = aiQuery.toLowerCase();
    const filters: any = {};
    
    const posMap: Record<string, string> = {
      "striker": "ST", "forward": "ST", "st": "ST",
      "midfielder": "CAM", "cam": "CAM", "cdm": "CDM",
      "defender": "CB", "cb": "CB", "lb": "LB", "rb": "RB",
      "winger": "RW", "rw": "RW", "lw": "LW",
      "goalkeeper": "GK", "gk": "GK"
    };
    for (const [key, val] of Object.entries(posMap)) {
      if (q.includes(key)) { filters.position = val; break; }
    }
    
    const ageMatch = q.match(/\b(15|16|17|18)\b/);
    if (ageMatch) filters.age = ageMatch[0];
    
    const locMap: Record<string, string> = {
      "texas": "TX", "tx": "TX", "florida": "FL", "fl": "FL",
      "washington": "WA", "wa": "WA", "colorado": "CO", "co": "CO"
    };
    for (const [key, val] of Object.entries(locMap)) {
      if (q.includes(key)) { filters.location = val; break; }
    }
    
    if (q.includes("available")) filters.status = "Available";
    if (q.includes("committed")) filters.status = "Committed";
    if (q.includes("exploring")) filters.status = "Exploring";
    if (q.includes("high views") || q.includes("popular") || q.includes("engagement") || q.includes("views")) {
      filters.engagement = true;
    }
    
    return Object.keys(filters).length > 0 ? filters : null;
  }, [aiQuery]);

  // Calculate Fit Score and Match Reasons for a player
  const calculateMatch = (player: any) => {
    let score = 0;
    const reasons: string[] = [];

    // Use AI filters if present, otherwise use manual filters
    const activePos = aiFilters?.position || posFilter;
    const activeAge = aiFilters?.age || ageFilter;
    const activeLoc = aiFilters?.location || locFilter;
    const activeStatus = aiFilters?.status || statusFilter;
    const activeEngagement = aiFilters?.engagement || false;

    if (activePos !== "All" && player.position === activePos) {
      score += 40;
      reasons.push("Right Position");
    }
    if (activeAge !== "All" && player.age.toString() === activeAge) {
      score += 20;
      reasons.push("Target Age");
    }
    if (activeLoc !== "All" && player.hometown.includes(activeLoc)) {
      score += 20;
      reasons.push(`In ${activeLoc}`);
    }
    if (activeStatus !== "All" && player.recruitingStatus === activeStatus) {
      score += 20;
      reasons.push(player.recruitingStatus === "Available" ? "Available Now" : "Target Status");
    } else if (activeStatus === "All" && player.recruitingStatus === "Available") {
      reasons.push("Available Now");
    }

    if (activeEngagement && player.profileViews > 3000) {
      score += 10;
      reasons.push("High Engagement");
    } else if (!activeEngagement && player.profileViews > 3000) {
      // Bonus for high engagement even if not searched
      score += 5;
    }

    return {
      score: Math.min(score, 100),
      reasons: reasons.slice(0, 3)
    };
  };

  const filtered = useMemo(() => {
    const playersWithScores = mockPlayers.map(p => ({
      ...p,
      match: calculateMatch(p)
    }));

    const activePos = aiFilters?.position || posFilter;
    const activeAge = aiFilters?.age || ageFilter;
    const activeLoc = aiFilters?.location || locFilter;
    const activeStatus = aiFilters?.status || statusFilter;

    return playersWithScores
      .filter((p) => activePos === "All" || p.position === activePos)
      .filter((p) => activeAge === "All" || p.age.toString() === activeAge)
      .filter((p) => activeLoc === "All" || p.hometown.includes(activeLoc))
      .filter((p) => activeStatus === "All" || p.recruitingStatus === activeStatus)
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sort === "best" || aiFilters) return b.match.score - a.match.score;
        if (sort === "views") return b.profileViews - a.profileViews;
        return b.id.localeCompare(a.id);
      });
  }, [posFilter, ageFilter, locFilter, statusFilter, sort, searchQuery, aiFilters]);

  const clearFilters = () => {
    setPosFilter("All");
    setAgeFilter("All");
    setLocFilter("All");
    setStatusFilter("All");
    setSearchQuery("");
    setAiQuery("");
    setSort("best");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppNav />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Scouting Intelligence</span>
            </div>
            <h1 className="font-display text-5xl font-black italic tracking-tighter">
              DISCOVER <span className="text-primary">TALENT</span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-[450px]">
            {/* AI Search Assistant Bar */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-emerald-500/50 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-secondary/50 backdrop-blur-xl border border-white/10 rounded-xl p-1 shadow-2xl">
                <div className="flex items-center justify-center w-10 h-10 text-primary">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <input 
                  type="text" 
                  placeholder="Describe the player you need... (e.g. 17yo striker in Texas)"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none py-2 px-2 text-sm focus:outline-none placeholder:text-muted-foreground/50"
                />
                {aiQuery && (
                  <button 
                    onClick={() => setAiQuery("")}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Simple Name Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input 
                type="text" 
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/20 border border-border/30 rounded-lg py-2 pl-9 pr-4 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* AI Search Summary */}
        {aiFilters && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/20 rounded-lg"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-foreground/80">
              Showing best matches for: <span className="text-primary font-bold italic">
                {[
                  aiFilters.age ? `${aiFilters.age}-year-old` : null,
                  aiFilters.position ? aiFilters.position : null,
                  aiFilters.location ? `in ${aiFilters.location}` : null,
                  aiFilters.status ? aiFilters.status.toLowerCase() : null,
                  aiFilters.engagement ? "high engagement" : null
                ].filter(Boolean).join(", ")}
              </span>
            </span>
          </motion.div>
        )}

        {/* Scout Needs Panel */}
        <div className="glass-card p-6 mb-8 border-l-4 border-l-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <SlidersHorizontal className="w-24 h-24" />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold leading-none">Scout Needs</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Define your target profile to calculate match scores</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Position */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block mb-3">Desired Position</span>
              <div className="flex flex-wrap gap-1.5">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosFilter(pos)}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all uppercase border ${
                      posFilter === pos 
                        ? "bg-primary text-background border-primary shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                        : "bg-secondary/30 text-muted-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block mb-3">Target Age</span>
              <div className="flex gap-1.5">
                {ages.map((age) => (
                  <button
                    key={age}
                    onClick={() => setAgeFilter(age)}
                    className={`w-9 h-7 flex items-center justify-center rounded text-[10px] font-bold transition-all border ${
                      ageFilter === age 
                        ? "bg-primary text-background border-primary" 
                        : "bg-secondary/30 text-muted-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block mb-3">Preferred Region</span>
              <div className="flex gap-1.5">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocFilter(loc)}
                    className={`px-3 h-7 flex items-center justify-center rounded text-[10px] font-bold transition-all uppercase border ${
                      locFilter === loc 
                        ? "bg-primary text-background border-primary" 
                        : "bg-secondary/30 text-muted-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block mb-3">Recruiting Status</span>
              <div className="flex flex-wrap gap-1.5">
                {recruitingStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all uppercase border ${
                      statusFilter === status 
                        ? "bg-primary text-background border-primary" 
                        : "bg-secondary/30 text-muted-foreground border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Sort By</span>
                <div className="flex bg-secondary/30 p-1 rounded border border-border/50">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSort(opt.value)}
                      className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                        sort === opt.value 
                          ? "bg-secondary text-primary shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Found <span className="text-primary font-bold">{filtered.length}</span> Prospects
              </span>
            </div>
            
            {(posFilter !== "All" || ageFilter !== "All" || locFilter !== "All" || statusFilter !== "All" || searchQuery) && (
              <button 
                onClick={clearFilters}
                className="text-[10px] uppercase font-bold text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Reset Needs
              </button>
            )}
          </div>
        </div>

        {/* Discovery Feed */}
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((player, i) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col lg:flex-row gap-8 items-stretch"
              >
                {/* Player Card Column */}
                <div className="flex-shrink-0 flex justify-center lg:justify-start">
                  <PlayerCard 
                    player={player} 
                    fitScore={player.match.score}
                    matchReasons={player.match.reasons}
                  />
                </div>
                
                {/* Pinned Video & Highlights Column */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="glass-card overflow-hidden flex flex-col h-full border-2 border-transparent hover:border-primary/20 transition-all group">
                    <div className="relative aspect-video bg-secondary/30">
                      <iframe
                        src={player.videos.find(v => v.isPinned)?.url || "https://www.youtube.com/embed/RANzfjekkAw"}
                        title={player.videos.find(v => v.isPinned)?.title || "Highlight Reel"}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-background text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest shadow-lg">
                          Pinned Highlight
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex items-center justify-between bg-gradient-to-r from-secondary/50 to-transparent">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {player.videos.find(v => v.isPinned)?.title || "Season Highlight Reel"}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Eye className="w-3.5 h-3.5 text-primary" />
                            <span className="font-bold">{(player.videos.find(v => v.isPinned)?.views || 0).toLocaleString()}</span> views
                          </div>
                          <div className="w-1 h-1 rounded-full bg-border" />
                          <div className="text-xs text-muted-foreground font-medium">
                            Uploaded 2 weeks ago
                          </div>
                        </div>
                      </div>
                      <button className="bg-primary/10 hover:bg-primary text-primary hover:text-background p-3 rounded-full transition-all border border-primary/20">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6 border border-border/50">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-2">No Talent Found</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              We couldn't find any players matching your current filters. Try adjusting your search criteria.
            </p>
            <button 
              onClick={clearFilters}
              className="px-8 py-3 bg-primary text-background font-black uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ScoutDiscover;
