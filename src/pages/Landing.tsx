const Landing = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
    <div className="text-center">
      <h1 className="text-6xl font-black italic mb-4">NEXT<span className="text-primary">11</span></h1>
      <p className="text-muted-foreground mb-8">The future of youth soccer scouting is here.</p>
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-3 bg-primary text-background font-bold rounded uppercase">Get Started</button>
        <button className="px-8 py-3 bg-secondary text-foreground font-bold rounded uppercase border border-border">Learn More</button>
      </div>
    </div>
  </div>
);
export default Landing;
