'use client';

export default function SectionDivider() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="relative bg-background px-8">
            <div className="w-3 h-3 rotate-45 border border-primary/30 relative">
              <div className="absolute inset-[2px] bg-gradient-to-tr from-primary/50 to-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}