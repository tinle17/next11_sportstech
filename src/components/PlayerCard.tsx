import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, Send, Eye, MapPin, Calendar, ChevronRight } from "lucide-react";
import type { Player } from "@/lib/mock-data";

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
  fitScore?: number;
  matchReasons?: string[];
}

const positionColors: Record<string, string> = {
  CAM: "from-primary to-emerald-400",
  ST: "from-red-500 to-orange-400",
  LB: "from-blue-500 to-cyan-400",
  CDM: "from-amber-500 to-yellow-400",
  GK: "from-violet-500 to-purple-400",
  CB: "from-slate-500 to-slate-300",
  RW: "from-pink-500 to-rose-400",
  LW: "from-teal-500 to-green-400",
};

const PlayerCard = ({ player, compact, fitScore, matchReasons }: PlayerCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const gradient = positionColors[player.position] || "from-primary to-emerald-400";

  return (
    <div className="w-full max-w-[380px] group">
      <motion.div
        className="relative min-h-[620px] cursor-pointer perspective-1000"
        onClick={() => setFlipped(!flipped)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 glass-card overflow-hidden border-2 border-transparent hover:border-primary/30 transition-colors shadow-2xl"
            >
              {/* Card header with position accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-6 h-full flex flex-col">
                {/* Top Row: Jersey, Position, Status, Fit Score */}
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl font-black text-foreground leading-none">
                      #{player.jerseyNumber}
                    </span>
                    <span className={`px-2 py-1 rounded text-[10px] font-black bg-gradient-to-r ${gradient} text-background uppercase w-fit`}>
                      {player.position}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    {/* Recruiting Status */}
                    <div className={`text-[10px] px-3 py-1 rounded-full border font-black uppercase tracking-[0.1em] whitespace-nowrap ${
                      player.recruitingStatus === "Available" 
                        ? "border-primary/40 text-primary bg-primary/5" 
                        : player.recruitingStatus === "Committed"
                        ? "border-red-500/40 text-red-400 bg-red-500/5"
                        : "border-amber-500/40 text-amber-400 bg-amber-500/5"
                    }`}>
                      {player.recruitingStatus}
                    </div>
                    
                    {/* Fit Score Badge - Sleek & Integrated */}
                    {fitScore !== undefined && (
                      <div className="bg-background/90 backdrop-blur-md border border-primary/40 rounded-md px-2 py-0.5 flex items-center gap-1 shadow-lg">
                        <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{fitScore}%</span>
                        <span className="text-[8px] font-bold text-foreground/50 uppercase tracking-widest">Fit</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Second Section: Player Headshot */}
                <div className="relative w-full h-72 flex-shrink-0 rounded-xl bg-secondary/30 mb-5 overflow-hidden border border-white/10 group-hover:bg-secondary/40 transition-colors shadow-inner">
                  {player.headshot && !imageError ? (
                    <img 
                      src={player.headshot} 
                      alt={player.name}
                      className="w-full h-full object-cover object-center transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <span className="font-display text-6xl font-black text-muted-foreground/40">
                        {player.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-40 pointer-events-none`} />
                  
                  {/* Quick View Overlay */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] bg-background/90 backdrop-blur px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-xl">
                      View Stats <ChevronRight className="w-3 h-3 text-primary" />
                    </span>
                  </div>
                </div>

                {/* Name & Match Intelligence */}
                <div className="mb-4">
                  <h3 className="font-display text-3xl font-black text-foreground leading-none tracking-tighter group-hover:text-primary transition-colors mb-2">
                    {player.name}
                  </h3>
                  
                  {/* Match Reason Tags - Clean & Subtle */}
                  {matchReasons && matchReasons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {matchReasons.map((reason) => (
                        <span key={reason} className="text-[9px] font-black uppercase tracking-widest text-primary/80 bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/10">
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {player.hometown}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Age {player.age}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Goals</span>
                    <span className="font-display text-2xl font-black text-foreground">{player.stats[0]?.goals || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Assists</span>
                    <span className="font-display text-2xl font-black text-foreground">{player.stats[0]?.assists || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Views</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-black text-primary">
                        {player.profileViews > 1000 ? `${(player.profileViews/1000).toFixed(1)}k` : player.profileViews}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 glass-card overflow-hidden border-2 border-primary/30 shadow-2xl"
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-2xl font-black italic text-foreground tracking-tighter">
                    SCOUTING <span className="text-primary">DATA</span>
                  </h3>
                  <span className="text-[10px] uppercase font-black text-primary tracking-widest">Close</span>
                </div>

                {/* Stats Table */}
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-black">Performance History</h4>
                  <div className="space-y-2">
                    {player.stats.map((s) => (
                      <div key={s.season} className="flex items-center justify-between text-xs bg-secondary/20 rounded-lg px-3 py-2.5 border border-white/5">
                        <span className="text-muted-foreground font-bold">{s.season}</span>
                        <div className="flex gap-4">
                          <span className="font-black">{s.gamesPlayed} <span className="text-[9px] text-muted-foreground font-normal">GP</span></span>
                          <span className="text-primary font-black">{s.goals} <span className="text-[9px] text-muted-foreground font-normal">G</span></span>
                          <span className="font-black">{s.assists} <span className="text-[9px] text-muted-foreground font-normal">A</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical Profile */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-secondary/20 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-muted-foreground text-[10px] uppercase font-black tracking-widest mb-1">Height</div>
                    <div className="font-display text-xl font-black text-foreground">{player.height}</div>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-muted-foreground text-[10px] uppercase font-black tracking-widest mb-1">Weight</div>
                    <div className="font-display text-xl font-black text-foreground">{player.weight}</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-black">Honors</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {player.achievements.map((a) => (
                      <span key={a} className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-sm font-black uppercase tracking-tight">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-black">Coach Contact</h4>
                  {player.coachReferences.slice(0, 1).map((r) => (
                    <div key={r.name} className="bg-secondary/20 p-3 rounded-lg border border-white/5">
                      <div className="text-foreground font-black text-sm">{r.name}</div>
                      <div className="text-primary text-xs font-medium mt-0.5">{r.contact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interaction Bar - Better Spacing & Alignment */}
      {!compact && (
        <div className="flex items-center justify-between px-2 mt-5">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
              className={`p-2.5 rounded-full transition-all duration-300 ${saved ? "text-primary bg-primary/10 scale-110" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
              title="Save Player"
            >
              <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              className={`p-2.5 rounded-full transition-all duration-300 ${liked ? "text-red-500 bg-red-500/10 scale-110" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
              title="Like Player"
            >
              <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              title="Share Profile"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}
              className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 hover:bg-primary hover:text-background transition-all"
            >
              {flipped ? "Hide Stats" : "Full Stats"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
