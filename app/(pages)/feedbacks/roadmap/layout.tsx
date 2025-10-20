type RoadmapLayoutProps = {
  children: React.ReactNode;
  inProgress: React.ReactNode;
  planned: React.ReactNode;
  live: React.ReactNode;
};

function RoadmapLayout({
  children,
  inProgress,
  planned,
  live,
}: RoadmapLayoutProps) {
  return (
    <div className="mx-auto max-w-275 md:px-10 md:py-14">
      {children}
      <div className="md:grid md:grid-cols-3 md:gap-x-2.5 md:gap-y-4 lg:gap-x-7.5">
        {planned}
        {inProgress}
        {live}
      </div>
    </div>
  );
}

export default RoadmapLayout;
