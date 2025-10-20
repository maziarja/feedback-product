type SuggestionsLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

function SuggestionsLayout({ children, modal }: SuggestionsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export default SuggestionsLayout;
