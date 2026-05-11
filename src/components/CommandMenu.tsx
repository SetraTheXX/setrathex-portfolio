"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, FolderGit2, Mail, FileText, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CommandMenuCopy = {
  trigger: string;
  shortcut: string;
  placeholder: string;
  noResults: string;
  pageGroup: string;
  actionsGroup: string;
  projects: string;
  about: string;
  email: string;
};

type CvDownload = {
  label: string;
  href: string;
  fileName: string;
};

function downloadCv(href: string, fileName: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function CommandMenu({
  copy,
  cvDownloads,
}: {
  copy: CommandMenuCopy;
  cvDownloads: CvDownload[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#080b11]/80 px-4 py-2 text-sm text-slate-400 shadow-lg backdrop-blur-md transition hover:border-cyan-300/30 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(139,211,255,0.15)]"
        >
          <Search className="h-4 w-4" />
          <span>{copy.trigger}</span>
          <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] text-slate-300 group-hover:bg-cyan-300/10 group-hover:text-cyan-200 group-hover:border-cyan-300/20">
            {copy.shortcut}
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-[#07090d]/60 backdrop-blur-sm sm:pt-[20vh]"
          >
            <div className="fixed inset-0" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0c111a] shadow-2xl"
            >
              <Command className="flex w-full flex-col">
                <div className="flex items-center border-b border-white/10 px-4">
                  <Search className="mr-3 h-5 w-5 text-slate-400" />
                  <Command.Input
                    placeholder={copy.placeholder}
                    className="flex h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                  <button onClick={() => setOpen(false)} className="rounded p-1 text-slate-400 hover:text-white transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-slate-500">
                    {copy.noResults}
                  </Command.Empty>

                  <Command.Group heading={copy.pageGroup} className="px-2 py-1 text-xs font-medium text-slate-400">
                    <Command.Item
                      onSelect={() => {
                        window.location.hash = "projects";
                        setOpen(false);
                      }}
                      className="mt-1 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 transition aria-selected:bg-cyan-300/10 aria-selected:text-cyan-100 hover:bg-cyan-300/10 hover:text-cyan-100"
                    >
                      <FolderGit2 className="h-4 w-4" /> {copy.projects}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        window.location.hash = "about";
                        setOpen(false);
                      }}
                      className="mt-1 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 transition aria-selected:bg-cyan-300/10 aria-selected:text-cyan-100 hover:bg-cyan-300/10 hover:text-cyan-100"
                    >
                      <Search className="h-4 w-4" /> {copy.about}
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading={copy.actionsGroup} className="px-2 py-1 mt-2 text-xs font-medium text-slate-400">
                    <Command.Item
                      onSelect={() => {
                        window.open("mailto:tuncay123454@gmail.com");
                        setOpen(false);
                      }}
                      className="mt-1 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 transition aria-selected:bg-cyan-300/10 aria-selected:text-cyan-100 hover:bg-cyan-300/10 hover:text-cyan-100"
                    >
                      <Mail className="h-4 w-4" /> {copy.email}
                    </Command.Item>
                    {cvDownloads.map((cv) => (
                      <Command.Item
                        key={cv.href}
                        onSelect={() => {
                          downloadCv(cv.href, cv.fileName);
                          setOpen(false);
                        }}
                        className="mt-1 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-emerald-300 transition aria-selected:bg-emerald-400/10 aria-selected:text-emerald-200 hover:bg-emerald-400/10 hover:text-emerald-200"
                      >
                        <FileText className="h-4 w-4" /> {cv.label}
                        <ArrowRight className="h-3 w-3 ml-auto opacity-50" />
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
