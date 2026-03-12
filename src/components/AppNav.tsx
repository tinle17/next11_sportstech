import { Link } from "react-router-dom";
import { Search, Bookmark, Calendar, FileText, User, Bell } from "lucide-react";

const AppNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-background font-bold text-xl">N</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tighter text-foreground">NEXT11</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/scout/discover" className="text-sm font-medium text-primary flex items-center gap-2">
            <Search className="w-4 h-4" /> Discover
          </Link>
          <Link to="/scout/saved" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Bookmark className="w-4 h-4" /> Saved
          </Link>
          <Link to="/scout/posts" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> My Posts
          </Link>
          <Link to="/scout/events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Events
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
